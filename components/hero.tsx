'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-screen pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-cyan-50">
      {/* Background gradient elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 opacity-20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-40 left-10 w-72 h-72 bg-cyan-200 opacity-15 rounded-full blur-3xl" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight text-balance animate-in fade-in slide-in-from-bottom-8 duration-700">
            Learn Skills. <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent inline-block animate-float">Build Careers.</span> Get Mentored.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 text-pretty animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            A complete platform that combines learning roadmaps, curated resources, mentorship, career guidance, and progress tracking to make you industry-ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
            <Link href="/signup" className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-400/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center justify-center gap-2 hover:scale-105 hover:-translate-y-0.5 active:scale-95">
              Start Learning
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="#how-it-works" className="px-6 sm:px-8 py-3 border-2 border-blue-200/50 text-slate-900 rounded-xl font-semibold hover:bg-blue-50/50 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 hover:-translate-y-0.5 active:scale-95">
              Explore More
            </Link>
          </div>

          {/* Floating stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-600">
            <div className="bg-white/80 backdrop-blur-xl border border-blue-100/50 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-200/80 hover:-translate-y-1 group">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2 group-hover:text-blue-700">50K+</div>
              <div className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-700">Students Learning</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl border border-blue-100/50 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-200/80 hover:-translate-y-1 group">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-500 mb-1 sm:mb-2 group-hover:text-cyan-600">200+</div>
              <div className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-700">Active Mentors</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl border border-blue-100/50 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-200/80 hover:-translate-y-1 group">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2 group-hover:text-blue-700">30+</div>
              <div className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-700">Learning Paths</div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl border border-blue-100/50 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-200/80 hover:-translate-y-1 group">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-500 mb-1 sm:mb-2 group-hover:text-cyan-600">92%</div>
              <div className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-700">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
