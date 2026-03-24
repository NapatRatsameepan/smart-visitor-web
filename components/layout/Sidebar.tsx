"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LineChart,
  ArrowLeftRight,
  Home,
  ShieldCheck,
  AtSign,
  GitBranch,
  Flag,
  User,
  Settings,
} from "lucide-react"

const menuItems = [
  { icon: LineChart, href: "/dashboard" },
  { icon: ArrowLeftRight, href: "/history" },
  { icon: Home, href: "/factory" },
  { icon: ShieldCheck, href: "/guard" },
  { icon: AtSign, href: "/brand" },
  { icon: GitBranch, href: "/department" },
  { icon: Flag, href: "/visit" },
  { icon: User, href: "/admin" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-24 z-30 h-[calc(100vh-6rem)] w-28 flex-col flex bg-[#f4f5f7] border-none rounded-tr-3xl rounded-br-3xl py-6 px-4 items-center overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex flex-col gap-4 w-full items-center min-h-max pb-12">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={index}
              href={item.href}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isActive
                  ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          )
        })}
        
        <div className="w-8 h-px bg-slate-300 my-2" />
        
        <button className="w-12 h-12 rounded-full bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </aside>
  )
}
