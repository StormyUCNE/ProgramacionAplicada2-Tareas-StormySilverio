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
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useAuth } from "@/contexts/AuthContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isCheckingSession, token, user } = useAuth();
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
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#60A5FA",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          marginHorizontal: 20,
          height: 60,
          backgroundColor: "#171923",
          borderTopWidth: 0,
          borderRadius: 25,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },

        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarIconStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="servicios"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? s.iconStyleActive : s.iconStyle}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? "#60A5FA" : color}
                size={24}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="reservas"
        options={{
          animation: "shift",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? s.iconStyleActive : s.iconStyle}>
              <Ionicons
                name={focused ? "calendar" : "calendar-outline"}
                color={focused ? "#60A5FA" : color}
                size={24}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const s = StyleSheet.create({
  iconStyleActive: {
    width: 48,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
