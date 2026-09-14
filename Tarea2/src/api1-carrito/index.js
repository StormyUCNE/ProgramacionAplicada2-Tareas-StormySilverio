import express from 'express';
import { loggerMiddleware } from './middlewares/logger.middleware.js';
import productosRouter from './routes/productos.routes.js';
import carritoRouter from './routes/carrito.routes.js';

export const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(loggerMiddleware);

app.use("/productos", productosRouter);
app.use("/carrito", carritoRouter);

app.get("/", (req, res) => {
    res.json({
        mensaje: "API RESTful de Carrito con Express 5 y Prisma 7",
        estado: "En línea",
        documentacion: {
            "GET /productos": "Listar todos los productos",
            "POST /productos": "Crear nuevo producto ({ nombre, precio, cantidad })",
            "PUT /productos/:id": "Actualizar cantidad del producto ({ cantidad })",
            "DELETE /tareas/:id": "Eliminar producto",
            "GET /carrito/total": "Calcular total (precio x cantidad)",
            "GET /carrito/aplicar-descuento": "Aplica descuento al carrito ({porcentaje})"
        }
    });
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el Puerto ${PORT}`);
})