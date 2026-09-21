import request from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/db.js";


afterAll(async()=>{
    await prisma.tarea.deleteMany({where:{titulo:"Test Tarea"}})
    await prisma.$disconnect();
})

describe('GET /v1/tareas', () => {
    it('debería de devolver las tareas públicas con API KEY válida', async() => {
        const res = await request(app)
        .get("/v1/tareas")
        .set("x-api-key", process.env.API_KEY)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("tareas")
    });
    it('debería de dar error al no haber API KEY', async() => {
        const res = await request(app)
        .get("/v1/tareas")

        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("error")
    });
    it('debería de dar error al mandar la API KEY con el valor incorrecto', async() => {
        const res = await request(app)
        .get("/v1/tareas")
        .set("x-api-key", "valorincorrecto")

        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("error")
    });
});


describe('POST /v1/tareas', () => {
    it('debería de crear una tarea pública exitosamente', async() => {
        const res = await request(app)
        .post("/v1/tareas")
        .send({
            "titulo": "Test Tarea",
            "usuarioId": 1
        })
        .set("x-api-key", process.env.API_KEY)

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("tarea")
    });
    it('debería de dar error al no haber título', async() => {
        const res = await request(app)
        .post("/v1/tareas")
        .send({
            "usuarioId": 1
        })
        .set("x-api-key", process.env.API_KEY)
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("error")
    });
    it('debería de dar error al mandar el body completo pero sin el header', async() => {
        const res = await request(app)
        .post("/v1/tareas")
        .send({
            "titulo": "Test Tarea",
            "usuarioId": 1
        })

        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("error")
    });
});