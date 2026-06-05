'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SV</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold text-slate-900">SkillVerse</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#roadmaps" className="text-slate-600 hover:text-slate-900 transition font-medium">
              Roadmaps
            </Link>
            <Link href="#resources" className="text-slate-600 hover:text-slate-900 transition font-medium">
              Resources
            </Link>
            <Link href="#mentors" className="text-slate-600 hover:text-slate-900 transition font-medium">
              Mentors
            </Link>
            <Link href="#community" className="text-slate-600 hover:text-slate-900 transition font-medium">
              Community
            </Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition font-medium">
              Pricing
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-slate-600 hover:text-slate-900 transition font-medium">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition">
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-900"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200 pt-4 space-y-3">
            <Link href="#roadmaps" className="block text-slate-600 hover:text-slate-900 py-2 font-medium">
              Roadmaps
            </Link>
            <Link href="#resources" className="block text-slate-600 hover:text-slate-900 py-2 font-medium">
              Resources
            </Link>
            <Link href="#mentors" className="block text-slate-600 hover:text-slate-900 py-2 font-medium">
              Mentors
            </Link>
            <Link href="#community" className="block text-slate-600 hover:text-slate-900 py-2 font-medium">
              Community
            </Link>
            <Link href="#pricing" className="block text-slate-600 hover:text-slate-900 py-2 font-medium">
              Pricing
            </Link>
            <Link href="/login" className="block text-slate-600 hover:text-slate-900 py-2 font-medium">
              Login
            </Link>
            <Link href="/signup" className="block w-full text-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold mt-4">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
