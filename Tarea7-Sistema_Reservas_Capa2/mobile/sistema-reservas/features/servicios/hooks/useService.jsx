import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { createService, deleteService, editService, getService, getServiceById } from "../services/serviciosService.js";
import { router } from "expo-router";

  
export const useService=()=>{
  const [servicios, setServicios] = useState([]);
  const [servicio, setServicio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {token} = useAuth();

  const handleGetServicios = async () => {
    try {
      setIsLoading(true);
      const data = await getService();
      if (data.error) {
        setError(data.error);
        return;
      }
      setServicios(data.servicios);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetServicioById = async (id) => {
    try {
      setIsLoading(true);
      const data = await getServiceById(id);
      if (data.error) {
        setError(data.error);
        return;
      }
      setServicio(data.servicio);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetServicios();
  }, [token]);

  const handleSaveService = async (formulario) => {
    try {
      setIsLoading(true);

      const data = formulario.id ? await editService(formulario) : await createService(formulario);
      if (data.error) {
        setError(data.error);
        return;
      }
      setServicios(prev => formulario.id ? prev.map(ser => ser.id === formulario.id ? {...ser, ...formulario} : ser) : [...prev, data.servicio]);
      router.push("(app)/servicios");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handledDeleteServicios = async (id) => {
    try {
      setIsLoading(true);
      const data = await deleteService(id);
      if (data.error) {
        setError(data.error);
        return;
      }
      setServicios(prev => prev.filter(ser => ser.id != id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {servicios,
    isLoading,
    error,
    setError,
    handleGetServicios,
    handleSaveService,
    handledDeleteServicios,
    handleGetServicioById,
    servicio}
}
