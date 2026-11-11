import { Router } from "express";
import { AppointmentNotFoundError } from "../application/errors/appointment-not-found.error";
import { AppointmentTimeConflictError } from "../application/errors/appointment-time-conflict.error";
import { CancelAppointmentUseCase } from "../application/use-cases/cancel-appointment.use-case";
import { ConfirmAppointmentUseCase } from "../application/use-cases/confirm-appointment.use-case";
import { CreateAppointmentUseCase } from "../application/use-cases/create-appointment.use-case";
import { GetAppointmentByIdUseCase } from "../application/use-cases/get-appointment-by-id.use-case";
import { ListAppointmentsUseCase } from "../application/use-cases/list-appointments.use-case";
import { AppointmentRepository } from "../application/repositories/appointment.repository";
import { InvalidAppointmentStateError } from "../domain/appointment/invalid-appointment-state.error";

// Esta é a função que o app.ts vai chamar!
export function createAppointmentRouter(appointmentRepository: AppointmentRepository) {
  const router = Router();

  // Instancia os casos de uso usando o repositório que veio do app.ts
  const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentRepository);
  const listAppointmentsUseCase = new ListAppointmentsUseCase(appointmentRepository);
  const getAppointmentByIdUseCase = new GetAppointmentByIdUseCase(appointmentRepository);
  const confirmAppointmentUseCase = new ConfirmAppointmentUseCase(appointmentRepository);
  const cancelAppointmentUseCase = new CancelAppointmentUseCase(appointmentRepository);

  // POST /appointments
  router.post("/", async (req, res) => {
    try {
      const { clientName, phone, service, dateTime } = req.body ?? {};

      if (
        typeof clientName !== "string" ||
        typeof phone !== "string" ||
        typeof service !== "string" ||
        typeof dateTime !== "string" ||
        !clientName.trim() ||
        !phone.trim() ||
        !service.trim()
      ) {
        return res.status(400).json({
          status: "error",
          message: "Informe nome, telefone, serviço e data do agendamento."
        });
      }

      const parsedDate = new Date(dateTime);

      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({
          status: "error",
          message: "A data do agendamento é inválida."
        });
      }

      const appointment = await createAppointmentUseCase.execute({
        clientName,
        phone,
        service,
        dateTime: parsedDate
      });

      return res.status(201).json({
        status: "success",
        message: "Agendamento criado com sucesso.",
        data: appointment
      });
    } catch (error) {
      if (error instanceof AppointmentTimeConflictError) {
        return res.status(409).json({
          status: "error",
          message: error.message
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Erro interno ao criar agendamento."
      });
    }
  });

  // GET /appointments
  router.get("/", async (_req, res) => {
    try {
      const appointments = await listAppointmentsUseCase.execute();

      return res.status(200).json({
        status: "success",
        data: appointments
      });
    } catch {
      return res.status(500).json({
        status: "error",
        message: "Erro interno ao listar agendamentos."
      });
    }
  });

  // GET /appointments/:id
  router.get("/:id", async (req, res) => {
    try {
      const appointment = await getAppointmentByIdUseCase.execute(req.params.id);

      return res.status(200).json({
        status: "success",
        data: appointment
      });
    } catch (error: any) {
      if (
        error instanceof AppointmentNotFoundError ||
        error.code === "22P02" ||
        error.message?.includes("invalid input syntax for type uuid")
      ) {
        return res.status(404).json({
          status: "error",
          message: "Agendamento não encontrado."
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Erro interno ao consultar agendamento."
      });
    }
  });

  // PATCH /appointments/:id/confirm
  router.patch("/:id/confirm", async (req, res) => {
    try {
      const appointment = await confirmAppointmentUseCase.execute(req.params.id);

      return res.status(200).json({
        status: "success",
        message: "Agendamento confirmado com sucesso.",
        data: appointment
      });
    } catch (error) {
      if (error instanceof AppointmentNotFoundError) {
        return res.status(404).json({
          status: "error",
          message: error.message
        });
      }

      if (error instanceof InvalidAppointmentStateError) {
        return res.status(409).json({
          status: "error",
          message: error.message
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Erro interno ao confirmar agendamento."
      });
    } // <- Faltava esse fechamento da rota
  }); // <- Faltava esse fechamento do router.patch

  // PATCH /appointments/:id/cancel
  router.patch("/:id/cancel", async (req, res) => {
    try {
      const appointment = await cancelAppointmentUseCase.execute(req.params.id);

      return res.status(200).json({
        status: "success",
        message: "Agendamento cancelado com sucesso.",
        data: appointment
      });
    } catch (error) {
      if (error instanceof AppointmentNotFoundError) {
        return res.status(404).json({
          status: "error",
          message: error.message
        });
      }

      if (error instanceof InvalidAppointmentStateError) {
        return res.status(409).json({
          status: "error",
          message: error.message
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Erro interno ao cancelar agendamento."
      });
    }
  });

  return router;
}
