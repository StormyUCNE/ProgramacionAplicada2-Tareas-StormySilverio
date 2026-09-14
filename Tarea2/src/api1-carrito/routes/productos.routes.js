import { Router } from "express";
import { actualizarProducto, agregarProducto, eliminarProducto, obtenerProductos } from "../controllers/api1-carrito.controller.js";
import { validarCamposPost, validarCantidadPut, validarDescuento } from "../middlewares/validaciones.middleware.js";

const router = Router();

router.get("/", obtenerProductos);
router.post("/", validarCamposPost, agregarProducto);
router.put("/:id", validarCantidadPut, actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;
