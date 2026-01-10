import { formatDate } from "../../../shared/utils/formatDate"
import { ENV } from "../../config/env"

const IdentifierPhoneWspId = ENV.WHATSAPP.PHONE_IDENTIFIER
const AccessTokenWsp = ENV.WHATSAPP.ACCESS_TOKEN
const WspApiVersion = "v21.0"

export class WhatsappService {

  static async sendWhatsappSaveAppointment({ phone, clientName, employeeName, appointmentDate, appointmentHour }: any) {

    const body = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        namespace: "35370358_ce4b_4899_bab0_8a2d6c6986bd",
        name: "appointment_success", // name of the template
        language: {
          code: "es_AR"
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: clientName
              },
              {
                type: "text",
                text: employeeName
              },
              {
                type: "text",
                text: formatDate(appointmentDate)
              },
              {
                type: "text",
                text: appointmentHour
              }
            ]
          },

        ]
      }
    }

    try {
      const res = await fetch(`https://graph.facebook.com/${WspApiVersion}/${IdentifierPhoneWspId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${AccessTokenWsp}`
        },
        body: JSON.stringify(body)
      })
      const response = await res.json()
      return response
    } catch (error) {
      throw error
    }
  }

  static async sendWhatsappCancelAppointment({ phone, clientName, employeeName }: any) {

    const body = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        namespace: "35370358_ce4b_4899_bab0_8a2d6c6986bd",
        name: "appointment_cancel",
        language: {
          code: "es_AR"
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: clientName
              },
              {
                type: "text",
                text: employeeName
              }
            ]
          },

        ]
      }
    }

    try {

      const res = await fetch(`https://graph.facebook.com/${WspApiVersion}/${IdentifierPhoneWspId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${AccessTokenWsp}`
        },
        body: JSON.stringify(body)
      })
      const response = await res.json()
      return response
    } catch (error) {
      throw error
    }
  }

}