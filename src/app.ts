
import express from "express";
import healthRoutes from "./routes/health.routes";
import appointmentRoutes from "./routes/appointment.routes";

const app = express();

app.use(express.json());

app.use("/health", healthRoutes);
app.use("/appointments", appointmentRoutes);

export default app;
