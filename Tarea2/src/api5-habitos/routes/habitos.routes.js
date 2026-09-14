import Router from "express";
import { completarHabito, crearHabito, eliminarHabito, obtenerEstadistica, obtenerHabitos } from "../controllers/api5-habitos.controller.js";
import { validarCamposPost } from "../middlewares/validaciones.middleware.js";

const router = Router();

router.post("/", validarCamposPost, crearHabito);
router.get("/", obtenerHabitos);
router.post("/:id/registrar", completarHabito);
router.get("/:id/estadisticas", obtenerEstadistica);
router.delete("/:id", eliminarHabito);

export default router;