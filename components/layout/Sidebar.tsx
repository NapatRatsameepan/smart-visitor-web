"use client"

import React, { useState } from "react"
import Link from "next/link"
import { SettingsModal } from "./SettingsModal"
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
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <>
      {/* Desktop/Tablet Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-24 z-30 h-[calc(100vh-6rem)] w-28 flex-col bg-[#f4f5f7] border-none rounded-tr-3xl rounded-br-3xl py-6 px-4 items-center overflow-y-auto hide-scrollbar">
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
        
        <button 
          onClick={() => setIsSettingsModalOpen(true)}
          className="w-12 h-12 rounded-full bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex items-center h-20 px-2 overflow-x-auto hide-scrollbar gap-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pt-2 pb-safe">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={`mobile-${index}`}
              href={item.href}
              className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors mx-1 ${
                isActive
                  ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                  : "bg-transparent text-slate-500 hover:bg-slate-100"
              }`}
            >
              <item.icon className="h-6 w-6" />
            </Link>
          )
        })}
        <div className="shrink-0 w-[2px] h-8 bg-slate-200 mx-1" />
        <button 
          onClick={() => setIsSettingsModalOpen(true)}
          className="shrink-0 w-12 h-12 rounded-full bg-transparent text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors mx-1"
        >
          <Settings className="h-6 w-6" />
        </button>
      </nav>

      <SettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)} 
      />
    </>
  )
}
