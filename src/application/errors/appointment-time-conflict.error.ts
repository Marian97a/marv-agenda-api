
export class AppointmentTimeConflictError extends Error {
  constructor() {
    super("Já existe um agendamento ativo neste horário.");
    this.name = "AppointmentTimeConflictError";
  }
}
