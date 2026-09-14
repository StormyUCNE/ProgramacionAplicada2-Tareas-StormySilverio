export const validarCreacionTurno =(req, res, next)=>{
    if(!req.body.cliente || !req.body.servicio)
        return res.status(400).json({error: "EL cliente y el servicio son campos requeridos"});
    if(typeof req.body.cliente !== "string" || typeof req.body.servicio !== "string")
        return res.status(400).json({error: "EL cliente y el servicio deben ser cadena"});
    next();
}