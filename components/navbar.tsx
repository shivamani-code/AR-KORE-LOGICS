'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Logo } from '@/components/logo'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-200 ${
        scrolled 
          ? "bg-[#09090b]/80 backdrop-blur-md border-b border-white/[0.06] py-3" 
          : "bg-transparent border-b border-transparent py-4"
      }`} 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="AR KORE LOGICS home">
            <Logo className="w-6 h-6 text-white transition-transform hover:scale-105" />
            <span className="text-[15px] font-semibold tracking-tight text-white">AR KORE LOGICS</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors text-xs font-medium">
              Home
            </Link>
            <Link href="#how-it-works" className="text-zinc-400 hover:text-white transition-colors text-xs font-medium">
              Process
            </Link>
            <Link href="#testimonials" className="text-zinc-400 hover:text-white transition-colors text-xs font-medium">
              Reviews
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-zinc-400 hover:text-white transition-colors text-xs font-medium px-2.5 py-1.5">
              Login
            </Link>
            <Link href="/signup" className="px-3.5 py-1.5 bg-white text-black hover:bg-zinc-200 rounded-lg text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-white">
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-6 border-b border-white/[0.06] bg-[#09090b] pt-3 space-y-2">
          <Link href="/" onClick={() => setIsOpen(false)} className="block text-zinc-400 hover:text-white py-2 text-xs font-medium transition-colors">
            Home
          </Link>
          <Link href="#how-it-works" onClick={() => setIsOpen(false)} className="block text-zinc-400 hover:text-white py-2 text-xs font-medium transition-colors">
            Process
          </Link>
          <Link href="#testimonials" onClick={() => setIsOpen(false)} className="block text-zinc-400 hover:text-white py-2 text-xs font-medium transition-colors">
            Reviews
          </Link>
          <div className="pt-4 flex flex-col gap-2">
            <Link href="/login" onClick={() => setIsOpen(false)} className="block text-center text-zinc-400 hover:text-white py-2 text-xs font-medium transition-colors">
              Login
            </Link>
            <Link href="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 bg-white text-black rounded-lg text-xs font-semibold hover:bg-zinc-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
