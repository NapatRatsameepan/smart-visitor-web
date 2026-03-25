"use client"

import React, { useState } from "react"
import { useLanguageStore } from "@/store/useLanguageStore"
import { useAuthStore } from "@/store/useAuthStore"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock, Globe } from "lucide-react"

export default function Dashboard() {
  const { isTH } = useLanguageStore()
  const { role, factoryId } = useAuthStore()

  const factoryNames: Record<string, { th: string, en: string }> = {
    '1': { th: 'โรงงาน A (กรุงเทพฯ)', en: 'Factory A (Bangkok)' },
    '2': { th: 'โรงงาน B (ระยอง)', en: 'Factory B (Rayong)' },
  }

  const factoryTitle = role === 'ADMIN' && factoryId && factoryNames[factoryId] 
    ? ` - ${isTH ? factoryNames[factoryId].th : factoryNames[factoryId].en}`
    : ''

  const multiplier = role === 'SUPER_ADMIN' ? 1 : 0.4

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Top Headbar spans full width */}
      <Headbar title={(isTH ? 'แดชบอร์ด' : 'Dashboard') + factoryTitle} />

      {/* Main Content Area Side-by-Side */}
      <div className="flex flex-1">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Dashboard Content */}
        <main className="flex-1 ml-0 dynamic-ml p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
          {/* Section Title */}
          <div className="flex items-center gap-2 mb-6 text-slate-800 font-semibold px-2">
            <Clock className="w-5 h-5" />
            <span>{isTH ? "สถิติการเยี่ยมชมรายวัน" : "Daily Visitor Statistics"}</span>
          </div>

          <div className="flex flex-col gap-6 max-w-6xl mx-auto">
            {/* Location Hierarchy Filters for SuperAdmin */}
            {role === 'SUPER_ADMIN' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500 ml-1">{isTH ? "ภูมิภาค" : "Region"}</span>
                  <select className="h-10 px-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>{isTH ? "ทุกภูมิภาค" : "All Regions"}</option>
                    <option>{isTH ? "ภาคกลาง" : "Central"}</option>
                    <option>{isTH ? "ภาคตะวันออก" : "Eastern"}</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500 ml-1">{isTH ? "จังหวัด" : "Province"}</span>
                  <select className="h-10 px-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>{isTH ? "ทุกจังหวัด" : "All Provinces"}</option>
                    <option>กรุงเทพมหานคร</option>
                    <option>ระยอง</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-slate-500 ml-1">{isTH ? "โรงงาน" : "Factory"}</span>
                  <select className="h-10 px-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>{isTH ? "ทุกโรงงาน" : "All Factories"}</option>
                    <option>{factoryNames['1'][isTH ? 'th' : 'en']}</option>
                    <option>{factoryNames['2'][isTH ? 'th' : 'en']}</option>
                  </select>
                </div>
              </div>
            )}

            {/* Main Stats Cards Grid (4 Columns as per Diagram) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Top Department (แผนกเยี่ยมชมสูงสุด) */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-6 flex flex-col justify-between shadow-sm min-h-[160px]">
                <div className="flex flex-col">
                  <span className="text-slate-400 text-sm mb-1">{isTH ? "แผนกเยี่ยมชมสูงสุด" : "Top Department"}</span>
                  <span className="text-xl font-bold truncate">{isTH ? "ฝ่ายผลิต" : "Production"}</span>
                </div>
                <div className="text-4xl font-bold tracking-tight mt-auto">
                  {Math.floor(450 * multiplier).toLocaleString()}
                </div>
              </div>

              {/* Card 2: Daily Total (ทั้งหมดวันนี้) */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-6 flex flex-col justify-between shadow-sm min-h-[160px]">
                <div className="flex flex-col">
                  <span className="text-slate-400 text-sm mb-1">{isTH ? "ทั้งหมดวันนี้" : "Daily Total"}</span>
                  <span className="text-xs text-slate-500">{isTH ? "อัปเดตล่าสุด" : "Last update"}: 16:30</span>
                </div>
                <div className="text-5xl font-bold tracking-tight mt-auto">
                  {Math.floor(128 * multiplier).toLocaleString()}
                </div>
              </div>

              {/* Card 3: Average (ค่าเฉลี่ย) */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-6 flex flex-col justify-between shadow-sm min-h-[160px]">
                <div className="flex flex-col">
                  <span className="text-slate-400 text-sm mb-1">{isTH ? "ค่าเฉลี่ย" : "Average"}</span>
                  <span className="text-xs text-slate-500">{isTH ? "ต่อวัน" : "per day"}</span>
                </div>
                <div className="text-5xl font-bold tracking-tight mt-auto">
                  {Math.floor(95 * multiplier).toLocaleString()}
                </div>
              </div>

              {/* Card 4: Max of Day (สูงสุดรายวัน) */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-6 flex flex-col justify-between shadow-sm min-h-[160px]">
                <div className="flex flex-col">
                  <span className="text-slate-400 text-sm mb-1">{isTH ? "สูงสุดรายวัน" : "Max of Day"}</span>
                  <span className="text-xs text-slate-500">18/08/2568</span>
                </div>
                <div className="text-5xl font-bold tracking-tight mt-auto">
                  {Math.floor(210 * multiplier).toLocaleString()}
                </div>
              </div>

            </div>

            {/* GeoMap Visualization (as per Diagram) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mt-2">
              <div className="flex items-center gap-2 mb-6 text-slate-800 font-semibold">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>{isTH ? "การกระจายตัวของโรงงานและผู้มาติดต่อ" : "GeoMap (Lat/Lng Visualization)"}</span>
              </div>
              
              {/* Map Mockup */}
              <div className="relative h-[400px] w-full rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 bg-[#f8fafc] flex items-center justify-center">
                  <div className="text-slate-400 flex flex-col items-center">
                    <Globe className="w-12 h-12 mb-2 opacity-20" />
                    <span className="text-sm italic">{isTH ? "พื้นที่แสดงผลแผนที่ (Mockup)" : "Map Visualization Area (Mockup)"}</span>
                  </div>
                </div>

                {/* Simulated Map Markers (from Diagram: FAC and LOG) */}
                <div className="absolute top-1/4 left-1/3 flex flex-col items-center group cursor-pointer">
                  <div className="bg-red-500 w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse" />
                  <div className="hidden group-hover:block absolute top-6 bg-white p-2 rounded shadow-md border text-[10px] whitespace-nowrap z-10">
                    <p className="font-bold">Factory A</p>
                    <p>Lat: 13.7563, Lng: 100.5018</p>
                  </div>
                </div>

                <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center group cursor-pointer">
                  <div className="bg-blue-500 w-4 h-4 rounded-full border-2 border-white shadow-lg" />
                  <div className="hidden group-hover:block absolute top-6 bg-white p-2 rounded shadow-md border text-[10px] whitespace-nowrap z-10">
                    <p className="font-bold">Factory B</p>
                    <p>Lat: 12.6814, Lng: 101.2816</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Visitor Trend Chart */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mt-4 relative">
              <div className="font-semibold text-sm mb-6 text-slate-800">{isTH ? "แนวโน้มการเยี่ยมชมรายวัน" : "Daily Visitor Trend"}</div>
              
              {/* Chart Mockup using SVG */}
              <div className="h-64 w-full relative">
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
                <div className="absolute left-8 right-0 bottom-0 flex justify-between text-[10px] text-slate-400 pt-2 px-8">
                  <span className="flex flex-col items-center"><span>25 {isTH ? "มิถุนายน" : "Jun"}</span><span>2568</span></span>
                  <span className="flex flex-col items-center"><span>1 {isTH ? "มิถุนายน" : "Jun"}</span><span>2568</span></span>
                  <span className="flex flex-col items-center"><span>8 {isTH ? "มิถุนายน" : "Jun"}</span><span>2568</span></span>
                  <span className="flex flex-col items-center"><span>15 {isTH ? "มิถุนายน" : "Jun"}</span><span>2568</span></span>
                  <span className="flex flex-col items-center"><span>22 {isTH ? "มิถุนายน" : "Jun"}</span><span>2568</span></span>
                  <span className="flex flex-col items-center"><span>29 {isTH ? "มิถุนายน" : "Jun"}</span><span>2568</span></span>
                </div>
              </div>
              
              <div className="text-center font-semibold text-sm mt-8 text-slate-800">{isTH ? "วันที่" : "Date"}</div>
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
