import { useAuth } from "@/contexts/AuthContext";
import { useTareas } from "@/contexts/TareaContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  bg: "#F4F5FA",
  card: "#FFFFFF",
  ink: "#14182B",
  muted: "#7A7F96",
  hero: "#1B2142",
  heroSoft: "#2A3262",
  accent: "#8B7CFF",
  mint: "#3DDC97",
  mintSoft: "#E3F8EE",
  amber: "#FFB547",
  amberSoft: "#FFF3DE",
};

export default function Home() {
  const { token, user, isCheckingSession, handleLogout } = useAuth();
  const { tareas, createTarea, updateTarea, deleteTarea, isLoading, error } = useTareas();
  const [titulo, setTitulo] = useState("");

  
  useEffect(() => {
    if (!isCheckingSession && !token) {
      router.replace("/(auth)/login");
      return;
    }
  }, [isCheckingSession, token]);

  if (isCheckingSession) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  const completed = tareas.filter((t) => t.completada).length;
  const pending = tareas.length - completed;
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <SafeAreaView edges={["top"]}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.greeting}>Hola, {user?.nombre}</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ingrese tarea"
              placeholderTextColor="#FFFF"
              value={titulo}
              onChangeText={setTitulo}
            />
            <TouchableOpacity
              onPress={async () => {
                await createTarea(titulo);
                setTitulo("");
              }}
              disabled={titulo === ""}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color="#FFFF" />
              ) : (
                <Ionicons
                  name="send-outline"
                  color={!titulo ? "#9cab92" : "#FFFF"}
                  size={24}
                />
              )}
            </TouchableOpacity>
          </View>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </SafeAreaView>
      </View>

      <View style={styles.statusRow}>
        <View style={[styles.statusCard, { backgroundColor: COLORS.mintSoft }]}>
          <View style={[styles.statusIcon, { backgroundColor: COLORS.mint }]}>
            <Ionicons name="checkmark" />
          </View>
          <Text style={styles.statusNumber}>{completed}</Text>
          <Text style={styles.statusLabel}>Completadas</Text>
        </View>
        <View
          style={[styles.statusCard, { backgroundColor: COLORS.amberSoft }]}
        >
          <View style={[styles.statusIcon, { backgroundColor: COLORS.amber }]}>
            <SymbolView name="clock.fill" size={18} tintColor="#fff" />
          </View>
          <Text style={styles.statusNumber}>{pending}</Text>
          <Text style={styles.statusLabel}>Pendientes</Text>
        </View>
      </View>
      <FlatList
        data={tareas}
        keyExtractor={(t) => t.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={async () => await updateTarea(item.id)}
            style={({ pressed }) => [
              styles.task,
              pressed && styles.taskPressed,
            ]}
          >
            <View style={styles.infoTask}>
              <View style={[styles.check, item.completada && styles.checkDone]}>
                {item.completada && <Ionicons name="checkmark" />}
              </View>
              <View style={styles.taskBody}>
                <Text
                  style={[styles.taskTitle, item.done && styles.taskTitleDone]}
                >
                  {item.titulo}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={async () => await deleteTarea(item.id)}
            >
              <Ionicons name="trash" size={24} />
            </TouchableOpacity>
          </Pressable>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#365CFF",
  },
  container: { flex: 1, backgroundColor: COLORS.bg },
  listContent: { paddingBottom: 120 },
  hero: {
    backgroundColor: "#365CFF",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 22,
    paddingBottom: 26,
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  greeting: { color: "#fff", fontSize: 30, fontWeight: "800", marginTop: 2 },

  inputContainer: {
    backgroundColor: COLORS.heroSoft,
    borderRadius: 22,
    padding: 18,
    marginTop: 22,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  input: {
    color: "#FFFF",
    flex: 1,
  },

  statusRow: {
    flexDirection: "row",
    gap: 14,
    paddingHorizontal: 22,
    marginTop: 22,
    marginBottom: 20,
  },
  statusCard: { flex: 1, borderRadius: 22, padding: 16 },
  statusIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  statusNumber: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.ink,
    marginTop: 12,
  },
  statusLabel: { fontSize: 14, color: COLORS.muted, marginTop: 2 },

  task: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    marginHorizontal: 22,
    marginBottom: 12,
    padding: 16,
    borderRadius: 20,
    shadowColor: "#1B2142",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  infoTask: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },

  deleteButton: {
    width: 40,
    height: 40,
    marginLeft: 12,
    borderRadius: 12,
    backgroundColor: "#FCE8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  taskPressed: { opacity: 0.8 },
  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "#CBCFE4",
    alignItems: "center",
    justifyContent: "center",
  },
  checkDone: { backgroundColor: COLORS.mint, borderColor: COLORS.mint },
  taskBody: { flex: 1, marginLeft: 14 },
  taskTitle: { fontSize: 16, fontWeight: "600", color: COLORS.ink },
  taskTitleDone: { color: COLORS.muted, textDecorationLine: "line-through" },
  fab: {
    position: "absolute",
    right: 22,
    bottom: 35,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#365CFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    elevation: 10,
  },
  errorContainer: {
    padding: 10,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
});
