"use client"

import React, { useState } from "react"
import { useLanguageStore } from "@/store/useLanguageStore"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock, ChevronDown } from "lucide-react"

export default function NewDepartmentPage() {
  const router = useRouter()
  const { isTH } = useLanguageStore()

  const [form, setForm] = useState({
    name: "",
    factory: "",
  })

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Headbar
        title={isTH ? "ข้อมูลแผนก" : "Department Info"}
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
              <span>{isTH ? "เพิ่มข้อมูลแผนก" : "Add Department"}</span>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* ชื่อแผนก */}
              <div className="flex items-center gap-6">
                <label className="w-24 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "ชื่อแผนก" : "Department Name"}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={isTH ? "กรอกชื่อแผนกที่นี่" : "Enter department name"}
                  className="flex-1 h-11 px-4 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm"
                />
              </div>

              {/* โรงงาน */}
              <div className="flex items-center gap-6">
                <label className="w-24 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "โรงงาน" : "Factory"}
                </label>
                <div className="relative flex-1">
                  <select
                    value={form.factory}
                    onChange={(e) => setForm({ ...form, factory: e.target.value })}
                    className="w-full h-11 px-4 pr-10 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm appearance-none"
                  >
                    <option value="">{isTH ? "เลือกโรงงานที่นี่" : "Select factory"}</option>
                    <option value="โรงงานมิตรผล">โรงงานมิตรผล</option>
                    <option value="โรงงานมิตรผล ชลบุรี">โรงงานมิตรผล ชลบุรี</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => router.push("/department")}
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
