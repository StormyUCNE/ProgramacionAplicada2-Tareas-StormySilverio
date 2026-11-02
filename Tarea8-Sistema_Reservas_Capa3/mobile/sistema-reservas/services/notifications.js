import { setNotificationHandler } from "expo-notifications/build/NotificationsHandler";
import { requestPermissionsAsync } from "expo-notifications/build/NotificationPermissions";
import { scheduleNotificationAsync } from "expo-notifications/build/scheduleNotificationAsync";
import { SchedulableTriggerInputTypes } from "expo-notifications/build/Notifications.types";
import { cancelScheduledNotificationAsync } from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const clave = (reservaId) => `notif_reserva_${reservaId}`;

export const tienePermiso = async () => {
  const { granted, canAskAgain } = await requestPermissionsAsync();
  if (!granted) {
    console.warn(
      `Permiso de notificaciones denegado${canAskAgain ? "" : " (actívalo en Ajustes > Apps > Expo Go > Notificaciones)"}`,
    );
  }
  return granted;
};

export const notificarReserva = async (reserva) => {
  try {
    if (!(await tienePermiso())) return null;
    const base = new Date(reserva.fecha);
    const [horas, minutos] = reserva.hora.split(":").map(Number);
    const VEINTICUATRO_HORAS = 24 * 60 * 60 * 1000;
    const fechaReserva = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate(),
      horas,
      minutos,
    );
    const diferenciaHoy = fechaReserva.getTime() - new Date().getTime();
    if(diferenciaHoy < VEINTICUATRO_HORAS){
        return null;
    }
    const fechaAviso = new Date(fechaReserva.getTime() - VEINTICUATRO_HORAS);
    const notificationId = await scheduleNotificationAsync({
      content: {
        title: "Reserva próxima",
        body: `Su reserva ${reserva.servicio.nombre ?? ""} está próxima.`,
      },
      trigger: { type: SchedulableTriggerInputTypes.DATE, date: fechaAviso },
    });
    await AsyncStorage.setItem(clave(reserva.id), notificationId);
    return notificationId;
  } catch (error) {
    console.warn("No se pudo programar la notificación:", error);
  }
};

export const cancelarNotification =async(reservaId)=>{
    try {
        const notiId = await AsyncStorage.getItem(clave(reservaId));
        if (!notiId) return;
        await cancelScheduledNotificationAsync(notiId);
        await AsyncStorage.removeItem(clave(reservaId));
    } catch (error) {
        console.warn("No se pudo cancelar la notificación:", error);
    }
}