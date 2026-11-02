import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS, TYPOGRAPHY } from '../../../constants/theme';
import { useService } from '@/features/servicios/hooks/useService';
import {ButtonComponent} from "../../../components/form/ButtonComponent"
export default function ServicioDetalle() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const {handleGetServicioById, servicio, isLoading} = useService();

  useEffect(()=>{
    handleGetServicioById(id);
  },[id])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>{servicio?.nombre}</Text>
          <Text style={styles.idText}>ID del Servicio: #{servicio?.id}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Precio estimado:</Text>
            <Text style={styles.precio}>RD${servicio?.precio}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Duración aprox:</Text>
            <Text style={styles.value}>{servicio?.duracion} minutos</Text>
          </View>

          <View style={styles.divider} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción del Servicio</Text>
          <Text style={styles.descripcion}>{servicio?.descripcion}</Text>
        </View>
        <ButtonComponent text="Reservar" isLoading={isLoading} action={() => router.push({pathname:"/(app)/reservas/nueva", params:{id: servicio.id} })}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.mist,
    paddingTop: 50,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontFamily: TYPOGRAPHY.fonts.dmSans.bold,
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.button.fontSize,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: TYPOGRAPHY.paddings.heroTitle,
  },
  title: {
    fontFamily: TYPOGRAPHY.fonts.sora.semibold,
    fontSize: TYPOGRAPHY.sizes.heroTitle.fontSize,
    lineHeight: TYPOGRAPHY.sizes.heroTitle.lineHeight,
    color: COLORS.ink,
    marginBottom: 6,
  },
  idText: {
    fontFamily: TYPOGRAPHY.fonts.dmSans.regular,
    fontSize: TYPOGRAPHY.sizes.supportText.fontSize,
    color: COLORS.muted,
  },
  card: {
    backgroundColor: COLORS.field,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.line,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: TYPOGRAPHY.fonts.dmSans.regular,
    fontSize: TYPOGRAPHY.sizes.label.fontSize,
    color: COLORS.body,
  },
  value: {
    fontFamily: TYPOGRAPHY.fonts.dmSans.medium,
    fontSize: TYPOGRAPHY.sizes.input.fontSize,
    color: COLORS.ink,
  },
  precio: {
    fontFamily: TYPOGRAPHY.fonts.sora.bold,
    fontSize: 18,
    color: COLORS.lagoon,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.line,
    marginVertical: 14,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fonts.sora.semibold,
    fontSize: 16,
    color: COLORS.ink,
    marginBottom: 10,
  },
  descripcion: {
    fontFamily: TYPOGRAPHY.fonts.dmSans.regular,
    fontSize: TYPOGRAPHY.sizes.supportTextLarge.fontSize,
    color: COLORS.body,
    lineHeight: 22,
  },
});