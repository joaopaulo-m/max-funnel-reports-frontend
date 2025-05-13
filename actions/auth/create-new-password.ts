'use server'

import axios from "axios";

import type { CreateNewPasswordSchemaType } from "@/schemas/forms/create-new-password";

export async function createNewPasswordAction(data: CreateNewPasswordSchemaType) {
  try {
    await axios.post(process.env.API_URL + "/auth/create-password/new", {
      token: data.token,
      password: data.password
    });

    return {
      success: true,
    }
  } catch (error: any) {
    console.log(error)
    return { success: false, message: error.response?.data?.message || 'Erro ao criar nova senha' }
  }
}