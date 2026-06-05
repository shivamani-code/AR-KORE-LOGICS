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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F9FAFB] mb-4">
            How It Works
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            A simple 6-step process to transform from beginner to industry-ready
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 hover:border-[#14F195] transition">
                <div className="text-5xl font-bold text-[#00E5FF]/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-[#F9FAFB] mb-3 flex items-center gap-2">
                  <CheckCircle2 className="text-[#14F195]" size={24} />
                  {step.title}
                </h3>
                <p className="text-[#9CA3AF]">
                  {step.description}
                </p>
              </div>

              {idx < steps.length - 1 && idx % 3 !== 2 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-[#14F195] to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
