import { request } from "./api"

export const crearUsuario =(form)=>{
    return request("/auth/registro", {method: "POST", auth:false, body:{nombre: form.nombre, email: form.email, password: form.password, rol: form.rol}});
}

export const login =(form)=>{
    return request("/auth/login", {method: "POST", auth:false, body:{email: form.email, password: form.password}});
}