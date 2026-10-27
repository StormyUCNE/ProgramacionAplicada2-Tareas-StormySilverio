
import { useAuth } from "@/contexts/AuthContext";
import { useReservas } from "@/features/reservas/hooks/useReserva";
import ReservaCard from "@/features/reservas/components/ReservaCard";
import THEME from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { colors, typography } = THEME;

export default function Reservas() {
  const { reservas, isLoading, handleCancelReserva, handleCompleteReserva} = useReservas();

  if (isLoading) {
    return (
      <SafeAreaView style={[s.display, s.centered]} edges={["top"]}>
        <ActivityIndicator size="large" color={colors.ink} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.display} edges={["top"]}>
      <FlatList
        data={reservas}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.listContent}
        renderItem={({ item }) => (
          <ReservaCard item={item} onCancel={handleCancelReserva} onCompleted={handleCompleteReserva}/>
        )}
        ListHeaderComponent={
          <View>
            <View style={s.sectionRow}>
              <View>
                <Text style={s.sectionTitle}>Mis Reservas</Text>
                <Text style={s.sectionSub}>
                  {reservas?.length ?? 0}{" "}
                  {(reservas?.length ?? 0) === 1
                    ? "reserva registrada"
                    : "reservas registradas"}
                </Text>
              </View>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  display: {
    flex: 1,
    backgroundColor: colors.mist,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    flexGrow: 1,
  },

  hero: {
    backgroundColor: colors.heroBackground,
    borderRadius: 28,
    padding: 24,
    overflow: "hidden",
    marginBottom: 28,
  },

  circleA: {
    position: "absolute",
    top: -70,
    right: -50,
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: colors.gradientMedium,
  },

  circleB: {
    position: "absolute",
    bottom: -50,
    right: 40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.lagoon,
    opacity: 0.18,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.lagoon,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 17,
    fontFamily: typography.fonts.sora.bold,
    color: colors.ink,
  },

  userInfo: {
    flex: 1,
  },

  helloText: {
    fontSize: 12.5,
    fontFamily: typography.fonts.dmSans.regular,
    color: colors.line,
  },

  userName: {
    fontSize: 16,
    fontFamily: typography.fonts.sora.semibold,
    color: colors.mist,
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.10)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  heroTitle: {
    ...typography.sizes.heroTitle,
    fontFamily: typography.fonts.sora.bold,
    color: colors.mist,
    maxWidth: 300,
  },

  heroSub: {
    fontSize: typography.sizes.supportTextLarge.fontSize,
    lineHeight: 22,
    fontFamily: typography.fonts.dmSans.regular,
    color: colors.line,
    marginTop: 10,
    maxWidth: 300,
  },

  sectionRow: {
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: typography.fonts.sora.bold,
    color: colors.ink,
  },

  sectionSub: {
    marginTop: 5,
    fontSize: typography.sizes.supportText.fontSize,
    fontFamily: typography.fonts.dmSans.regular,
    color: colors.body,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E7ECF4",
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 24,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 17,
    fontFamily: typography.fonts.sora.semibold,
    color: colors.ink,
    textAlign: "center",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: typography.fonts.dmSans.regular,
    color: colors.body,
    textAlign: "center",
  },
});
