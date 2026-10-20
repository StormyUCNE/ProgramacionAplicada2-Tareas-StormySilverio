
import THEME from "@/constants/theme.js";
import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { colors, typography } = THEME;

export default function TabTwoScreen() {
  const { user, token, isCheckingSession, logout } = useAuth()

  if (isCheckingSession) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  const displayName = user?.nombre || "Usuario";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Mi perfil</Text>
        <Text style={styles.pageSubtitle}>
          Administra tu información personal.
        </Text>

        {/* Cabecera del perfil */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>

          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.email}>{user?.email || "Sin correo"}</Text>

          <View style={styles.roleBadge}>
            <View style={styles.roleDot} />
            <Text style={styles.roleText}>
              {user?.rol === "admin" ? "Administrador" : "Usuario"}
            </Text>
          </View>
        </View>
        <Pressable
          onPress={logout}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutPressed,
          ]}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mist,
  },

  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.mist,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  pageTitle: {
    fontSize: 28,
    fontFamily: typography.fonts.sora.bold,
    color: colors.ink,
  },

  pageSubtitle: {
    fontSize: typography.sizes.supportTextLarge.fontSize,
    fontFamily: typography.fonts.dmSans.regular,
    color: colors.body,
    marginTop: 6,
    marginBottom: 24,
  },

  profileCard: {
    alignItems: "center",
    backgroundColor: colors.heroBackground,
    borderRadius: 24,
    padding: 26,
    marginBottom: 28,
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.lagoon,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  avatarText: {
    fontSize: 34,
    fontFamily: typography.fonts.sora.bold,
    color: colors.ink,
  },

  name: {
    fontSize: 22,
    fontFamily: typography.fonts.sora.bold,
    color: colors.mist,
    textAlign: "center",
  },

  email: {
    fontSize: typography.sizes.supportText.fontSize,
    fontFamily: typography.fonts.dmSans.regular,
    color: colors.line,
    marginTop: 6,
  },

  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.gradientMedium,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginTop: 16,
  },

  roleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lagoon,
  },

  roleText: {
    fontSize: typography.sizes.label.fontSize,
    fontFamily: typography.fonts.dmSans.bold,
    color: colors.mist,
  },

  logoutButton: {
    backgroundColor: colors.field,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 15,
  },

  logoutPressed: {
    opacity: 0.7,
  },

  logoutText: {
    fontSize: typography.sizes.button.fontSize,
    fontFamily: typography.fonts.dmSans.bold,
    color: colors.danger,
  }
});
