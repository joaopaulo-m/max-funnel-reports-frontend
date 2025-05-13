'use server'

import { cookies } from "next/headers";

export async function fetchUsersAction(company_id: string) {
  try {
    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")?.value


    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${access_token}`)

    const res = await fetch(
      process.env.API_URL + "/users/companies/" + company_id, 
      { 
        method: "GET",
        headers,
        next: {
          tags: ["users"]
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