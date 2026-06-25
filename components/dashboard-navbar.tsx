'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, Bell, User, ChevronLeft, ChevronRight, Settings, LogOut, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useUser } from '@/components/user-context'

interface DashboardNavbarProps {
  onToggleSidebar: () => void
  isSidebarOpen: boolean
}

const careerLabelMap: Record<string, string> = {
  fullstack: 'Full Stack Dev',
  'ai-ml': 'AI & ML',
  cybersecurity: 'Cybersecurity',
  'data-science': 'Data Science',
  cloud: 'Cloud Architect',
  devops: 'DevOps',
  uiux: 'UI/UX Design',
  mobile: 'Mobile Dev',
}

export function DashboardNavbar({ onToggleSidebar, isSidebarOpen }: DashboardNavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const { userName, selectedCareer } = useUser()
  const careerLabel = selectedCareer ? (careerLabelMap[selectedCareer] || selectedCareer) : 'Career OS'
  const profileRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (err) {
      console.error('Logout failed:', err)
    }
    router.push('/login')
  }

  const notifications = [
    { id: 1, text: 'New resource added to your roadmap', time: '5m ago', dot: 'bg-indigo-500' },
    { id: 2, text: 'Mentor confirmed your session', time: '1h ago', dot: 'bg-zinc-500' },
    { id: 3, text: 'New mentor feedback available', time: '2h ago', dot: 'bg-zinc-500' },
  ]

  return (
    <nav
      className={`fixed top-0 right-0 h-16 bg-[#070709]/80 backdrop-blur-md border-b border-white/[0.04] flex items-center justify-between px-6 z-40 transition-all duration-200 ${
        isSidebarOpen ? 'left-60' : 'left-0'
      }`}
    >
      {/* Left: Toggle + Search */}
      <div className="flex items-center gap-2 flex-1 max-w-sm">
        <button
          onClick={onToggleSidebar}
          className="hidden md:flex p-1.5 hover:bg-white/[0.04] rounded-lg transition text-zinc-500 hover:text-white flex-shrink-0"
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} aria-hidden="true" />
          <input
            id="dashboard-search"
            type="search"
            placeholder="Search resources, modules…"
            className="w-full h-8 pl-8 pr-4 bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] focus:border-indigo-500/50 rounded-lg text-xs text-white placeholder-zinc-600 focus:outline-none transition-all duration-150"
            aria-label="Search courses and resources"
          />
        </div>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-2.5 ml-3">

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            id="notification-btn"
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
            className="relative p-2 text-zinc-500 hover:text-white hover:bg-white/[0.04] rounded-lg transition"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" aria-hidden="true" />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 2, scale: 0.99 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-72 bg-[#0c0c0f] border border-white/[0.06] rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-white/[0.04] flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Notifications</span>
                  <span className="text-[9px] font-medium text-zinc-400 px-2 py-0.5 bg-white/[0.02] border border-white/[0.06] rounded">
                    {notifications.length}
                  </span>
                </div>
                <div className="py-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start gap-2.5 px-4 py-2.5 hover:bg-white/[0.02] transition cursor-pointer"
                    >
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${n.dot}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-zinc-300 font-medium leading-tight">{n.text}</p>
                        <p className="text-[9px] text-zinc-600 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            id="user-profile-btn"
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
            className="flex items-center gap-2 pl-2 pr-1.5 py-1 hover:bg-white/[0.04] rounded-lg transition group"
            aria-label="Open user menu"
          >
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-semibold text-white leading-none">{userName}</p>
              <p className="text-[9px] text-zinc-500 mt-0.5">{careerLabel}</p>
            </div>
            <div className="w-7 h-7 bg-white/[0.02] border border-white/[0.06] rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-white/[0.1] transition">
              <User className="text-zinc-400" size={13} aria-hidden="true" />
            </div>
            <ChevronDown
              size={12}
              className="text-zinc-500"
            />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 2, scale: 0.99 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-48 bg-[#0c0c0f] border border-white/[0.06] rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-white/[0.04] sm:hidden">
                  <p className="text-xs font-semibold text-white">{userName}</p>
                  <p className="text-[9px] text-zinc-500 mt-0.5">{careerLabel}</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-zinc-400 hover:text-white hover:bg-white/[0.02] transition text-xs font-medium"
                  >
                    <Settings size={13} />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/[0.04] transition text-xs font-medium text-left"
                  >
                    <LogOut size={13} />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  )
}
