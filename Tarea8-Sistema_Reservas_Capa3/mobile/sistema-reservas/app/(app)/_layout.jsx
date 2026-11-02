import { SymbolView } from "expo-symbols";
import { Link, Redirect, Tabs } from "expo-router";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/components/useColorScheme";
import { useEffect } from "react";
import { tienePermiso } from "../../services/notifications.js";
import { useAuth } from "../../context/AuthContext.jsx";
export const unstable_settings = {
  anchor: "reservas",
}
export default function TabLayout() {
  const {token, isCheckingSession} = useAuth();
  useEffect(()=>{
    tienePermiso();
  },[])
  if (isCheckingSession) {
    return (
      <ActivityIndicator size="large" color="#2F6BFF" style={{ flex: 1 }} />
    );
  }
  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <Tabs
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#60A5FA",
        tabBarInactiveTintColor: "#9CA3AF",
      }}
    >
      <Tabs.Screen
        name="servicios"
        options={{
          title: "Inicio",
          popToTopOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={focused ? "#60A5FA" : color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reservas"
        options={{
          title: "Reservas",
          popToTopOnBlur: true,
          animation: "shift",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              color={focused ? "#60A5FA" : color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={focused ? "#60A5FA" : color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}