
import { describe, expect, it } from "vitest";
import request from "supertest";

import { createApp } from "../../src/app";
import { InMemoryAppointmentRepository } from "../../src/infrastructure/repositories/in-memory-appointment.repository";

describe("Smoke Test - API", () => {
  it("deve responder com HTTP 200 no endpoint de saúde", async () => {
    const repository = new InMemoryAppointmentRepository();
    const app = createApp(repository);

    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
  });
});
