import { useEffect, useState } from "react"
import { cancelReserva, completeReserva, createReserva, getReservas, getReservasById } from "../services/reservasService.js";
import { router } from "expo-router";
import {useAuth} from "../../../contexts/AuthContext.jsx"


export const useReservas=()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [reservas, setReservas] = useState([]);
    const {user} = useAuth();

    const handleGetReservas = async () => {
        try {
        const data = user.rol === "admin" ? await getReservas() : await getReservasById();
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

    useEffect(()=>{
        handleGetReservas();
    },[])

    const handleCreateReserva = async (fecha, hora, servicioId) => {
        try {
        const data = await createReserva(fecha, hora, servicioId);
        if (data.error) {
            setError(data.error);
            return;
        }
        router.push("/(app)/reservas");
        } catch (error) {
        setError(error.message);
        } finally {
        setIsLoading(false);
        }
    };

    const handleCancelReserva = async (id) => {
        try {
        const data = await cancelReserva(id);
        if (data.error) {
            setError(data.error);
            return;
        }
        setReservas(prev => prev.map(r => r.id === id ? {...r, estado: "cancelada"} : r));
        } catch (error) {
        setError(error.message);
        } finally {
        setIsLoading(false);
        }
    };

    const handleCompleteReserva = async (id) => {
        try {
        const data = await completeReserva(id);
        if (data.error) {
            setError(data.error);
            return;
        }
        setReservas(prev => prev.map(r => r.id === id ? {...r, estado: "completada"} : r));
        } catch (error) {
        setError(error.message);
        } finally {
        setIsLoading(false);
        }
    };

    return { handleCreateReserva, error, isLoading, reservas, handleCancelReserva, handleCompleteReserva}
}