import express from "express";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import turnosRouter from "./routes/turnos.routes.js"
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use(loggerMiddleware);

app.use("/turnos", turnosRouter);

app.get("/", (req, res) => {
    res.json({
        mensaje: "API RESTful de Gestor de Turnos con Express 5 y Prisma 7",
        estado: "En línea",
        documentacion: {
            "GET /turnos": "Listar todos los turnos",
            "POST /turnos": "Crear turno ({ cliente, servicio })",
            "GET /turnos/siguiente": "Ver quién es el próximo",
            "PUT /turnos/llamar": "Llamar al siguiente y cambiar estado a atendiendo",
            "PUT /turnos/:id/finalizar": "Marcar turno como finalizado",
            "GET /turnos/espera": "Cuántos están esperando",
        }
    });
});

app.listen(PORT, ()=>{
    console.log(`Servidor Corriendo en el Puerto ${PORT}`);
})