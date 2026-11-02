import { useCallback, useEffect, useState } from "react";
import {
  cancelReserva,
  completeReserva,
  createReserva,
  getReservas,
  getReservasById,
} from "../../../services/api.js";
import { router, useFocusEffect } from "expo-router";
import { useAuth } from "../../../context/AuthContext.jsx";
import { cancelarNotification, notificarReserva } from "../../../services/notifications.js";

export const useReservas = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reservas, setReservas] = useState([]);
  const { user } = useAuth();

  const handleGetReservas = async () => {
    try {
      setError(null);
      const data =
        user.rol === "admin" ? await getReservas() : await getReservasById();
      if (data.error) {
        setError(data.error);
        return;
      }
      setReservas(data.reservas);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(()=>{
      handleGetReservas();
    }, [user])
  );

  const handleCreateReserva = async (fecha, hora, servicioId) => {
    try {
      setError(null);
      const data = await createReserva(fecha, hora, servicioId);
      if (data.error) {
        setError(data.error);
        return;
      }
      await notificarReserva(data.reserva);
      router.push("/(app)/reservas");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelReserva = async (id) => {
    try {
      setError(null);
      const data = await cancelReserva(id);
      if (data.error) {
        setError(data.error);
        return;
      }
      setReservas((prev) =>
        prev.map((r) => (r.id === id ? { ...r, estado: "cancelada" } : r)),
      );
      await cancelarNotification(id);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteReserva = async (id) => {
    try {
      setError(null);
      const data = await completeReserva(id);
      if (data.error) {
        setError(data.error);
        return;
      }
      setReservas((prev) =>
        prev.map((r) => (r.id === id ? { ...r, estado: "completada" } : r)),
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCreateReserva,
    error,
    isLoading,
    reservas,
    handleCancelReserva,
    handleCompleteReserva,
  };
};