"use client"

import React, { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { useLanguageStore } from "@/store/useLanguageStore"
import { useDashboardFilterStore } from "@/store/useDashboardFilterStore"
import { regions, provinces, factories, getProvincesByRegion, getFactoriesByProvince, getFactoriesByRegion, getFilteredFactories } from "@/lib/mockFactories"
import { Sidebar } from "@/components/layout/Sidebar"
import { Headbar } from "@/components/layout/Headbar"
import { Clock, Map, MapPin, Building2, ChevronDown, Calendar, Users, TrendingUp, BarChart3, Activity } from "lucide-react"

// Dynamic import for Leaflet map (no SSR)
const FactoryMap = dynamic(() => import("@/components/dashboard/FactoryMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center text-slate-400">
      Loading map...
    </div>
  ),
})

export default function SuperAdminDashboard() {
  const { isTH } = useLanguageStore()
  const { 
    selectedRegion, 
    selectedProvince, 
    selectedFactory,
    setRegion,
    setProvince,
    setFactory
  } = useDashboardFilterStore()

  // Date Range State
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")

  // Pie Chart Tooltip State
  const [hoveredPurpose, setHoveredPurpose] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Compute multiplier based on how many factories are in scope
  const filteredDataFactories = useMemo(
    () => getFilteredFactories(selectedRegion, selectedProvince, selectedFactory),
    [selectedRegion, selectedProvince, selectedFactory]
  )

  const factoryCount = filteredDataFactories.length
  const totalFactories = 12
  const multiplier = factoryCount / totalFactories

  // Title with selected context
  const filterLabel = useMemo(() => {
    if (selectedFactory) {
      const f = filteredDataFactories[0]
      return f ? ` - ${isTH ? f.name : f.nameEn}` : ''
    }
    return ''
  }, [selectedFactory, filteredDataFactories, isTH])

  // Get filtered options for cascading dropdowns
  const filteredProvinces = selectedRegion ? getProvincesByRegion(selectedRegion) : provinces;
  const filteredFactories = selectedProvince
    ? getFactoriesByProvince(selectedProvince)
    : selectedRegion
      ? getFactoriesByRegion(selectedRegion)
      : factories;

  const selectBaseClass = "appearance-none border border-slate-300 rounded-full h-10 pl-9 pr-8 bg-white text-slate-700 hover:bg-slate-50 transition-all text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-auto shadow-sm"

  // Simulated hourly visitor trend data (line chart)
  const hours = ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '18:00'];
  const todayVisitors = [20, 180, 220, 150, 190, 120, 60].map(v => Math.floor(v * multiplier));
  const yesterdayVisitors = [10, 120, 160, 180, 140, 100, 40].map(v => Math.floor(v * multiplier));
  const maxVisitor = Math.max(...todayVisitors, ...yesterdayVisitors, 1);

  // Generate SVG polyline points with optimized padding to maximize space
  const chartW = 500, chartH = 250;
  const padLeft = 35, padRight = 25, padTop = 10, padBottom = 25;
  const usableW = chartW - padLeft - padRight;
  const usableH = chartH - padTop - padBottom;

  const toPoint = (values: number[]) => values.map((v, i) => {
    const x = padLeft + (i / (values.length - 1)) * usableW;
    const y = padTop + (1 - v / maxVisitor) * usableH;
    return `${x},${y}`;
  }).join(' ');

  const todayLine = toPoint(todayVisitors);
  const yesterdayLine = toPoint(yesterdayVisitors);

  // Pie chart data for Visit Purpose
  const purposeData = [
    { name: isTH ? 'ส่งของ' : 'Delivery', pct: 35, color: '#3b82f6' },
    { name: isTH ? 'ประชุม' : 'Meeting', pct: 25, color: '#10b981' },
    { name: isTH ? 'ตรวจสอบ' : 'Inspection', pct: 18, color: '#f59e0b' },
    { name: isTH ? 'ซ่อมบำรุง' : 'Maintenance', pct: 12, color: '#a855f7' },
    { name: isTH ? 'อื่นๆ' : 'Other', pct: 10, color: '#ef4444' },
  ];

  // Generate solid pie chart SVG arcs
  const pieRadius = 85, pieCx = 100, pieCy = 100;
  const pieArcs = (() => {
    let cumAngle = -90;
    return purposeData.map((d) => {
      const startAngle = cumAngle;
      const sweep = (d.pct / 100) * 360;
      cumAngle += sweep;
      const endAngle = cumAngle;
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const largeArc = sweep > 180 ? 1 : 0;
      const x1o = pieCx + pieRadius * Math.cos(startRad);
      const y1o = pieCy + pieRadius * Math.sin(startRad);
      const x2o = pieCx + pieRadius * Math.cos(endRad);
      const y2o = pieCy + pieRadius * Math.sin(endRad);
      const path = `M ${pieCx} ${pieCy} L ${x1o} ${y1o} A ${pieRadius} ${pieRadius} 0 ${largeArc} 1 ${x2o} ${y2o} Z`;
      return { ...d, path };
    });
  })();

  // Quick Insights data
  const quickInsights = [
    { icon: <Clock className="w-5 h-5 text-blue-500" />, label: isTH ? 'ชั่วโมงพีควันนี้' : 'Peak Hour Today', value: '09:00 AM', sub: `${Math.floor(215 * multiplier)} ${isTH ? 'คน' : 'visitors'}`, bg: 'bg-blue-50' },
    { icon: <Building2 className="w-5 h-5 text-emerald-500" />, label: isTH ? 'แผนกที่เยี่ยมชมสูงสุด' : 'Most Visited Dept', value: isTH ? 'ฝ่ายผลิต' : 'Production', sub: `${Math.floor(342 * multiplier)} ${isTH ? 'คน' : 'visitors'}`, bg: 'bg-emerald-50' },
    { icon: <TrendingUp className="w-5 h-5 text-amber-500" />, label: isTH ? 'ยานพาหนะที่พบมากสุด' : 'Common Vehicle', value: 'Toyota', sub: `${Math.floor(187 * multiplier)} ${isTH ? 'คัน' : 'vehicles'}`, bg: 'bg-amber-50' },
    { icon: <Activity className="w-5 h-5 text-purple-500" />, label: isTH ? 'เทียบกับเมื่อวาน' : 'vs Yesterday', value: '+18%', sub: isTH ? 'เพิ่มขึ้น' : 'More visitors', bg: 'bg-purple-50' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans">
      <Headbar 
        breadcrumbs={[
          { label: (isTH ? 'แดชบอร์ด (ส่วนกลาง)' : 'Global Dashboard') + filterLabel }
        ]} 
      />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 ml-0 dynamic-ml p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto w-full">
          
          <div className="max-w-7xl mx-auto mb-6 flex flex-col gap-4">
            
            {/* Context Filters Area */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
              <div className="relative flex-1 md:flex-none">
                <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                <select
                  value={selectedRegion || ''}
                  onChange={(e) => setRegion(e.target.value || null)}
                  className={`${selectBaseClass} min-w-[160px]`}
                >
                  <option value="">{isTH ? "ทั้งหมด (ภูมิภาค)" : "All (Region)"}</option>
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>{isTH ? r.name : r.nameEn}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>

              <div className="relative flex-1 md:flex-none">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                <select
                  value={selectedProvince || ''}
                  onChange={(e) => setProvince(e.target.value || null)}
                  className={`${selectBaseClass} min-w-[160px]`}
                >
                  <option value="">{isTH ? "ทุกจังหวัด" : "All Provinces"}</option>
                  {filteredProvinces.map((p) => (
                    <option key={p.id} value={p.id}>{isTH ? p.name : p.nameEn}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>

              <div className="relative flex-1 md:flex-none">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                <select
                  value={selectedFactory || ''}
                  onChange={(e) => setFactory(e.target.value || null)}
                  className={`${selectBaseClass} min-w-[180px]`}
                >
                  <option value="">{isTH ? "ทุกโรงงาน" : "All Factories"}</option>
                  {filteredFactories.map((f) => (
                    <option key={f.id} value={f.id}>{isTH ? f.name : f.nameEn}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>

              <div className="flex flex-1 md:flex-none justify-between md:justify-start items-center gap-2 border border-slate-300 rounded-full h-10 px-4 bg-white text-slate-700 shadow-sm md:ml-auto focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer w-[110px] md:w-auto"
                />
                <span className="text-slate-400 text-sm font-medium px-1">-</span>
                <input 
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer w-[110px] md:w-auto" 
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-slate-800 font-semibold mt-2">
              <Clock className="w-5 h-5" />
              <span className="text-xl">{isTH ? "สถิติการเยี่ยมชม (รวม)" : "Global Visitor Statistics"}</span>
              <span className="ml-2 text-sm font-medium px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                {isTH ? `${factoryCount} โรงงาน` : `${factoryCount} factories`}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="w-full text-left">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{isTH ? "ผู้เยี่ยมชมทั้งหมด" : "TOTAL VISITORS"}</span>
                  <div className="text-3xl font-bold text-slate-900 tracking-tight mt-1">{Math.floor(12842 * multiplier).toLocaleString()}</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
                <div className="w-full text-left">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{isTH ? "ค่าเฉลี่ย" : "AVG FLOW"}</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">{Math.floor(842 * multiplier)}</span>
                    <span className="text-sm text-slate-400 font-medium">/{isTH ? "ชม." : "hr"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="flex items-center justify-between w-full">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-emerald-500" />
                  </div>
                </div>
                <div className="w-full text-left">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{isTH ? "โรงงานออนไลน์" : "ACTIVE NODES"}</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">{factoryCount}</span>
                    <span className="text-sm text-slate-400 font-medium">/ {totalFactories}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h3 className="text-base font-semibold text-slate-800">{isTH ? 'แนวโน้มผู้เยี่ยมชม' : 'Visitor Trend'}</h3>
                    <p className="text-xs text-slate-500">{isTH ? 'จำนวนผู้เข้าชมรายชั่วโมงวันนี้' : 'Hourly visitor flow today'}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-blue-500 inline-block"></span> {isTH ? 'วันนี้' : 'Today'}</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-slate-300 inline-block"></span> {isTH ? 'เมื่อวาน' : 'Yesterday'}</span>
                  </div>
                </div>
                <div className="w-full mt-4" style={{ aspectRatio: `${chartW}/${chartH}` }}>
                  <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                    {[0, 0.25, 0.5, 0.75, 1].map((frac, i) => {
                      const y = padTop + frac * usableH;
                      return <line key={i} x1={padLeft} y1={y} x2={chartW - padRight} y2={y} stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="4 2" />;
                    })}
                    {[0, 0.25, 0.5, 0.75, 1].map((frac, i) => {
                      const y = padTop + frac * usableH;
                      const val = Math.round(maxVisitor * (1 - frac));
                      return <text key={i} x={padLeft - 8} y={y + 3} textAnchor="end" className="fill-slate-400" style={{ fontSize: '10px' }}>{val}</text>;
                    })}
                    <polyline points={yesterdayLine} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                      <linearGradient id="todayGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points={`${padLeft},${padTop + usableH} ${todayLine} ${chartW - padRight},${padTop + usableH}`}
                      fill="url(#todayGrad)"
                    />
                    <polyline points={todayLine} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {todayVisitors.map((v, i) => {
                      const x = padLeft + (i / (todayVisitors.length - 1)) * usableW;
                      const y = padTop + (1 - v / maxVisitor) * usableH;
                      return <circle key={i} cx={x} cy={y} r="3" fill="#3b82f6" stroke="white" strokeWidth="1.5" />;
                    })}
                    {hours.map((h, i) => {
                      const x = padLeft + (i / (hours.length - 1)) * usableW;
                      return <text key={i} x={x} y={chartH - 5} textAnchor="middle" className="fill-slate-400" style={{ fontSize: '10px' }}>{h}</text>;
                    })}
                  </svg>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col relative">
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-slate-800">{isTH ? 'วัตถุประสงค์การเยี่ยมชม' : 'Visit Purpose'}</h3>
                  <p className="text-xs text-slate-500">{isTH ? 'แยกตามประเภทเหตุผล' : 'Breakdown by purpose type'}</p>
                </div>
                <div className="flex flex-col items-center gap-5 flex-1 justify-center">
                  <svg viewBox="0 0 200 200" className="w-56 h-56">
                    {pieArcs.map((arc, i) => (
                      <path 
                        key={i} 
                        d={arc.path} 
                        fill={arc.color} 
                        stroke="white" 
                        strokeWidth="2" 
                        className="transition-all duration-300 hover:opacity-80 cursor-pointer" 
                        onMouseEnter={(e) => {
                          setHoveredPurpose(arc.name);
                          setMousePos({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                        onMouseLeave={() => setHoveredPurpose(null)}
                      />
                    ))}
                  </svg>
                  <div className="flex flex-col gap-2 w-full">
                    {purposeData.map((d, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
                          <span className="text-slate-700">{d.name}</span>
                        </div>
                        <span className="font-bold text-slate-900">{d.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {hoveredPurpose && (
                  <div 
                    className="fixed z-50 bg-slate-900/95 backdrop-blur text-white text-xs px-3 py-2 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-[calc(100%+12px)] flex flex-col gap-1 border border-slate-700"
                    style={{ left: mousePos.x, top: mousePos.y }}
                  >
                    <div className="flex items-center gap-1.5 font-semibold">
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: purposeData.find(p => p.name === hoveredPurpose)?.color }}
                      ></span>
                      {purposeData.find(p => p.name === hoveredPurpose)?.name}
                    </div>
                    <div className="text-slate-300">
                      {Math.floor(purposeData.find(p => p.name === hoveredPurpose)?.pct! / 100 * 12842 * multiplier).toLocaleString()} {isTH ? 'คน' : 'visitors'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px] flex flex-col">
                <div className="p-4 py-3 border-b border-slate-100 bg-white/50 flex justify-between items-center shrink-0">
                  <div>
                    <h3 className="font-semibold text-sm text-slate-800 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      {isTH ? 'แผนที่โรงงาน' : 'Factory Locations'}
                    </h3>
                    <p className="text-xs text-slate-500 ml-6">{isTH ? 'ความหนาแน่นผู้เยี่ยมชมตามสถานที่' : 'Visitor density by location'}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{factoryCount} Locations</span>
                </div>
                <div className="flex-1 relative w-full min-h-[350px]">
                  <FactoryMap />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
                <div className="mb-5">
                  <h3 className="text-base font-semibold text-slate-800">{isTH ? 'สรุปข้อมูลเด่น' : 'Quick Insights'}</h3>
                  <p className="text-xs text-slate-500">{isTH ? 'ตัวชี้วัดสำคัญประจำวัน' : "Today's key metrics"}</p>
                </div>
                <div className="flex flex-col gap-3 flex-1 justify-center">
                  {quickInsights.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all bg-white">
                      <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500">{item.label}</p>
                        <p className="text-lg font-bold text-slate-900 leading-tight">{item.value}</p>
                      </div>
                      <span className="text-xs text-slate-500 text-right shrink-0">{item.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
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
