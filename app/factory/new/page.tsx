"use client"

import React, { useState } from "react"
import { useLanguageStore } from "@/store/useLanguageStore"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock, ChevronDown } from "lucide-react"

export default function NewFactoryPage() {
  const router = useRouter()
  const { isTH } = useLanguageStore()

  const [form, setForm] = useState({
    name: "",
    address: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
  })

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Headbar
        title={isTH ? "ข้อมูลโรงงาน" : "Factory Info"}
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
              <span>{isTH ? "เพิ่มข้อมูลโรงงาน" : "Add Factory"}</span>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* ชื่อโรงงาน */}
              <div className="flex items-center gap-6">
                <label className="w-28 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "ชื่อโรงงาน" : "Factory Name"}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={isTH ? "กรอกชื่อโรงงาน" : "Enter factory name"}
                  className="flex-1 h-11 px-4 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm"
                />
              </div>

              {/* ที่อยู่ */}
              <div className="flex items-center gap-6">
                <label className="w-28 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "ที่อยู่" : "Address"}
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder={isTH ? "กรอกที่อยู่" : "Enter address"}
                  className="flex-1 h-11 px-4 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm"
                />
              </div>

              {/* ตำบล */}
              <div className="flex items-center gap-6">
                <label className="w-28 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "ตำบล" : "Sub-district"}
                </label>
                <div className="relative flex-1">
                  <select
                    value={form.subDistrict}
                    onChange={(e) => setForm({ ...form, subDistrict: e.target.value })}
                    className="w-full h-11 px-4 pr-10 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm appearance-none"
                  >
                    <option value="">{isTH ? "เลือกตำบล" : "Select sub-district"}</option>
                    <option value="หนองจะบก">หนองจะบก</option>
                    <option value="บ้านบึง">บ้านบึง</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* อำเภอ */}
              <div className="flex items-center gap-6">
                <label className="w-28 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "อำเภอ" : "District"}
                </label>
                <div className="relative flex-1">
                  <select
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="w-full h-11 px-4 pr-10 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm appearance-none"
                  >
                    <option value="">{isTH ? "เลือกอำเภอที่นี่" : "Select district"}</option>
                    <option value="เมือง">เมือง</option>
                    <option value="บ้านบึง">บ้านบึง</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* จังหวัด */}
              <div className="flex items-center gap-6">
                <label className="w-28 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "จังหวัด" : "Province"}
                </label>
                <div className="relative flex-1">
                  <select
                    value={form.province}
                    onChange={(e) => setForm({ ...form, province: e.target.value })}
                    className="w-full h-11 px-4 pr-10 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm appearance-none"
                  >
                    <option value="">{isTH ? "เลือกจังหวัดที่นี่" : "Select province"}</option>
                    <option value="นครราชสีมา">นครราชสีมา</option>
                    <option value="ชลบุรี">ชลบุรี</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* รหัสไปรษณีย์ */}
              <div className="flex items-center gap-6">
                <label className="w-28 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "รหัสไปรษณีย์" : "Postal Code"}
                </label>
                <input
                  type="text"
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  placeholder={isTH ? "กรอกรหัสไปรษณีย์ที่นี่" : "Enter postal code"}
                  className="flex-1 h-11 px-4 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => router.push("/factory")}
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
