'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-lg font-bold text-white mb-4">SkillVerse</h4>
            <p className="text-slate-400 text-sm">
              Transforming how students discover career paths and become industry-ready professionals.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-4">Product</h5>
            <ul className="space-y-2">
              <li><Link href="#roadmaps" className="text-slate-400 hover:text-white transition">Roadmaps</Link></li>
              <li><Link href="#resources" className="text-slate-400 hover:text-white transition">Resources</Link></li>
              <li><Link href="#mentors" className="text-slate-400 hover:text-white transition">Mentorship</Link></li>
              <li><Link href="#pricing" className="text-slate-400 hover:text-white transition">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-4">Company</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-slate-400 hover:text-white transition">About</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white mb-4">Legal</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Privacy</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Terms</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Security</Link></li>
              <li><Link href="#" className="text-slate-400 hover:text-white transition">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2024 SkillVerse. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="#" className="text-slate-400 hover:text-purple-400 transition font-semibold">
              GitHub
            </Link>
            <Link href="#" className="text-slate-400 hover:text-purple-400 transition font-semibold">
              Twitter
            </Link>
            <Link href="#" className="text-slate-400 hover:text-purple-400 transition font-semibold">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
