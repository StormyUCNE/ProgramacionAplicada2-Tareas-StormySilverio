import express from 'express'
import authRoutes from './routes/auth.js'
import servicesRoutes from './routes/servicios.js'
import reservasRoutes from './routes/reservas.js'
import { validarToken } from './middlewares/auth.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/auth", authRoutes);
app.use("/servicios", validarToken, servicesRoutes);
app.use("/reservas", validarToken, reservasRoutes);

app.use((error, req, res, next)=>{
    console.error("Error en el Servidor", error.message);
    return res.status(500).json({error: "Error en el Servidor"});
})


app.listen(PORT, ()=> {console.log( `Servidor Corriendo en puerto ${PORT}`)});