'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface SidebarItemProps {
  path: string
  name: string
  icon: ReactNode
}

const SidebarItem = (props: SidebarItemProps) => {
  const pathname = usePathname()

  return ( 
    <Link
      href={props.path}
      className={cn(
        "w-full h-[60px] flex items-center gap-4 text-primary px-9 rounded-xl transition",
        props.path === pathname && "bg-sidebar-foreground h-[60px]"
      )}
    >
      {props.icon}
      <span className="text-xs font-semibold">{props.name}</span>
    </Link>
  );
}

export { SidebarItem };