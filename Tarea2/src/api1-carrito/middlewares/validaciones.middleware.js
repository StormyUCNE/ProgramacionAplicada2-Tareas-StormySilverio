export const validarCamposPost = (req, res, next) => {
  if (!req.body.nombre || !req.body.precio || !req.body.cantidad)
    return res.status(400).json({error: "El nombre, el precio y la cantidad son campos requeridos"});
  if (typeof req.body.nombre !== "string")
    return res.status(400).json({ error: "El nombre debe de ser una cadena"});
  if (typeof req.body.precio === "string" || typeof req.body.cantidad === "string")
    return res.status(400).json({ error: "El precio y la cantidad deben de ser números" });
  if (req.body.precio < 1 || req.body.cantidad < 1)
    return res.status(400).json({ error: "El precio y la cantidad deben de ser positivos" });
  next();
};

export const validarCantidadPut = (req, res, next) => {
  if (!req.body.cantidad)
    return res.status(400).json({ error: "La cantidad es un campo requerido" });
  if (typeof req.body.cantidad !== "number")
    return res.status(400).json({ error: "La cantidad deben de ser números" });
  if (req.body.cantidad < 1)
    return res.status(400).json({ error: "La cantidad debe de ser positiva" });
  next();
};

export const validarDescuento = (req, res, next) => {
  if (!req.body.porcentaje)
    return res.status(400).json({ error: "El porcentaje es un campo requerido" });
  if (typeof req.body.porcentaje !== "number")
    return res.status(400).json({ error: "El porcentaje debe de ser número" });
  if (req.body.porcentaje > 50)
    return res.status(400).json({ error: "El porcentaje Máximo es de 50%" });
  if (req.body.porcentaje < 1)
    return res.status(400).json({ error: "El porcentaje debe de ser positivo y mayor a cero" });
  next();
};