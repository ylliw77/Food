const { describe, expect, it, beforeAll } = require("@jest/globals");
const app = require("../app");
const request = require("supertest");

const { userSignIn } = require("../helpers/auth-user");

const { sequelize } = require("../models/");
const { queryInterface } = sequelize;

let tokenTest;

beforeAll(async () => {
  const users = require("../user.json").map((user) => {
    user.createdAt = user.updatedAt = new Date();
    return user;
  });

  await queryInterface.bulkInsert("Users", users);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /login", () => {
  it("should response with status code 200", async () => {
    const response = await request(app).post("/login");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(Object);

    const access_token = response.body[0];

    expect(access_token).toHaveProperty("access_token", expect.any(String));
  });

  it("should response with status code 400", async () => {
    const res = await request(app).post("/login");
    console.log(res.body);
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toBeInstanceOf(Array);
    expect(res.body.message).toContain("Email is required");
    expect(res.body.message).toContain("Invalid email format");
    expect(res.body.message).toContain("Password is required");
    expect(res.body.message).toContain(
      "Password characters must be greater than 5"
    );
  });
  it("should response with status code 401", async () => {
    const res = await request(app).post("/login");
    console.log(res.body);
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toBeInstanceOf(Array);
    expect(res.body.message).toContain("Invalid email/password");
  });
});

describe("POST /add-user", () => {
  it("should response with status code 201", async () => {
    const response = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${tokenTest}`);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);

    const { id, email, role } = response.body;
    const newStaff = response.body[0];

    expect(newStaff).toHaveProperty("id", expect.any(Number));
    expect(newStaff).toHaveProperty("email", expect.any(String));
    expect(newStaff).toHaveProperty("role", expect("staff"));
  });
  it("should response with status code 400", async () => {
    const res = await request(app).post("/login");
    console.log(res.body);
    expect(res.status).toBe(400);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.message).toBeInstanceOf(Array);
    expect(res.body.message).toContain("Email is required");
    expect(res.body.message).toContain("Password is required");
    expect(res.body.message).toContain("Email already exist");
    expect(res.body.message).toContain("Invalid email format");
    expect(res.body.message).toContain(
      "Password characters must be greater than 5"
    );
  });
});
