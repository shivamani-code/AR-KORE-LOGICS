'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-white via-purple-50 to-pink-50">
      {/* Background gradient elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-72 h-72 bg-pink-200 opacity-15 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Learn Skills. <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Build Careers.</span> Get Mentored.
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            A complete platform that combines learning roadmaps, curated resources, mentorship, career guidance, and progress tracking to make you industry-ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition inline-flex items-center justify-center gap-2">
              Start Learning
              <ArrowRight size={18} />
            </Link>
            <Link href="#roadmaps" className="px-8 py-3 border-2 border-purple-200 text-slate-900 rounded-lg font-semibold hover:bg-purple-50 transition">
              Explore Roadmaps
            </Link>
          </div>

          {/* Floating stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
            <div className="bg-white backdrop-blur-sm border border-purple-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="text-2xl font-bold text-purple-600 mb-1">50K+</div>
              <div className="text-sm text-slate-600">Students Learning</div>
            </div>
            <div className="bg-white backdrop-blur-sm border border-purple-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="text-2xl font-bold text-pink-500 mb-1">200+</div>
              <div className="text-sm text-slate-600">Active Mentors</div>
            </div>
            <div className="bg-white backdrop-blur-sm border border-purple-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="text-2xl font-bold text-purple-600 mb-1">30+</div>
              <div className="text-sm text-slate-600">Learning Paths</div>
            </div>
            <div className="bg-white backdrop-blur-sm border border-purple-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="text-2xl font-bold text-pink-500 mb-1">92%</div>
              <div className="text-sm text-slate-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
