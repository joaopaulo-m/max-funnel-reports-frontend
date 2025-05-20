'use server'

import { revalidateTag } from "next/cache"

import serverAxios from "@/lib/axios-server"

export async function deleteReportDayAction(report_day_id: string) {
  try {
    await serverAxios({
      url: "/report-days/" + report_day_id,
      method: "DELETE",
    })

    revalidateTag("company")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Erro ao deletar dia de relatório' }
  }
}