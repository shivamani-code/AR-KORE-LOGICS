'use client'

import { Search, Bell, User } from 'lucide-react'

export function DashboardNavbar() {
  return (
    <nav className="fixed top-0 left-64 right-0 h-16 bg-[#111827] border-b border-[#1F2937] flex items-center justify-between px-6 z-40">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-[#9CA3AF]" size={20} />
          <input
            type="text"
            placeholder="Search courses, mentors, resources..."
            className="w-full pl-10 pr-4 py-2 bg-[#0A0E1A] border border-[#1F2937] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:border-[#00E5FF] focus:outline-none transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-6">
        <button className="relative text-[#9CA3AF] hover:text-[#F9FAFB] transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#14F195] rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-[#1F2937]">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-[#F9FAFB]">John Doe</p>
            <p className="text-xs text-[#9CA3AF]">Student</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-[#00E5FF] to-[#14F195] rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-[#00E5FF]/30 transition">
            <User className="text-[#0A0E1A]" size={20} />
          </div>
        </div>
      </div>
    </nav>
  )
}
