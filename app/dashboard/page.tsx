"use client"

import React, { useState } from "react"
import { useLanguageStore } from "@/store/useLanguageStore"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock } from "lucide-react"

export default function Dashboard() {
  const { isTH } = useLanguageStore()

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Top Headbar spans full width */}
      <Headbar title={isTH ? 'แดชบอร์ด' : 'Dashboard'} />

      {/* Main Content Area Side-by-Side */}
      <div className="flex flex-1">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Dashboard Content */}
        <main className="flex-1 ml-0 md:ml-28 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
          {/* Section Title */}
          <div className="flex items-center gap-2 mb-6 text-slate-800 font-semibold px-2">
            <Clock className="w-5 h-5" />
            <span>{isTH ? "สถิติการเยี่ยมชม" : "Visitor Statistics"}</span>
          </div>

          <div className="flex flex-col gap-6 max-w-6xl mx-auto">
            {/* Top Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Total Today */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-6 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xl font-medium mb-1">{isTH ? "ทั้งหมดวันนี้" : "Total Today"}</span>
                  <span className="text-sm text-slate-400">{isTH ? "ล่าสุด" : "Latest"}<br />18/08/2568 16:30 {isTH ? "น." : ""}</span>
                </div>
                <div className="text-6xl font-bold tracking-tight">12</div>
              </div>

              {/* Card 2: Max Peak */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-6 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xl font-medium mb-1">{isTH ? "ยอดสูงสุด" : "Max Peak"}</span>
                  <span className="text-sm text-slate-400">{isTH ? "วันที่" : "Date:"}<br />18/08/2568</span>
                </div>
                <div className="text-6xl font-bold tracking-tight">24</div>
              </div>

              {/* Card 3: Average */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-6 flex items-center justify-between shadow-sm">
                <div className="flex flex-col justify-center h-full">
                  <span className="text-xl font-medium">{isTH ? "ค่าเฉลี่ย" : "Average"}</span>
                </div>
                <div className="text-6xl font-bold tracking-tight">32</div>
              </div>
            </div>

            {/* Second Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 4: Max Dept */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-6 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400 mb-1">{isTH ? "แผนกเยี่ยมชมสูงสุด" : "Max Department Visit"}</span>
                  <span className="text-2xl font-bold">{isTH ? "ฝ่ายขาย" : "Sales"}</span>
                </div>
                <div className="text-6xl font-bold tracking-tight">1,024</div>
              </div>

              {/* Card 5: Max Mission */}
              <div className="bg-[#0f172a] text-white rounded-2xl p-6 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400 mb-1">{isTH ? "ภารกิจเยี่ยมชมสูงสุด" : "Max Mission Visit"}</span>
                  <span className="text-2xl font-bold">{isTH ? "วางบิล" : "Billing"}</span>
                </div>
                <div className="text-6xl font-bold tracking-tight">512</div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mt-4 relative">
              <div className="font-semibold text-sm mb-6 text-slate-800">{isTH ? "จำนวน" : "Amount"}</div>
              
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
