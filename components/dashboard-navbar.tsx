'use client'

import { Search, Bell, User } from 'lucide-react'

export function DashboardNavbar() {
  return (
    <nav className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-40 shadow-sm">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search courses, mentors, resources..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:outline-none transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-6">
        <button className="relative text-slate-600 hover:text-slate-900 transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">John Doe</p>
            <p className="text-xs text-slate-500">Student</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-purple-300/50 transition">
            <User className="text-white" size={20} />
          </div>
        </div>
      </div>
    </nav>
  )
}
