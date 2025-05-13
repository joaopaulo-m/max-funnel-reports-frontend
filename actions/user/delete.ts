'use server'

import { revalidateTag } from "next/cache"

import serverAxios from "@/lib/axios-server"

export async function deleteUserAction(user_id: string) {
  try {
    await serverAxios({
      url: "/users/" + user_id,
      method: "DELETE",
    })

    revalidateTag("users")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Error ao deletar usuário' }
  }
}