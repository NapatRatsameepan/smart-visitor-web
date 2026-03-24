"use client"

import React, { useState } from "react"
import { useLanguageStore } from "@/store/useLanguageStore"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock } from "lucide-react"

export default function NewVisitPage() {
  const router = useRouter()
  const { isTH } = useLanguageStore()
  const [visitName, setVisitName] = useState("")

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Headbar
        title={isTH ? "ข้อมูลภารกิจเยี่ยมชม" : "Visit Info"}
        showFactoryFilter={false}
        showDateFilter={false}
      />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-28 p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            {/* Section Title */}
            <div className="flex items-center gap-2 mb-8 text-slate-800 font-semibold">
              <Clock className="w-5 h-5" />
              <span>{isTH ? "เพิ่มข้อมูลภารกิจเยี่ยมชม" : "Add Visit Info"}</span>
            </div>

            {/* Form */}
            <div className="flex items-center gap-6">
              <label className="w-24 text-sm font-medium text-slate-700 text-right shrink-0">
                {isTH ? "ภารกิจเยี่ยมชม" : "Visit Purpose"}
              </label>
              <input
                type="text"
                value={visitName}
                onChange={(e) => setVisitName(e.target.value)}
                placeholder={isTH ? "กรอกภารกิจเยี่ยมชมที่นี่" : "Enter visit purpose"}
                className="w-80 h-11 px-4 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => router.push("/visit")}
                className="px-8 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                {isTH ? "ยกเลิก" : "Cancel"}
              </button>
              <button className="px-8 py-2.5 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
                {isTH ? "สร้าง" : "Create"}
              </button>
            </div>
          </div>

          <footer className="mt-12 text-center text-xs text-slate-500 pb-4">
            v 0.0.1 - ME Group Enterprise Co., Ltd. 2025
          </footer>
        </main>
      </div>
    </div>
  )
}
