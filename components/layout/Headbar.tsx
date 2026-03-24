"use client"

import React from "react"
import { Building2, Calendar, Search, Globe, ChevronDown, ShieldHalf } from "lucide-react"
import { useLanguageStore } from "@/store/useLanguageStore"

interface HeadbarProps {
  title: string;
  showFactoryFilter?: boolean;
  showDateFilter?: boolean;
}

export function Headbar({ title, showFactoryFilter = true, showDateFilter = true }: HeadbarProps) {
  const { lang, setLang, isTH } = useLanguageStore();

  return (
    <header className="sticky top-0 z-40 flex h-24 w-full items-center bg-white">
      {/* Logo Area - Fixed width to match Sidebar */}
      <div className="w-28 flex items-center justify-center shrink-0 bg-white">
        <div className="flex flex-col items-center justify-center border border-blue-200 rounded-md p-1 min-w-[70px] text-center bg-white">
          <ShieldHalf className="w-8 h-8 text-slate-800" />
          <span className="text-[9px] font-bold text-slate-900 mt-1 leading-tight tracking-tighter">
            SECURITY GUARD<br />SMART VISITOR
          </span>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="flex-1 flex items-center justify-between px-8">
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

      {/* Right section: Filters and Actions */}
      <div className="flex items-center gap-4 text-sm">
        {/* Factory Dropdown */}
        {showFactoryFilter && (
          <button className="flex items-center gap-2 border border-slate-300 rounded-full h-10 px-4 bg-white text-slate-700 hover:bg-slate-50 transition-colors">
            <Building2 className="w-4 h-4 text-slate-500" />
            <span className="font-medium mr-2">Factory</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>
        )}

        {/* Date Dropdown */}
        {showDateFilter && (
          <button className="flex items-center gap-2 border border-slate-300 rounded-full h-10 px-4 bg-white text-slate-700 hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className="font-medium mr-2">Month - Month</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>
        )}

        {/* Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={isTH ? "ค้นหาที่นี่..." : "Search here..."}
            className="h-10 pl-9 pr-4 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-56"
          />
        </div>

        {/* Language/Globe Icon */}
        <button 
          onClick={() => setLang(isTH ? "EN" : "TH")}
          className="flex items-center gap-1.5 p-2 px-3 ml-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <Globe className="w-5 h-5" />
          <span className="font-semibold">{lang}</span>
        </button>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-slate-200 ml-2" />
      </div>
    </div>
  </header>
  )
}
