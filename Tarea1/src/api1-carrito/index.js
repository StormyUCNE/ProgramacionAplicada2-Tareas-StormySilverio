const express = require("express");
const app = express();
app.use(express.json());
app.listen(3000, () => console.log("Servidor Corriendo en Puerto 3000"));

let carritoCompras = [
  {
    id: 1,
    nombre: "Coca Cola",
    precio: 85.0,
    cantidad: 2,
  },
];
let nextId = 2;

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
const validarCamposPost = (req, res, next) => {
  if (!req.body.nombre || !req.body.precio || !req.body.cantidad)
    return res
      .status(400)
      .json({
        error: "El nombre, el precio y la cantidad son campos requeridos",
      });
  if (
    typeof req.body.precio === "string" ||
    typeof req.body.cantidad === "string"
  )
    return res
      .status(400)
      .json({ error: "El precio y la cantidad deben de ser números" });
  if (req.body.precio < 1 || req.body.cantidad < 1)
    return res
      .status(400)
      .json({ error: "El precio y la cantidad deben de ser positivos" });
  next();
};
const validarCantidadPut = (req, res, next) => {
  if (!req.body.cantidad)
    return res.status(400).json({ error: "La cantidad es un campo requerido" });
  if (typeof req.body.cantidad === "string")
    return res.status(400).json({ error: "La cantidad deben de ser números" });
  if (req.body.cantidad < 1)
    return res.status(400).json({ error: "La cantidad debe de ser positiva" });
  next();
};
const validarDescuento = (req, res, next) => {
  if (!req.body.porcentaje)
    return res
      .status(400)
      .json({ error: "El porcentaje es un campo requerido" });
  if (typeof req.body.porcentaje === "string")
    return res.status(400).json({ error: "El porcentaje debe de ser número" });
  if (req.body.porcentaje > 50)
    return res.status(400).json({ error: "El porcentaje Máximo es de 50%" });
  if (req.body.porcentaje < 1)
    return res
      .status(400)
      .json({ error: "El porcentaje debe de ser positivo y mayor a cero" });
  next();
};

app.get("/productos", (req, res) => {
  res.json(carritoCompras);
});

app.post("/productos", validarCamposPost, (req, res) => {
  const { nombre, precio, cantidad } = req.body;
  const existente = carritoCompras.find(
    (p) => p.nombre.trim().toLowerCase() === nombre.trim().toLowerCase(),
  );
  if (existente === undefined) {
    const newProduct = {
      id: nextId++,
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
    };
    carritoCompras.push(newProduct);
    res.status(201).json(newProduct);
  } else {
    existente.cantidad += cantidad;
    res.json(existente);
  }
});

app.put("/productos/:id", validarCantidadPut, (req, res) => {
  const producto = carritoCompras.find((p) => p.id === parseInt(req.params.id));
  if (!producto)
    return res.status(404).json({ error: "No se encontro el producto" });
  const { cantidad } = req.body;
  producto.cantidad = cantidad;
  res.json(producto);
});

app.delete("/productos/:id", (req, res) => {
  const indice = carritoCompras.findIndex(
    (p) => p.id === parseInt(req.params.id),
  );
  if (indice === -1)
    return res.status(404).json({ error: "Producto no encontrado" });
  carritoCompras.splice(indice, 1);
  res.json({ message: "Producto Eliminado" });
});

app.get("/carrito/total", (req, res) => {
  const total = carritoCompras.reduce(
    (acumulador, p) => acumulador + p.precio * p.cantidad,
    0,
  );
  return res.json({ total: total });
});

app.post("/carrito/aplicar-descuento", validarDescuento, (req, res) => {
  const { porcentaje } = req.body;
  const subtotal = carritoCompras.reduce(
    (acumulador, p) => acumulador + p.precio * p.cantidad,
    0,
  );
  const total = subtotal - subtotal * (porcentaje / 100);
  return res.json({ total: total });
});
