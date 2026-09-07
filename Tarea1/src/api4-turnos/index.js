const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000, () => console.log("Servidor Corriendo en Puerto 3000"));

const turnos =[
    {
        "id": 1,
        "cliente": "Stormy",
        "servicio": "Retiro de Carnet Estudiantil",
        "estado": "esperando"
    }
]
let nextId = 2;

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const validarCreacionTurno =(req, res, next)=>{
    if(!req.body.cliente || !req.body.servicio)
        return res.status(400).json({error: "EL cliente y el servicio son campos requeridos"});
    if(typeof req.body.cliente !== "string" || typeof req.body.servicio !== "string")
        return res.status(400).json({error: "EL cliente y el servicio deben ser cadena"});
    next();
}

app.post('/turnos', validarCreacionTurno, (req, res)=>{
    const {cliente, servicio} = req.body;
    const newTurno = {id: nextId++, cliente: cliente, servicio: servicio, estado: "esperando"}
    turnos.push(newTurno);
    return res.status(201).json(newTurno);
})

app.get('/turnos', (req, res)=>{
    return res.json(turnos);
})

app.get('/turnos/siguiente', (req, res)=>{
    const siguiente = turnos.find(t => t.estado === "esperando");
    if(!siguiente)
        return res.status(404).json({error: "Se acabaron los turnos"});
    return res.json(siguiente);
})

app.put('/turnos/llamar', (req, res)=>{
    const existeTurnoAtendiendo = turnos.find(t => t.estado === "atendiendo");
    const existeEsperando = turnos.find(t => t.estado === "esperando");
    if(existeTurnoAtendiendo)
        return res.status(400).json({error: "Solo puede haber un turno atendiendo a la vez"});
    if(!existeEsperando)
        return res.status(404).json({error: "No existen turnos en espera"});
    existeEsperando.estado = "atendiendo";
    return res.json(existeEsperando);
})

app.put('/turnos/:id/finalizar', (req, res)=>{
    const turnoActual = turnos.find(t => t.id === parseInt(req.params.id));
    if(!turnoActual)
        return res.status(404).json({error: "Turno no encontrado"});
    if(turnoActual.estado !== "atendiendo")
        return res.status(400).json({error: "Turno no está siendo atendido para finalizarlo"});
    turnoActual.estado = "finalizado";
    return res.json(turnoActual);
})

app.get('/turnos/espera', (req, res)=>{
    const turnosEspera = turnos.filter(t => t.estado === "esperando").length;
    return res.json({totalEsperando: turnosEspera});
})