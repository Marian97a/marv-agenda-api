import { Router } from "express";
import { CreateAppointmentUseCase } from "../application/use-cases/create-appointment.use-case";
import { AppointmentTimeConflictError } from "../application/errors/appointment-time-conflict.error";
import { InMemoryAppointmentRepository } from "../application/repositories/in-memory-appointment.repository";

const router = Router();

const appointmentRepository = new InMemoryAppointmentRepository();
const createAppointmentUseCase = new CreateAppointmentUseCase(
  appointmentRepository,
);

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
        message: "Informe nome, telefone, serviço e data do agendamento.",
      });
    }

    const parsedDate = new Date(dateTime);

    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        status: "error",
        message: "A data do agendamento é inválida.",
      });
    }

    const appointment = await createAppointmentUseCase.execute({
      clientName,
      phone,
      service,
      dateTime: parsedDate,
    });

    return res.status(201).json({
      status: "success",
      message: "Agendamento criado com sucesso.",
      data: appointment,
    });
  } catch (error) {
    if (error instanceof AppointmentTimeConflictError) {
      return res.status(409).json({
        status: "error",
        message: error.message,
      });
    }

    if (error instanceof Error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Erro interno ao criar agendamento.",
    });
  }
});

export default router;
