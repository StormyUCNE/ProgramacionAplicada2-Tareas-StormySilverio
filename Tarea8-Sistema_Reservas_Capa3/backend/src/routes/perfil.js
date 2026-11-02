import {Router} from 'express'
import { updatePerfil } from '../controllers/perfilController.js';
import { validarEdicionPerfil } from '../middlewares/validaciones.js';

const router = Router();
router.put("/perfil", validarEdicionPerfil, updatePerfil);

export default router;