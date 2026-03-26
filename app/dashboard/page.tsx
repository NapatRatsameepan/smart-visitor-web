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

  // Simulated dynamic data for graphs
  const departments = [
    { name: isTH ? "ฝ่ายขาย" : "Sales", value: Math.floor(1024 * multiplier), color: "bg-blue-500" },
    { name: isTH ? "วิศวกรรม" : "Engineering", value: Math.floor(750 * multiplier), color: "bg-indigo-500" },
    { name: isTH ? "ไอที" : "IT", value: Math.floor(400 * multiplier), color: "bg-sky-500" },
    { name: isTH ? "บุคคล" : "HR", value: Math.floor(250 * multiplier), color: "bg-cyan-500" },
    { name: isTH ? "การตลาด" : "Marketing", value: Math.floor(150 * multiplier), color: "bg-teal-500" },
  ];
  const maxDept = Math.max(...departments.map(d => d.value), 1);

  const purposes = [
    { name: isTH ? "วางบิล" : "Billing", value: Math.floor(512 * multiplier), color: "bg-amber-500" },
    { name: isTH ? "ประชุม" : "Meeting", value: Math.floor(340 * multiplier), color: "bg-orange-500" },
    { name: isTH ? "ส่งของ" : "Delivery", value: Math.floor(280 * multiplier), color: "bg-red-500" },
    { name: isTH ? "สัมภาษณ์" : "Interview", value: Math.floor(120 * multiplier), color: "bg-rose-500" },
    { name: isTH ? "ซ่อมบำรุง" : "Maintenance", value: Math.floor(90 * multiplier), color: "bg-pink-500" },
  ];
  const maxPurpose = Math.max(...purposes.map(p => p.value), 1);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans">
      {/* Top Headbar spans full width */}
      <Headbar 
        breadcrumbs={[
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
              {/* Card 1: Total Visitors */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="w-full text-left">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{isTH ? "ผู้เยี่ยมชมทั้งหมด" : "TOTAL VISITORS"}</span>
                  <div className="text-3xl font-bold text-slate-900 tracking-tight mt-1">{Math.floor(12842 * multiplier).toLocaleString()}</div>
                </div>
              </div>

              {/* Card 2: Avg Flow */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
                <div className="w-full text-left">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{isTH ? "ค่าเฉลี่ย" : "AVG FLOW"}</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">{Math.floor(842 * multiplier)}</span>
                    <span className="text-sm text-slate-400 font-medium">/{isTH ? "ชม." : "hr"}</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Active Nodes */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-emerald-500" />
                  </div>
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

            {/* Graphs + Map Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-4">
              
              {/* Left Column: Stacked Graphs */}
              <div className="flex flex-col gap-4">
                
                {/* Graph 1: Top Visited Departments */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-sky-500" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-800">{isTH ? "แผนกเยี่ยมชมสูงสุด" : "Top Visited Departments"}</h3>
                  </div>
                  <div className="flex flex-col gap-4 flex-1 justify-center">
                    {departments.map((d, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs text-slate-700 font-medium">
                          <span>{d.name}</span>
                          <span className="text-slate-500">{d.value.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className={`h-full ${d.color} rounded-full transition-all duration-1000`} style={{ width: `${Math.max(2, (d.value / maxDept) * 100)}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graph 2: Top Visit Purposes */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-800">{isTH ? "ภารกิจเยี่ยมชมสูงสุด" : "Top Visit Purposes"}</h3>
                  </div>
                  <div className="flex flex-col gap-4 flex-1 justify-center">
                    {purposes.map((p, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs text-slate-700 font-medium">
                          <span>{p.name}</span>
                          <span className="text-slate-500">{p.value.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className={`h-full ${p.color} rounded-full transition-all duration-1000`} style={{ width: `${Math.max(2, (p.value / maxPurpose) * 100)}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Map */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px] h-full flex flex-col">
                <div className="p-4 py-3 border-b border-slate-100 bg-white/50 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-sm text-slate-800">{isTH ? "แผนที่โรงงาน" : "Factory Network Map"}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{factoryCount} Locations</span>
                </div>
                <div className="flex-1 relative w-full h-full min-h-[460px]">
                  <FactoryMap />
                </div>
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

