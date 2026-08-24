'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutGrid,
  BookOpen,
  Map,
  Users,
  MessageSquare,
  FolderOpen,
  Compass,
  Bot,
  Wrench,
  ExternalLink,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { useUser } from '@/components/user-context'

interface MenuItem {
  icon: React.ElementType
  label: string
  href: string
  exact?: boolean
  sublabel?: string
  external?: boolean
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

export function DashboardSidebar({ isOpen = true, onToggle = () => {} }) {
  const pathname = usePathname()
  const router = useRouter()
  const { selectedCareer } = useUser()
  const roadmapLabel = selectedCareer ? (careerLabelMap[selectedCareer] || selectedCareer) : 'My Roadmap'

  const menuItems: MenuItem[] = [
    { icon: LayoutGrid, label: 'Overview', href: '/dashboard', exact: true },
    { icon: BookOpen, label: 'Courses', href: '/dashboard/courses' },
    {
      icon: Map,
      label: 'My Roadmap',
      href: '/dashboard/roadmaps',
      sublabel: roadmapLabel,
    },
    { icon: Compass, label: 'Roadmap Planner', href: 'https://roadmap-nine-zeta.vercel.app/careers', external: true },
    { icon: Bot, label: 'AI Mentor Studio', href: 'https://ai-mentor-studio-v3.vercel.app/', external: true },
    { icon: Wrench, label: 'Toolz Studio', href: 'https://toolz-studio-nine.vercel.app/', external: true },
    { icon: Users, label: 'Mentorship', href: '/dashboard/mentorship' },
    { icon: MessageSquare, label: 'Community', href: '/dashboard/community' },
    { icon: FolderOpen, label: 'Resources', href: '/dashboard/resources' },
  ]

  const handleLinkClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      onToggle()
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (err) {
      console.error('Logout failed:', err)
    }
    router.push('/login')
  }

  const isActive = (item: MenuItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  return (
    <>
      {/* Mobile FAB toggle */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 md:hidden bg-white text-black p-3 rounded-full shadow-lg hover:bg-zinc-200 transition-all active:scale-95"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-[#070709] h-screen fixed left-0 top-0 flex flex-col z-40 transition-all duration-200 md:relative md:z-auto border-r border-white/[0.04] ${
          isOpen
            ? 'w-60 translate-x-0'
            : 'w-0 -translate-x-full md:w-0 md:-translate-x-full overflow-hidden border-r-0'
        }`}
      >
        <div className="w-60 flex flex-col h-full flex-shrink-0">
          {/* Logo Header */}
          <div className="p-4 border-b border-white/[0.04]">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="AR KORE LOGICS home"
            >
              <Logo className="w-5 h-5 text-white" />
              <span className="text-xs font-semibold tracking-tight text-white">
                AR KORE LOGICS
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {menuItems.map((item, idx) => {
              const IconComponent = item.icon
              const active = !item.external && isActive(item)

              if (item.external) {
                return (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 group relative text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.02] border border-transparent"
                  >
                    <IconComponent
                      size={14}
                      aria-hidden="true"
                      className="flex-shrink-0 text-zinc-500 group-hover:text-zinc-300"
                    />
                    <div className="flex-1 min-w-0 flex items-center justify-between">
                      <span className="block leading-none">{item.label}</span>
                      <ExternalLink size={11} className="text-zinc-500 group-hover:text-zinc-300 ml-1" />
                    </div>
                  </a>
                )
              }

              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 group relative text-xs font-medium ${
                    active
                      ? 'bg-white/[0.04] text-white border border-white/[0.06]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.02] border border-transparent'
                  }`}
                >
                  <IconComponent
                    size={14}
                    aria-hidden="true"
                    className={`flex-shrink-0 ${active ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}
                  />

                  <div className="flex-1 min-w-0">
                    <span className="block leading-none">
                      {item.label}
                    </span>
                    {item.sublabel && (
                      <span className="text-[9px] text-zinc-500 block mt-0.5 truncate">
                        {item.sublabel}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Bottom: Settings & Logout */}
          <div className="p-3 border-t border-white/[0.04] space-y-1">
            <Link
              href="/dashboard/settings"
              onClick={handleLinkClick}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 text-xs font-medium border ${
                pathname === '/dashboard/settings'
                  ? 'bg-white/[0.04] text-white border-white/[0.06]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.02] border-transparent'
              }`}
            >
              <Settings
                size={14}
                aria-hidden="true"
                className={`${pathname === '/dashboard/settings' ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}
              />
              <span>Settings</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-rose-400 hover:bg-rose-500/[0.04] transition-all border border-transparent"
              aria-label="Logout"
            >
              <LogOut
                size={14}
                aria-hidden="true"
                className="text-zinc-500 group-hover:text-rose-400 transition-colors"
              />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
