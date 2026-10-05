import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Form() {
  const [value, setValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const guardar = () => {
    if (value.trim() === "") return;
    setFinalValue(value);
  };
  return (
    <LinearGradient
      colors={["#0f172a", "#1e1b4b", "#000000"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <BlurView tint="dark" intensity={40} style={styles.contentContainer}>
          <Text style={styles.titleText}>Formulario</Text> 
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Ingrese algo"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={value}
              onChangeText={setValue}
            />
            {value !== "" && (
              <TouchableOpacity
                onPress={() => setValue("")}
                style={styles.cleanButton}
              >
                <SymbolView
                  name={{ ios: "clear.fill", android: "clear", web: "clear" }}
                  size={20}
                  tintColor="#FFFFFF"
                />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={guardar}
            activeOpacity={0.7}
          >
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </BlurView>
        {finalValue !== "" && (
          <BlurView tint="dark" intensity={40} style={styles.contentContainer}>
            <Text style={styles.titleText}>Respuesta</Text>
            <Text style={styles.resultText}> {finalValue} </Text>
          </BlurView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, padding: 20, gap: 30 },
  contentContainer: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    padding: 24,
    gap: 20,
    overflow: "hidden",
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    display: "flex",
    justifyContent: "center"
  },
  textInput: {
    paddingVertical: 14,
    paddingLeft: 14,
    paddingRight: 50,
    color: "#FFFFFF",
    fontSize: 18,
  },
  cleanButton: {
    position: "absolute",
    right: 10,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#6366F1",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: { color: "#FFFFFF", fontSize: 17, fontWeight: "600" },
  resultText: { color: "#FFFFFF", fontSize: 20, textAlign: "center" },
});
