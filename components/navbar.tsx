'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 bg-[#0A0E1A]/80 backdrop-blur-md border-b border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#00E5FF] to-[#14F195] rounded-lg flex items-center justify-center">
              <span className="text-[#0A0E1A] font-bold text-sm">SV</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold text-[#F9FAFB]">SkillVerse</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#roadmaps" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">
              Roadmaps
            </Link>
            <Link href="#resources" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">
              Resources
            </Link>
            <Link href="#mentors" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">
              Mentors
            </Link>
            <Link href="#community" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">
              Community
            </Link>
            <Link href="#pricing" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">
              Pricing
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-[#00E5FF] text-[#0A0E1A] rounded-lg font-semibold hover:bg-[#00C9D7] transition">
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#F9FAFB]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-[#1F2937] pt-4">
            <Link href="#roadmaps" className="block text-[#9CA3AF] hover:text-[#F9FAFB] py-2">
              Roadmaps
            </Link>
            <Link href="#resources" className="block text-[#9CA3AF] hover:text-[#F9FAFB] py-2">
              Resources
            </Link>
            <Link href="#mentors" className="block text-[#9CA3AF] hover:text-[#F9FAFB] py-2">
              Mentors
            </Link>
            <Link href="#community" className="block text-[#9CA3AF] hover:text-[#F9FAFB] py-2">
              Community
            </Link>
            <Link href="#pricing" className="block text-[#9CA3AF] hover:text-[#F9FAFB] py-2">
              Pricing
            </Link>
            <Link href="/login" className="block text-[#9CA3AF] hover:text-[#F9FAFB] py-2">
              Login
            </Link>
            <Link href="/signup" className="block w-full text-center px-4 py-2 bg-[#00E5FF] text-[#0A0E1A] rounded-lg font-semibold mt-4">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
