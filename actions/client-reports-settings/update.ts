'use server'

import { revalidateTag } from "next/cache"

import serverAxios from "@/lib/axios-server"

interface UpdateClientReportsSettingsProps {
  client_id: string
  campaigns_enabled?: boolean
  balance_enabled?: boolean
}

export async function updateClientReportsSettingsAction(data: UpdateClientReportsSettingsProps) {
  try {
    const { campaigns_enabled, balance_enabled } = data;

    await serverAxios({
      url: "/clients-reports-settings/clients/" + data.client_id,
      method: "PATCH",
      data: {
        campaigns_enabled,
        balance_enabled
      }
    })

    revalidateTag("clients")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Error ao atualizar relatório' }
  }
}