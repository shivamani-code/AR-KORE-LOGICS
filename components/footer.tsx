'use client'

import Link from 'next/link'
import { Logo } from '@/components/logo'

export function Footer() {
  return (
    <footer className="bg-[#09090b] border-t border-white/[0.04] py-16 px-6 sm:px-8 lg:px-12 relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <Logo className="w-5 h-5 text-white" />
              <h4 className="text-sm font-semibold text-white tracking-tight">AR KORE LOGICS</h4>
            </Link>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
              Empowering learners with cutting-edge education technology and structured career guidance to succeed in AI and tech.
            </p>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-[10px]">
            © 2026 AR KORE LOGICS. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[10px] text-zinc-500">
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
          </div>
          <p className="text-zinc-600 text-[10px]">
            Transforming careers through structured AI education
          </p>
        </div>
      </div>
    </footer>
  )
}

