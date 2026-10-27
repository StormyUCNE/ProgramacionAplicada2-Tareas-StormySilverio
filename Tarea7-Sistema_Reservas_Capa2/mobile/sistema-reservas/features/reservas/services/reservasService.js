import {request} from "../../../services/api.js"

export const getReservas=()=>{
    return request("/reservas", {method: "GET", auth: true});
}
export const getReservasById =()=>{
    return request("/reservas/mis-reservas", {method: "GET", auth: true});
}
export const createReserva=(fecha, hora, servicioId)=>{
    return request("/reservas", {method: "POST", auth: true, body: {fecha, hora, servicioId}});
}

export const cancelReserva=(id)=>{
    return request(`/reservas/${id}`, {method: "DELETE", auth: true});
}

export const completeReserva=(id)=>{
    return request(`/reservas/${id}/estado`, {method: "PUT", auth: true});
}