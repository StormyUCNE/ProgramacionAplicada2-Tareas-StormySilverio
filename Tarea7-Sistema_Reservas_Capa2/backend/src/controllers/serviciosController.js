import {prisma} from '../db.js'

export const obtenerServicios = async(req, res, next)=>{
    try {
        const servicios = await prisma.servicio.findMany();
        return res.json({servicios});
    } catch (error) {
        next(error);
    }
}

export const crearServicio = async(req, res, next)=>{
    try {
        const {nombre, descripcion, duracion, precio} = req.body;
        const servicio = await prisma.servicio.create({data: {nombre, descripcion, duracion, precio}});
        return res.json({servicio});
    } catch (error) {
        next(error);
    }
}

export const editarServicio = async(req, res, next)=>{
    try {
        const id = parseInt(req.params.id);
        const existe = await prisma.servicio.findUnique({where: {id}});
        if(!existe)
            return res.status(404).json({error: "Servicio no se encontró"});
        const {nombre, descripcion, duracion, precio} = req.body;
        const servicioActualizado = await prisma.servicio.update({where: {id}, data:{nombre, descripcion, duracion, precio}});
        return res.json({servicioActualizado});
    } catch (error) {
        next(error);
    }
}

export const eliminarServicio = async(req, res, next)=>{
    try {
        const id = parseInt(req.params.id);
        const existe = await prisma.servicio.findUnique({where: {id}});
        if(!existe)
            return res.status(404).json({error: "Servicio no se encontró"});
        await prisma.servicio.delete({where: {id}});
        return res.json({message: "Servicio eliminado"});
    } catch (error) {
        next(error);
    }
}