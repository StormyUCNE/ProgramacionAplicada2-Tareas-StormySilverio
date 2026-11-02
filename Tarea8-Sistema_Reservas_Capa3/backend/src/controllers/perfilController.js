import { prisma } from "../db.js";

export const updatePerfil = async (req, res, next) => {
  try {
    const {nombre} = req.body;
    const usuario = await prisma.usuario.update({where:{id: req.usuario.id}, data:{nombre}});
    return res.json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol});
  } catch (error) {
    next(error);
  }
};
export const getPerfil = async (req, res, next) => {
  try {
    const usuario = await prisma.usuario.findUnique({where:{id: req.usuario.id}});
    return res.json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol});
  } catch (error) {
    next(error);
  }
};