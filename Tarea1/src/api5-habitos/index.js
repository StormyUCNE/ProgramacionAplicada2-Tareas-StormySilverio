const express = require("express");
const app = express();
app.use(express.json());
app.listen(3000, () => console.log("Servidor Corriendo en Puerto 3000"));

const habitos = [
  {
    id: 1,
    nombre: "Cerveza",
    meta: "Beber una caja de Presidente",
    registros: [
      {
        fecha: "2026-08-25",
        completado: true,
      },
      {
        fecha: "2026-08-26",
        completado: true,
      },
      {
        fecha: "2026-08-29",
        completado: true,
      },
      {
        fecha: "2026-08-31",
        completado: true,
      },
      {
        fecha: "2026-09-01",
        completado: true,
      },
    ],
  },
];
let nextId = 2;

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/habitos", (req, res) => {
  res.json(habitos);
});

app.post("/habitos", (req, res) => {
  const { nombre, meta } = req.body;
  const nuevoHabito = {
    id: nextId++,
    nombre: nombre,
    meta: meta,
    registros: [],
  };
  habitos.push(nuevoHabito);
  return res.status(201).json(nuevoHabito);
});

app.post("/habitos/:id/registrar", (req, res) => {
  const habito = habitos.find((h) => h.id === parseInt(req.params.id));
  if (!habito) return res.status(404).json({ error: "Habito no encontrado" });
  const existFechaMismoDia = habito.registros.find((r) => r.fecha === new Date().toLocaleDateString('sv-SE'));
  if (existFechaMismoDia)
    return res.status(400).json({error: "No se puede registrar el mismo hábito dos veces en el mismo día"});
  const nuevoRegistro = { fecha: new Date().toLocaleDateString('sv-SE'), completado: true };
  habito.registros.push(nuevoRegistro);
  return res.status(201).json(habito);
});

app.get("/habitos/:id/estadisticas", (req, res) => {
  const habito = habitos.find((h) => h.id === parseInt(req.params.id));
  if (!habito) return res.status(404).json({ error: "Habito no encontrado" });
  if (habito.registros.length === 0)
    return res.status(404).json({ error: "No hay registros para la estadistica" });
  const fechasOrganizadas = habito.registros.sort((a, b) => {
    return new Date(a.fecha) - new Date(b.fecha);
  });
  let rachaContador = 1, rachaMayor = 1;
  for (let x = 1; x < fechasOrganizadas.length; x++) {
    const fechaAnterior = new Date(fechasOrganizadas[x - 1].fecha);
    const fechaActual = new Date(fechasOrganizadas[x].fecha);

    let diferencia = Math.round((fechaActual - fechaAnterior) / (1000 * 60 * 60 * 24));

    if (diferencia === 1) rachaContador++;
    else rachaContador = 1;
    rachaMayor = Math.max(rachaMayor, rachaContador);
  }

  const ultimaFecha = new Date(fechasOrganizadas[fechasOrganizadas.length - 1].fecha);
  const hoy = new Date(new Date().toLocaleDateString('sv-SE'));
  const diasDesdeUltimoRegistro = Math.round((hoy - ultimaFecha) / (1000 * 60 * 60 * 24));

  let rachaActual = (diasDesdeUltimoRegistro <=1) ? rachaContador : 0;

  const diferenciaFechas = (new Date(new Date().toLocaleDateString('sv-SE')) - new Date(fechasOrganizadas[0].fecha));
  const diasTranscurridosADias = Math.max(1, Math.round(diferenciaFechas / (1000 * 60 * 60 * 24)) + 1);
  const porcentajeDiasCumplidos = (fechasOrganizadas.length / diasTranscurridosADias) * 100;
  return res.json({
    rachaActual: rachaActual,
    rachaMayor: rachaMayor,
    diasCumplidos: Math.min(100, porcentajeDiasCumplidos).toFixed(0) + "%"
  });
});

app.delete("/habitos/:id", (req, res) => {
  const index = habitos.findIndex((h) => h.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ error: "Hábito no encontrado" });
  habitos.splice(index, 1);
  return res.json({ message: "Hábito Eliminado" });
});