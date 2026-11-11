import express from "express";

import healthRoutes from "./routes/health.routes";
import { createAppointmentRouter } from "./routes/appointment.routes";
import { AppointmentRepository } from "./application/repositories/appointment.repository";
import { PostgresAppointmentRepository } from "./infrastructure/repositories/postgres-appointment.repository";

export function createApp(repository: AppointmentRepository) {
  const app = express();

  app.use(express.json());

  app.use("/health", healthRoutes);

  // Aqui passamos o repositório injetado
  app.use("/appointments", createAppointmentRouter(repository));

  return app;
}

const realRepository = new PostgresAppointmentRepository();
const app = createApp(realRepository);
export default app;
