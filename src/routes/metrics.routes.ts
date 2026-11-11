
import { Router } from "express";
import {
  getMetrics,
  getMetricsContentType
} from "../infrastructure/observability/metrics";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const metrics = await getMetrics();

    res.set("Content-Type", getMetricsContentType());

    return res.status(200).send(metrics);
  } catch {
    return res.status(500).json({
      status: "error",
      message: "Erro interno ao consultar métricas."
    });
  }
});

export default router;
