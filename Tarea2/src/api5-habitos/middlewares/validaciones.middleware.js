export const validarCamposPost = (req, res, next)=>{
    if(!req.body.nombre || !req.body.meta)
        return res.status(400).json({ error: "El nombre y la meta son campos requeridos" });
    if (typeof req.body.nombre !== "string" || typeof req.body.meta !== "string")
        return res.status(400).json({ error: "El nombre y la meta deben ser una cadena" });
    next();
}