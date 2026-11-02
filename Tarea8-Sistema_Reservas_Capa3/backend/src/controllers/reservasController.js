import { prisma } from "../db.js";

export const createReserva = async (req, res, next) => {
  try {
    const { fecha, hora, servicioId } = req.body;
    const fechaReserva = new Date(fecha);
    fechaReserva.setHours(0, 0, 0, 0);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaReserva <= hoy)
      return res
        .status(400)
        .json({
          error: "Debes reservar en una fecha futura, posterior a la de hoy",
        });
    const fechaInicio = new Date(fecha);
    fechaInicio.setHours(0, 0, 0, 0);

    const fechaFin = new Date(fechaInicio);
    fechaFin.setDate(fechaFin.getDate() + 1);
    const existeReservaConFechaIgual = await prisma.reserva.findFirst({
      where: { servicioId: servicioId, usuarioId: req.usuario.id, fecha:{gte: fechaInicio, lt: fechaFin}, estado: "pendiente" },
    });
    if (existeReservaConFechaIgual) {
        return res
          .status(409)
          .json({ error: "No puede reservar un servicio en la misma fecha" });
    }
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
    const reservas = await prisma.reserva.findMany({
      where: { usuarioId: req.usuario.id },
      include: { servicio: true },
    });
    return res.json({ reservas });
  } catch (error) {
    next(error);
  }
};

export const getReservasAdmin = async (req, res, next) => {
  try {
    const reservas = await prisma.reserva.findMany({
      include: { servicio: true },
    });
    return res.json({ reservas });
  } catch (error) {
    next(error);
  }
};

export const changeEstado = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const existeReserva = await prisma.reserva.findUnique({ where: { id } });
    if (!existeReserva)
      return res.status(404).json({ error: "Reserva no encontrada" });
    if (existeReserva.estado !== "pendiente")
      return res
        .status(400)
        .json({ error: "Solo se pueden completar reservas pendientes" });
    const reservaActualizada = await prisma.reserva.update({
      where: { id },
      data: { estado: "completada" },
    });
    return res.json({ reservaActualizada });
  } catch (error) {
    next(error);
  }
};

export const deleteReserva = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const existeReserva = await prisma.reserva.findUnique({ where: { id } });
    if (!existeReserva)
      return res.status(404).json({ error: "Reserva no encontrada" });
    if (existeReserva.estado !== "pendiente")
      return res
        .status(400)
        .json({ error: "Solo se pueden cancelar reservas pendientes" });
    const reservaActualizada = await prisma.reserva.update({
      where: { id },
      data: { estado: "cancelada" },
    });
    return res.json({ reservaActualizada });
  } catch (error) {
    next(error);
  }
};
