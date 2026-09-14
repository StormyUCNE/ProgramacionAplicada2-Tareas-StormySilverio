import {prisma} from "../../db.js"
export const crearTurno = async(req, res)=>{
    try{
        const {cliente, servicio} = req.body;
        const nuevoTurno = await prisma.turno.create({data:{cliente, servicio}});
        return res.status(201).json(nuevoTurno);
    }catch(error){
        console.log("Error al crear turno", error);
        return res.status(500).json({ error: "Error interno del servidor al crear turno" });
    }
}

export const obtenerTurnos = async(req, res)=>{
    try{
        const turnos = await prisma.turno.findMany();
        return res.json(turnos);
    }catch(error){
        console.log("Error al listar turnos", error);
        return res.status(500).json({ error: "Error interno del servidor al crear turno" });
    }
}

export const verProximo = async(req, res)=>{
    try{
        const proximoTurno = await prisma.turno.findFirst({where:{estado:"esperando"}, orderBy:{id: "asc"}});
        if(!proximoTurno)
            return res.status(404).json({error: "No hay más turnos"});
        return res.json(proximoTurno);
    }catch(error){
        console.log("Error al buscar turno siguiente", error);
        return res.status(500).json({ error: "Error interno del servidor al buscar turno siguiente" });
    }
}
export const llamarTurno = async(req, res)=>{
    try{
        const existeAtendiendo = await prisma.turno.findFirst({where:{estado: "atendiendo"}});
        if(existeAtendiendo)
            return res.status(400).json({error: "No puede llamar aún atendiendo a un cliente"});
        const proximoTurno = await prisma.turno.findFirst({where:{estado: "esperando"}, orderBy:{id:"asc"}});
        if(!proximoTurno)
            return res.status(404).json({error: "No hay más turnos"});
        const turnoModificado = await prisma.turno.update({where:{id: proximoTurno.id}, data:{estado: "atendiendo"}});
        return res.json(turnoModificado);
    }catch(error){
        console.log("Error al llamar turno", error);
        return res.status(500).json({ error: "Error interno del servidor al llamar turno" });
    }
}

export const finalizarTurno = async(req, res)=>{
    try{
        const id = parseInt(req.params.id);

        if(isNaN(id))
            return res.status(400).json({ error: "El parámetro ID debe de ser un número entero válido" });

        const turnoActual = await prisma.turno.findUnique({where:{id:id}});

        if(!turnoActual)
            return res.status(404).json({ error: "El Turno no se encontró" });

        if(turnoActual.estado != "atendiendo")
            return res.status(400).json({ error: "El Turno no puede ser finalizado sin ser atendido" });
        const turnoModificado = await prisma.turno.update({where:{id: turnoActual.id}, data:{estado: "finalizado"}});
        return res.json(turnoModificado);
    }catch(error){
        console.log("Error al finalizar turno", error);
        return res.status(500).json({ error: "Error interno del servidor al finalizar turno" });
    }
}

export const obtenerTurnosEspera = async(req, res)=>{
    try{
        const turnosEspera = await prisma.turno.count({where:{estado:"esperando"}});
        return res.json({esperando: turnosEspera});
    }catch(error){
        console.log("Error al listar turnos en espera", error);
        return res.status(500).json({ error: "Error interno del servidor al listar turnos en espera" });
    }
}