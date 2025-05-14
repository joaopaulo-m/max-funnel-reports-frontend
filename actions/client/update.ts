'use server'

import { revalidateTag } from "next/cache"

import serverAxios from "@/lib/axios-server"

interface UpdateClientProps {
  client_id: string
  current_client_email: string
  name?: string
  email?: string
  meta_account_id?: string
}

export async function updateClientAction(data: UpdateClientProps) {
  try {
    await serverAxios({
      url: "/clients/" + data.client_id,
      method: "PATCH",
      data: {
        name: data.name,
        email: data.email !== data.current_client_email ? data.email : undefined,
        meta_account_id: data.meta_account_id,
      }
    })

    revalidateTag("clients")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Error ao atualizar cliente' }
  }
}