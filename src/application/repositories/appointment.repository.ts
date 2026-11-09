
import { Appointment } from "../../domain/appointment/appointment.entity";

export interface AppointmentRepository {
  findActiveByDateTime(dateTime: Date): Promise<Appointment | null>;

  findById(id: string): Promise<Appointment | null>;

  findAll(): Promise<Appointment[]>;

  save(appointment: Appointment): Promise<void>;
}
