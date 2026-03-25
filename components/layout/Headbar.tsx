"use client"

import React, { useState } from "react"
import { Search, Globe, ChevronRight } from "lucide-react"
import { useLanguageStore } from "@/store/useLanguageStore"
import { ProfileSettingsModal } from "./ProfileSettingsModal"
import Link from "next/link"

interface HeadbarProps {
  breadcrumbs?: { label: string; href?: string }[];
  title?: string;
  showFactoryFilter?: boolean;
  showDateFilter?: boolean;
}

export function Headbar({ breadcrumbs, title }: HeadbarProps) {
  const { lang, setLang, isTH } = useLanguageStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const renderBreadcrumbs = (items: { label: string; href?: string }[] | undefined, isMobile: boolean) => {
    if (items && items.length > 0) {
      return items.map((bc, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && (
            isMobile ? (
              <span className="text-slate-300 font-normal mx-0.5">/</span>
            ) : (
              <ChevronRight className="w-5 h-5 text-slate-300 mx-1" />
            )
          )}
          {bc.href ? (
            <Link href={bc.href} className="hover:text-blue-600 transition-colors">{bc.label}</Link>
          ) : (
            <span className={idx === items.length - 1 ? "text-slate-900" : "text-slate-500"}>{bc.label}</span>
          )}
        </React.Fragment>
      ));
    }
    
    if (title) {
      return <span className="text-slate-900">{title}</span>;
    }

    return null;
  };

  return (
    <header className="sticky top-0 z-30 flex flex-col md:flex-row min-h-[5rem] h-auto w-full items-center bg-white shadow-sm md:shadow-none dynamic-pl border-b border-slate-100">
      
      {/* Mobile Top Row */}
      <div className="flex w-full md:w-auto items-center justify-between md:justify-start md:border-none px-4 md:px-8 py-4 md:py-0">
        
        {/* Breadcrumbs/Title for Mobile */}
        <div className="md:hidden flex flex-wrap items-center gap-1.5 text-lg font-bold text-slate-900">
          {renderBreadcrumbs(breadcrumbs, true)}
        </div>

        {/* Mobile User Avatar & Lang */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <button 
            onClick={() => setLang(isTH ? "EN" : "TH")}
            className="flex items-center p-2 text-slate-600 rounded-full"
          >
            <Globe className="w-5 h-5" />
            <span className="font-semibold text-xs ml-1">{lang}</span>
          </button>
          <button 
            onClick={() => setIsProfileModalOpen(true)}
            className="w-10 h-10 rounded-full bg-slate-200" 
          />
        </div>
      </div>

      {/* Main Header Content */}
      <div className="hidden md:flex flex-1 items-center justify-between px-8 w-full">
        
        {/* Desktop Breadcrumbs */}
        <div className="flex items-center gap-2 text-xl font-bold text-slate-800 tracking-tight">
          {renderBreadcrumbs(breadcrumbs, false)}
        </div>

        {/* Right section: Search and Actions */}
        <div className="flex flex-row items-center gap-4 text-sm py-4">
          
          {/* Search Input */}
          <div className="relative flex items-center w-64">
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={isTH ? "ค้นหาที่นี่..." : "Search here..."}
              className="h-10 pl-9 pr-4 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition-shadow"
            />
          </div>

          {/* Desktop User Avatar & Lang */}
          <div className="flex items-center gap-2 ml-2">
            <button 
              onClick={() => setLang(isTH ? "EN" : "TH")}
              className="flex items-center gap-1.5 p-2 px-3 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span className="font-semibold">{lang}</span>
            </button>

            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="w-10 h-10 rounded-full bg-slate-200 hover:ring-2 hover:ring-blue-500 transition-all focus:outline-none ml-2" 
            />
          </div>
          
        </div>
      </div>

      <ProfileSettingsModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />
    </header>
  )
}
