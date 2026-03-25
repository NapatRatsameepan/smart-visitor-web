"use client"

import React, { useMemo } from "react"
import dynamic from "next/dynamic"
import { useLanguageStore } from "@/store/useLanguageStore"
import { useAuthStore } from "@/store/useAuthStore"
import { useDashboardFilterStore } from "@/store/useDashboardFilterStore"
import { regions, provinces, factories, getProvincesByRegion, getFactoriesByProvince, getFactoriesByRegion, getFilteredFactories } from "@/lib/mockFactories"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock, Map, MapPin, Building2, ChevronDown, Calendar, Users, TrendingUp, BarChart3, Activity } from "lucide-react"

// Dynamic import for Leaflet map (no SSR)
const FactoryMap = dynamic(() => import("@/components/dashboard/FactoryMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center text-slate-400">
      Loading map...
    </div>
  ),
})

export default function Dashboard() {
  const { isTH } = useLanguageStore()
  const { role } = useAuthStore()
  const { 
    selectedRegion, 
    selectedProvince, 
    selectedFactory,
    setRegion,
    setProvince,
    setFactory
  } = useDashboardFilterStore()

  // Compute multiplier based on how many factories are in scope
  const filteredDataFactories = useMemo(
    () => getFilteredFactories(selectedRegion, selectedProvince, selectedFactory),
    [selectedRegion, selectedProvince, selectedFactory]
  )

  const factoryCount = filteredDataFactories.length
  const totalFactories = 12
  const multiplier = role === 'SUPER_ADMIN'
    ? factoryCount / totalFactories
    : 0.4

  // Title with selected context
  const filterLabel = useMemo(() => {
    if (selectedFactory) {
      const f = filteredDataFactories[0]
      return f ? ` - ${isTH ? f.name : f.nameEn}` : ''
    }
    return ''
  }, [selectedFactory, filteredDataFactories, isTH])

  // Get filtered options for cascading dropdowns
  const filteredProvinces = selectedRegion ? getProvincesByRegion(selectedRegion) : provinces;
  const filteredFactories = selectedProvince
    ? getFactoriesByProvince(selectedProvince)
    : selectedRegion
      ? getFactoriesByRegion(selectedRegion)
      : factories;

  const selectBaseClass = "appearance-none border border-slate-300 rounded-full h-10 pl-9 pr-8 bg-white text-slate-700 hover:bg-slate-50 transition-all text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-auto shadow-sm"

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans">
      {/* Top Headbar spans full width */}
      <Headbar 
        breadcrumbs={[
          { label: 'SmartVisitor' }, 
          { label: (isTH ? 'แดชบอร์ด' : 'Dashboard') + filterLabel }
        ]} 
      />

      {/* Main Content Area Side-by-Side */}
      <div className="flex flex-1">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Dashboard Content */}
        <main className="flex-1 ml-0 dynamic-ml p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto w-full">
          
          <div className="max-w-7xl mx-auto mb-6 flex flex-col gap-4">
            
            {/* Context Filters Area */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
              {role === 'SUPER_ADMIN' && (
                <>
                  {/* Region Filter */}
                  <div className="relative flex-1 md:flex-none">
                    <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                    <select
                      value={selectedRegion || ''}
                      onChange={(e) => setRegion(e.target.value || null)}
                      className={`${selectBaseClass} min-w-[160px]`}
                    >
                      <option value="">{isTH ? "ทั้งหมด (ภูมิภาค)" : "All (Region)"}</option>
                      {regions.map((r) => (
                        <option key={r.id} value={r.id}>{isTH ? r.name : r.nameEn}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>

                  {/* Province Filter */}
                  <div className="relative flex-1 md:flex-none">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                    <select
                      value={selectedProvince || ''}
                      onChange={(e) => setProvince(e.target.value || null)}
                      className={`${selectBaseClass} min-w-[160px]`}
                    >
                      <option value="">{isTH ? "ทุกจังหวัด" : "All Provinces"}</option>
                      {filteredProvinces.map((p) => (
                        <option key={p.id} value={p.id}>{isTH ? p.name : p.nameEn}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>

                  {/* Factory Filter */}
                  <div className="relative flex-1 md:flex-none">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                    <select
                      value={selectedFactory || ''}
                      onChange={(e) => setFactory(e.target.value || null)}
                      className={`${selectBaseClass} min-w-[180px]`}
                    >
                      <option value="">{isTH ? "ทุกโรงงาน" : "All Factories"}</option>
                      {filteredFactories.map((f) => (
                        <option key={f.id} value={f.id}>{isTH ? f.name : f.nameEn}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </>
              )}

              {/* Date Dropdown */}
              <button className="flex flex-1 md:flex-none justify-between md:justify-start items-center gap-2 border border-slate-300 rounded-full h-10 px-4 bg-white text-slate-700 hover:bg-slate-50 transition-all font-medium text-sm shadow-sm md:ml-auto">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Month - Month</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
              </button>
            </div>
            
            {/* Section Title */}
            <div className="flex items-center gap-2 text-slate-800 font-semibold mt-2">
              <Clock className="w-5 h-5" />
              <span className="text-xl">{isTH ? "สถิติการเยี่ยมชม" : "Visitor Statistics"}</span>
              {role === 'SUPER_ADMIN' && (
                <span className="ml-2 text-sm font-medium px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                  {isTH ? `${factoryCount} โรงงาน` : `${factoryCount} factories`}
                </span>
              )}
            </div>

          </div>

          <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            {/* Top Stats Cards Row — Sentinel-style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Visitors */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
                </div>
                <div className="w-full text-left">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{isTH ? "ผู้เยี่ยมชมทั้งหมด" : "TOTAL VISITORS"}</span>
                  <div className="text-3xl font-bold text-slate-900 tracking-tight mt-1">{Math.floor(12842 * multiplier).toLocaleString()}</div>
                </div>
              </div>

              {/* Card 2: Max Hourly */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-500" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{isTH ? "พีคไทม์" : "PEAK TIME"}</span>
                </div>
                <div className="w-full text-left">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{isTH ? "สูงสุดรายชั่วโมง" : "MAX HOURLY"}</span>
                  <div className="text-3xl font-bold text-slate-900 tracking-tight mt-1">{Math.floor(1402 * multiplier).toLocaleString()}</div>
                </div>
              </div>

              {/* Card 3: Avg Flow */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-500" />
                  </div>
                  <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">-2%</span>
                </div>
                <div className="w-full text-left">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{isTH ? "ค่าเฉลี่ย" : "AVG FLOW"}</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">{Math.floor(842 * multiplier)}</span>
                    <span className="text-sm text-slate-400 font-medium">/{isTH ? "ชม." : "hr"}</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Active Nodes */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-emerald-500" />
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full animate-pulse">{isTH ? "สด" : "LIVE"}</span>
                </div>
                <div className="w-full text-left">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{isTH ? "โรงงานออนไลน์" : "ACTIVE NODES"}</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">{factoryCount}</span>
                    <span className="text-sm text-slate-400 font-medium">/ {totalFactories}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 5: Max Dept */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-sky-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{isTH ? "แผนกเยี่ยมชมสูงสุด" : "MAX DEPARTMENT VISIT"}</span>
                  <div className="text-lg font-bold text-slate-900 truncate">{isTH ? "ฝ่ายขาย" : "Sales"}</div>
                </div>
                <div className="text-3xl font-bold text-slate-900 tracking-tight">{Math.floor(1024 * multiplier).toLocaleString()}</div>
              </div>

              {/* Card 6: Max Mission */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{isTH ? "ภารกิจเยี่ยมชมสูงสุด" : "MAX MISSION VISIT"}</span>
                  <div className="text-lg font-bold text-slate-900 truncate">{isTH ? "วางบิล" : "Billing"}</div>
                </div>
                <div className="text-3xl font-bold text-slate-900 tracking-tight">{Math.floor(512 * multiplier)}</div>
              </div>
            </div>

            {/* Chart + Map Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
              {/* Chart Area (reduced height) */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative">
                <div className="font-semibold text-sm mb-4 text-slate-800">{isTH ? "จำนวน" : "Amount"}</div>
                
                {/* Chart Mockup using SVG */}
                <div className="h-40 w-full relative">
                  {/* Y-Axis Labels */}
                  <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between text-xs text-slate-400 text-right pr-2">
                    <span>25</span>
                    <span>20</span>
                    <span>15</span>
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                  </div>
                  
                  {/* Grid Lines */}
                  <div className="absolute left-8 right-0 top-2 bottom-8 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-full h-px border-b border-slate-200" />
                    ))}
                  </div>

                  {/* SVG Line */}
                  <svg className="absolute left-8 right-0 top-2 bottom-8 h-full w-[calc(100%-2rem)]" preserveAspectRatio="none" viewBox="0 0 1000 100">
                    <polyline
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,80 50,60 100,98 150,90 200,98 250,98 300,70 350,95 400,65 450,100 500,100 550,85 600,100 650,100 700,100 750,10 800,100 850,100 900,100 950,100 1000,80"
                    />
                  </svg>

                  {/* X-Axis Labels */}
                  <div className="absolute left-8 right-0 bottom-0 flex justify-between text-[10px] text-slate-400 pt-2 px-4">
                    <span className="flex flex-col items-center"><span>25 {isTH ? "มิ.ย." : "Jun"}</span></span>
                    <span className="flex flex-col items-center"><span>1 {isTH ? "ก.ค." : "Jul"}</span></span>
                    <span className="flex flex-col items-center"><span>8 {isTH ? "ก.ค." : "Jul"}</span></span>
                    <span className="flex flex-col items-center"><span>15 {isTH ? "ก.ค." : "Jul"}</span></span>
                    <span className="flex flex-col items-center"><span>22 {isTH ? "ก.ค." : "Jul"}</span></span>
                    <span className="flex flex-col items-center"><span>29 {isTH ? "ก.ค." : "Jul"}</span></span>
                  </div>
                </div>
                
                <div className="text-center font-semibold text-sm mt-4 text-slate-800">{isTH ? "วันที่" : "Date"}</div>
              </div>

              {/* Map Area */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden" style={{ minHeight: "300px" }}>
                <FactoryMap />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-xs text-slate-500 pb-4">
            v 0.0.1 - ME Group Enterprise Co., Ltd. 2025
          </footer>
        </main>
      </div>
    </div>
  )
}

