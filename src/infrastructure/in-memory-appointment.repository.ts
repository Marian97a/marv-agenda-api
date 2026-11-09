import { AppointmentRepository } from "../application/repositories/appointment.repository";
import { AppointmentStatus } from "../domain/appointment/appointment-status";
import { Appointment } from "../domain/appointment/appointment.entity";


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

  async findById(id: string): Promise<Appointment | null> {
    const appointment = this.appointments.find(
      (item) => item.id === id
    );

    return appointment ?? null;
  }

  async findAll(): Promise<Appointment[]> {
    return [...this.appointments];
  }

  async save(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment);
  }
}
