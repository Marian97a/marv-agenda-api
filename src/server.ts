import "dotenv/config";
import app from "./app";
import { pool } from "./infrastructure/database/connection";

const PORT = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  try {
    await pool.query("SELECT 1");

    console.log("Conexão com PostgreSQL estabelecida!");

    app.listen(PORT, () => {
      console.log(`MARV Agenda API executando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar com PostgreSQL:", error);
    process.exit(1);
  }
}

startServer();