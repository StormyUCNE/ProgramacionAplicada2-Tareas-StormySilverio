import request from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/db.js";

let usuarioToken, adminToken;
let tareaUsuarioId1, tareaUsuarioId2, tareaAdminId;
beforeAll(async () => {
  const res = await request(app).post("/auth/login").send({
    email: "normaluser@test.com",
    password: "123456",
  });
  usuarioToken = res.body.token;

  const res2 = await request(app).post("/auth/login").send({
    email: "stormy@gmail.com",
    password: "Stormy123",
  });
  adminToken = res2.body.token;

  const tareaUsuario1 = await request(app).post("/v2/tareas").send({
    titulo: "Tarea Prueba"
  }).set("Authorization", `Bearer ${usuarioToken}`)
  tareaUsuarioId1 = tareaUsuario1.body.id;

  const tareaUsuario2 = await request(app).post("/v2/tareas").send({
    titulo: "Tarea Prueba 2"
  }).set("Authorization", `Bearer ${usuarioToken}`)
  tareaUsuarioId2 = tareaUsuario2.body.id;

  const tareaAdmin = await request(app).post("/v2/tareas").send({
    titulo: "Tarea Prueba 3"
  }).set("Authorization", `Bearer ${adminToken}`)
  tareaAdminId = tareaAdmin.body.id;
});

describe("GET /v2/tareas", () => {
  it("debería de dar error al no haber token, es decir sin Authorization", async () => {
    const res = await request(app).get("/v2/tareas");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
  it("debería de dar error al haber token, pero con valor invalido", async () => {
    const res = await request(app)
      .get("/v2/tareas")
      .set("Authorization", "tokenFalso");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
  it("debería devolver solo las tareas del token del usuario normal", async () => {
    const res = await request(app)
      .get("/v2/tareas")
      .set("Authorization", `Bearer ${usuarioToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("tareas");
  });
  it("debería devolver todas las tareas por el token de admin", async () => {
    const res = await request(app)
      .get("/v2/tareas")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("tareas");
  });
});

describe("DELETE /v2/tareas/:id", () => {
  it("debería eliminar cualquier tarea por el token de admin", async () => {
    const res = await request(app)
      .delete(`/v2/tareas/${tareaUsuarioId1}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("mensaje");
  });
  it("debería eliminar tarea propia del usuario", async () => {
    const res = await request(app)
      .delete(`/v2/tareas/${tareaUsuarioId2}`)
      .set("Authorization", `Bearer ${usuarioToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("mensaje");
  });
  it("debería dar error al eliminar una tarea que no es propia del usuario", async () => {
    const res = await request(app)
      .delete(`/v2/tareas/${tareaAdminId}`)
      .set("Authorization", `Bearer ${usuarioToken}`);
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("error");
  });
  it("debería dar error al eliminar una tarea sin token", async () => {
    const res = await request(app).delete("/v2/tareas/2");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});