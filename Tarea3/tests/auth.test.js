import request from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/db.js";


afterAll(async()=>{
    await prisma.usuario.delete({where:{email:"test@test.com"}});
    await prisma.$disconnect();
})
describe('POST /auth/registro', () => {
    it('debería de registrar un usuario exitosamente', async() => {
        const res = await request(app)
        .post("/auth/registro")
        .send({
            nombre: 'Test User', 
            email: 'test@test.com',
            password: '123456', 
            rol: 'usuario'
        })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('nombre')
        expect(res.body).toHaveProperty('rol')
        expect(res.body).not.toHaveProperty('password');
    });
    it('debería rechazar un email duplicado', async() => {
        const res = await request(app)
        .post("/auth/registro")
        .send({
            nombre: 'Test User', 
            email: 'test@test.com',
            password: '123456', 
            rol: 'usuario'
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("error")
    }); 
    it('debería de dar error por falta de email', async() => {
        const res = await request(app)
        .post("/auth/registro")
        .send({
            nombre: 'Test User',
            password: '123456', 
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("error")
    }); 
    it('debería de dar error por falta de password', async() => {
        const res = await request(app)
        .post("/auth/registro")
        .send({
            nombre: 'Test User', 
            email: 'test@test.com', 
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("error")
    }); 
});



describe('POST /auth/login', () => {
    it('Login exitoso', async() => {
        const res = await request(app)
        .post("/auth/login")
        .send({
            email: 'test@test.com',
            password: '123456'
        })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("token")
    });
    it('debería rechazar la password incorrecta', async() => {
        const res = await request(app)
        .post("/auth/login")
        .send({
            email: 'test@test.com',
            password: '123436'
        })
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("error")
    }); 
    it('debería de dar error ante un email que no existe', async() => {
        const res = await request(app)
        .post("/auth/login")
        .send({
            email: 'noexisto@test.com',
            password: '123436' 
        })
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("error")
    }); 
    it('debería de dar error por falta de credenciales', async() => {
        const res = await request(app)
        .post("/auth/login")
        .send({
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("error")
    }); 
});