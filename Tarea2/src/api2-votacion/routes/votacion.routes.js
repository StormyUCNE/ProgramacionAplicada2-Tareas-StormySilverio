import Router from 'express';
import { crearEncuesta, eliminarEncuesta, listarEncuestas, obtenerResultados, registrarVoto } from '../controllers/api2-votacion.controller.js';
import { validarEncuestaPost, validarVoto } from '../middlewares/validaciones.middleware.js';

const router = Router();

router.post("/", validarEncuestaPost, crearEncuesta);
router.get("/", listarEncuestas);
router.post("/:id/votar", validarVoto, registrarVoto);
router.get("/:id/resultados", obtenerResultados);
router.delete("/:id", eliminarEncuesta);

export default router;