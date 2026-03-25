"use client"

import React, { useMemo } from "react"
import dynamic from "next/dynamic"
import { useLanguageStore } from "@/store/useLanguageStore"
import { useAuthStore } from "@/store/useAuthStore"
import { useDashboardFilterStore } from "@/store/useDashboardFilterStore"
import { regions, provinces, factories, getProvincesByRegion, getFactoriesByProvince, getFactoriesByRegion, getFilteredFactories } from "@/lib/mockFactories"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock, Map, MapPin, Building2, ChevronDown, Calendar } from "lucide-react"

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
            {/* Top Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Total Today */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-lg font-medium mb-1">{isTH ? "ทั้งหมดวันนี้" : "Total Today"}</span>
                  <span className="text-xs text-slate-400">{isTH ? "ล่าสุด" : "Latest"}<br />18/08/2568 16:30 {isTH ? "น." : ""}</span>
                </div>
                <div className="text-5xl font-bold tracking-tight">{Math.floor(12 * multiplier)}</div>
              </div>

              {/* Card 2: Max Peak */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-lg font-medium mb-1">{isTH ? "ยอดสูงสุด" : "Max Peak"}</span>
                  <span className="text-xs text-slate-400">{isTH ? "วันที่" : "Date:"}<br />18/08/2568</span>
                </div>
                <div className="text-5xl font-bold tracking-tight">{Math.floor(24 * multiplier)}</div>
              </div>

              {/* Card 3: Average */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex flex-col justify-center h-full">
                  <span className="text-lg font-medium">{isTH ? "ค่าเฉลี่ย" : "Average"}</span>
                </div>
                <div className="text-5xl font-bold tracking-tight">{Math.floor(32 * multiplier)}</div>
              </div>
            </div>

            {/* Second Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 4: Max Dept */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400 mb-1">{isTH ? "แผนกเยี่ยมชมสูงสุด" : "Max Department Visit"}</span>
                  <span className="text-xl font-bold">{isTH ? "ฝ่ายขาย" : "Sales"}</span>
                </div>
                <div className="text-5xl font-bold tracking-tight">{Math.floor(1024 * multiplier).toLocaleString()}</div>
              </div>

              {/* Card 5: Max Mission */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400 mb-1">{isTH ? "ภารกิจเยี่ยมชมสูงสุด" : "Max Mission Visit"}</span>
                  <span className="text-xl font-bold">{isTH ? "วางบิล" : "Billing"}</span>
                </div>
                <div className="text-5xl font-bold tracking-tight">{Math.floor(512 * multiplier)}</div>
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

