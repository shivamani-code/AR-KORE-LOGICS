'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="AR LOGICS home">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm" aria-hidden="true">AR</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold text-slate-900">AR LOGICS</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
              Home
            </Link>
            <Link href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
              Process
            </Link>
            <Link href="#testimonials" className="text-slate-600 hover:text-slate-900 transition font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
              Reviews
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-slate-600 hover:text-slate-900 transition font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-300/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 hover:-translate-y-0.5 active:scale-95">
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-900 p-2 hover:bg-slate-100 rounded-lg transition"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200 pt-4 space-y-3">
            <Link href="/" className="block text-slate-600 hover:text-slate-900 py-2 font-medium px-2 rounded hover:bg-slate-50">
              Home
            </Link>
            <Link href="#how-it-works" className="block text-slate-600 hover:text-slate-900 py-2 font-medium px-2 rounded hover:bg-slate-50">
              Process
            </Link>
            <Link href="#testimonials" className="block text-slate-600 hover:text-slate-900 py-2 font-medium px-2 rounded hover:bg-slate-50">
              Reviews
            </Link>
            <Link href="/login" className="block text-slate-600 hover:text-slate-900 py-2 font-medium px-2 rounded hover:bg-slate-50">
              Login
            </Link>
            <Link href="/signup" className="block w-full text-center px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold mt-4 hover:shadow-lg hover:shadow-blue-300/50 transition-all duration-300 hover:scale-105 active:scale-95">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
