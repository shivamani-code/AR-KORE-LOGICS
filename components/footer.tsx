'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-lg font-bold text-white mb-4">AR LOGICS</h4>
            <p className="text-slate-400 text-sm">
              Empowering learners with cutting-edge education technology and career guidance.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-4">Platform</h5>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 py-0.5">Home</Link></li>
              <li><Link href="#how-it-works" className="text-slate-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 py-0.5">How It Works</Link></li>
              <li><Link href="#testimonials" className="text-slate-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 py-0.5">Testimonials</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-4">Company</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-slate-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 py-0.5">About</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 py-0.5">Blog</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 py-0.5">Careers</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 py-0.5">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-4">Legal</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-slate-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 py-0.5">Privacy</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 py-0.5">Terms</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 py-0.5">Security</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 py-0.5">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2024 AR LOGICS. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="#" className="text-slate-400 hover:text-purple-400 transition font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1" aria-label="GitHub">
              GitHub
            </Link>
            <Link href="#" className="text-slate-400 hover:text-purple-400 transition font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1" aria-label="Twitter">
              Twitter
            </Link>
            <Link href="#" className="text-slate-400 hover:text-purple-400 transition font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1" aria-label="LinkedIn">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
