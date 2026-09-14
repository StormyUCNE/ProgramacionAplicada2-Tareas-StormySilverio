import Router from "express";
import { crearProducto, obtenerProductos, obtenerProductosBajoStock, procesarEntrada, procesarSalida } from "../controllers/api3-inventario.controller.js";
import { validarCreacion, validarEntradaYSalida } from "../middlewares/validaciones.middleware.js";

const router = Router();

router.get("/", obtenerProductos);
router.post("/", validarCreacion, crearProducto);
router.post("/:id/entrada", validarEntradaYSalida, procesarEntrada);
router.post("/:id/salida", validarEntradaYSalida, procesarSalida);
router.get("/alertas", obtenerProductosBajoStock);

export default router;