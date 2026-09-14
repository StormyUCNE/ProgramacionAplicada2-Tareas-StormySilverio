export const validarEncuestaPost = (req, res, next) => {
  if (!req.body.pregunta)
    return res.status(400).json({ error: "La encuenta debe de tener una Pregunta" });
  if (typeof req.body.pregunta !== "string")
    return res.status(400).json({ error: "La pregunta de la encuesta debe ser una cadena" });
  if (!Array.isArray(req.body.opciones) || req.body.opciones.length < 2)
    return res.status(400).json({error: "La encuenta debe de tener un arreglo con al menos 2 opciones"});
  if (req.body.opciones.some((o) => !o.opcion))
    return res.status(400).json({ error: "Todas las opciones deben de tener un valor" });
  next();
};
export const validarVoto = (req, res, next) => {
  if (!req.body.opcion)
    return res.status(400).json({ error: "El voto debe de incluir una opción" });
  next();
};