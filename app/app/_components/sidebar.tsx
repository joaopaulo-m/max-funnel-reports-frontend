import Image from "next/image";
import Link from "next/link";
import { Funnel, HardHat, Settings, Users } from "lucide-react";

import { SidebarItem } from "./sidebar-item";

const ICON_PROPS = {
  width: 20,
  height: 20,
  color: '#14538F'
}

const Sidebar = () => {
  return ( 
    <nav className="
      w-[220px] 
      max-w-[220px] 
      min-w-[220px] 
      h-screen 
      max-h-full 
      min-h-full 
      flex 
      flex-col 
      border-r 
      px-3
      border-primary/10 
      bg-sidebar/20
    ">
      <Link href="/app" className="w-full flex justify-center items-center py-[52px]">
        <Image 
          alt="Logo"
          src="/logo.png"
          width={110}
          height={35}
        />
      </Link>
      <div className="w-full h-fit flex flex-col items-end gap-5">
        <SidebarItem 
          path="/app/clients"
          name="Clientes"
          icon={<Users {...ICON_PROPS} />}
        />
        <SidebarItem 
          path="/app/users"
          name="Colaboradores"
          icon={<HardHat {...ICON_PROPS} />}
        />
        <SidebarItem 
          path="/app/settings"
          name="Configurações"
          icon={<Settings {...ICON_PROPS} />}
        />
        <SidebarItem 
          path="/app/crm"
          name="Funil (CRM)"
          icon={<Funnel {...ICON_PROPS} />}
        />
      </div>
    </nav>
  );
}

export { Sidebar };