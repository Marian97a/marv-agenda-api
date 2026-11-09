
import { Appointment } from "../../domain/appointment/appointment.entity";
import { AppointmentRepository } from "../repositories/appointment.repository";

export class ListAppointmentsUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository
  ) {}

  async execute(): Promise<Appointment[]> {
    return this.appointmentRepository.findAll();
  }
}
