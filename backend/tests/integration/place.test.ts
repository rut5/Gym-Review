import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../src/app.js";

describe("Places API", () => {
  it("GET /places should return all places", async () => {
    const response = await request(app).get("/places");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /places/:id should return a single place", async () => {
    const response = await request(app).get("/places/1");

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it("GET /places/:id should return 404 for invalid place", async () => {
    const response = await request(app).get("/places/999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Place not found");
  });

  it("POST /places should create a new place", async () => {
    const response = await request(app).post("/places").send({
      name: "Power Gym",
      location: "Gothenburg",
      description: "24/7 fitness center",
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Power Gym");
  });

  it("POST /places/:id/reviews should add a review", async () => {
    const response = await request(app).post("/places/1/reviews").send({
      author: "Mina",
      rating: 5,
      comment: "Amazing place",
    });

    expect(response.status).toBe(201);
    expect(response.body.rating).toBe(5);
  });
});
