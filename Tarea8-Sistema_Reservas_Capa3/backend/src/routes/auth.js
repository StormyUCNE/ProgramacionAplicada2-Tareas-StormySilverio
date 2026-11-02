import {Router} from "express"
import { validarLogin, validarRegistro } from "../middlewares/validaciones.js";
import { login, registro } from "../controllers/authController.js";

const router = Router();

router.post("/registro", validarRegistro, registro);
router.post("/login", validarLogin, login);

export default router;