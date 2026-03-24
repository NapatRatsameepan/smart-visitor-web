"use client"

import React, { useState } from 'react';
import { Eye, EyeOff, X, Upload } from 'lucide-react';
import { useLanguageStore } from '@/store/useLanguageStore';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileSettingsModal({ isOpen, onClose }: ProfileSettingsModalProps) {
  const { isTH } = useLanguageStore();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm sm:p-6">
      <div className="relative flex flex-col md:flex-row gap-6 w-full max-w-5xl max-h-full overflow-y-auto hide-scrollbar">
        
        {/* Close Button Desktop */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 bg-white rounded-full text-slate-500 hover:text-slate-800 shadow-sm hidden md:flex transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* --- Card 1: Change Password --- */}
        <div className="flex-1 bg-white rounded-3xl p-8 md:p-10 flex flex-col shadow-xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10 tracking-tight">
            {isTH ? "เปลี่ยนรหัสผ่าน" : "Change Password"}
          </h2>
          
          <div className="space-y-6 flex-1 max-w-sm mx-auto w-full">
            {/* Current Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800">
                {isTH ? "รหัสผ่าน" : "Password"}
              </label>
              <div className="relative">
                <input 
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder={isTH ? "กรอกรหัสผ่านปัจจุบัน" : "Enter current password"}
                  className="w-full h-11 px-4 pr-12 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm text-slate-700 placeholder-slate-400 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-800 hover:text-slate-600 focus:outline-none"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800">
                {isTH ? "รหัสผ่านใหม่" : "New Password"}
              </label>
              <div className="relative">
                <input 
                  type={showNewPassword ? "text" : "password"}
                  placeholder={isTH ? "กรอกรหัสผ่านใหม่" : "Enter new password"}
                  className="w-full h-11 px-4 pr-12 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm text-slate-700 placeholder-slate-400 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-800 hover:text-slate-600 focus:outline-none"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800">
                {isTH ? "รหัสผ่านใหม่อีกครั้ง" : "Confirm New Password"}
              </label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={isTH ? "กรอกรหัสผ่านใหม่อีกครั้ง" : "Enter new password again"}
                  className="w-full h-11 px-4 pr-12 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent text-sm text-slate-700 placeholder-slate-400 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-800 hover:text-slate-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-12 pt-4">
              <button 
                onClick={onClose}
                className="flex-1 max-w-[140px] h-11 rounded-full border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 transition-colors text-sm"
              >
                {isTH ? "ยกเลิก" : "Cancel"}
              </button>
              <button 
                className="flex-1 max-w-[140px] h-11 rounded-full bg-[#0f172a] text-white font-semibold hover:bg-[#1e293b] transition-colors shadow-sm text-sm"
              >
                {isTH ? "ตกลง" : "Confirm"}
              </button>
            </div>
          </div>
        </div>

        {/* --- Card 2: Change Profile Picture --- */}
        <div className="flex-1 bg-white rounded-3xl p-8 md:p-10 flex flex-col shadow-xl">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-10 tracking-tight">
            {isTH ? "เปลี่ยนรูปประจำตัว" : "Change Profile Picture"}
          </h2>
          
          <div className="flex-1 flex flex-col items-center justify-center min-h-[250px] space-y-8">
            <div className="relative group cursor-pointer lg:w-[320px] lg:h-[320px] w-56 h-56">
              <div className="w-full h-full rounded-full bg-[#d1d5db] overflow-hidden flex items-center justify-center shadow-inner transition-transform group-hover:scale-[1.02]">
                {/* No initial image, matching original dark gray/light gray circle */}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                 <Upload className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8 pb-4">
            <button 
              onClick={onClose}
              className="flex-1 max-w-[140px] h-11 rounded-full border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 transition-colors text-sm"
            >
              {isTH ? "ยกเลิก" : "Cancel"}
            </button>
            <button 
              className="flex-1 max-w-[140px] h-11 rounded-full bg-[#0f172a] text-white font-semibold hover:bg-[#1e293b] transition-colors shadow-sm text-sm"
            >
              {isTH ? "ตกลง" : "Confirm"}
            </button>
          </div>
        </div>
        
        {/* Mobile close button inside the flow */}
        <button 
          onClick={onClose}
          className="md:hidden mt-4 self-center p-3 bg-white rounded-full text-slate-700 shadow-lg flex items-center justify-center"
        >
          <X className="w-6 h-6" />
        </button>

      </div>
    </div>
  );
}
