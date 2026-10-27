import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreateAndEditSercviceCompo } from "../../../components/ui/CreateAndEditSercviceCompo";
import { useService } from "../../../features/servicios/hooks/useService";
import THEME from "@/constants/theme.js";
const { colors, typography } = THEME;
export default function CrearServicio() {
  const { servicioParam } = useLocalSearchParams();
  const { setError } = useService();

  const limpiarInputs = () => {
    setFormulario({
      id: null,
      nombre: "",
      descripcion: "",
      duracion: "",
      precio: "",
    });
  };
  
  useFocusEffect(
    useCallback(() => {
      setError(null);
      if (!servicioParam) {
        limpiarInputs();
        return;
      }
      try {
        const servicio = JSON.parse(servicioParam);
        setFormulario({
          id: servicio.id ?? null,
          nombre: servicio.nombre ?? "",
          descripcion: servicio.descripcion ?? "",
          duracion: String(servicio.duracion ?? ""),
          precio: String(servicio.precio ?? ""),
        });
      } catch (error) {
        console.error("Error al recuperar el servicio:", error);
      }
    }, [servicioParam]),
  );

  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    duracion: "",
    precio: "",
  });

  return (
    <SafeAreaView style={s.display} edges={["top"]}>
      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={s.container}>
          <View style={s.hero}>
            <Text style={s.title}>
              {servicioParam ? "Editar servicio" : "Nuevo servicio"}
            </Text>
            <Text style={s.subtitle}>
              Completa los datos para publicarlo en tu lista de servicios.
            </Text>
          </View>

          <CreateAndEditSercviceCompo
            formulario={formulario}
            setFormulario={setFormulario}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  display: {
    backgroundColor: colors.mist,
    flex: 1,
  },

  flex: {
    flex: 1,
  },

  container: {
    flex: 1,
    gap: 20,
  },

  // Hero
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 14,
  },

  backText: {
    fontSize: typography.sizes.button.fontSize,
    fontFamily: typography.fonts.dmSans.bold,
    color: colors.primary,
  },

  // Título
  title: {
    ...typography.sizes.heroTitle,
    color: colors.ink,
    fontFamily: typography.fonts.sora.bold,
  },

  // Descripción
  subtitle: {
    fontSize: typography.sizes.supportTextLarge.fontSize,
    lineHeight: 22,
    color: colors.body,
    fontFamily: typography.fonts.dmSans.regular,
    marginTop: 8,
  },
});
