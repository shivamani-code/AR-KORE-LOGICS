'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-screen pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-white via-purple-50 to-pink-50">
      {/* Background gradient elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 opacity-20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-40 left-10 w-72 h-72 bg-pink-200 opacity-15 rounded-full blur-3xl" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight text-balance">
            Learn Skills. <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Build Careers.</span> Get Mentored.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 text-pretty">
            A complete platform that combines learning roadmaps, curated resources, mentorship, career guidance, and progress tracking to make you industry-ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16">
            <Link href="/signup" className="px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 inline-flex items-center justify-center gap-2">
              Start Learning
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="#roadmaps" className="px-6 sm:px-8 py-3 border-2 border-purple-200 text-slate-900 rounded-lg font-semibold hover:bg-purple-50 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Explore Roadmaps
            </Link>
          </div>

          {/* Floating stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16">
            <div className="bg-white backdrop-blur-sm border border-purple-100 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">50K+</div>
              <div className="text-xs sm:text-sm text-slate-600">Students Learning</div>
            </div>
            <div className="bg-white backdrop-blur-sm border border-purple-100 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition">
              <div className="text-2xl sm:text-3xl font-bold text-pink-500 mb-1 sm:mb-2">200+</div>
              <div className="text-xs sm:text-sm text-slate-600">Active Mentors</div>
            </div>
            <div className="bg-white backdrop-blur-sm border border-purple-100 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">30+</div>
              <div className="text-xs sm:text-sm text-slate-600">Learning Paths</div>
            </div>
            <div className="bg-white backdrop-blur-sm border border-purple-100 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition">
              <div className="text-2xl sm:text-3xl font-bold text-pink-500 mb-1 sm:mb-2">92%</div>
              <div className="text-xs sm:text-sm text-slate-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
