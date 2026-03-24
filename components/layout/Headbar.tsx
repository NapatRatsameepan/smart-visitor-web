"use client"

import React, { useState } from "react"
import { Building2, Calendar, Search, Globe, ChevronDown } from "lucide-react"
import { useLanguageStore } from "@/store/useLanguageStore"
import { ProfileSettingsModal } from "./ProfileSettingsModal"

interface HeadbarProps {
  title: string;
  showFactoryFilter?: boolean;
  showDateFilter?: boolean;
}

export function Headbar({ title, showFactoryFilter = true, showDateFilter = true }: HeadbarProps) {
  const { lang, setLang, isTH } = useLanguageStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex flex-col md:flex-row min-h-[6rem] h-auto w-full items-center bg-white border-b border-slate-100 shadow-sm md:shadow-none">
      
      {/* Mobile Top Row & Desktop Logo */}
      <div className="flex w-full md:w-auto items-center justify-between md:justify-start border-b border-slate-100 md:border-none">
        {/* Logo Area */}
        <div className="w-20 md:w-28 h-16 md:h-24 flex items-center justify-center shrink-0 bg-white ml-2 md:ml-0">
          <img 
            src="/logo.svg" 
            alt="Security Guard Smart Visitor" 
            className="w-[50px] md:w-[70px] h-auto object-contain cursor-pointer" 
          />
        </div>

        {/* Mobile Title */}
        <h1 className="md:hidden text-xl font-bold text-slate-900 mr-auto ml-2">{title}</h1>

        {/* Mobile User Avatar & Lang */}
        <div className="flex md:hidden items-center gap-2 pr-4">
          <button 
            onClick={() => setLang(isTH ? "EN" : "TH")}
            className="flex items-center p-2 text-slate-600 rounded-full"
          >
            <Globe className="w-5 h-5" />
            <span className="font-semibold text-xs ml-1">{lang}</span>
          </button>
          <button 
            onClick={() => setIsProfileModalOpen(true)}
            className="w-8 h-8 rounded-full bg-slate-200" 
          />
        </div>
      </div>

      {/* Main Header Content */}
      <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-8 w-full pt-3 pb-3 md:py-0 gap-3 md:gap-0">
        
        {/* Desktop Title */}
        <h1 className="hidden md:block text-3xl font-bold text-slate-900">{title}</h1>

        {/* Right section: Filters and Actions */}
        <div className="flex flex-row flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 text-sm w-full md:w-auto">
          
          {/* Factory Dropdown */}
          {showFactoryFilter && (
            <button className="flex flex-1 md:flex-none justify-between md:justify-start items-center gap-2 border border-slate-300 rounded-full h-10 px-3 md:px-4 bg-white text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-medium mr-1 md:mr-2">Factory</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
            </button>
          )}

          {/* Date Dropdown */}
          {showDateFilter && (
            <button className="flex flex-1 md:flex-none justify-between md:justify-start items-center gap-2 border border-slate-300 rounded-full h-10 px-3 md:px-4 bg-white text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-medium mr-1 md:mr-2">Month - Month</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
            </button>
          )}

          {/* Search Input */}
          <div className="relative flex items-center w-full md:w-56 mt-1 md:mt-0">
            <Search className="absolute left-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={isTH ? "ค้นหาที่นี่..." : "Search here..."}
              className="h-10 pl-9 pr-4 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>

          {/* Desktop User Avatar & Lang */}
          <div className="hidden md:flex items-center gap-2 ml-auto md:ml-2">
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
