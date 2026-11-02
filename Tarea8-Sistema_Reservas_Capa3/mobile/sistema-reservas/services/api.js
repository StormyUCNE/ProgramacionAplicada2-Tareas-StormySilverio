import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
export const URL_API = Constants.expoConfig?.extra.apiUrl;
export const request = async (path, options = {}) => {
  const { method = "GET", auth = false, body } = options;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (auth) {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  try {
    const response = await fetch(`${URL_API}${path}`, {
      method: method,
      headers: headers,
      ...(body !== undefined && {
        body: JSON.stringify(body),
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

//Funciones para la autenticacion
export const signUp = (form) => {
  return request("/auth/registro", {
    method: "POST",
    auth: false,
    body: {
      nombre: form.nombre,
      email: form.email,
      password: form.password,
      rol: form.rol,
    },
  });
};

export const signIn = (form) => {
  return request("/auth/login", {
    method: "POST",
    auth: false,
    body: { email: form.email, password: form.password },
  });
};

//Funciones para los servicios
export const createService = (formulario) => {
  return request("/servicios", {
    method: "POST",
    auth: true,
    body: {
      nombre: formulario.nombre,
      descripcion: formulario.descripcion,
      duracion: Number(formulario.duracion),
      precio: Number(formulario.precio),
    },
  });
};

export const getService = () => {
  return request("/servicios", { method: "GET", auth: true });
};

export const getServiceById = (id) => {
  return request(`/servicios/${id}`, { method: "GET", auth: true });
};

export const editService = (formulario) => {
  return request(`/servicios/${formulario.id}`, {
    method: "PUT",
    auth: true,
    body: {
      nombre: formulario.nombre,
      descripcion: formulario.descripcion,
      duracion: Number(formulario.duracion),
      precio: Number(formulario.precio),
    },
  });
};

export const deleteService = (id) => {
  return request(`/servicios/${id}`, { method: "DELETE", auth: true });
};

//Funciones para reserva
export const getReservas = () => {
  return request("/reservas", { method: "GET", auth: true });
};
export const getReservasById = () => {
  return request("/reservas/mis-reservas", { method: "GET", auth: true });
};
export const createReserva = (fecha, hora, servicioId) => {
  return request("/reservas", {
    method: "POST",
    auth: true,
    body: { fecha, hora, servicioId },
  });
};

export const cancelReserva = (id) => {
  return request(`/reservas/${id}`, { method: "DELETE", auth: true });
};

export const completeReserva = (id) => {
  return request(`/reservas/${id}/estado`, { method: "PUT", auth: true });
};

//Funciones para el perfil
export const updateNombrePerfil = (nombre) => {
  return request("/usuarios/perfil", {
    method: "PUT",
    auth: true,
    body: { nombre },
  });
};

export const getCurrentUser = () => {
  return request("/usuarios/perfil", { method: "GET", auth: true });
};