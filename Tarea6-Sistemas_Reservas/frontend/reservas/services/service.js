import { request } from "./api"

export const createService=(formulario)=>{
    return request("/servicios", {method: "POST", auth: true, body: {nombre: formulario.nombre, descripcion: formulario.descripcion, duracion: Number(formulario.duracion), precio: Number(formulario.precio)}});
}

export const getService=()=>{
    return request("/servicios", {method: "GET", auth: true});
}

export const editService=(formulario)=>{
    return request(`/servicios/${formulario.id}`, {method: "PUT", auth: true, body: {nombre: formulario.nombre, descripcion: formulario.descripcion, duracion: Number(formulario.duracion), precio: Number(formulario.precio)}});
}

export const deleteService=(id)=>{
    return request(`/servicios/${id}`, {method: "DELETE", auth: true});
}