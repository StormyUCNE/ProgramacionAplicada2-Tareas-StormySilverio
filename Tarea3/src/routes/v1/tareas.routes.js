import { Router } from "express"
import { getTareasPublicas, createTareaPublica } from "../../controllers/v1/tareas.controller.js"
import { validarRegistroTareaPublica } from "../../middlewares/validaciones.middleware.js"

const router = Router()

router.get("/", getTareasPublicas)
router.post("/", validarRegistroTareaPublica, createTareaPublica)

export default router;