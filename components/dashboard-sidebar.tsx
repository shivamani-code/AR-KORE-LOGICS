'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LayoutGrid, BookOpen, Map, Library, Users, Zap, MessageSquare, Trophy, Settings, LogOut, Menu, X } from 'lucide-react'

const menuItems = [
  { icon: LayoutGrid, label: 'Overview', href: '/dashboard', exact: true },
  { icon: BookOpen, label: 'My Learning', href: '/dashboard/learning' },
  { icon: Map, label: 'Roadmaps', href: '/dashboard/roadmaps' },
  { icon: Library, label: 'Resources', href: '/dashboard/resources' },
  { icon: Users, label: 'Mentorship', href: '/dashboard/mentorship' },
  { icon: MessageSquare, label: 'Community', href: '/dashboard/community' },
  { icon: Zap, label: 'Opportunities', href: '/dashboard/opportunities' },
  { icon: Trophy, label: 'Achievements', href: '/dashboard/achievements' },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button - appears above navbar on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 md:hidden bg-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col overflow-y-auto z-40 transition-transform duration-300 md:relative md:z-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
      <div className="p-6 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AR</span>
          </div>
          <span className="text-xl font-bold text-slate-900">AR LOGICS</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, idx) => {
          const IconComponent = item.icon
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          
          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-purple-100 text-purple-600 border border-purple-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <IconComponent size={20} aria-hidden="true" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 space-y-2">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          onClick={() => setIsOpen(false)}
        >
          <Settings size={20} aria-hidden="true" />
          <span className="font-medium">Settings</span>
        </Link>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          onClick={() => setIsOpen(false)}
          aria-label="Logout"
        >
          <LogOut size={20} aria-hidden="true" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
    </>
  )
}
