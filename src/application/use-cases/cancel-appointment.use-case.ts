
import { Appointment } from "../../domain/appointment/appointment.entity";
import { AppointmentNotFoundError } from "../errors/appointment-not-found.error";
import { AppointmentRepository } from "../repositories/appointment.repository";

export class CancelAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(id: string): Promise<Appointment> {
    const appointment =
      await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new AppointmentNotFoundError();
    }

    appointment.cancel();

    await this.appointmentRepository.update(appointment);

    return appointment;
  }
}
