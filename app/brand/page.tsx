"use client"

import React, { useState } from "react"
import { useLanguageStore } from "@/store/useLanguageStore"
import Link from "next/link"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock, FileText, Plus } from "lucide-react"

const mockBrands = [
  { id: 1, name: "Toyota", status: "active" },
  { id: 2, name: "Honda", status: "active" },
]

export default function BrandPage() {
  const { isTH } = useLanguageStore()

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Headbar title={isTH ? "ข้อมูลยี่ห้อรถ" : "Car Brands"} showFactoryFilter={false} showDateFilter={false} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-28 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-slate-800 font-semibold px-2">
                <Clock className="w-5 h-5" />
                <span>{isTH ? "ตารางข้อมูลยี่ห้อรถ" : "Car Brand Records"}</span>
              </div>
              <Link href="/brand/new" className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
                <Plus className="w-4 h-4" />
                {isTH ? "เพิ่มใหม่" : "Add New"}
              </Link>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-center py-4 px-6 font-semibold text-slate-700 w-20">#</th>
                    <th className="text-left py-4 px-6 font-semibold text-slate-700">{isTH ? "ยี่ห้อรถ" : "Brand"}</th>
                    <th className="text-center py-4 px-6 font-semibold text-slate-700">{isTH ? "สถานะ" : "Status"}</th>
                    <th className="text-center py-4 px-6 font-semibold text-slate-700">{isTH ? "เพิ่มเติม" : "More"}</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBrands.map((row) => (
                    <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 text-center text-slate-600">{row.id}</td>
                      <td className="py-4 px-6 text-slate-600">{row.name}</td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {isTH ? "ใช้งาน" : "Active"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Link href={`/brand/${row.id}/edit`} className="text-slate-400 hover:text-slate-700 transition-colors inline-block">
                          <FileText className="w-5 h-5 mx-auto" />
                        </Link>
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
