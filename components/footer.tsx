'use client'

import Link from 'next/link'
import { Logo } from '@/components/logo'

const socialLinks = [
  {
    name: 'GitHub',
    href: '#',
    icon: (
      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.512.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (
      <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="bg-[#09090b] border-t border-white/[0.04] py-16 px-6 sm:px-8 lg:px-12 relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <Logo className="w-5 h-5 text-white" />
              <h4 className="text-sm font-semibold text-white tracking-tight">AR KORE LOGICS</h4>
            </Link>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
              Empowering learners with cutting-edge education technology and structured career guidance to succeed in AI and tech.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-8 h-8 bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] rounded-lg flex items-center justify-center text-zinc-500 hover:text-white transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-white text-xs mb-4">Platform</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/" className="text-zinc-500 hover:text-white transition-colors focus:outline-none">Home</Link></li>
              <li><Link href="#process" className="text-zinc-500 hover:text-white transition-colors focus:outline-none">How It Works</Link></li>
              <li><Link href="#testimonials" className="text-zinc-500 hover:text-white transition-colors focus:outline-none">Student Stories</Link></li>
              <li><Link href="/dashboard" className="text-zinc-500 hover:text-white transition-colors focus:outline-none">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white text-xs mb-4">Company</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="#" className="text-zinc-500 hover:text-white transition-colors focus:outline-none">About Us</Link></li>
              <li><Link href="#" className="text-zinc-500 hover:text-white transition-colors focus:outline-none">Blog</Link></li>
              <li><Link href="#" className="text-zinc-500 hover:text-white transition-colors focus:outline-none">Careers</Link></li>
              <li><Link href="#" className="text-zinc-500 hover:text-white transition-colors focus:outline-none">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white text-xs mb-4">Legal</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="#" className="text-zinc-500 hover:text-white transition-colors focus:outline-none">Privacy Policy</Link></li>
              <li><Link href="#" className="text-zinc-500 hover:text-white transition-colors focus:outline-none">Terms of Service</Link></li>
              <li><Link href="#" className="text-zinc-500 hover:text-white transition-colors focus:outline-none">Security</Link></li>
              <li><Link href="#" className="text-zinc-500 hover:text-white transition-colors focus:outline-none">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-[10px]">
            © 2026 AR KORE LOGICS. All rights reserved.
          </p>
          <p className="text-zinc-600 text-[10px]">
            Transforming careers through structured AI education
          </p>
        </div>
      </div>
    </footer>
  )
}

