'use server'

import { cookies } from "next/headers";
import { refreshUserAction } from "../user/refresh";

export async function fetchClientsAction() {
  try {
    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")?.value

    const refreshUserResult = await refreshUserAction()

    if (refreshUserResult instanceof Error) {
      return []
    }

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${access_token}`)

    const res = await fetch(
      process.env.API_URL + "/clients/companies/" + refreshUserResult.user.company_id, 
      { 
        method: "GET",
        headers,
        next: {
          tags: ["clients"]
        } 
      }
    )

    if (res.status !== 200) {
      return []
    }

    const { items } = await res.json()
    return items;
  } catch (error: any) {
    console.log(error)
    return []
  }
}