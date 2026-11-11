import { AppointmentRepository } from "../application/repositories/appointment.repository";

import { CreateAppointmentUseCase } from "../application/use-cases/create-appointment.use-case";
import { ListAppointmentsUseCase } from "../application/use-cases/list-appointments.use-case";
import { GetAppointmentByIdUseCase } from "../application/use-cases/get-appointment-by-id.use-case";
import { ConfirmAppointmentUseCase } from "../application/use-cases/confirm-appointment.use-case";
import { CancelAppointmentUseCase } from "../application/use-cases/cancel-appointment.use-case";

import { PostgresAppointmentRepository } from "./repositories/postgres-appointment.repository";

export function createContainer(
  repository: AppointmentRepository = new PostgresAppointmentRepository()
) {
  return {
    createAppointmentUseCase: new CreateAppointmentUseCase(repository),

    listAppointmentsUseCase: new ListAppointmentsUseCase(repository),

    getAppointmentByIdUseCase: new GetAppointmentByIdUseCase(repository),

    confirmAppointmentUseCase: new ConfirmAppointmentUseCase(repository),

    cancelAppointmentUseCase: new CancelAppointmentUseCase(repository)
  };
}