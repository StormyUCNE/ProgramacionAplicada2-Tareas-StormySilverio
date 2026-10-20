import { createContext, useContext, useEffect, useState } from "react";
import { crearUsuario, login } from "../services/authService.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {jwtDecode} from "jwt-decode"
const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const verifyToken = async()=>{
        try {
            setIsCheckingSession(true);
            const token = await AsyncStorage.getItem("token");
            if(!token){
                return;
            }
            const decoded = tokenDecoded(token);
            if(!decoded.exp || decoded.exp * 1000 <= new Date().getTime()){
                logout();
                return;
            }
            setToken(token);
            setUser({id: decoded.id, nombre: decoded.nombre, email: decoded.email, rol: decoded.rol});
        } catch (error) {
            setError(error.message);
        }
        finally{
            setIsCheckingSession(false);
        }
    }
    verifyToken();
  },[]);

  const tokenDecoded=(token)=>{
    const tokenDecoded = jwtDecode(token);
    return tokenDecoded;
  }

  const saveToken=async(token)=>{
    await AsyncStorage.setItem("token", token);
    setToken(token);
    const data = tokenDecoded(token);
    setUser({id: data.id, nombre: data.nombre, email: data.email, rol: data.rol});
  }

  const logout =async()=>{
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/(auth)/login");
  }

  const handleCreateUsuario = async (form) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await crearUsuario(form);
      if(data.error){
        setError(data.error);
        return;
      }
      await saveToken(data.token);
      router.push("/(tabs)");
    } catch (err) {
      setError(err.message || "No se pudo crear el usuario");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (form) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await login(form);
      if(data.error){
        setError(data.error);
        return;
      }
      await saveToken(data.token);
      router.push("/(tabs)");
    } catch (err) {
      setError(err.message || "No se pudo crear el usuario");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{ token, user, isLoading, isCheckingSession, error, setError, handleCreateUsuario, handleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
