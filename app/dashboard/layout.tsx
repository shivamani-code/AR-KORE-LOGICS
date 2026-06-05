import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardNavbar } from '@/components/dashboard-navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 min-h-screen">
      <DashboardSidebar />
      <DashboardNavbar />
      <main className="ml-64 mt-16 p-8">
        {children}
      </main>
    </div>
  )
}
