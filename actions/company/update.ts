'use server'

import { revalidateTag } from "next/cache"

import serverAxios from "@/lib/axios-server"
import type { UpdateCompanySchemaType } from "@/schemas/forms/update-company"

type UpdateCompanyProps = UpdateCompanySchemaType & {
  company_id: string
} 

export async function updateCompanyAction(data: UpdateCompanyProps) {
  try {
    await serverAxios({
      url: "/companies/" + data.company_id,
      method: "PATCH",
      data: {
        meta_account_id: data.meta_account_id,
        meta_token: data.meta_token,
        report_day_of_month: Number(data.report_day_of_month),
        report_lookback_limit: Number(data.report_lookback_limit)
      }
    })

    revalidateTag("company")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Error ao atualizar configurações' }
  }
}