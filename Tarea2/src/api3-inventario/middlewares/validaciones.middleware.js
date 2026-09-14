export const validarCreacion =(req, res, next)=>{
    if(!req.body.producto || req.body.stock === undefined)
        return res.status(400).json({error: "Producto y stock son campos requeridos"});
    if(typeof req.body.producto !== "string")
        return res.status(400).json({error: "Producto debe de ser una cadena"});
    if(typeof req.body.stock !== "number" || typeof req.body.stockMinimo === "number")
        return res.status(400).json({error: "El stock y el stock mínimo deben ser números"});
    if(req.body.stock < 0 || req.body.stockMinimo < 0)
        return res.status(400).json({error: "El stock y el stock mínimo deben ser números positivos"});
    next();
}
export const validarEntradaYSalida =(req, res, next)=>{
    if(!req.body.cantidad)
        return res.status(400).json({error: "La cantidad es un campos requerido"});
    if(typeof req.body.cantidad !== "number")
        return res.status(400).json({error: "La cantidad debe ser un número"});
    if(req.body.cantidad < 1)
        return res.status(400).json({error: "La cantidad debe ser mayor a 0"});
    next();
}