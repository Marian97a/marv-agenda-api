
import { describe, expect, it } from "vitest";
import { Appointment } from "../../src/domain/appointment/appointment.entity";
import { AppointmentStatus } from "../../src/domain/appointment/appointment-status";

function createAppointment(): Appointment {
  return new Appointment({
    id: "appointment-001",
    clientName: "João Silva",
    phone: "85999999999",
    service: "Corte de cabelo",
    dateTime: new Date("2026-12-10T14:00:00Z")
  });
}

describe("Appointment Entity", () => {
  it("deve criar um agendamento com status PENDING", () => {
    const appointment = createAppointment();

    expect(appointment.getStatus()).toBe(
      AppointmentStatus.PENDING
    );
  });

  it("deve confirmar um agendamento", () => {
    const appointment = createAppointment();

    appointment.confirm();

    expect(appointment.getStatus()).toBe(
      AppointmentStatus.CONFIRMED
    );
  });

  it("deve cancelar um agendamento", () => {
    const appointment = createAppointment();

    appointment.cancel();

    expect(appointment.getStatus()).toBe(
      AppointmentStatus.CANCELLED
    );
  });

  it("não deve confirmar um agendamento cancelado", () => {
    const appointment = createAppointment();

    appointment.cancel();

    expect(() => appointment.confirm()).toThrow(
      "Não é possível confirmar um agendamento cancelado."
    );
  });

  it("não deve cancelar um agendamento duas vezes", () => {
    const appointment = createAppointment();

    appointment.cancel();

    expect(() => appointment.cancel()).toThrow(
      "Este agendamento já está cancelado."
    );
  });

  it("não deve criar um agendamento sem nome do cliente", () => {
    expect(() => {
      new Appointment({
        id: "appointment-002",
        clientName: " ",
        phone: "85999999999",
        service: "Corte de cabelo",
        dateTime: new Date("2026-12-10T14:00:00Z")
      });
    }).toThrow("O nome do cliente é obrigatório.");
  });
});
