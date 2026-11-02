import { useAuth } from "@/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import THEME from "@/constants/theme.js";
import { use, useState } from "react";
const { colors, typography } = THEME;
import { InputComponent } from "../../../components/form/InputComponent";
import { ButtonComponent } from "../../../components/form/ButtonComponent";
import { usePerfil } from "../../../features/perfil/hooks/usePerfil";

export default function PerfilScreen() {
  const { user, logout } = useAuth();
  const {handleUpdatePerfil, isLoading} = usePerfil()
  const [showModal, setShowModal] = useState(false);
  const [nombreNuevo, setNombreNuevo] = useState(user?.nombre || "")

  return (
    <SafeAreaView style={s.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.content}
      >
        <View style={s.header}>
          <Text style={s.headerTitle}>Mi perfil</Text>
          <Text style={s.headerSubtitle}>Información de tu cuenta</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Información personal</Text>

          <View style={s.infoCard}>
            <View style={s.infoRow}>
              <View style={s.infoIcon}>
                <Ionicons name="person-outline" size={21} color="#2F6BFF" />
              </View>

              <View style={s.infoContent}>
                <Text style={s.infoLabel}>Nombre completo</Text>
                <Text style={s.infoValue}>{user?.nombre}</Text>
              </View>

              <Pressable style={s.editIcon} onPress={() => setShowModal(true)}>
                <Ionicons name="pencil-outline" size={19} color="#2F6BFF" />
              </Pressable>
            </View>

            <View style={s.divider} />

            <View style={s.infoRow}>
              <View style={s.infoIcon}>
                <Ionicons name="mail-outline" size={21} color="#2F6BFF" />
              </View>

              <View style={s.infoContent}>
                <Text style={s.infoLabel}>Correo electrónico</Text>
                <Text style={s.infoValue}>{user?.email}</Text>
              </View>
            </View>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            s.logoutButton,
            pressed && { opacity: 0.75 },
          ]}
          onPress={logout}
        >
          <Ionicons name="log-out-outline" size={21} color="#DC4444" />
          <Text style={s.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </ScrollView>
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={s.modalOverlay}>
          <View style={s.modalContainer}>
            <View style={s.modalHeader}>
              <Text style={s.modalTitle}>Editar perfil</Text>

              <Pressable onPress={() => {setShowModal(false); setNombreNuevo(user.nombre)}}>
                <Ionicons name="close" size={25} color={colors.ink} />
              </Pressable>
            </View>

            <Text style={s.modalDescription}>
              Actualiza la información de tu cuenta.
            </Text>

            <InputComponent value={nombreNuevo} onChangeText={setNombreNuevo} />

            <ButtonComponent text="Guardar" action={async() => {const ok = await handleUpdatePerfil(nombreNuevo); if (ok) setShowModal(false);}} isLoading={isLoading}/>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mist,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 110,
  },

  header: {
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 25,
    fontFamily: typography.fonts.sora.bold,
    color: colors.ink,
  },

  headerSubtitle: {
    fontSize: 14,
    fontFamily: typography.fonts.dmSans.regular,
    color: colors.body,
    marginTop: 5,
  },

  userName: {
    fontSize: 21,
    fontFamily: typography.fonts.sora.bold,
    color: colors.mist,
    textAlign: "center",
  },

  userEmail: {
    fontSize: 14,
    fontFamily: typography.fonts.dmSans.regular,
    color: colors.line,
    marginTop: 6,
    textAlign: "center",
  },

  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#263D55",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 16,
  },

  roleText: {
    fontSize: 12,
    fontFamily: typography.fonts.dmSans.bold,
    color: colors.mist,
  },

  section: {
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 19,
    fontFamily: typography.fonts.sora.bold,
    color: colors.ink,
    marginBottom: 14,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    gap: 14,
  },

  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    fontFamily: typography.fonts.dmSans.regular,
    color: colors.body,
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 15,
    fontFamily: typography.fonts.dmSans.bold,
    color: colors.ink,
  },

  divider: {
    height: 1,
    backgroundColor: "#EDF0F5",
  },

  logoutButton: {
    marginTop: 28,
    backgroundColor: "#FFF1F1",
    borderRadius: 17,
    padding: 17,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  logoutText: {
    fontSize: 15,
    fontFamily: typography.fonts.dmSans.bold,
    color: "#DC4444",
  },
  editIcon: {
  width: 38,
  height: 38,
  borderRadius: 12,
  backgroundColor: "#EEF4FF",
  justifyContent: "center",
  alignItems: "center",
},
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    padding: 20,
  },

  modalContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 21,
    fontFamily: typography.fonts.sora.bold,
    color: colors.ink,
  },

  modalDescription: {
    fontSize: 14,
    fontFamily: typography.fonts.dmSans.regular,
    color: colors.body,
    marginTop: 8,
    marginBottom: 20,
  },

  cancelButton: {
    marginTop: 15,
    padding: 14,
    alignItems: "center",
    backgroundColor: "#F2F5FA",
    borderRadius: 14,
  },

  cancelButtonText: {
    color: colors.ink,
    fontFamily: typography.fonts.dmSans.bold,
  },
});
