"use client"

import React, { useState } from "react"
import { useLanguageStore } from "@/store/useLanguageStore"
import { useRouter, useParams } from "next/navigation"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock } from "lucide-react"

const mockBrandData: Record<string, string> = {
  "1": "Toyota",
  "2": "Honda",
}

export default function EditBrandPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { isTH } = useLanguageStore()
  const [brandName, setBrandName] = useState(mockBrandData[id] || "")

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Headbar
        title={isTH ? "ข้อมูลยี่ห้อรถ" : "Car Brand Info"}
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
              <span>{isTH ? "แก้ไขข้อมูลยี่ห้อรถ" : "Edit Car Brand"}</span>
            </div>

            {/* Form */}
            <div className="flex items-center gap-6">
              <label className="w-20 text-sm font-medium text-slate-700 text-right shrink-0">
                {isTH ? "ชื่อยี่ห้อ" : "Brand Name"}
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-80 h-11 px-4 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => router.push("/brand")}
                className="px-8 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                {isTH ? "ยกเลิก" : "Cancel"}
              </button>
              <button className="px-8 py-2.5 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
                {isTH ? "บันทึก" : "Save"}
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
