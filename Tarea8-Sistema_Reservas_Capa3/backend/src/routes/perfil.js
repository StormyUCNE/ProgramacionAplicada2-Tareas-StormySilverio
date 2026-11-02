import {Router} from 'express'
import { getPerfil, updatePerfil } from '../controllers/perfilController.js';
import { validarEdicionPerfil } from '../middlewares/validaciones.js';

const router = Router();
router.put("/perfil", validarEdicionPerfil, updatePerfil);
router.get("/perfil", validarEdicionPerfil, getPerfil);
export default router;