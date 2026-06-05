'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#00E5FF] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-72 h-72 bg-[#7C3AED] opacity-5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F9FAFB] mb-6 leading-tight">
            Learn Skills. <span className="bg-gradient-to-r from-[#00E5FF] to-[#14F195] bg-clip-text text-transparent">Build Careers.</span> Get Mentored.
          </h1>
          <p className="text-lg sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-8">
            A complete platform that combines learning roadmaps, curated resources, mentorship, career guidance, and progress tracking to make you industry-ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup" className="px-8 py-3 bg-[#00E5FF] text-[#0A0E1A] rounded-lg font-semibold hover:bg-[#00C9D7] transition inline-flex items-center justify-center gap-2">
              Start Learning
              <ArrowRight size={18} />
            </Link>
            <Link href="#roadmaps" className="px-8 py-3 border border-[#1F2937] text-[#F9FAFB] rounded-lg font-semibold hover:bg-[#111827] transition">
              Explore Roadmaps
            </Link>
          </div>

          {/* Floating stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
            <div className="bg-[#111827]/40 backdrop-blur-sm border border-[#1F2937] rounded-xl p-4">
              <div className="text-2xl font-bold text-[#00E5FF] mb-1">50K+</div>
              <div className="text-sm text-[#9CA3AF]">Students Learning</div>
            </div>
            <div className="bg-[#111827]/40 backdrop-blur-sm border border-[#1F2937] rounded-xl p-4">
              <div className="text-2xl font-bold text-[#14F195] mb-1">200+</div>
              <div className="text-sm text-[#9CA3AF]">Active Mentors</div>
            </div>
            <div className="bg-[#111827]/40 backdrop-blur-sm border border-[#1F2937] rounded-xl p-4">
              <div className="text-2xl font-bold text-[#7C3AED] mb-1">30+</div>
              <div className="text-sm text-[#9CA3AF]">Learning Paths</div>
            </div>
            <div className="bg-[#111827]/40 backdrop-blur-sm border border-[#1F2937] rounded-xl p-4">
              <div className="text-2xl font-bold text-[#00E5FF] mb-1">92%</div>
              <div className="text-sm text-[#9CA3AF]">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
