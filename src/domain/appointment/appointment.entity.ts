
import { AppointmentStatus } from "./appointment-status";

interface CreateAppointmentData {
  id: string;
  clientName: string;
  phone: string;
  service: string;
  dateTime: Date;
}

export class Appointment {
  public readonly id: string;
  public readonly clientName: string;
  public readonly phone: string;
  public readonly service: string;
  public readonly dateTime: Date;
  public readonly createdAt: Date;

  private status: AppointmentStatus;

  constructor(data: CreateAppointmentData) {
    if (!data.clientName.trim()) {
      throw new Error("O nome do cliente é obrigatório.");
    }

    if (!data.phone.trim()) {
      throw new Error("O telefone é obrigatório.");
    }

    if (!data.service.trim()) {
      throw new Error("O serviço é obrigatório.");
    }

    if (!(data.dateTime instanceof Date) ||
        Number.isNaN(data.dateTime.getTime())) {
      throw new Error("A data do agendamento é inválida.");
    }

    this.id = data.id;
    this.clientName = data.clientName.trim();
    this.phone = data.phone.trim();
    this.service = data.service.trim();
    this.dateTime = data.dateTime;
    this.createdAt = new Date();
    this.status = AppointmentStatus.PENDING;
  }

  public getStatus(): AppointmentStatus {
    return this.status;
  }

  public confirm(): void {
    if (this.status === AppointmentStatus.CANCELLED) {
      throw new Error(
        "Não é possível confirmar um agendamento cancelado."
      );
    }

    this.status = AppointmentStatus.CONFIRMED;
  }

  public cancel(): void {
    if (this.status === AppointmentStatus.CANCELLED) {
      throw new Error(
        "Este agendamento já está cancelado."
      );
    }

    this.status = AppointmentStatus.CANCELLED;
  }
}
