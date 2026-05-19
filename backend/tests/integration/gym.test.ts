import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../src/app.js";

describe("Gyms API", () => {
  it("GET /gyms should return all gyms", async () => {
    const response = await request(app).get("/gyms");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /gyms/:id should return a single gym", async () => {
    const response = await request(app).get("/gyms/1");

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it("GET /gyms/:id should return 404 for invalid gym", async () => {
    const response = await request(app).get("/gyms/999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Gym not found");
  });
});
