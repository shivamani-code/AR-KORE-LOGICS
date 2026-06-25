'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { UserProvider } from '@/components/user-context'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <UserProvider>
      <div className="bg-void text-white selection:bg-brand-primary/30 selection:text-white h-screen overflow-hidden flex flex-col md:flex-row">
        <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
          <DashboardNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isSidebarOpen={sidebarOpen} />
          <main className="flex-1 mt-16 p-4 sm:p-6 md:p-8 overflow-y-auto bg-void">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  )
}
