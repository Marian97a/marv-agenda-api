
import { randomUUID } from "node:crypto";
import { Appointment } from "../../domain/appointment/appointment.entity";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { AppointmentTimeConflictError } from "../errors/appointment-time-conflict.error";

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
  throw new AppointmentTimeConflictError();
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
