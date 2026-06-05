'use client'

import { Search, Bell, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export function DashboardNavbar({ onToggleSidebar }) {
  return (
    <nav className="fixed top-0 left-0 right-0 md:left-64 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-40 shadow-sm">
      <div className="flex items-center gap-3 flex-1 max-w-xs sm:max-w-md">
        <button
          onClick={onToggleSidebar}
          className="hidden md:flex p-2 hover:bg-slate-100 rounded-lg transition text-slate-600"
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={20} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition"
            aria-label="Search courses, mentors, and resources"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6 ml-3 sm:ml-6">
        <button
          className="relative text-slate-600 hover:text-slate-900 transition p-2 hover:bg-slate-100 rounded-lg"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-6 border-l border-slate-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-900">John Doe</p>
            <p className="text-xs text-slate-500">Student</p>
          </div>
          <button
            className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-blue-300/50 transition flex-shrink-0"
            aria-label="Open user menu"
          >
            <User className="text-white" size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  )
}
