'use client'

import { CheckCircle2 } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Choose Career Path',
    description: 'Select from 30+ curated career paths designed by industry experts'
  },
  {
    number: '02',
    title: 'Follow Roadmap',
    description: 'Get a structured learning path with clearly defined milestones'
  },
  {
    number: '03',
    title: 'Learn From Resources',
    description: 'Access curated resources from trusted sources like NPTEL, FreeCodeCamp, GitHub'
  },
  {
    number: '04',
    title: 'Track Progress',
    description: 'Monitor your learning journey with visual progress tracking and achievements'
  },
  {
    number: '05',
    title: 'Get Mentorship',
    description: 'Connect with industry mentors for guidance and code reviews'
  },
  {
    number: '06',
    title: 'Become Industry Ready',
    description: 'Complete projects and get job placements assistance'
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            A simple 6-step process to transform from beginner to industry-ready
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 hover:shadow-lg hover:border-purple-200 transition h-full">
                <div className="text-4xl sm:text-5xl font-bold text-purple-200 mb-4" aria-hidden="true">
                  {step.number}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="text-green-500 flex-shrink-0" size={24} aria-hidden="true" />
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  {step.description}
                </p>
              </div>

              {idx < steps.length - 1 && idx % 3 !== 2 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2" aria-hidden="true">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
