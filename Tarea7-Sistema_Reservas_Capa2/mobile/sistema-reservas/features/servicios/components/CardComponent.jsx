import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const CardComponent = ({ item, onDelete, isLoading }) => {
  const {user} = useAuth();
  return (
    <Pressable
      onPress={() => router.push(`/(app)/servicios/${item.id}`)}
      accessibilityRole="button"
      style={({ pressed }) => [
        s.card,
        pressed && { transform: [{ scale: 0.985 }] },
      ]}
    >
      <View style={s.cardTop}>
        <Text style={s.cardName} numberOfLines={1}>
          {item.nombre}
        </Text>

        {user.rol === "admin" && (
          <View style={s.actionsContainer}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(app)/servicios/new",
                  params: { servicioParam: JSON.stringify(item) },
                })
              }
              style={[s.actionButton, s.editButton]}
              accessibilityRole="button"
              accessibilityLabel="Editar"
            >
              <Text style={s.editText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onDelete(item.id)}
              disabled={isLoading}
              style={[s.actionButton, s.deleteButton]}
              accessibilityRole="button"
              accessibilityLabel="Eliminar"
            >
              <Text style={s.deleteText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={s.cardDescription} numberOfLines={2}>
        {item.descripcion}
      </Text>

      <View style={s.cardBottom}>
        <Text style={s.cardPrice}>
          {"RD$ " + String(item.precio)}
        </Text>
        <View style={s.chip}>
          <View style={s.chipDot} />
          <Text style={s.chipText}>{item.duracion} min</Text>
        </View>
      </View>
    </Pressable>
  );
};

const s = StyleSheet.create({
  card: {
    backgroundColor: "#F6F8FC",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DCE3EE",
    padding: 18,
    marginBottom: 14,
    shadowColor: "#0B2E52",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 2,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  cardName: {
    flex: 1,
    fontSize: 17,
    fontFamily: "Sora-SemiBold",
    color: "#0B1B2B",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#EBF1FF",
  },
  editText: {
    fontSize: 12,
    fontFamily: "DMSans-Bold",
    color: "#2F6BFF",
  },
  deleteButton: {
    backgroundColor: "#FFEBEB",
  },
  deleteText: {
    fontSize: 12,
    fontFamily: "DMSans-Bold",
    color: "#FF4D4D",
  },
  cardDescription: {
    fontSize: 13.5,
    lineHeight: 20,
    fontFamily: "DMSans-Regular",
    color: "#4A5B70",
    marginTop: 8,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  cardPrice: {
    fontSize: 16,
    fontFamily: "Sora-Bold",
    color: "#2F6BFF",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#F2F5FA",
    borderWidth: 1,
    borderColor: "#DCE3EE",
  },
  chipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#14C8B0",
  },
  chipText: {
    fontSize: 13.5,
    fontFamily: "DMSans-Medium",
    color: "#4A5B70",
  },
});