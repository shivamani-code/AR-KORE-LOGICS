'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-[#1F2937] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-lg font-bold text-[#F9FAFB] mb-4">SkillVerse</h4>
            <p className="text-[#9CA3AF] text-sm">
              Transforming how students discover career paths and become industry-ready professionals.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-[#F9FAFB] mb-4">Product</h5>
            <ul className="space-y-2">
              <li><Link href="#roadmaps" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">Roadmaps</Link></li>
              <li><Link href="#resources" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">Resources</Link></li>
              <li><Link href="#mentors" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">Mentorship</Link></li>
              <li><Link href="#pricing" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-[#F9FAFB] mb-4">Company</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">About</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">Blog</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">Careers</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-[#F9FAFB] mb-4">Legal</h5>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">Privacy</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">Terms</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">Security</Link></li>
              <li><Link href="#" className="text-[#9CA3AF] hover:text-[#F9FAFB] transition">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1F2937] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#9CA3AF] text-sm mb-4 md:mb-0">
            © 2024 SkillVerse. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] transition font-semibold">
              GitHub
            </Link>
            <Link href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] transition font-semibold">
              Twitter
            </Link>
            <Link href="#" className="text-[#9CA3AF] hover:text-[#00E5FF] transition font-semibold">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
