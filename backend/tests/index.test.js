const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index.js");

// yang dipakai disini ada 3 :
// 1. jest
// 2. supertest => untuk testing url
// 3. cross-env => masih kurang paham aku...
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET url my favorites", () => {
  it("should be success", async () => {
    const response = await request(app).get("/my-movies/test12@gmail.com/token123");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("get favorite movies success!");
  });

  it("should be error", async () => {
    const response = await request(app).get("/my-movies/test12@gmail.com/12122");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid token or email");
  });

  it("should be error", async () => {
    const response = await request(app)
      .post("/my-movies")
      .set("Content-Type", "application/json")
      .send({
        email: "test12@gmail.com",
        token: "toke123",
        favoriteMovies: [1, 2, 3],
      });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid token or email");
  });

  it("should be success adding favorite movie", async () => {
    const response = await request(app)
      .post("/my-movies")
      .set("Content-Type", "application/json")
      .send({
        email: "test12@gmail.com",
        token: "token123",
        data: {
          id: 1,
          title: "title",
          description: "cek",
        },
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Favorite movie added successfully");
  });

  it("should delete a favorite movie", async () => {
    const response = await request(app).delete("/my-movies").set("Content-Type", "application/json").send({ email: "test12@gmail.com", token: "token123", id: 1 });
    expect(response.statusCode).toBe(204);
  });

  it("should be success to sign in", async () => {
    const response = await request(app).post("/my-token").set("Content-Type", "application/json").send({ email: "test12@gmail.com", password: "test", token: "token123" });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Token signed in successfully");
  });

  it("should success to sign out", async () => {
    const response = await request(app).delete("/my-token").set("Content-Type", "application/json").send({ email: "test12@gmail.com", token: "token123" });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Token signed out successfully");
  });

  it("should success to sign up", async () => {
    const response = await request(app).post("/sign-up").set("Content-Type", "application/json").send({ email: "test@gmail.com", password: "test" });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Sign-up success");
  });
});
