import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { handleLogin, error, setError, isLoading } = useAuth();

  useEffect(() => {
    setError("");
  }, []);

  return (
    <SafeAreaView style={styles.contenedor}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.hero}>
            <Image
              style={styles.imageHero}
              source={require("../../assets/images/logo.jpeg")}
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Ingrese Email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Ionicons
                style={styles.inputIcon}
                name="mail-outline"
                size={24}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Ingrese Contraseña"
                placeholderTextColor="#aaa"
                secureTextEntry={!isVisible}
              />

              <TouchableOpacity onPress={() => setIsVisible((prev) => !prev)}>
                <Ionicons
                  style={styles.inputIcon}
                  name={isVisible ? "eye-off-outline" : "eye-outline"}
                  size={24}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>

            <TouchableOpacity
              disabled={!email || !password}
              style={
                !email || !password ? styles.buttonDisabled : styles.button
              }
              onPress={() => handleLogin(email, password)}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color="#0b0fff" />
              ) : (
                <Text>Entrar</Text>
              )}
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿Aún no tienes cuenta? </Text>
              <TouchableOpacity
                onPress={() => router.replace("/(auth)/register")}
              >
                <Text style={styles.registerLink}>Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#365CFF",
  },

  keyboard: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  hero: {
    height: "40%",
    backgroundColor: "#fff",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
  },

  imageHero: {
    width: "100%",
    height: "100%",
  },

  formContainer: {
    margin: 20,
    gap: 25,
  },
  
  inputContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#515350",
    borderRadius: 10,
  },

  input: {
    flex: 1,
    color: "#fff",
  },

  inputIcon: {
    marginLeft: 10,
    color: "#FFFF",
  },

  button: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    padding: 20,
    backgroundColor: "#544d4d",
    borderRadius: 10,
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
  },

  registerContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },

  registerText: {
    color: "#fff",
  },

  registerLink: {
    color: "#fff",
    fontWeight: "bold",
  },

  errorContainer: {
    padding: 10,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
});
