import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import { createApp } from "../../src/app";
import { InMemoryAppointmentRepository } from "../../src/infrastructure/repositories/in-memory-appointment.repository";

let app: ReturnType<typeof createApp>;

function createPayload() {
  return {
    clientName: "João Silva",
    phone: "85999999999",
    service: "Corte de cabelo",
    dateTime: new Date(Date.now() + 86400000).toISOString()
  };
}

beforeEach(() => {
  const repository = new InMemoryAppointmentRepository();
  app = createApp(repository);
});

describe("Appointment Routes - Integration", () => {
  it("deve criar um agendamento e retornar HTTP 201", async () => {
    const response = await request(app)
      .post("/appointments")
      .send(createPayload());

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data.id).toBeTruthy();
    expect(response.body.data.clientName).toBe("João Silva");
    expect(response.body.data.status).toBe("PENDING");
  });

  it("deve retornar HTTP 400 quando os dados forem incompletos", async () => {
    const response = await request(app)
      .post("/appointments")
      .send({
        clientName: "João Silva",
        service: "Corte de cabelo",
        dateTime: new Date(Date.now() + 86400000).toISOString()
      });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
  });

  it("deve retornar HTTP 409 quando o horário já estiver ocupado", async () => {
    const payload = createPayload();

    const firstResponse = await request(app)
      .post("/appointments")
      .send(payload);

    const secondResponse = await request(app)
      .post("/appointments")
      .send({
        ...payload,
        clientName: "Maria Silva",
        phone: "85988888888"
      });

    expect(firstResponse.status).toBe(201);
    expect(secondResponse.status).toBe(409);
    expect(secondResponse.body.status).toBe("error");
  });

  it("deve listar os agendamentos", async () => {
    const response = await request(app)
      .get("/appointments");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("deve consultar um agendamento pelo ID", async () => {
    const created = await request(app)
      .post("/appointments")
      .send(createPayload());

    const response = await request(app)
      .get(`/appointments/${created.body.data.id}`);

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(created.body.data.id);
  });

  it("deve retornar 404 para um agendamento inexistente", async () => {
    const response = await request(app)
      .get("/appointments/id-inexistente");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Agendamento não encontrado.");
  });

  it("deve confirmar um agendamento", async () => {
    const created = await request(app)
      .post("/appointments")
      .send(createPayload());

    const response = await request(app)
      .patch(`/appointments/${created.body.data.id}/confirm`);

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe("CONFIRMED");
  });

  it("deve cancelar um agendamento", async () => {
    const created = await request(app)
      .post("/appointments")
      .send(createPayload());

    const response = await request(app)
      .patch(`/appointments/${created.body.data.id}/cancel`);

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe("CANCELLED");
  });

  it("não deve confirmar um agendamento cancelado", async () => {
    const created = await request(app)
      .post("/appointments")
      .send(createPayload());

    const id = created.body.data.id;

    await request(app)
      .patch(`/appointments/${id}/cancel`);

    const response = await request(app)
      .patch(`/appointments/${id}/confirm`);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe(
      "Não é possível confirmar um agendamento cancelado."
    );
  });
});
