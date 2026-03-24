"use client"

import React, { useState } from "react"
import { useLanguageStore } from "@/store/useLanguageStore"
import { useRouter, useParams } from "next/navigation"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock, ChevronDown } from "lucide-react"

const mockAdminData: Record<string, { prefix: string; firstName: string; lastName: string; phone: string; accountType: string; account: string }> = {
  "1": {
    prefix: "",
    firstName: "",
    lastName: "",
    phone: "",
    accountType: "",
    account: "",
  },
}

export default function EditAdminPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { isTH } = useLanguageStore()

  const initial = mockAdminData[id] || mockAdminData["1"]
  const [form, setForm] = useState(initial)

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Headbar
        title={isTH ? "บัญชีผู้ดูแล" : "Admin Account"}
        showFactoryFilter={false}
        showDateFilter={false}
      />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-28 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Section Title */}
            <div className="flex items-center gap-2 mb-8 text-slate-800 font-semibold">
              <Clock className="w-5 h-5" />
              <span>{isTH ? "แก้ไขบัญชีผู้ดูแล" : "Edit Admin Account"}</span>
            </div>

            {/* Form */}
            <div className="space-y-6 px-4">
              {/* คำนำหน้า */}
              <div className="flex items-center gap-6">
                <label className="w-24 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "คำนำหน้า" : "Prefix"}
                </label>
                <div className="relative w-80">
                  <select
                    value={form.prefix}
                    onChange={(e) => setForm({ ...form, prefix: e.target.value })}
                    className="w-full h-11 px-4 pr-10 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm appearance-none"
                  >
                    <option value="">{isTH ? "เลือกคำนำหน้าที่นี่" : "Select prefix"}</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* ชื่อ + นามสกุล */}
              <div className="flex items-center gap-6">
                <label className="w-24 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "ชื่อ" : "First Name"}
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder={isTH ? "กรอกที่อยู่" : "Enter first name"}
                  className="flex-1 h-11 px-4 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm"
                />
                <label className="w-16 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "นามสกุล" : "Last Name"}
                </label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder={isTH ? "กรอกนามสกุลที่นี่" : "Enter last name"}
                  className="flex-1 h-11 px-4 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm"
                />
              </div>

              {/* เบอร์ติดต่อ + ประเภทบัญชี */}
              <div className="flex items-center gap-6">
                <label className="w-24 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "เบอร์ติดต่อ" : "Phone"}
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={isTH ? "เลือกอำเภอที่นี่" : "Enter phone"}
                  className="flex-1 h-11 px-4 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm"
                />
                <label className="w-20 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "ประเภทบัญชี" : "Account Type"}
                </label>
                <div className="relative flex-1">
                  <select
                    value={form.accountType}
                    onChange={(e) => setForm({ ...form, accountType: e.target.value })}
                    className="w-full h-11 px-4 pr-10 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm appearance-none"
                  >
                    <option value="">{isTH ? "เลือกประเภทบัญชีที่นี่" : "Select account type"}</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* ชื่อบัญชี */}
              <div className="flex items-center gap-6">
                <label className="w-24 text-sm font-medium text-slate-700 text-right shrink-0">
                  {isTH ? "ชื่อบัญชี" : "Account"}
                </label>
                <input
                  type="text"
                  value={form.account}
                  onChange={(e) => setForm({ ...form, account: e.target.value })}
                  placeholder={isTH ? "กรอกชื่อบัญชีที่นี่" : "Enter account name"}
                  className="w-80 h-11 px-4 rounded-full border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-4 mt-10 px-4">
              <button
                onClick={() => router.push("/admin")}
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
