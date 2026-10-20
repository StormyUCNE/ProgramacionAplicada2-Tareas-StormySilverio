import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, TYPOGRAPHY } from "../../constants/theme";
import { router } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import { ButtonComponent } from "../../components/ui/ButtonComponent";
import { InputComponent } from "../../components/ui/InputComponent";
import { ErrorComponent } from "../../components/ui/ErrorComponent";

const ROLES = [
  { id: "1", label: "Usuario", value: "cliente" },
  { id: "2", label: "Administrador", value: "admin" },
];

export default function Register() {
  const [form, setForm] = useState({nombre: "", email: "", password: "", rol: ""});
  const [showPassword, setShowPassword] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const { handleCreateUsuario, error, isLoading, setError } = useAuth();

  useEffect(() => {
    setError(null);
  }, []);

  const handleSelectRole = (selectedRole) => {
    setForm(prev => ({...prev, rol: selectedRole.value}))
    setShowRoleModal(false);
  };

  return (
    <SafeAreaView style={s.display} edges={["top"]}>
      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={s.loginContainer}>
          <View style={s.hero}>
            <Text style={s.title}>Unete al mundo de las posibilidades</Text>
            <Text style={s.subtitle}>
              Crea una cuenta para que le pongas el de 30 a nuestros servicios.
            </Text>
          </View>

          <ScrollView
            style={s.form}
            contentContainerStyle={s.formContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Nombre de usuario */}
            <InputComponent
              label="Nombre de Usuario"
              placeholder="juanperez"
              keyboardType="default"
              value={form.nombre}
              onChangeText={(text) => setForm(prev=>({...prev, nombre: text}))}
            />

            {/* Correo electrónico */}
            <InputComponent
              label="Correo electrónico"
              placeholder="tucorreo@ejemplo.com"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={form.email}
              onChangeText={(text) => setForm(prev=>({...prev, email: text}))}
            />

            {/* Selector de Rol */}
            <Pressable onPress={() => setShowRoleModal(true)}>
              <View pointerEvents="none">
                <InputComponent
                  label="Seleccionar Rol"
                  placeholder="Selecciona tu rol"
                  value={form.rol}
                />
              </View>
            </Pressable>

            {/* Contraseña */}
            <InputComponent
              label="Contraseña"
              placeholder="Tu contraseña"
              textContentType="newPassword"
              value={form.password}
              isPassword={true}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onChangeText={(text) => setForm(prev=>({...prev, password: text}))}
            />

            {error && <ErrorComponent error={error} />}

            <ButtonComponent
              text="Registrar"
              isLoading={isLoading}
              action={() => handleCreateUsuario(form)}
            />

            <View style={s.footer}>
              <Text style={s.footerText}>¿Ya tienes cuenta? </Text>
              <Pressable
                hitSlop={10}
                onPress={() => router.push("(auth)/login")}
              >
                <Text style={s.link}>Iniciar Sesión</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>

        {/* Modal de Selección de Rol */}
        <Modal
          visible={showRoleModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowRoleModal(false)}
        >
          <View style={s.modalOverlay}>
            <View style={s.modalContent}>
              <View style={s.modalHeader}>
                <Text style={s.modalTitle}>Selecciona un Rol</Text>
                <Pressable onPress={() => setShowRoleModal(false)}>
                  <Text style={s.modalCloseText}>✕</Text>
                </Pressable>
              </View>

              <FlatList
                data={ROLES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    style={s.roleItem}
                    onPress={() => handleSelectRole(item)}
                  >
                    <Text style={s.roleItemText}>{item.label}</Text>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  display: {
    backgroundColor: COLORS.mist,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  loginContainer: {
    display: "flex",
    flex: 1,
    gap: 20,
  },

  /* Hero */
  hero: {
    padding: TYPOGRAPHY.paddings.heroTitle,
    paddingBottom: 0,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.heroTitle.fontSize,
    lineHeight: TYPOGRAPHY.sizes.heroTitle.lineHeight,
    color: COLORS.ink,
    fontFamily: TYPOGRAPHY.fonts.sora.bold,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.supportTextLarge.fontSize,
    lineHeight: 22,
    color: COLORS.body,
    fontFamily: TYPOGRAPHY.fonts.dmSans.regular,
    marginTop: 8,
  },

  /* Panel del formulario */
  form: {
    backgroundColor: COLORS.primary,
    flex: 1,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    overflow: "hidden",
  },
  formContent: {
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 40,
  },

  link: {
    fontSize: TYPOGRAPHY.sizes.supportText.fontSize,
    fontFamily: TYPOGRAPHY.fonts.dmSans.bold,
    color: COLORS.mist,
    textDecorationLine: "underline",
  },

  /* Pie */
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },
  footerText: {
    fontSize: TYPOGRAPHY.sizes.supportText.fontSize,
    fontFamily: TYPOGRAPHY.fonts.dmSans.regular,
    color: COLORS.mist,
  },

  /* Estilos del Modal corregidos */
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // <-- Corregido aquí
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    maxHeight: "50%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: TYPOGRAPHY.fonts.sora.bold,
    color: COLORS.ink,
  },
  modalCloseText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.body,
  },
  roleItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  roleItemText: {
    fontSize: 16,
    fontFamily: TYPOGRAPHY.fonts.dmSans.regular,
    color: COLORS.ink,
  },
});