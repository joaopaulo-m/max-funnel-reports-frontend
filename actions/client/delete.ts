'use server'

import { revalidateTag } from "next/cache"

import serverAxios from "@/lib/axios-server"

export async function deleteClientAction(client_id: string) {
  try {
    await serverAxios({
      url: "/clients/" + client_id,
      method: "DELETE",
    })

    revalidateTag("clients")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Error ao deletar cliente' }
  }
}