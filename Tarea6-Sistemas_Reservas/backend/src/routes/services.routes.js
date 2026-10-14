import { Router } from "express";
import { crearServicio, editarServicio, eliminarServicio, obtenerServicios } from "../controllers/services.controller.js";
import { soloAdmin } from "../middlewares/auth.middleware.js";
import { validarCreacionYEdicionServicio, validarId } from "../middlewares/validaciones.middleware.js";


const router = Router();

router.get("/", obtenerServicios);
router.post("/", soloAdmin, validarCreacionYEdicionServicio, crearServicio);
router.put("/:id", soloAdmin, validarCreacionYEdicionServicio, validarId, editarServicio);
router.delete("/:id", soloAdmin, validarId, eliminarServicio);

export default router;