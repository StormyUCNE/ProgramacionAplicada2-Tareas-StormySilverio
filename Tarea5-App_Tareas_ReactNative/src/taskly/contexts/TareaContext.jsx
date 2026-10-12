import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { router } from "expo-router";

const TareaContext = createContext(null);

export const TareaProvider = ({ children }) => {
  const { token, handleLogout } = useAuth();

  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const urlApi = process.env.EXPO_PUBLIC_API_URL;

  const getTareas = async () => {
    if (!token) {
      setTareas([]);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${urlApi}/v2/tareas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status === 401){
        await handleLogout();
      }
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }
      setTareas(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTareas();
  }, [token]);

  const createTarea = async (titulo) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${urlApi}/v2/tareas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo: titulo }),
      });
      if(response.status === 401){
        await handleLogout();
      }
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return false;
      }
      await getTareas();
    } catch (error) {
      setError(error.message);
    }finally{
      setIsLoading(false);
    }
  };

  const updateTarea = async (tareaId) => {
    const tareaActual = tareas.find(
      (tarea) => tarea.id === tareaId
    );
    if (!tareaActual) return;
    const nuevoEstado = !tareaActual.completada;
    try {
      const response = await fetch(
        `${urlApi}/v2/tareas/${tareaId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completada: nuevoEstado,
          }),
        }
      );
      if(response.status === 401){
        await handleLogout();
      }
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }
      setTareas((actuales) =>
        actuales.map((tarea) =>
          tarea.id === tareaId
            ? { ...tarea, completada: nuevoEstado }
            : tarea
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteTarea = async (tareaId) => {
    try {
      const response = await fetch(
        `${urlApi}/v2/tareas/${tareaId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.status === 401){
        await handleLogout();
      }
      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        return;
      }
      setTareas((actuales) =>
        actuales.filter((tarea) => tarea.id !== tareaId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <TareaContext.Provider
      value={{
        tareas,
        error,
        isLoading,
        getTareas,
        createTarea,
        updateTarea,
        deleteTarea,
      }}
    >
      {children}
    </TareaContext.Provider>
  );
};

export const useTareas = () => {
  const context = useContext(TareaContext);

  if (!context) {
    throw new Error(
      "useTareas debe utilizarse dentro de TareaProvider"
    );
  }

  return context;
};
