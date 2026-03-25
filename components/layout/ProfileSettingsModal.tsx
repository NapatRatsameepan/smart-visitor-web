"use client"

import React from 'react';
import { X, Upload } from 'lucide-react';
import { useLanguageStore } from '@/store/useLanguageStore';

import { useAuthStore } from '@/store/useAuthStore';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockFactories = [
  { id: '1', nameTH: 'โรงงาน A (กรุงเทพฯ)', nameEN: 'Factory A (Bangkok)' },
  { id: '2', nameTH: 'โรงงาน B (ระยอง)', nameEN: 'Factory B (Rayong)' },
];

export function ProfileSettingsModal({ isOpen, onClose }: ProfileSettingsModalProps) {
  const { isTH } = useLanguageStore();
  const { role, setRole, factoryId, setFactoryId } = useAuthStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm sm:p-6">
      <div className="relative w-full max-w-md max-h-full flex flex-col items-center">
        
        {/* Card: Change Profile Picture */}
        <div className="w-full bg-white rounded-3xl p-8 md:p-10 flex flex-col shadow-xl relative">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10 tracking-tight mt-2">
            {isTH ? "เปลี่ยนรูปประจำตัว" : "Change Profile Picture"}
          </h2>
          
          <div className="flex-1 flex flex-col items-center justify-center min-h-[200px] space-y-8 w-full">
            <div className="relative group cursor-pointer w-48 h-48 md:w-56 md:h-56">
              <div className="w-full h-full rounded-full bg-[#d1d5db] overflow-hidden flex items-center justify-center shadow-inner transition-transform group-hover:scale-[1.02]">
                {/* No initial image, matching original dark gray/light gray circle */}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                 <Upload className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Mock Role Switcher (For Development/Testing) */}
            <div className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 mt-6">
              <h3 className="text-sm font-semibold text-slate-800 mb-4">{isTH ? "จำลองบทบาทผู้ใช้งาน (Test Mock)" : "Simulate User Role (Test Mock)"}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{isTH ? "ระดับผู้ดูแลระบบ" : "Admin Level"}</span>
                  <select 
                    value={role}
                    onChange={(e) => {
                      const newRole = e.target.value as 'SUPER_ADMIN' | 'ADMIN';
                      setRole(newRole);
                      if (newRole === 'SUPER_ADMIN') {
                        setFactoryId(null);
                      } else if (!factoryId && mockFactories.length > 0) {
                        setFactoryId(mockFactories[0].id);
                      }
                    }}
                    className="h-9 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
                  >
                    <option value="SUPER_ADMIN">{isTH ? "Super Admin (ทั้งหมด)" : "Super Admin (All)"}</option>
                    <option value="ADMIN">{isTH ? "Admin (เฉพาะโรงงาน)" : "Admin (Specific Factory)"}</option>
                  </select>
                </div>

                {role === 'ADMIN' && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{isTH ? "พื้นที่รับผิดชอบ" : "Assigned Factory"}</span>
                    <select 
                      value={factoryId || ''}
                      onChange={(e) => setFactoryId(e.target.value)}
                      className="h-9 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white max-w-[200px]"
                    >
                      {mockFactories.map(factory => (
                        <option key={factory.id} value={factory.id}>
                          {isTH ? factory.nameTH : factory.nameEN}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8 pb-4 w-full">
            <button 
              onClick={onClose}
              className="flex-1 h-11 rounded-full border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 transition-colors text-sm"
            >
              {isTH ? "ยกเลิก" : "Cancel"}
            </button>
            <button 
              className="flex-1 h-11 rounded-full bg-[#0f172a] text-white font-semibold hover:bg-[#1e293b] transition-colors shadow-sm text-sm"
            >
              {isTH ? "ตกลง" : "Confirm"}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
