import express from "express";
import encuestasRouter from './routes/votacion.routes.js'
import { loggerMiddleware } from "./middlewares/logger.middleware.js";

const app = express();

app.use(express.json());
app.use(loggerMiddleware)

const PORT = process.env.PORT || 3000;

app.use("/encuestas", encuestasRouter);

app.get("/", (req, res) => {
    res.json({
        mensaje: "API RESTful de Sistema de Votación con Express 5 y Prisma 7",
        estado: "En línea",
        documentacion: {
            "GET /encuestas": "Listar todos las encuestas",
            "POST /encuestas": "Crear encuesta ({ pregunta, opciones })",
            "POST /encuestas/:id/votar": "Registra voto ({ opcion })",
            "DELETE /encuestas/:id": "Eliminar encuesta",
            "GET /encuestas/:id/resultados": "Devuelve votos por opción, porcentaje y ganandor",
        }
    });
});

app.listen(PORT, ()=>{console.log(`Servidor Corriendo en el Puerto ${PORT}`)});