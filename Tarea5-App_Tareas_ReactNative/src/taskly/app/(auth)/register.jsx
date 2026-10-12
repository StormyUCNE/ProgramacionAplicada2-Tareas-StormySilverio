import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";

import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Registro() {
  const [isVisible, setIsVisible] = useState(false);
  const [nombre, setNombre] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [rol, setRol] = useState("usuario");
  const [modalVisible, setModalVisible] = useState(false);
  const { handleRegister, error, setError, isLoading } = useAuth();

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
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
                placeholder="Ej Juan Perez"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Ionicons
                style={styles.inputIcon}
                name="person-outline"
                size={24}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Ej juanperez@gmail.com"
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
                placeholder="**********"
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
            <View style={styles.selectContainer}>
              <Pressable
                style={styles.selectButton}
                onPress={() => setModalVisible(true)}
              >
                <Ionicons name="person-outline" size={22} color="#FFFFFF" />

                <Text style={styles.selectText}>
                  {rol === "usuario" ? "Usuario" : rol === "admin" ? "Administrador" : "Seleccione un rol"}
                </Text>

                <Ionicons name="chevron-down" size={20} color="#FFFFFF" />
              </Pressable>
            </View>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <TouchableOpacity
              disabled={!email || !password}
              style={
                !email || !password ? styles.buttonDisabled : styles.button
              }
              onPress={() => handleRegister(nombre, email, password, rol)}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color="#0b0fff" />
              ) : (
                <Text>Entrar</Text>
              )}
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿Aún no tienes cuenta?</Text>
              <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                <Text style={styles.registerLink}>Inicia Sesíon</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <TouchableOpacity
            style={styles.modalContent}
            onPress={(event) => event.stopPropagation()}
          >
            <Text style={styles.modalTitle}>Selecciona un rol</Text>

            {[
              { label: "Usuario", value: "usuario", icon: "person-outline" },
              {
                label: "Administrador",
                value: "admin",
                icon: "shield-checkmark-outline",
              },
            ].map((opcion) => (
              <Pressable
                key={opcion.value}
                style={({ pressed }) => [
                  styles.option,
                  pressed && styles.optionPressed,
                ]}
                onPress={() => {
                  setRol(opcion.value);
                  setModalVisible(false);
                }}
              >
                <Ionicons name={opcion.icon} size={22} color="#FFFFFF" />

                <Text style={styles.optionText}>{opcion.label}</Text>
              </Pressable>
            ))}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
    height: "25%",
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
    padding: 15,
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

  selectContainer: {
  backgroundColor: "#515350",
  borderRadius: 10,
  overflow: "hidden",
},

selectButton: {
  minHeight: 55,
  paddingHorizontal: 15,
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
},

selectText: {
  flex: 1,
  color: "#FFFFFF",
  fontSize: 16,
},

modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
},

modalContent: {
  width: "100%",
  maxWidth: 380,
  backgroundColor: "#292B2A",
  borderRadius: 18,
  padding: 20,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.12)",
},

modalTitle: {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 14,
},

option: {
  minHeight: 54,
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  paddingHorizontal: 12,
  borderRadius: 10,
},

optionPressed: {
  backgroundColor: "#515350",
},

optionText: {
  flex: 1,
  color: "#FFFFFF",
  fontSize: 16,
},

cancelButton: {
  marginTop: 12,
  paddingVertical: 13,
  alignItems: "center",
  backgroundColor: "#515350",
  borderRadius: 10,
},

cancelText: {
  color: "#FFFFFF",
  fontWeight: "600",
  fontSize: 15,
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
    backgroundColor: "#515350",
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
    padding: 5,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
});
