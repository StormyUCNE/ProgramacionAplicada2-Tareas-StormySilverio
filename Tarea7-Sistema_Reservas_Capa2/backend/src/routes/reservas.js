import {Router} from 'express'
import { changeEstado, createReserva, deleteReserva, getMisReservas, getReservasAdmin } from '../controllers/reservasController.js';
import { soloAdmin } from '../middlewares/esAdmin.js';
import { validarId, validarReservacion } from '../middlewares/validaciones.js';

const router = Router();

router.post("/", validarReservacion, createReserva);
router.get("/mis-reservas", getMisReservas);
router.get("/", soloAdmin, getReservasAdmin);
router.put("/:id/estado", validarId, soloAdmin, changeEstado);
router.delete("/:id", validarId, deleteReserva);

export default router;