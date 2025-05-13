'use server'

import { revalidateTag } from "next/cache";

import serverAxios from "@/lib/axios-server";
import type { CreateClientSchemaType } from "@/schemas/forms/create-client";

export async function createClientAction(data: CreateClientSchemaType) {
  try {
    await serverAxios({
      url: "/clients",
      method: "POST",
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        meta_account_id: data.meta_account_id,
      }
    })

    revalidateTag("clients")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Erro ao criar cliente' }
  }
}