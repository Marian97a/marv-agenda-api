
import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 5 },
    { duration: "1m", target: 10 },
    { duration: "30s", target: 0 }
  ],

  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"]
  }
};

const BASE_URL = __ENV.BASE_URL || "http://host.docker.internal:3000";

export default function () {
  const healthResponse = http.get(`${BASE_URL}/health`);

  check(healthResponse, {
    "health retorna HTTP 200": (res) => res.status === 200
  });

  const appointmentsResponse = http.get(`${BASE_URL}/appointments`);

  check(appointmentsResponse, {
    "lista de agendamentos retorna HTTP 200": (res) =>
      res.status === 200
  });

  sleep(1);
}
