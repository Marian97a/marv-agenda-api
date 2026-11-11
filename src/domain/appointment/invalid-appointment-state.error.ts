
export class InvalidAppointmentStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidAppointmentStateError";
  }
}
