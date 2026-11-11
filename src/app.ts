import express from "express";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import swaggerUi from "swagger-ui-express";
import { parse } from "yaml";
import pinoHttp from "pino-http";

import healthRoutes from "./routes/health.routes";
import metricsRoutes from "./routes/metrics.routes";
import { createAppointmentRouter } from "./routes/appointment.routes";
import { AppointmentRepository } from "./application/repositories/appointment.repository";
import { PostgresAppointmentRepository } from "./infrastructure/repositories/postgres-appointment.repository";
import { logger } from "./infrastructure/observability/logger";
import { httpMetricsMiddleware } from "./infrastructure/observability/metrics";

const openApiFile = readFileSync(
  join(process.cwd(), "docs", "openapi.yaml"),
  "utf-8"
);

const openApiDocument = parse(openApiFile);

export function createApp(repository: AppointmentRepository) {
  const app = express();

  app.use(pinoHttp({ logger }));
  app.use(express.json());
  app.use(httpMetricsMiddleware);

  app.use("/health", healthRoutes);
  app.use("/appointments", createAppointmentRouter(repository));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
  app.use("/metrics", metricsRoutes);

  return app;
}

const realRepository = new PostgresAppointmentRepository();
const app = createApp(realRepository);

export default app;
