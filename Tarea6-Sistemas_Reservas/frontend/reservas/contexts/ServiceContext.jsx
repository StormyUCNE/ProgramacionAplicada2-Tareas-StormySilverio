import { createContext, useContext, useEffect, useState } from "react";
import { createService, deleteService, editService, getService } from "../services/service";
import { router } from "expo-router";
import { useAuth } from "./AuthContext";

const ServiceContext = createContext(null);

export const ServiceProvider = ({ children }) => {
  const [servicios, setServicios] = useState([]);
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
      setError(error);
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
      router.push("(tabs)");
    } catch (error) {
      setError(error);
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
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ServiceContext.Provider
      value={{ servicios, isLoading, error, setError, handleSaveService, handledDeleteServicios }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useService=()=>{
    const context = useContext(ServiceContext);
    return context;
}
