import { prisma } from "../../db.js";
export const obtenerProductos = async(req, res)=>{
    try{
        const productos = await prisma.inventario.findMany();
        return res.json(productos);
    }catch(error){
        console.log("Error al listar productos", error);
        return res.status(500).json({ error: "Error interno del servidor al listar productos" });
    }
}

export const crearProducto = async(req, res)=>{
    try{
        const {producto, stock, stockMinimo} = req.body;
        const nuevoProducto = await prisma.inventario.create({
            data:{producto, stock, stockMinimo}
        });
        return res.status(201).json(nuevoProducto);
    }catch(error){
        console.log("Error al crear producto", error);
        return res.status(500).json({ error: "Error interno del servidor al crear producto" });
    }
}

export const procesarEntrada = async(req, res)=>{
    try{
        const id = parseInt(req.params.id);
        if(isNaN(id))
            return res.status(400).json({ error: "El parámetro ID debe de ser un número entero válido" });

        const existe = await prisma.inventario.findUnique({where: {id: id}});

        if(!existe)
            return res.status(404).json({ error: "No se encontró el producto" });

        const {cantidad} = req.body;
        const productoActualizado = await prisma.inventario.update({
            where:{id: existe.id},
            data:{
                stock: {increment: cantidad}
            }
        })
        return res.json(productoActualizado);
    }catch(error){
        console.log("Error al procesar entrada al stock", error);
        return res.status(500).json({ error: "Error interno del servidor al procesar entrada al stock" });
    }
}

export const procesarSalida = async(req, res)=>{
    try{
        const id = parseInt(req.params.id);
        if(isNaN(id))
            return res.status(400).json({ error: "El parámetro ID debe de ser un número entero válido" });

        const existe = await prisma.inventario.findUnique({where: {id: id}});

        if(!existe)
            return res.status(404).json({ error: "No se encontró el producto" });

        const {cantidad} = req.body;
        if(cantidad > existe.stock)
            return res.status(400).json({ error: "No hay suficiente stock para la salida" });
        const productoActualizado = await prisma.inventario.update({
            where:{id: existe.id},
            data:{
                stock: {decrement: cantidad}
            }
        });
        return res.json(productoActualizado);
    }catch(error){
        console.log("Error al procesar salida del stock", error);
        return res.status(500).json({ error: "Error interno del servidor al procesar salida del stock" });
    }
}

export const obtenerProductosBajoStock = async(req, res)=>{
    try{
        const productos = await prisma.inventario.findMany();
        const productosBajoStock = productos.filter(p => p.stock < p.stockMinimo).map(p => ({
            id: p.id,
            producto: p.producto,
            stock: p.stock,
            stockMinimo: p.stockMinimo,
            diferencia: p.stockMinimo - p.stock
        }))
        return res.json(productosBajoStock);
    }catch(error){
        console.log("Error al procesar salida del stock", error);
        return res.status(500).json({ error: "Error interno del servidor al procesar salida del stock" });
    }
}