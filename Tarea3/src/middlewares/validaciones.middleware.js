export const validarRegistro = (req, res, next)=>{
    if(!req.body.nombre || !req.body.email || !req.body.password)
        return res.status(400).json({error:"nombre, email y password son campos requeridos"});
    next();
}

export const validarLogin = (req, res, next)=>{
    if(!req.body.email && !req.body.password)
        return res.status(400).json({error:"email y password son campos requeridos"});
    next();
}

export const validarRegistroTareaPublica = (req, res, next)=>{
    if(!req.body.titulo)
        return res.status(400).json({error:"titulo es un campo requerido"});
    next();
}