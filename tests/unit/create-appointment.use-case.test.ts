import { describe, expect, it } from "vitest";
import { Appointment } from "../../src/domain/appointment/appointment.entity";
import { AppointmentStatus } from "../../src/domain/appointment/appointment-status";
import { AppointmentRepository } from "../../src/application/repositories/appointment.repository";
import { CreateAppointmentUseCase } from "../../src/application/use-cases/create-appointment.use-case";

class InMemoryAppointmentRepository implements AppointmentRepository {
  private appointments: Appointment[] = [];

  async findActiveByDateTime(dateTime: Date): Promise<Appointment | null> {
    const appointment = this.appointments.find((item) => {
      const sameTime =
        item.dateTime.getTime() === dateTime.getTime();

      const isActive =
        item.getStatus() !== AppointmentStatus.CANCELLED;

      return sameTime && isActive;
    });

    return appointment ?? null;
  }

  async save(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment);
  }

  // Métodos adicionados para satisfazer o contrato da interface no teste:

  async findById(id: string): Promise<Appointment | null> {
    const appointment = this.appointments.find((item) => item.id === id);
    return appointment ?? null;
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointments;
  }

  async update(appointment: Appointment): Promise<void> {
    const index = this.appointments.findIndex((item) => item.id === appointment.id);
    if (index !== -1) {
      this.appointments[index] = appointment;
    }
  }
}

describe("CreateAppointmentUseCase", () => {
  it("deve criar um agendamento quando o horário estiver disponível", async () => {
    const repository = new InMemoryAppointmentRepository();
    const useCase = new CreateAppointmentUseCase(repository);

    const appointment = await useCase.execute({
      clientName: "João Silva",
      phone: "85999999999",
      service: "Corte de cabelo",
      dateTime: new Date("2026-12-10T14:00:00Z")
    });

    expect(appointment.id).toBeTruthy();
    expect(appointment.clientName).toBe("João Silva");
    expect(appointment.getStatus()).toBe(AppointmentStatus.PENDING);
  });

  it("não deve permitir dois agendamentos ativos no mesmo horário", async () => {
    const repository = new InMemoryAppointmentRepository();
    const useCase = new CreateAppointmentUseCase(repository);

    const dateTime = new Date("2026-12-10T14:00:00Z");

    await useCase.execute({
      clientName: "João Silva",
      phone: "85999999999",
      service: "Corte de cabelo",
      dateTime
    });

    await expect(
      useCase.execute({
        clientName: "Maria Silva",
        phone: "85988888888",
        service: "Barba",
        dateTime
      })
    ).rejects.toThrow(
      "Já existe um agendamento ativo neste horário."
    );
  });

  it("deve permitir um novo agendamento no horário de um agendamento cancelado", async () => {
    const repository = new InMemoryAppointmentRepository();
    const useCase = new CreateAppointmentUseCase(repository);

    const dateTime = new Date("2026-12-10T14:00:00Z");

    const firstAppointment = await useCase.execute({
      clientName: "João Silva",
      phone: "85999999999",
      service: "Corte de cabelo",
      dateTime
    });

    firstAppointment.cancel();

    const secondAppointment = await useCase.execute({
      clientName: "Maria Silva",
      phone: "85988888888",
      service: "Barba",
      dateTime
    });

    expect(secondAppointment.id).not.toBe(firstAppointment.id);
    expect(secondAppointment.getStatus()).toBe(AppointmentStatus.PENDING);
  });
});
