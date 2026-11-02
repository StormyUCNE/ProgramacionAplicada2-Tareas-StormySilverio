import {prisma} from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const registro =async(req, res, next)=>{
    try {
        const {nombre, email, password, rol} = req.body;
        const existeUsuario = await prisma.usuario.findUnique({where: {email}});
        if(existeUsuario)
            return res.status(400).json({error: "Email ya existe"});
        const hash = await bcrypt.hash(password, 10);
        const usuario = await prisma.usuario.create({data: {nombre, email, password: hash, rol: rol || "cliente"}});
        const token = jwt.sign(
            {id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        );
        return res.status(201).json({token})
    } catch (error) {
        next(error);
    }
}

export const login =async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        const existeUsuario = await prisma.usuario.findUnique({where: {email}});
        if(!existeUsuario)
            return res.status(401).json({error: "Credenciales incorrectas"});
        const valido = await bcrypt.compare(password, existeUsuario.password);
        if(!valido)
            return res.status(401).json({error: "Credenciales incorrectas"});
        const token = jwt.sign(
            {id: existeUsuario.id, nombre: existeUsuario.nombre, email: existeUsuario.email, rol: existeUsuario.rol},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        );
        return res.json({token})
    } catch (error) {
        next(error);
    }
}