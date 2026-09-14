import Router from "express";
import { crearTurno, finalizarTurno, llamarTurno, obtenerTurnos, obtenerTurnosEspera, verProximo } from "../controllers/api4-turnos.controller.js";
import { validarCreacionTurno } from "../middlewares/validaciones.middleware.js";
const router = Router();

router.post("/", validarCreacionTurno, crearTurno);
router.get("/", obtenerTurnos);
router.get("/siguiente", verProximo);
router.put("/llamar", llamarTurno);
router.put("/:id/finalizar", finalizarTurno);
router.get("/espera", obtenerTurnosEspera);

export default router;