"use client"

import React, { useState } from "react"
import { useLanguageStore } from "@/store/useLanguageStore"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock, FileText } from "lucide-react"

const mockData = [
  {
    date: "18/08/2568 16:30 น.",
    name: "นายสมชาย ใจดี",
    phone: "081-234-5678",
    plate: "ไทย1234 กรุงเทพมหานคร",
    factory: "โรงงานมิตรผล ชลบุรี",
    department: "ฝ่ายขาย",
    mission: "วางบิล",
  },
  {
    date: "18/08/2568 16:30 น.",
    name: "นายสมชาย ใจดี",
    phone: "081-234-5678",
    plate: "ไทย1234 กรุงเทพมหานคร",
    factory: "โรงงานมิตรผล ชลบุรี",
    department: "ฝ่ายขาย",
    mission: "วางบิล",
  },
]

export default function HistoryPage() {
  const { isTH } = useLanguageStore()

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Headbar title={isTH ? "ประวัติเยี่ยมชม" : "Visit History"} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-28 p-8 overflow-y-auto">
          {/* Section Title */}
          <div className="flex items-center gap-2 mb-6 text-slate-800 font-semibold px-2">
            <Clock className="w-5 h-5" />
            <span>{isTH ? "ตารางการเยี่ยมชม" : "Visit Records"}</span>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Table */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">{isTH ? "วันที่เวลา" : "Date/Time"}</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">{isTH ? "ชื่อ-นามสกุล" : "Full Name"}</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">{isTH ? "เบอร์ติดต่อ" : "Phone"}</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">{isTH ? "ทะเบียนรถ" : "License Plate"}</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">{isTH ? "โรงงาน" : "Factory"}</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">{isTH ? "แผนกเยี่ยมชม" : "Department"}</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-700">{isTH ? "ภารกิจเยี่ยมชม" : "Mission"}</th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-700">{isTH ? "เพิ่มเติม" : "More"}</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 text-slate-600">{row.date}</td>
                      <td className="py-4 px-4 text-slate-600">{row.name}</td>
                      <td className="py-4 px-4 text-slate-600">{row.phone}</td>
                      <td className="py-4 px-4 text-slate-600 text-xs leading-tight">{row.plate}</td>
                      <td className="py-4 px-4 text-slate-600 text-xs leading-tight">{row.factory}</td>
                      <td className="py-4 px-4 text-slate-600">{row.department}</td>
                      <td className="py-4 px-4 text-slate-600">{row.mission}</td>
                      <td className="py-4 px-4 text-center">
                        <button className="text-slate-400 hover:text-slate-700 transition-colors">
                          <FileText className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button className="px-3 py-1.5 text-sm text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">Start</button>
              <button className="w-8 h-8 text-sm bg-slate-900 text-white rounded-full flex items-center justify-center font-medium">1</button>
              <button className="w-8 h-8 text-sm text-slate-600 hover:bg-slate-100 rounded-full flex items-center justify-center transition-colors">2</button>
              <button className="w-8 h-8 text-sm text-slate-600 hover:bg-slate-100 rounded-full flex items-center justify-center transition-colors">3</button>
              <span className="text-slate-400">...</span>
              <button className="w-8 h-8 text-sm text-slate-600 hover:bg-slate-100 rounded-full flex items-center justify-center transition-colors">5</button>
              <button className="px-3 py-1.5 text-sm text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">End</button>
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
