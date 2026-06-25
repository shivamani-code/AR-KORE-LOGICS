'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardOverview } from '@/components/dashboard-overview'
import { useUser } from '@/components/user-context'

export default function DashboardPage() {
  const router = useRouter()
  const { selectedCareer, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading) {
      if (!selectedCareer) {
        router.replace('/onboarding')
      }
    }
  }, [isLoading, selectedCareer, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
          <p className="text-zinc-500 text-sm font-medium">Loading your workspace…</p>
        </div>
      </div>
    )
  }

  return <DashboardOverview />
}
