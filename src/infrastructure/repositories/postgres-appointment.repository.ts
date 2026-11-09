import { pool } from "../database/connection";

import { Appointment } from "../../domain/appointment/appointment.entity";

import { AppointmentStatus } from "../../domain/appointment/appointment-status";

import { AppointmentRepository } from "../../application/repositories/appointment.repository";

interface AppointmentRow {
  id: string;
  client_name: string;
  phone: string;
  service: string;
  date_time: Date;
  created_at: Date;
  status: AppointmentStatus;
}

export class PostgresAppointmentRepository
  implements AppointmentRepository {

  async findActiveByDateTime(dateTime: Date): Promise<Appointment | null> {
    const result = await pool.query<AppointmentRow>(
      `SELECT * FROM appointments
       WHERE date_time = $1
       AND status <> 'CANCELLED'
       LIMIT 1`,
      [dateTime]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this.toDomain(result.rows[0]);
  }

  async findById(id: string): Promise<Appointment | null> {
    const result = await pool.query<AppointmentRow>(
      "SELECT * FROM appointments WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return this.toDomain(result.rows[0]);
  }

  async findAll(): Promise<Appointment[]> {
    const result = await pool.query<AppointmentRow>(
      "SELECT * FROM appointments ORDER BY date_time ASC"
    );

    return result.rows.map((row) => this.toDomain(row));
  }

  async save(appointment: Appointment): Promise<void> {
    await pool.query(
      `INSERT INTO appointments (
        id,
        client_name,
        phone,
        service,
        date_time,
        created_at,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        appointment.id,
        appointment.clientName,
        appointment.phone,
        appointment.service,
        appointment.dateTime,
        appointment.createdAt,
        appointment.getStatus()
      ]
    );
  }

  async update(appointment: Appointment): Promise<void> {
    const result = await pool.query(
      `UPDATE appointments
       SET status = $1
       WHERE id = $2`,
      [
        appointment.getStatus(),
        appointment.id
      ]
    );

    if (result.rowCount === 0) {
      throw new Error("Agendamento não encontrado para atualização.");
    }
  }

  private toDomain(row: AppointmentRow): Appointment {
    return Appointment.restore({
      id: row.id,
      clientName: row.client_name,
      phone: row.phone,
      service: row.service,
      dateTime: row.date_time,
      createdAt: row.created_at,
      status: row.status
    });
  }
}