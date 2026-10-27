import { useAuth } from "@/contexts/AuthContext";
import { useService } from "@/features/servicios/hooks/useService";
import { CardComponent } from "@/features/servicios/components/CardComponent";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import THEME from "@/constants/theme.js";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
const { colors, typography } = THEME;

export default function TabOneScreen() {
  const { user, logout } = useAuth();
  const { servicios, handledDeleteServicios, isLoading } = useService();

  const displayName = user?.nombre || "Usuario";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={s.display} edges={["top"]}>
      <FlatList
        data={servicios}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.listContent}
        ListHeaderComponent={
          <View>
            <View style={s.hero}>
              <View style={s.circleA} />
              <View style={s.circleB} />

              <View style={s.heroHeader}>
                <View style={s.userRow}>
                  <View style={s.avatar}>
                    <Text style={s.avatarText}>{initial}</Text>
                  </View>
                  <View style={s.userInfo}>
                    <Text style={s.helloText}>Hola,</Text>
                    <Text style={s.userName} numberOfLines={1}>
                      {displayName}
                    </Text>
                  </View>
                </View>

                <Pressable
                  onPress={logout}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="Cerrar sesión"
                  style={({ pressed }) => [
                    s.logoutButton,
                    pressed && { backgroundColor: "#1E54E0" },
                  ]}
                >
                  <Text style={s.logoutText}>Salir</Text>
                </Pressable>
              </View>

              <Text style={s.heroTitle}>Sé el rey y elige como desees.</Text>
              <Text style={s.heroSub}>
                Elige el servicio, el horario que mejor te quede y listo.
              </Text>
            </View>

            <View style={s.sectionRow}>
              <Text style={s.sectionTitle}>Servicios</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <CardComponent
            item={item}
            onDelete={handledDeleteServicios}
            isLoading={isLoading}
          />
        )}
      />
      {user?.rol === "admin" && (
        <Pressable
          style={s.addButton}
          onPress={() => router.push("/(app)/servicios/new")}
          accessibilityRole="button"
          accessibilityLabel="Crear servicio"
        >
          <Ionicons name="add" color="#FFFFFF" size={30} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  display: {
    backgroundColor: colors.mist,
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },

  // Hero
  hero: {
    backgroundColor: colors.heroBackground,
    borderRadius: 28,
    padding: 24,
    overflow: "hidden",
  },

  circleA: {
    position: "absolute",
    top: -70,
    right: -50,
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: colors.gradientMedium,
  },

  circleB: {
    position: "absolute",
    bottom: -50,
    right: 40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.lagoon,
    opacity: 0.18,
  },

  // Encabezado
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  userRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginRight: 12,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.lagoon,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 17,
    fontFamily: typography.fonts.sora.bold,
    color: colors.ink,
  },

  userInfo: {
    flex: 1,
  },

  helloText: {
    fontSize: 12.5,
    fontFamily: typography.fonts.dmSans.regular,
    color: colors.line,
  },

  userName: {
    fontSize: 16,
    fontFamily: typography.fonts.sora.semibold,
    color: colors.mist,
  },

  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
  },

  logoutText: {
    fontSize: typography.sizes.label.fontSize,
    fontFamily: typography.fonts.dmSans.bold,
    color: colors.mist,
  },

  // Títulos
  heroTitle: {
    ...typography.sizes.heroTitle,
    fontFamily: typography.fonts.sora.bold,
    color: colors.mist,
    maxWidth: 300,
  },

  heroSub: {
    fontSize: typography.sizes.supportTextLarge.fontSize,
    lineHeight: 22,
    fontFamily: typography.fonts.dmSans.regular,
    color: colors.line,
    marginTop: 10,
    maxWidth: 300,
  },

  // Servicios
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 28,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: typography.fonts.sora.bold,
    color: colors.ink,
  },

  sectionCount: {
    fontSize: typography.sizes.supportText.fontSize,
    fontFamily: typography.fonts.dmSans.medium,
    color: colors.body,
  },
  addButton: {
  position: "absolute",
  bottom: 100,
  right: 24,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#2F6BFF",
  justifyContent: "center",
  alignItems: "center",
  elevation: 8,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  zIndex: 10,
},
});
