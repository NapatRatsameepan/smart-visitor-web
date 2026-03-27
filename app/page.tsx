"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"

export default function RootPage() {
  const router = useRouter()
  const { role } = useAuthStore()

  useEffect(() => {
    if (role === 'SUPER_ADMIN') {
      router.replace("/super-admin/dashboard")
    } else {
      router.replace("/admin/dashboard")
    }
  }, [role, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
    </div>
  )
}
