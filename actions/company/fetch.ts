'use server'

import { cookies } from "next/headers";
import { refreshUserAction } from "../user/refresh";

export async function fetchCompanyAction() {
  try {
    const getUserResult = await refreshUserAction()

    if (getUserResult instanceof Error) {
      return { success: false, message: "Erro ao pegar configurações" }
    }

    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")?.value


    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${access_token}`)

    const res = await fetch(
      process.env.API_URL + "/companies/" + getUserResult.user.company_id, 
      { 
        method: "GET",
        headers,
        next: {
          tags: ["company"]
        } 
      }
    )

    if (res.status !== 200) {
      return { success: false, message: 'Erro ao pegar configurações' }
    }

    const company = await res.json()

    return { success: true, company }
  } catch (error: any) {
    console.log(error)
    return { success: false, message: 'Erro ao pegar configurações' }
  }
}