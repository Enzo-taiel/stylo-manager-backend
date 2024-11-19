import { WHATSAPP_ENV } from "../config/variables"
import { formatDate } from "../helpers/formatDate"

const WspApiVersion = "v21.0"
const IdentifierPhoneWspId = WHATSAPP_ENV.PHONE_IDENTIFIER_WHATSAPP
const AccessTokenWsp = WHATSAPP_ENV.WHATSAPP_ACCESS_TOKEN

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${AccessTokenWsp}`
}

export const SendWhatsappSavedAppointmentSuccessfully = async ({ phone, clientName, employeeName, appointmentDate, appointmentHour }: any) => {

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
      headers,
      body: JSON.stringify(body)
    })
    const response = await res.json()
    console.log(response)
    return { data: response }
  } catch (error) {
    console.log("error al enviar whatsapp.")
    return { error }
  }
}

export const sendWspCancelAppointmentSuccessfully = async ({ phone, clientName, employeeName }: any) => {

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
      headers,
      body: JSON.stringify(body)
    })
    const response = await res.json()
    console.log(response)
    return { data: response }
  } catch (error) {
    console.log("error al enviar whatsapp.")
    return { error }
  }
}