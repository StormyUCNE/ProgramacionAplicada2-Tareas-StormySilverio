import {request} from "../../../services/api.js"

export const signUp =(form)=>{
    return request("/auth/registro", {method: "POST", auth: false, body:{nombre: form.nombre, email: form.email, password: form.password, rol: form.rol}});
}

export const signIn =(form)=>{
    return request("/auth/login", {method: "POST", auth: false, body:{email: form.email, password: form.password}});
}