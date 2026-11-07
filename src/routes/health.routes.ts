
import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "MARV Agenda API está funcionando!",
    timestamp: new Date().toISOString()
  });
});

export default router;
