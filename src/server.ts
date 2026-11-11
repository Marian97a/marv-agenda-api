import "dotenv/config";
import app from "./app";
import { pool } from "./infrastructure/database/connection";
import { logger } from "./infrastructure/observability/logger";

const PORT = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  try {
    await pool.query("SELECT 1");

    logger.info("Conexão com PostgreSQL estabelecida!");

    app.listen(PORT, () => {
      logger.info(
        { port: PORT },
        "MARV Agenda API iniciada com sucesso."
      );
    });
  } catch (error) {
    logger.error(
      { err: error },
      "Erro ao conectar com PostgreSQL."
    );
    process.exit(1);
  }
}

startServer();
