import { Router } from "express";
import { crearServicio, editarServicio, eliminarServicio, obtenerServicios, obtenerServiciosById } from "../controllers/serviciosController.js";
import { soloAdmin } from "../middlewares/esAdmin.js";
import { validarCreacionYEdicionServicio, validarId } from "../middlewares/validaciones.js";

const router = Router();

router.get("/", obtenerServicios);
router.get("/:id", validarId, obtenerServiciosById);
router.post("/", soloAdmin, validarCreacionYEdicionServicio, crearServicio);
router.put("/:id", soloAdmin, validarCreacionYEdicionServicio, validarId, editarServicio);
router.delete("/:id", soloAdmin, validarId, eliminarServicio);

export default router;