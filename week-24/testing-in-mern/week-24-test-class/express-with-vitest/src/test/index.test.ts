import { describe, expect, vi, it } from "vitest";
import request from "supertest";
import { app } from "../index";
import { userFn } from "../utils/users";

// vi.mock("../db", () => ({
//   prismaClient: { sum: { create: vi.fn() } },
// }));
vi.mock("../db"); // will look for the db file in the __mock__ folder first. If the __mocks__ folder is not found, then go for file.
vi.mock("../utils/users");

describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });
    console.log(userFn());

    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it("should return 411 if no inputs are provided", async () => {
    const res = await request(app).post("/sum").send({});
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("Incorrect inputs");
  });
});

describe("GET /sum", () => {
  it("should return the sum of two numbers", async () => {
    const res = await request(app)
      .get("/sum")
      .set({
        a: "1",
        b: "2",
      })
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it("should return 411 if no inputs are provided", async () => {
    const res = await request(app).get("/sum").send();
    expect(res.statusCode).toBe(411);
  });
});
