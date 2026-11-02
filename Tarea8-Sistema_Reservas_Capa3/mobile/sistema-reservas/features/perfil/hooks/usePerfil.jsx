import { useState } from "react";
import { updateNombrePerfil } from "../../../services/api.js";
import { useAuth } from "../../../context/AuthContext";

export const usePerfil = () => {
  const { setUser } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdatePerfil = async (nombre) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await updateNombrePerfil(nombre);
      if (data.error) {
        setError(data.error);
        return;
      }
      setUser((prev) => ({ ...prev, nombre: data.nombre }));
      return true;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleUpdatePerfil, isLoading, error };
};
