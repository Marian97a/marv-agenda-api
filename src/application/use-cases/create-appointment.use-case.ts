
import { randomUUID } from "node:crypto";
import { Appointment } from "../../domain/appointment/appointment.entity";
import { AppointmentRepository } from "../repositories/appointment.repository";

interface CreateAppointmentInput {
  clientName: string;
  phone: string;
  service: string;
  dateTime: Date;
}

export class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(input: CreateAppointmentInput): Promise<Appointment> {
    const existingAppointment =
      await this.appointmentRepository.findActiveByDateTime(
        input.dateTime
      );

    if (existingAppointment) {
      throw new Error("Já existe um agendamento ativo neste horário.");
    }

    const appointment = new Appointment({
      id: randomUUID(),
      clientName: input.clientName,
      phone: input.phone,
      service: input.service,
      dateTime: input.dateTime
    });

    await this.appointmentRepository.save(appointment);

    return appointment;
  }
}
