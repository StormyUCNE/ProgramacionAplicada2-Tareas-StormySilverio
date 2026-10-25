import {Router} from "express"
import { login, registro } from "../controllers/authController.js";
import { validarLogin, validarRegistro } from "../middlewares/validaciones.js";

const router = Router();

router.post("/registro", validarRegistro, registro);
router.post("/login", validarLogin, login);

export default router;