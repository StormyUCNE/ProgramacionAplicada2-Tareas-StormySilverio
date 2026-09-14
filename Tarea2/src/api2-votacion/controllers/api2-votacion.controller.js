import { prisma } from "../../db.js";

export const crearEncuesta = async (req, res) => {
  try{
    const { pregunta, opciones } = req.body;
    const nuevaEncuesta = await prisma.encuesta.create({
      data: {
        pregunta: pregunta,
        opciones: {
          create: opciones.map((o) => ({
            opcion: o.opcion,
          })),
        },
      },
      include: {
        opciones: true,
      },
    });
    return res.status(201).json(nuevaEncuesta);
  }catch(error){
    console.log("Error al crear encuesta", error);
    return res.status(500).json({ error: "Error interno del servidor al crear encuesta" });
  }
};

export const listarEncuestas = async (req, res) => {
  try{
    const escuestas = await prisma.encuesta.findMany({
      include: {
        opciones: true,
      },
    });
    return res.json(escuestas);
  }catch(error){
    console.log("Error al listar encuestas", error);
    return res.status(500).json({ error: "Error interno del servidor al listar encuestas" });
  }
};

export const registrarVoto = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res
        .status(400)
        .json({ error: "El parámetro ID debe de ser un número entero válido" });

    const existe = await prisma.encuesta.findUnique({
      where: { id: id },
      include: { opciones: true },
    });

    if (!existe)
      return res.status(404).json({ error: "No se encontró la encuesta" });

    const { opcion } = req.body;
    const existeOpcion = existe.opciones.find(
      (o) => o.opcion.trim().toLowerCase() === opcion.trim().toLowerCase(),
    );

    if (!existeOpcion)
      return res
        .status(400)
        .json({
          error:
            "La opción de debe de ser una opción valida que esté en la encuesta",
        });

    const encuestaModificada = await prisma.opcion.update({
      where: { id: existeOpcion.id },
      data: {
        votos: { increment: 1 },
      },
    });
    return res.json(encuestaModificada);
  }catch(error){
    console.log("Error al registrar voto", error);
    return res.status(500).json({ error: "Error interno del servidor al registrar voto" });
  }
};

export const obtenerResultados = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res
        .status(400)
        .json({ error: "El parámetro ID debe de ser un número entero válido" });

    const existe = await prisma.encuesta.findUnique({
      where: { id: id },
      include: { opciones: { select: { opcion: true, votos: true } } },
    });

    if (!existe)
      return res.status(404).json({ error: "No se encontró la encuesta" });

    let opcionGanadora;
    const votoMax = Math.max(...existe.opciones.map((o) => o.votos));
    const opcionMayorVoto = existe.opciones.filter((o) => o.votos === votoMax);
    const totalVotos = existe.opciones.reduce(
      (acumulado, o) => acumulado + o.votos,
      0,
    );
    if (totalVotos === 0) opcionGanadora = "No hay Votos";
    else
      opcionGanadora =
        opcionMayorVoto > 1
          ? opcionMayorVoto.map((o) => o.opcion).join(", ")
          : opcionMayorVoto[0].opcion;

    const opciones = existe.opciones.map((o) => ({
      opcion: o.opcion,
      votos: o.votos,
      porcentaje:
        totalVotos === 0 ? "0%" : ((o.votos / totalVotos) * 100).toFixed(1) + "%",
    }));
    return res.json({ resultados: opciones, ganando: opcionGanadora });
  }catch(error){
    console.log("Error al obtener resultados", error);
    return res.status(500).json({ error: "Error interno del servidor al obtener resultados" });
  }
};

export const eliminarEncuesta = async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res
        .status(400)
        .json({ error: "El parámetro ID debe de ser un número entero válido" });

    const existe = await prisma.encuesta.findUnique({
      where: { id: id },
      include: { opciones: { select: { opcion: true, votos: true } } },
    });
    if (!existe)
      return res.status(404).json({ error: "No se encontró la encuesta" });

    await prisma.encuesta.delete({ where: { id: id } });
    return res.json({ message: "Encuesta Eliminada" });
  }catch(error){
    console.log("Error al eliminar producto", error);
    return res.status(500).json({ error: "Error interno del servidor al eliminar producto" });
  }
};