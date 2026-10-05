import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <LinearGradient 
      colors={['#0f172a', '#1e1b4b', '#000000']}
      style={style.container}
    >
      <SafeAreaView style={style.safeArea}>
        <BlurView tint="dark" intensity={40} style={style.card}>
          
          <View style={style.imageContainer}>
            <Image 
              source={require("../../assets/images/profile.jpeg")} 
              style={style.image}
            />
          </View>
          
          <View style={style.infoContainer}>
            <Text style={style.nameText}>Stormy Silverio Núñez</Text>
            <Text style={style.idText}>1000-4426</Text>
            
            <View style={style.badge}>
              <Text style={style.careerText}>Ing. Sistemas y Cómputos</Text>
            </View>
          </View>
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
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 24,   
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    padding: 24,
    gap: 30,
    overflow: "hidden",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 400
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 20
  },
  infoContainer: {
    alignItems: "center",
    gap: 12,
  },
  nameText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  idText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 18,
    letterSpacing: 2,
  },
  badge: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.4)",
    marginTop: 10,
  },
  careerText: {
    color: "#34d399",
    fontSize: 16,
    fontWeight: "600",
  },
});