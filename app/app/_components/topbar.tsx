'use client'

import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logoutAction } from "@/actions/auth/logout";
import { useEffect, useState } from "react";
import { refreshUserAction } from "@/actions/user/refresh";
import { getInitials } from "@/utils/get-initials";

const Topbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [profileFallback, setProfileFallback] = useState("USR")

  async function onLogoutClick() {
    await logoutAction()

    router.push("/login")
  }

  useEffect(() => {
    async function defineProfile() {
      const refreshResult = await refreshUserAction()

      if (refreshResult instanceof Error) {
        return
      }

      setProfileFallback(getInitials(refreshResult.user.name))
    }

    defineProfile()
  }, [])

  return (
    <nav className="w-[90%] h-fit flex justify-between items-center">
      <span className="text-xl font-semibold">
        {pathname === "/app/clients" && "Meus clientes"}
        {pathname === "/app/users" && "Colaboradores"}
        {pathname === "/app/settings" && "Minhas configurações"}
      </span>
      <div className="w-fit h-fit flex items-center gap-6">
        <button 
          onClick={onLogoutClick} 
          className="cursor-pointer"
        >
          <LogOut className="rotate-[180deg]" width={20} height={20} />
        </button>
        <Avatar className="w-10 h-10">
          <AvatarFallback>
            {profileFallback}
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}

export { Topbar };