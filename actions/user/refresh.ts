'use server'

import serverAxios from "@/lib/axios-server"

export async function refreshUserAction() {
  try {
    const { data } = await serverAxios({
      url: "/users/refresh",
      method: "GET",
    })

    return { user: data }
  } catch (error: any) {
    console.log(error)
    return new Error("Erro ao pegar usuário logado")
  }
}