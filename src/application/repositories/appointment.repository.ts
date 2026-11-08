
import { Appointment } from "../../domain/appointment/appointment.entity";

export interface AppointmentRepository {
  findActiveByDateTime(dateTime: Date): Promise<Appointment | null>;

  save(appointment: Appointment): Promise<void>;
}
