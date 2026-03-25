"use client"

import React, { useState } from "react"
import Link from "next/link"
import { SettingsModal } from "./SettingsModal"
import { usePathname } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { useLanguageStore } from "@/store/useLanguageStore"
import { useSidebarStore } from "@/store/useSidebarStore"
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
  Sidebar as SidebarIcon,
} from "lucide-react"

const ALL_MENU_ITEMS = [
  { icon: LineChart, href: "/dashboard", roles: ['SUPER_ADMIN', 'ADMIN'], labelEn: 'Dashboard', labelTh: 'แดชบอร์ด' },
  { icon: Flag, href: "/visit", roles: ['SUPER_ADMIN', 'ADMIN'], labelEn: 'Visitors', labelTh: 'ภารกิจเยี่ยมชม' },
  { icon: ShieldCheck, href: "/guard", roles: ['SUPER_ADMIN', 'ADMIN'], labelEn: 'Security Staff', labelTh: 'รปภ.' },
  { icon: ArrowLeftRight, href: "/history", roles: ['SUPER_ADMIN', 'ADMIN'], labelEn: 'History', labelTh: 'ประวัติเข้าออก' },
  { icon: GitBranch, href: "/department", roles: ['SUPER_ADMIN', 'ADMIN'], labelEn: 'Departments', labelTh: 'แผนก' },
  { icon: Home, href: "/factory", roles: ['SUPER_ADMIN'], labelEn: 'Factories', labelTh: 'โรงงาน' },
  { icon: AtSign, href: "/brand", roles: ['SUPER_ADMIN'], labelEn: 'Brands', labelTh: 'แบรนด์' },
  { icon: User, href: "/admin", roles: ['SUPER_ADMIN', 'ADMIN'], labelEn: 'Admins', labelTh: 'ผู้ดูแลระบบ' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { role } = useAuthStore()
  const { isTH } = useLanguageStore()
  const { isExpanded, toggleSidebar } = useSidebarStore()
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  
  const menuItems = ALL_MENU_ITEMS.filter(item => item.roles.includes(role))

  return (
    <>
      {/* Global CSS for layout transitions (Desktop only > 768px) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 768px) {
          .dynamic-ml { 
            margin-left: ${isExpanded ? '16rem' : '5rem'} !important;
            transition: margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1);
          }
          .dynamic-pl { 
            padding-left: ${isExpanded ? '16rem' : '5rem'} !important; 
            transition: padding-left 300ms cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
      `}} />

      {/* Desktop/Tablet Sidebar */}
      <aside 
        className={`hidden md:flex fixed left-0 top-0 z-50 h-screen flex-col bg-[#f4f5f7] border-r border-slate-200 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}
      >
        
        {/* Top Toggle Area */}
        <div className="flex items-center px-6 h-22 shrink-0">
          <button 
            onClick={toggleSidebar}
            className="p-1.5 -ml-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Toggle Sidebar"
          >
            <SidebarIcon className="w-6 h-6 shrink-0" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-4 flex flex-col gap-1 pb-4 overflow-hidden">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 h-12 rounded-xl transition-colors shrink-0 ${
                  isExpanded ? 'px-4' : 'justify-center w-12 mx-auto'
                } ${
                  isActive
                    ? "bg-slate-100 text-slate-900 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
                }`}
                title={!isExpanded ? (isTH ? item.labelTh : item.labelEn) : undefined}
              >
                <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-blue-600" : "text-slate-500"}`} />
                {isExpanded && <span className="truncate">{isTH ? item.labelTh : item.labelEn}</span>}
              </Link>
            )
          })}
          
          <button 
            onClick={() => setIsSettingsModalOpen(true)}
            className={`flex items-center gap-3 h-12 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors text-left mt-1 shrink-0 ${
              isExpanded ? 'px-4 w-full' : 'justify-center w-12 mx-auto'
            }`}
             title={!isExpanded ? (isTH ? 'ตั้งค่า' : 'Settings') : undefined}
          >
            <Settings className="h-5 w-5 shrink-0 text-slate-500" />
            {isExpanded && <span className="truncate">{isTH ? 'ตั้งค่า' : 'Settings'}</span>}
          </button>
        </div>

        {/* Bottom User Profile */}
        <div className={`p-4 shrink-0 border-t border-slate-200 bg-[#f4f5f7] flex items-center ${isExpanded ? 'gap-3' : 'justify-center'}`}>
          <div className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center shrink-0">
            <span className="text-slate-700 font-bold text-sm">อ</span>
          </div>
          {isExpanded && (
            <div className="flex flex-col min-w-0 transition-opacity duration-300">
              <span className="text-sm font-semibold text-slate-900 truncate">อภิโชค สิมศรีแก้ว</span>
              <span className="text-xs text-slate-500 truncate">apichok1379@gmail.com</span>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Navigation (unchanged logic) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex items-center h-20 px-2 overflow-x-auto hide-scrollbar gap-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pt-2 pb-safe">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={`mobile-${index}`}
              href={item.href}
              className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors mx-1 ${
                isActive
                  ? "bg-slate-100 text-blue-600"
                  : "bg-transparent text-slate-500 hover:bg-slate-50"
              }`}
            >
              <item.icon className="h-6 w-6" />
            </Link>
          )
        })}
        <div className="shrink-0 w-[2px] h-8 bg-slate-200 mx-1" />
        <button 
          onClick={() => setIsSettingsModalOpen(true)}
          className="shrink-0 w-12 h-12 rounded-full bg-transparent text-slate-500 hover:bg-slate-50 flex items-center justify-center transition-colors mx-1"
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
