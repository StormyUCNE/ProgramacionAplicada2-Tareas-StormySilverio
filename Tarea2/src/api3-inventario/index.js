import express from "express";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import inventarioRouter from "./routes/inventario.routes.js"
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use(loggerMiddleware);

app.use("/inventario", inventarioRouter);

app.get("/", (req, res) => {
    res.json({
        mensaje: "API RESTful de Control de Inventario con Express 5 y Prisma 7",
        estado: "En línea",
        documentacion: {
            "GET /inventario": "Listar todos los productos del inventario",
            "POST /inventario": "Crear producto en el inventario ({ producto, stock, stockMinimo })",
            "POST /inventario/:id/entrada": "Registra entrada y suma al stock ({ cantidad })",
            "POST /inventario/:id/salida": "Registra salida y resta al stock ({ cantidad })",
            "GET /inventario/alertas": "Lista productos bajo stockMinimo",
        }
    });
});

app.listen(PORT, ()=>{
    console.log(`Servidor Corriendo en el Puerto ${PORT}`);
})