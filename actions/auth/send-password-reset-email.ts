'use server'

import axios from "axios"

export async function sendPasswordResetEmailAction(email: string) {
  try {
    await axios.post(process.env.API_URL + "/auth/password-reset", {
      email
    })

    return {
      success: true,
    }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Erro ao enviar email' }
  }
}