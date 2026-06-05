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
      <main className="mt-16 md:ml-64 p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  )
}
