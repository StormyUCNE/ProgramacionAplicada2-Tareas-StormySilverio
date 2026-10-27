import { prisma } from "../db.js";

export const createReserva = async (req, res, next) => {
  try {
    const { fecha, hora, servicioId } = req.body;
    const fechaReserva = new Date(fecha);
    fechaReserva.setHours(0, 0, 0, 0);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaReserva < hoy)
      return res
        .status(400)
        .json({ error: "No se puede reservar una fecha pasada" });
    const reserva = await prisma.reserva.create({
      data: { fecha, hora, servicioId, usuarioId: req.usuario.id },
    });
    return res.status(201).json({ reserva });
  } catch (error) {
    next(error);
  }
};

export const getMisReservas = async (req, res, next) => {
  try {
    const reservas = await prisma.reserva.findMany({where:{usuarioId: req.usuario.id}, include:{servicio: true}});
    return res.json({reservas});
  } catch (error) {
    next(error);
  }
};

export const getReservasAdmin = async (req, res, next) => {
  try {
    const reservas = await prisma.reserva.findMany({include:{servicio: true}});
    return res.json({reservas});
  } catch (error) {
    next(error);
  }
};

export const changeEstado = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const existeReserva = await prisma.reserva.findUnique({where:{id}});
    if(!existeReserva)
        return res.status(404).json({error:"Reserva no encontrada"});
    if(existeReserva.estado !== "pendiente")
      return res.status(400).json({error:"Solo se pueden completar reservas pendientes"});
    const reservaActualizada = await prisma.reserva.update({where: {id}, data:{estado: "completada"}});
    return res.json({reservaActualizada});
  } catch (error) {
    next(error);
  }
};

export const deleteReserva = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const existeReserva = await prisma.reserva.findUnique({where:{id}});
    if(!existeReserva)
        return res.status(404).json({error:"Reserva no encontrada"});
    if(existeReserva.estado !== "pendiente")
      return res.status(400).json({error:"Solo se pueden cancelar reservas pendientes"});
    const reservaActualizada = await prisma.reserva.update({where: {id}, data:{estado: "cancelada"}});
    return res.json({reservaActualizada});
  } catch (error) {
    next(error);
  }
};