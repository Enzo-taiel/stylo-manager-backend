import { Expo } from 'expo-server-sdk';

export class expoService {

  private static expo = new Expo()

  static checkExpoTokenBeforeSend(token: string) {
    if (!Expo.isExpoPushToken(token)) {
      console.error(`Invalid token for send notification with expo: ${token}`);
      return;
    }
  }

  // Enviar notificación push
  static async sendPushNotification(token: string, title: string, body: string, data = {}) {
    this.checkExpoTokenBeforeSend(token)

    try {
      const ticketChunk = await this.expo.sendPushNotificationsAsync([
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
}