'use server'

import { revalidateTag } from "next/cache"

import serverAxios from "@/lib/axios-server"
import type { User } from "@/types/user"

interface UpdateUserProps {
  current_user: User
  user_id: string
  name?: string
  email?: string
  permission_type?: string
}

export async function updateUserAction(data: UpdateUserProps) {
  try {
    await serverAxios({
      url: "/users/" + data.user_id,
      method: "PATCH",
      data: {
        name: data.current_user.name !== data.name ? data.name : undefined,
        email: data.current_user.email !== data.email ? data.email : undefined,
        permission_type: data.current_user.permission_type !== data.permission_type ? data.permission_type : undefined,
      }
    })

    revalidateTag("users")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Error ao atualizar usuário' }
  }
}