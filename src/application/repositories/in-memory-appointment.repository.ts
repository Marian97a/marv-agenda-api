
import { Appointment } from "../../domain/appointment/appointment.entity";
import { AppointmentStatus } from "../../domain/appointment/appointment-status";
import { AppointmentRepository } from "../../application/repositories/appointment.repository";

export class InMemoryAppointmentRepository implements AppointmentRepository {
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
}
