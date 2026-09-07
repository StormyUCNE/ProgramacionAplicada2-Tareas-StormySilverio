const express = require("express");
const app = express();
app.use(express.json());
app.listen(3000, () => console.log("Servidor Corriendo en Puerto 3000"));

const encuestas = [
  {
    id: 1,
    pregunta: "¿CUÁL ES LA MEJOR CARRERA?",
    opciones: [
      {
        opcion: "MEDICINA",
        voto: 0,
      },
      {
        opcion: "ODONTOLOGIA",
        voto: 0,
      },
    ],
  },
];

let nextId = 2;

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const validarEncuestaPost = (req, res, next) => {
  if (!req.body.pregunta)
    return res
      .status(400)
      .json({ error: "La encuenta debe de tener una Pregunta" });
  if (typeof req.body.pregunta !== "string")
    return res
      .status(400)
      .json({ error: "La pregunta de la encuesta debe ser una cadena" });
  if (!Array.isArray(req.body.opciones) || req.body.opciones.length < 2)
    return res
      .status(400)
      .json({
        error: "La encuenta debe de tener un arreglo con al menos 2 opciones",
      });
  if (req.body.opciones.some((o) => !o.opcion))
    return res
      .status(400)
      .json({ error: "Todas las opciones deben de tener un valor" });
  next();
};
const validarVoto = (req, res, next) => {
  if (!req.body.opcion)
    return res
      .status(400)
      .json({ error: "El voto debe de incluir una opción" });
  next();
};

app.post("/encuestas", validarEncuestaPost, (req, res) => {
  const { pregunta, opciones } = req.body;
  const nuevaEncuesta = {
    id: nextId++,
    pregunta: pregunta,
    opciones: opciones.map((o) => ({ opcion: o.opcion, voto: 0 })),
  };
  encuestas.push(nuevaEncuesta);
  return res.status(201).json(nuevaEncuesta);
});

app.get("/encuestas", (req, res) => {
  res.json(encuestas);
});

app.post("/encuestas/:id/votar", validarVoto, (req, res) => {
  const { opcion } = req.body;
  const encuestaABuscar = encuestas.find(
    (e) => e.id === parseInt(req.params.id),
  );
  if (encuestaABuscar === undefined)
    return res.status(404).json({ error: "No se encontro la encuesta" });
  const existeOpcion = encuestaABuscar.opciones.find(
    (o) => o.opcion.toLowerCase() === opcion.toLowerCase(),
  );
  if (!existeOpcion)
    return res
      .status(400)
      .json({
        error:
          "Opción no valida, debe de elegir una opcion que exista en la encuesta",
      });
  existeOpcion.voto++;
  return res.json(encuestaABuscar);
});

app.get("/encuestas/:id/resultados", (req, res) => {
  const encuestaABuscar = encuestas.find(
    (e) => e.id === parseInt(req.params.id),
  );
  if (encuestaABuscar === undefined)
    return res.status(404).json({ error: "No se encontro la encuesta" });
  const votoMax = Math.max(...encuestaABuscar.opciones.map((o) => o.voto));
  const totalVotos = encuestaABuscar.opciones.reduce(
    (acumulador, v) => acumulador + v.voto,
    0,
  );
  let opcionGanadora;
  if (totalVotos === 0) opcionGanadora = "No hay votos aún";
  else {
    const ganadores = encuestaABuscar.opciones
      .filter((o) => o.voto === votoMax)
      .map((o) => o.opcion);
    opcionGanadora =
      ganadores.length > 1 ? ganadores.join(" y ") : ganadores[0];
  }
  const resultados = encuestaABuscar.opciones.map((o) => ({
    opcion: o.opcion,
    voto: o.voto,
    porcentaje:
      totalVotos < 1 ? 0 + "%" : ((o.voto / totalVotos) * 100).toFixed(2) + "%",
  }));
  return res.json({ resultados: resultados, ganando: opcionGanadora });
});

app.delete("/encuestas/:id", (req, res) => {
  const index = encuestas.findIndex((e) => e.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ error: "No se encontro la encuesta" });
  encuestas.splice(index, 1);
  return res.json({ message: "Encuesta Eliminada" });
});
