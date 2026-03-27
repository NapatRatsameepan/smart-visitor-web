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
  {
    date: "19/08/2568 08:15 น.",
    name: "นางสาวพิมพ์ใจ รักสะอาด",
    phone: "089-456-7890",
    plate: "กข5678 นนทบุรี",
    factory: "โรงงานมิตรผล อยุธยา",
    department: "ฝ่ายบัญชี",
    mission: "รับเอกสาร",
  },
  {
    date: "19/08/2568 09:00 น.",
    name: "นายวิชัย สุขสันต์",
    phone: "082-345-6789",
    plate: "ขค9012 ปทุมธานี",
    factory: "โรงงานมิตรผล สุพรรณบุรี",
    department: "ฝ่ายขนส่ง",
    mission: "ส่งสินค้า",
  },
  {
    date: "19/08/2568 10:30 น.",
    name: "นางมาลี ดวงดี",
    phone: "083-456-7891",
    plate: "คง3456 สมุทรปราการ",
    factory: "โรงงานมิตรผล กาญจนบุรี",
    department: "ฝ่ายจัดซื้อ",
    mission: "ติดตามสินค้า",
  },
  {
    date: "19/08/2568 11:45 น.",
    name: "นายประสิทธิ์ เจริญผล",
    phone: "084-567-8902",
    plate: "งจ7890 สมุทรสาคร",
    factory: "โรงงานมิตรผล นครปฐม",
    department: "ฝ่ายวิศวกรรม",
    mission: "ตรวจสอบเครื่องจักร",
  },
  {
    date: "19/08/2568 13:00 น.",
    name: "นางสาวสุภาพร ทองคำ",
    phone: "085-678-9013",
    plate: "จฉ1234 นครราชสีมา",
    factory: "โรงงานมิตรผล นครราชสีมา",
    department: "ฝ่ายบุคคล",
    mission: "สัมภาษณ์งาน",
  },
  {
    date: "19/08/2568 14:15 น.",
    name: "นายอนุชา พงษ์ดี",
    phone: "086-789-0124",
    plate: "ฉช5678 อุดรธานี",
    factory: "โรงงานมิตรผล ขอนแก่น",
    department: "ฝ่ายไอที",
    mission: "ติดตั้งซอฟต์แวร์",
  },
  {
    date: "20/08/2568 08:30 น.",
    name: "นางสุนีย์ แก้วใส",
    phone: "087-890-1235",
    plate: "ชซ9012 อุบลราชธานี",
    factory: "โรงงานมิตรผล อุบลราชธานี",
    department: "ฝ่ายการตลาด",
    mission: "ประชุมลูกค้า",
  },
  {
    date: "20/08/2568 09:45 น.",
    name: "นายธนกร ศิลปชัย",
    phone: "088-901-2346",
    plate: "ซฌ3456 เชียงใหม่",
    factory: "โรงงานมิตรผล ลำพูน",
    department: "ฝ่ายผลิต",
    mission: "รับงานด่วน",
  },
  {
    date: "20/08/2568 11:00 น.",
    name: "นางสาวรัตนา จันทร์เพ็ญ",
    phone: "089-012-3457",
    plate: "ฌญ7890 เชียงราย",
    factory: "โรงงานมิตรผล เชียงราย",
    department: "ฝ่ายคลังสินค้า",
    mission: "รับ-ส่งสินค้า",
  },
  {
    date: "20/08/2568 13:30 น.",
    name: "นายภูมิพัฒน์ รุ่งเรือง",
    phone: "081-123-4568",
    plate: "ญฎ1234 พิษณุโลก",
    factory: "โรงงานมิตรผล พิษณุโลก",
    department: "ฝ่ายขาย",
    mission: "เก็บเงิน",
  },
  {
    date: "20/08/2568 14:45 น.",
    name: "นางปิยะนุช วงศ์สว่าง",
    phone: "082-234-5679",
    plate: "ฎฏ5678 สุโขทัย",
    factory: "โรงงานมิตรผล สุโขทัย",
    department: "ฝ่ายบัญชี",
    mission: "ตรวจสอบบัญชี",
  },
  {
    date: "21/08/2568 08:00 น.",
    name: "นายกิตติศักดิ์ ประดิษฐ์",
    phone: "083-345-6780",
    plate: "ฏฐ9012 นครสวรรค์",
    factory: "โรงงานมิตรผล นครสวรรค์",
    department: "ฝ่ายซ่อมบำรุง",
    mission: "ซ่อมแซมอุปกรณ์",
  },
  {
    date: "21/08/2568 10:15 น.",
    name: "นางสาวอรอนงค์ สายใจ",
    phone: "084-456-7891",
    plate: "ฐฑ3456 กำแพงเพชร",
    factory: "โรงงานมิตรผล กำแพงเพชร",
    department: "ฝ่ายจัดซื้อ",
    mission: "สั่งซื้อวัตถุดิบ",
  },
  {
    date: "21/08/2568 11:30 น.",
    name: "นายปรีชา มีทรัพย์",
    phone: "085-567-8902",
    plate: "ฑฒ7890 ตาก",
    factory: "โรงงานมิตรผล ตาก",
    department: "ฝ่ายขนส่ง",
    mission: "ส่งเอกสาร",
  },
  {
    date: "21/08/2568 13:00 น.",
    name: "นางวิภา ใจงาม",
    phone: "086-678-9013",
    plate: "ณด1234 ราชบุรี",
    factory: "โรงงานมิตรผล ราชบุรี",
    department: "ฝ่ายบุคคล",
    mission: "อบรมพนักงาน",
  },
  {
    date: "21/08/2568 15:00 น.",
    name: "นายชัยวัฒน์ บุญช่วย",
    phone: "087-789-0124",
    plate: "ดต5678 เพชรบุรี",
    factory: "โรงงานมิตรผล เพชรบุรี",
    department: "ฝ่ายไอที",
    mission: "แก้ไขระบบเครือข่าย",
  },
  {
    date: "22/08/2568 09:00 น.",
    name: "นางสาวเพ็ญพักตร์ งามเลิศ",
    phone: "088-890-1235",
    plate: "ตถ9012 ประจวบคีรีขันธ์",
    factory: "โรงงานมิตรผล ชุมพร",
    department: "ฝ่ายการตลาด",
    mission: "เสนอขายสินค้า",
  },
  {
    date: "22/08/2568 10:30 น.",
    name: "นายสราวุธ พิทักษ์",
    phone: "089-901-2346",
    plate: "ถท3456 สุราษฎร์ธานี",
    factory: "โรงงานมิตรผล สุราษฎร์ธานี",
    department: "ฝ่ายผลิต",
    mission: "ตรวจรับสินค้า",
  },
  {
    date: "22/08/2568 14:00 น.",
    name: "นางสมศรี ยิ้มแย้ม",
    phone: "081-012-3457",
    plate: "ทธ7890 นครศรีธรรมราช",
    factory: "โรงงานมิตรผล นครศรีธรรมราช",
    department: "ฝ่ายคลังสินค้า",
    mission: "นับสต็อกสินค้า",
  },
  {
    date: "22/08/2568 15:30 น.",
    name: "นายวรพจน์ นิลกาญจน์",
    phone: "082-123-4568",
    plate: "ธน1234 สงขลา",
    factory: "โรงงานมิตรผล สงขลา",
    department: "ฝ่ายขาย",
    mission: "วางบิลและเก็บเงิน",
  },
]

export default function HistoryPage() {
  const { isTH } = useLanguageStore()

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Headbar title={isTH ? "ประวัติเยี่ยมชม" : "Visit History"} />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-0 dynamic-ml p-8 overflow-y-auto">
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
