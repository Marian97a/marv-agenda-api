import type { Request, Response, NextFunction } from "express";
import client from "prom-client";

// Coleta métricas básicas do processo Node.js.
client.collectDefaultMetrics();

// Contador de requisições HTTP.
export const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total de requisições HTTP recebidas pela API.",
  labelNames: ["method", "route", "status_code"]
});

// Histograma para medir a duração das requisições.
export const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duração das requisições HTTP em segundos.",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.005, 0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

// Disponibiliza todas as métricas no formato Prometheus.
export async function getMetrics(): Promise<string> {
  return client.register.metrics();
}

// Retorna o tipo de conteúdo esperado pelo Prometheus.
export function getMetricsContentType(): string {
  return client.register.contentType;
}

export function httpMetricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    // Não contabiliza as próprias consultas de métricas.
    if (req.path === "/metrics") {
      return;
    }

    const duration =
      Number(process.hrtime.bigint() - start) / 1_000_000_000;

    // Utiliza o padrão da rota, evitando registrar IDs diferentes
    // como rotas distintas.
    const route = req.route
      ? `${req.baseUrl}${req.route.path}`
      : "unmatched";

    const labels = {
      method: req.method,
      route,
      status_code: String(res.statusCode)
    };

    httpRequestsTotal.inc(labels);
    httpRequestDuration.observe(labels, duration);
  });

  next();
}
