import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/AuthContext";

export default function ReservaCard({ item, onCancel, onCompleted }) {
  const { user } = useAuth();
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmada":
      case "completada":
        return {
          label: status.toUpperCase(),
          bg: "#DCFCE7",
          text: "#166534",
          icon: "checkmark-circle-outline",
        };
      case "cancelada":
        return {
          label: "CANCELADA",
          bg: "#FEE2E2",
          text: "#991B1B",
          icon: "close-circle-outline",
        };
      case "pendiente":
      default:
        return {
          label: "PENDIENTE",
          bg: "#FEF3C7",
          text: "#92400E",
          icon: "time-outline",
        };
    }
  };

  const statusConfig = getStatusConfig(item.estado);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.servicioNombre} numberOfLines={1}>
          {item.servicio.nombre}
        </Text>
        <View style={[styles.badge, { backgroundColor: statusConfig.bg }]}>
          <Text style={[styles.badgeText, { color: statusConfig.text }]}>
            {item.estado}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={18} color="#60A5FA" />
        <Text style={styles.infoText}>
          {new Date(item.fecha).toLocaleDateString()}
        </Text>
      </View>

      {user?.rol === "admin"
        ? item.estado === "pendiente" && (
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.completeButton}
                activeOpacity={0.8}
                onPress={() => onCompleted(item.id)}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={16}
                  color="#166534"
                />
                <Text style={styles.completeButtonText}>Completar</Text>
              </TouchableOpacity>
            </View>
          )
        : item.estado === "pendiente" && (
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.8}
                onPress={() => onCancel(item.id)}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={16}
                  color="#DC2626"
                />
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  servicioNombre: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#4B5563",
    marginLeft: 8,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },

  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FECACA",
    backgroundColor: "#FEF2F2",
  },

  cancelButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#DC2626",
  },
  completeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BBF7D0",
    backgroundColor: "#F0FDF4",
  },

  completeButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#166534",
  },
});
