import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const urlApi = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setIsCheckingSession(true);
        const token = await AsyncStorage.getItem("token");
        if (!token) return;
        const { exp, id, nombre, rol } = jwtDecode(token);
        if (!exp || exp * 1000 <= Date.now()) {
          await AsyncStorage.removeItem("token");
          setToken(null);
          setUser(null);
          return;
        }
        setToken(token);
        setUser({id, nombre, rol});
      } catch (error) {
        setError(error);
      } finally {
        setIsCheckingSession(false);
      }
    };
    verifyToken();
  }, []);

  const saveToken = async (token) => {
    if (!token) return;
    await AsyncStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setToken(token);
    setUser({id: decoded.id, nombre: decoded.nombre, rol: decoded.rol});
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    router.replace("/(auth)/login");
  };

  const handleRegister = async (nombre, email, password, rol) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${urlApi}/auth/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, password, rol }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }
      await saveToken(data.token);
      setError("");
      router.replace("/(home)");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${urlApi}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }
      await saveToken(data.token);
      setError("");
      router.replace("/(home)");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        error,
        handleRegister,
        handleLogin,
        handleLogout,
        isLoading,
        isCheckingSession,
        saveToken,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
