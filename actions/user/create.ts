'use server'

import { revalidateTag } from "next/cache";

import serverAxios from "@/lib/axios-server";
import type { CreateUserSchemaType } from "@/schemas/forms/create-user";

export async function createUserAction(data: CreateUserSchemaType) {
  try {
    await serverAxios({
      url: "/users",
      method: "POST",
      data: {
        name: data.name,
        email: data.email,
        permission_type: data.permission_type,
      }
    })

    revalidateTag("users")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Erro ao criar usuário' }
  }
}