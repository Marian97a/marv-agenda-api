
import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../src/app";

function createPayload() {
  return {
    clientName: "João Silva",
    phone: "85999999999",
    service: "Corte de cabelo",
    dateTime: new Date(Date.now() + 86400000).toISOString()
  };
}

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
});
