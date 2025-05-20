'use server'

import { revalidateTag } from "next/cache"

import serverAxios from "@/lib/axios-server"
import type { CreateReportDaySchemaType } from "@/schemas/forms/create-report-day";
import { refreshUserAction } from "../user/refresh";

export async function createReportDayAction(data: CreateReportDaySchemaType) {
  try {
    const { month_day } = data;
    const refreshUserResult = await refreshUserAction()

    if (refreshUserResult instanceof Error) {
      return { success: false, message: 'Erro ao criar dia de relatório' }
    }

    await serverAxios({
      url: "/report-days/companies/" + refreshUserResult.user.company_id,
      method: "POST",
      data: {
        month_day: Number(month_day)
      }
    })

    revalidateTag("company")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Erro ao criar dia de relatório' }
  }
}