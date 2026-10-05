import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Lista() {
  const listaHardCodeada = [
    { id: 1, icon: "🎨", talent: "Creativo" },
    { id: 2, icon: "😎", talent: "Guapo" },
    { id: 3, icon: "💻", talent: "FullStack" },
    { id: 4, icon: "🧠", talent: "Filósofo" },
    { id: 5, icon: "📜", talent: "Poético" },
    { id: 6, icon: "🚀", talent: "Innovador" },
    { id: 7, icon: "🏆", talent: "Competente" },
    { id: 8, icon: "⚡", talent: "Hábil" },
    { id: 9, icon: "🎯", talent: "Objetivo" },
  ];

  return (
    <LinearGradient
      colors={["#0f172a", "#1e1b4b", "#000000"]}
      style={style.container}
    >
      <SafeAreaView style={style.safeArea}>
        <BlurView tint="dark" intensity={40} style={style.contentContainer}>
          <Text style={style.titleText}>Lista de elementos</Text>
          <FlatList
            contentContainerStyle={style.infoContainer}
            data={listaHardCodeada}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={style.card}>
                 <Text style={style.nameText}>
                  {item.icon}
                </Text>
                <Text style={style.nameText}>
                  {item.talent}
                </Text>
              </View>
            )}
          />
        </BlurView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    padding: 24,
    gap: 20,
    overflow: "hidden",
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    padding: 15,
    gap: 20,
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  titleText: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoContainer: {
    alignItems: "center",
    gap: 12,
  },
  nameText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
});
