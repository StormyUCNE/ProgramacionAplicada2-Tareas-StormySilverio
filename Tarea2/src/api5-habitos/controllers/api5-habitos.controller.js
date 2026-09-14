import {prisma} from "../../db.js"

export const crearHabito = async(req, res)=>{
    try{
        const {nombre, meta} = req.body;
        const nuevoHabito = await prisma.habito.create({data:{nombre, meta}});
        return res.status(201).json(nuevoHabito);
    }catch(error){
        console.log("Error al crear hábito", error);
        return res.status(500).json({ error: "Error interno del servidor al crear hábito" });
    }
}

export const obtenerHabitos = async(req, res)=>{
    try{
        const habitos = await prisma.habito.findMany({include:{registros: true}});
        return res.json(habitos);
    }catch(error){
        console.log("Error al listar hábitos", error);
        return res.status(500).json({ error: "Error interno del servidor al listar hábitos" });
    }
}

export const completarHabito = async(req, res)=>{
    try{
        const id = parseInt(req.params.id);
        if(isNaN(id))
            return res.status(400).json({ error: "El parámetro ID debe de ser un número entero válido" });

        const existe = await prisma.habito.findUnique({where: {id: id}, include: {registros: true}});

        if(!existe)
            return res.status(404).json({ error: "El hábito no se encontró" });

        const {fecha} = req.body;

        const esMismoDiaRegistro = existe.registros.find(r => new Date(r.fecha).toLocaleDateString() === new Date().toLocaleDateString());

        if(esMismoDiaRegistro)
            return res.status(400).json({ error: "No puedes registrar el mismo hábito dos veces en el mismo día" });
        const nuevoRegistro = await prisma.registroHabito.create({data: {habitoId: existe.id, fecha: fecha}});
        return res.json(nuevoRegistro);
    }catch(error){
        console.log("Error al completar hábito", error);
        return res.status(500).json({ error: "Error interno del servidor al completar hábito" });
    }
}

export const obtenerEstadistica = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ error: "El parámetro ID debe de ser un número entero válido" });

        const existe = await prisma.habito.findUnique({
            where: { id: id },
            include: { registros: { orderBy: { fecha: "asc" } } }
        });

        if (!existe)
            return res.status(404).json({ error: "El hábito no se encontró" });

        const registros = existe.registros;
        if (registros.length === 0) {
            return res.status(404).json({error: "No hay registros todavía"});
        }

        let rachaTemp = 1;
        let mejorRacha = 1;

        for (let i = 1; i < registros.length; i++) {
            const fechaActual = new Date(registros[i].fecha);
            const fechaAnterior = new Date(registros[i - 1].fecha);
            const difDias = Math.round((
                new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate()) -
                new Date(fechaAnterior.getFullYear(), fechaAnterior.getMonth(), fechaAnterior.getDate())
            ) / (1000 * 60 * 60 * 24));

            if (difDias === 1) {
                rachaTemp += 1;
            } else {
                rachaTemp = 1;
            }
            mejorRacha = Math.max(mejorRacha, rachaTemp);
        }

        const hoyRaw = new Date();
        const hoy = new Date(hoyRaw.getFullYear(), hoyRaw.getMonth(), hoyRaw.getDate());

        const primeraFechaRaw = new Date(registros[0].fecha);
        const primeraFecha = new Date(primeraFechaRaw.getFullYear(), primeraFechaRaw.getMonth(), primeraFechaRaw.getDate());

        const ultimaFechaRaw = new Date(registros[registros.length - 1].fecha);
        const ultimaFecha = new Date(ultimaFechaRaw.getFullYear(), ultimaFechaRaw.getMonth(), ultimaFechaRaw.getDate());

        const difUltimaFechaHoy = Math.round((hoy - ultimaFecha) / (1000 * 60 * 60 * 24));
        const difPrimeraFechaHoy = Math.round((hoy - primeraFecha) / (1000 * 60 * 60 * 24)) + 1;
        let rachaActual = (difUltimaFechaHoy <= 1) ? rachaTemp : 0;

        const porcentajeDiasCumplidos = (registros.length / difPrimeraFechaHoy * 100).toFixed(0).concat("%");
        return res.json({ rachaActual, mejorRacha, porcentaje: porcentajeDiasCumplidos });
    } catch (error) {
        console.log("Error al obtener estadisticas", error);
        return res.status(500).json({ error: "Error interno del servidor al obtener estadisticas" });
    }
};

export const eliminarHabito = async(req, res)=>{
    try{
        const id = parseInt(req.params.id);
        if (isNaN(id))
            return res.status(400).json({ error: "El parámetro ID debe de ser un número entero válido" });

        const existe = await prisma.habito.findUnique({
            where: { id: id }
        });

        if (!existe)
            return res.status(404).json({ error: "El hábito no se encontró" });

        await prisma.habito.delete({where:{id: existe.id}});
        return res.json({message: "Hábito Eliminado"});
    }catch(error){
        console.log("Error al eliminar hábito", error);
        return res.status(500).json({ error: "Error interno del servidor al eliminar hábito" });
    }
}