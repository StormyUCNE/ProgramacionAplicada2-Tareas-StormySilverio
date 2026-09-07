const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000, () => console.log("Servidor Corriendo en Puerto 3000"));

const inventario =[
    {
        "id": 1,
        "producto": "Carnation",
        "stock": 10,
        "stockMinimo": 5
    }
]
let nextId = 2;

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const validarCreacion =(req, res, next)=>{
    if(!req.body.producto || req.body.stock === undefined)
        return res.status(400).json({error: "Producto y stock son campos requeridos"});
    if(typeof req.body.producto === "number")
        return res.status(400).json({error: "Producto no puede ser un número"});
    if(typeof req.body.stock === "string" || typeof req.body.stockMinimo === "string")
        return res.status(400).json({error: "El stock y el stock mínimo deben ser números"});
    if(req.body.stock < 0 || req.body.stockMinimo < 0)
        return res.status(400).json({error: "El stock y el stock mínimo deben ser números positivos"});
    if(req.body.stockMinimo === undefined)
        req.body.stockMinimo = 5;
    next();
}
const validarEntradaYSalida =(req, res, next)=>{
    if(!req.body.cantidad)
        return res.status(400).json({error: "La cantidad es un campos requerido"});
    if(typeof req.body.cantidad === "string")
        return res.status(400).json({error: "La cantidad debe ser un número"});
    if(req.body.cantidad < 1)
        return res.status(400).json({error: "La cantidad debe ser mayor a 0"});
    next();
}

app.get('/inventario', (req, res)=>{
    return res.json(inventario);
})

app.post('/inventario', validarCreacion, (req, res)=>{
    const {producto, stock, stockMinimo} = req.body;
    const newProduct = {id: nextId++, producto: producto, stock: stock, stockMinimo: stockMinimo};
    inventario.push(newProduct);
    return res.status(201).json(newProduct);
});

app.post('/inventario/:id/entrada', validarEntradaYSalida, (req, res)=>{
    const {cantidad} = req.body;
    const producto = inventario.find(p => p.id === parseInt(req.params.id));
    if(!producto)
        return res.status(404).json({error: "No se encontro el producto"});
    producto.stock += cantidad;
    return res.json(producto);
});

app.post('/inventario/:id/salida', validarEntradaYSalida, (req, res)=>{
    const {cantidad} = req.body;
    const producto = inventario.find(p => p.id === parseInt(req.params.id));
    if(!producto)
        return res.status(404).json({error: "No se encontro el producto"});
    if(cantidad > producto.stock)
        return res.status(400).json({error: "No hay suficiente stock para la cantidad insertada"});
    producto.stock -= cantidad;
    return res.json(producto);
});

app.get('/inventario/alertas', (req, res)=>{
    const productosBajoStock = inventario.filter(p => p.stock <= p.stockMinimo);
    const resultado = productosBajoStock.map(p =>({
        id: p.id,
        producto: p.producto,
        stock: p.stock,
        stockMinimo: p.stockMinimo,
        FaltanParaMinimo: p.stockMinimo - p.stock
    }))
    return res.json(resultado);
})