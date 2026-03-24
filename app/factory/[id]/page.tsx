"use client"

import React, { useState } from "react"
import { useLanguageStore } from "@/store/useLanguageStore"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock, FileText, Plus } from "lucide-react"

const mockFactoryData: Record<string, { name: string; address: string; status: string }> = {
  "1": {
    name: "โรงงานมิตรผล",
    address: "1229 หมู่ที่ 4 ตำบลหนองจะบก อำเภอเมืองนครราชสีมา จังหวัดนครราชสีมา 30000",
    status: "active",
  },
  "2": {
    name: "โรงงานมิตรผล ชลบุรี",
    address: "99 หมู่ 5 ตำบลบ้านบึง อำเภอบ้านบึง จังหวัดชลบุรี 20170",
    status: "active",
  },
}

const mockGuards = [
  {
    id: 1,
    name: "นายสมชาย ใจดี",
    phone: "081-234-5678",
    account: "0812345678",
    position: "หัวหน้ารักษาความปลอดภัย",
    status: "active",
  },
  {
    id: 2,
    name: "นายสมชาย ใจดี",
    phone: "081-234-5678",
    account: "0812345678",
    position: "หัวหน้ารักษาความปลอดภัย",
    status: "active",
  },
]

export default function FactoryDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { isTH } = useLanguageStore()

  const factory = mockFactoryData[id] || mockFactoryData["1"]

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Headbar title={isTH ? "ข้อมูลโรงงาน" : "Factory Detail"} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-28 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Factory Info Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-800 font-semibold">
                  <Clock className="w-5 h-5" />
                  <span>{isTH ? "ข้อมูลโรงงาน" : "Factory Information"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {isTH ? "พร้อมใช้งาน" : "Active"}
                  </span>
                  <Link
                    href={`/factory/${id}/edit`}
                    className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    {isTH ? "แก้ไข" : "Edit"}
                  </Link>
                </div>
              </div>

              <div className="pl-7">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{factory.name}</h3>
                <p className="text-sm text-slate-500">
                  {isTH ? "ที่อยู่ : " : "Address: "}{factory.address}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 my-6" />

            {/* Guards Table Section */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <Clock className="w-5 h-5" />
                <span>{isTH ? "ตารางข้อมูลรักษาความปลอดภัย" : "Security Guard Records"}</span>
              </div>
              <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
                <Plus className="w-4 h-4" />
                {isTH ? "เพิ่มใหม่" : "Add New"}
              </button>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-center py-4 px-3 font-semibold text-slate-700 w-12">#</th>
                    <th className="text-left py-4 px-3 font-semibold text-slate-700">{isTH ? "ชื่อ-นามสกุล" : "Full Name"}</th>
                    <th className="text-left py-4 px-3 font-semibold text-slate-700">{isTH ? "เบอร์ติดต่อ" : "Phone"}</th>
                    <th className="text-left py-4 px-3 font-semibold text-slate-700">{isTH ? "ชื่อบัญชี" : "Account"}</th>
                    <th className="text-left py-4 px-3 font-semibold text-slate-700">{isTH ? "ตำแหน่ง" : "Position"}</th>
                    <th className="text-center py-4 px-3 font-semibold text-slate-700">{isTH ? "สถานะ" : "Status"}</th>
                    <th className="text-center py-4 px-3 font-semibold text-slate-700">{isTH ? "เพิ่มเติม" : "More"}</th>
                  </tr>
                </thead>
                <tbody>
                  {mockGuards.map((row) => (
                    <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-3 text-center text-slate-600">{row.id}</td>
                      <td className="py-4 px-3 text-slate-600">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
                          {row.name}
                        </div>
                      </td>
                      <td className="py-4 px-3 text-slate-600">{row.phone}</td>
                      <td className="py-4 px-3 text-slate-600">{row.account}</td>
                      <td className="py-4 px-3 text-slate-600 text-xs">{row.position}</td>
                      <td className="py-4 px-3 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {isTH ? "พร้อมใช้งาน" : "Active"}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-center">
                        <button className="text-slate-400 hover:text-slate-700 transition-colors">
                          <FileText className="w-5 h-5 mx-auto" />
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

          <footer className="mt-12 text-center text-xs text-slate-500 pb-4">
            v 0.0.1 - ME Group Enterprise Co., Ltd. 2025
          </footer>
        </main>
      </div>
    </div>
  )
}
