import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, TYPOGRAPHY } from "../../constants/theme";
import { router } from "expo-router";
import { ButtonComponent } from "../../components/form/ButtonComponent"
import { InputComponent } from "../../components/form/InputComponent";
import { ErrorComponent } from "../../components/ui/ErrorComponent";
import {useAuth} from "../../contexts/AuthContext"

export default function Login() {
  const [form, setForm] = useState({email: "", password: ""});
  const [showPassword, setShowPassword] = useState(false);
  const { error, handleLogin, isLoading, setError } = useAuth();

  useEffect(() => {
    setError(null);
  }, []);
  return (
    <SafeAreaView style={s.display} edges={["top"]}>
      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={s.loginContainer}>
          <View style={s.hero}>
            <Text style={s.title}>Bienvenido de nuevo</Text>
            <Text style={s.subtitle}>
              Inicia sesión para continuar mi hermano/a.
            </Text>
          </View>

          <ScrollView
            style={s.form}
            contentContainerStyle={s.formContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <InputComponent
              label="Correo electrónico"
              placeholder="tucorreo@ejemplo.com"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={form.email}
              onChangeText={(text) => setForm(prev=>({...prev, email: text}))}
            />
            <InputComponent
              isPassword={true}
              label="Contraseña"
              placeholder="Tu contraseña"
              keyboardType="visible-password"
              textContentType="password"
              value={form.password}
              onChangeText={(text) => setForm(prev=>({...prev, password: text}))}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            {error && <ErrorComponent error={error} />}

            <ButtonComponent
              text="Iniciar Sesión"
              isLoading={isLoading}
              action={() => handleLogin(form)}
            />

            <View style={s.footer}>
              <Text style={s.footerText}>¿Aún no tienes cuenta? </Text>
              <Pressable
                hitSlop={10}
                onPress={() => router.push("(auth)/signup")}
              >
                <Text style={s.link}>Crear cuenta</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
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
});