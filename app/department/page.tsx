"use client"

import React, { useState } from "react"
import { useLanguageStore } from "@/store/useLanguageStore"
import Link from "next/link"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock, FileText, Plus } from "lucide-react"

const mockDepartments = [
  { id: 1, name: "ฝ่ายขาย", factories: 2 },
  { id: 2, name: "ฝ่ายซ่อมบำรุง", factories: 1 },
]

const chartData = [
  { name: "ฝ่ายขาย", value: 90 },
  { name: "ฝ่ายซ่อมบำรุง", value: 70 },
]

export default function DepartmentPage() {
  const { isTH } = useLanguageStore()

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Headbar title={isTH ? "ข้อมูลแผนก" : "Department"} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-28 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Bar Chart */}
              <div>
                <div className="flex items-center gap-2 mb-6 text-slate-800 font-semibold">
                  <Clock className="w-5 h-5" />
                  <span>{isTH ? "กราฟแผนกโรงงาน" : "Department Chart"}</span>
                </div>

                <div className="space-y-4 mt-8">
                  {chartData.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-slate-600 w-28 text-right truncate">{item.name}</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-8 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: i === 0 ? "#0f172a" : "#94a3b8",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* X-axis labels */}
                <div className="flex justify-between mt-4 ml-[7.5rem] text-[10px] text-slate-400">
                  <span>0</span><span>5</span><span>10</span><span>15</span><span>20</span><span>25</span>
                </div>
              </div>

              {/* Right: Table */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-slate-800 font-semibold">
                    <Clock className="w-5 h-5" />
                    <span>{isTH ? "ตารางแผนกในระบบ" : "Department List"}</span>
                  </div>
                  <Link href="/department/new" className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
                    <Plus className="w-4 h-4" />
                    {isTH ? "สร้างใหม่" : "Create New"}
                  </Link>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-center py-4 px-4 font-semibold text-slate-700 w-16">#</th>
                        <th className="text-center py-4 px-4 font-semibold text-slate-700">{isTH ? "แผนก" : "Department"}</th>
                        <th className="text-center py-4 px-4 font-semibold text-slate-700">{isTH ? "โรงงาน" : "Factory"}</th>
                        <th className="text-center py-4 px-4 font-semibold text-slate-700">{isTH ? "เพิ่มเติม" : "More"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDepartments.map((row) => (
                        <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4 text-center text-slate-600">{row.id}</td>
                          <td className="py-4 px-4 text-center text-slate-600">{row.name}</td>
                          <td className="py-4 px-4 text-center text-slate-600">{row.factories}</td>
                          <td className="py-4 px-4 text-center">
                            <Link href={`/department/${row.id}/edit`} className="text-slate-400 hover:text-slate-700 transition-colors inline-block">
                              <FileText className="w-5 h-5 mx-auto" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <button className="px-3 py-1.5 text-sm text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">Start</button>
              <button className="w-8 h-8 text-sm bg-slate-900 text-white rounded-full flex items-center justify-center font-medium">1</button>
              <button className="w-8 h-8 text-sm text-slate-600 hover:bg-slate-100 rounded-full flex items-center justify-center transition-colors">2</button>
              <button className="w-8 h-8 text-sm text-slate-600 hover:bg-slate-100 rounded-full flex items-center justify-center transition-colors">3</button>
              <span className="text-slate-400">...</span>
              <button className="w-8 h-8 text-sm text-slate-600 hover:bg-slate-100 rounded-full flex items-center justify-center transition-colors">5</button>
              <button className="px-3 py-1.5 text-sm text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">End</button>
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
