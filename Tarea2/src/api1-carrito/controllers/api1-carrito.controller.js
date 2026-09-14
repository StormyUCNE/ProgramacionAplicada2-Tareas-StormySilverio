import { prisma } from "../../db.js";

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await prisma.carrito.findMany();
    return res.json(productos);
  } catch (error) {
    console.log("Error al obtener productos", error);
    return res.status(500).json({ error: "Error interno del servidor al consultar los productos" });
  }
};

export const agregarProducto = async (req, res) => {
  try {
    const { nombre, precio, cantidad } = req.body;
    const existente = await prisma.carrito.findFirst({
      where: {
        nombre: {
          equals: nombre.trim(),
          mode: "insensitive"
        }
      }
    });
    if (!existente) {
      const nuevoProducto = await prisma.carrito.create({data: {nombre: nombre, precio: precio, cantidad: cantidad}});
      return res.status(201).json(nuevoProducto);
    } else {
      const productoActualizado = await prisma.carrito.update({
        where: {id: existente.id},
        data:{cantidad: existente.cantidad + cantidad}
      });
      return res.json(productoActualizado);
    }
  } catch (error) {
    console.log("Error al agregar producto", error);
    return res.status(500).json({ error: "Error interno del servidor al agregar producto" });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ error: "El parámetro ID debe de ser un número entero válido" });

    const productoExiste = await prisma.carrito.findUnique({ where: { id } });
    if (!productoExiste)
      return res.status(404).json({ error: "No se encontró el producto" });
    const { cantidad } = req.body;
    const productoactualizado = await prisma.carrito.update({
      where: { id },
      data: {
        ...(cantidad !== undefined && { cantidad }),
      },
    });
    return res.json(productoactualizado);
  } catch (error) {
    console.log("Error al actualizar producto", error);
    res.status(500).json({ error: "Error interno del servidor al actualizar el producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id))
      return res.status(400).json({ error: "El parámetro ID debe de ser un número entero válido" });

    const productoExiste = await prisma.carrito.findUnique({ where: { id } });
    if (!productoExiste)
      return res.status(404).json({ error: "No se encontró el producto" });

    await prisma.carrito.delete({ where: { id } });
    return res.json({ message: "Producto Eliminado" });
  } catch (error) {
    console.log("Error al eliminar producto", error);
    return res.status(500).json({ error: "Error interno del servidor al eliminar el producto" });
  }
};

export const obtenerTotal = async (req, res) => {
  try {
    const total = (await prisma.carrito.findMany()).reduce(
      (acumulador, p) => acumulador + p.cantidad * p.precio,
      0,
    );
    return res.json({ total: total });
  } catch (error) {
    console.log("Error al obtener total", error);
    return res.status(500).json({ error: "Error interno del servidor al obtener el total" });
  }
};

export const aplicarDescuento = async (req, res) => {
  try {
    const { porcentaje } = req.body;
    const total = (await prisma.carrito.findMany()).reduce(
      (acumulador, p) => acumulador + p.cantidad * p.precio,
      0,
    );
    const totalConDescuento = total - (total * (porcentaje / 100));
    return res.json({ total: totalConDescuento });
  } catch (error) {
    console.log("Error al obtener total", error);
    return res.status(500).json({ error: "Error interno del servidor al obtener el total" });
  }
};