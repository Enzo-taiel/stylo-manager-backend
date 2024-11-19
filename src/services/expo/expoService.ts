// expoService.js
import { Expo } from 'expo-server-sdk';

const expo = new Expo();

// Enviar notificación push
export const sendPushNotification = async (token: string, title: string, body: string, data = {}) => {
  if (!Expo.isExpoPushToken(token)) {
    console.error(`Invalid token for send notification with expo: ${token}`);
    return;
  }

  try {
    const ticketChunk = await expo.sendPushNotificationsAsync([
      {
        to: token,
        sound: {
          critical: true,
          volume: 1
        },
        title,
        body,
        data,
      }
    ]);
    console.log('Ticket chunk:', ticketChunk);
    return ticketChunk;
  } catch (error) {
    console.error('Error to send notification with expo:', error);
  }
}
