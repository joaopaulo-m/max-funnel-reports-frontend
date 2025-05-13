'use server'

import axios from 'axios'
import { cookies } from 'next/headers';

import type { LoginSchemaType } from "@/schemas/forms/login";

export async function loginAction(data: LoginSchemaType) {
  try {
    const { data: response } = await axios.post(process.env.API_URL + "/auth/login", {
      email: data.email,
      password: data.password,
    })

    const cookieStore = await cookies()

    cookieStore.set('access_token', response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 15, // 15 dias
    })

    return {
      success: true
    }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Erro no login' }
  }
}