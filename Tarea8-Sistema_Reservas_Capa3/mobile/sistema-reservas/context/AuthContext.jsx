import { createContext, useContext, useEffect, useState } from "react";
import { signIn, signUp } from "@/services/api.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { getCurrentUser } from "@/services/api.js";
const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          return;
        }
        const decoded = tokenDecoded(token);
        if (!decoded.exp || decoded.exp * 1000 <= new Date().getTime()) {
          logout();
          return;
        }
        setToken(token);
        const data = await getCurrentUser();
        if (!data.error)
          setUser({
            id: decoded.id,
            nombre: data.nombre,
            email: decoded.email,
            rol: decoded.rol,
          });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsCheckingSession(false);
      }
    };
    verifyToken();
  }, []);

  const tokenDecoded = (token) => {
    const tokenDecoded = jwtDecode(token);
    return tokenDecoded;
  };

  const saveToken = async (newToken) => {
    await AsyncStorage.setItem("token", newToken);

    setToken(newToken);

    const decoded = tokenDecoded(newToken);

    const data = await getCurrentUser();

    setUser({
      id: decoded.id,
      nombre: data.nombre ?? decoded.nombre,
      email: data.email ?? decoded.email,
      rol: decoded.rol,
    });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/(auth)/login");
  };

  const handleCreateUsuario = async (form) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await signUp(form);
      if (data.error) {
        setError(data.error);
        return;
      }
      await saveToken(data.token);
      router.push("/(app)/servicios");
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
      const data = await signIn(form);
      if (data.error) {
        setError(data.error);
        return;
      }
      await saveToken(data.token);
      router.push("/(app)/servicios");
    } catch (err) {
      setError(err.message || "No se pudo crear el usuario");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoading,
        isCheckingSession,
        error,
        setUser,
        setError,
        handleCreateUsuario,
        handleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
