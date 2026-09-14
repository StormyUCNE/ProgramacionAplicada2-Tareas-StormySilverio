import express from "express";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import habitosRouter from "./routes/habitos.routes.js"
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use(loggerMiddleware);

app.use("/habitos", habitosRouter);

app.get("/", (req, res) => {
    res.json({
        mensaje: "API RESTful de Rastreador de Hábito con Express 5 y Prisma 7",
        estado: "En línea",
        documentacion: {
            "GET /habitos": "Listar todos los hábitos",
            "POST /habitos": "Crea hábito ({ nombre, meta })",
            "POST /habitos/:id/registrar": "Marcar hábito del día como completado",
            "GET /habitos/:id/estadisticas": "Racha actual, mejor racha, % cumplimiento",
            "DELETE /habitos/:id": "Eliminar hábito",
        }
    });
});

app.listen(PORT, ()=>{
    console.log("Servidor Corriendo en el Puerto 3000");
})