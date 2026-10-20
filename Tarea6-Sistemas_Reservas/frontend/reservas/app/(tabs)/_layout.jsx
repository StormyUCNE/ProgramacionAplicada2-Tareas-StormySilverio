import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/components/useColorScheme";
import { useAuth } from "@/contexts/AuthContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();

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
        name="index"
        options={{
          title: "Inicio",
          animation: "shift",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? s.iconStyleActive : s.iconStyle}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? "#60A5FA" : color} // Opcional: cambia el color del icono si el fondo es blanco
                size={24}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="creation"
        options={{
          href: user?.rol !== "admin" ? null : "/(tabs)/creation",
          animation: "shift",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? s.iconStyleActive : s.iconStyle}>
              <Ionicons
                name={focused ? "add" : "add-outline"}
                color={focused ? "#60A5FA" : color}
                size={24}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: "Crear",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? s.iconStyleActive : s.iconStyle}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
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