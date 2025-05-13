'use server'

import serverAxios from "@/lib/axios-server";
import type { CreatePasswordSchemaType } from "@/schemas/forms/create-password";

export async function createPasswordAction(data: CreatePasswordSchemaType) {
  try {
    await serverAxios({
      url: "/auth/create-password",
      method: "POST",
      data: {
        password: data.password
      }
    })

    return {
      success: true,
    }
  } catch (error: any) {
    console.log(error.request)
    return { success: false, message: error.response?.data?.message || 'Erro ao criar senha' }
  }
}