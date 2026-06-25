'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Compass, Map, BookOpen, Activity, Users, Award } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Choose Your Career Path',
    description: 'Select from 30+ curated paths across AI, Cloud, Data Engineering, and more — built by industry professionals.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Follow the Roadmap',
    description: 'Get a structured learning path with clearly defined milestones, paced modules, and a target completion date.',
    icon: Map,
  },
  {
    number: '03',
    title: 'Learn From Curated Resources',
    description: 'Access hand-picked resources from NPTEL, FreeCodeCamp, GitHub, and leading textbooks — no fluff, only signal.',
    icon: BookOpen,
  },
  {
    number: '04',
    title: 'Track Your Progress',
    description: 'Monitor learning streaks, milestone completions, skill scores, and placement readiness on your personal dashboard.',
    icon: Activity,
  },
  {
    number: '05',
    title: 'Get 1-on-1 Mentorship',
    description: 'Book sessions with engineers at Google, Meta, and Microsoft. Real code reviews, mock interviews, and career advice.',
    icon: Users,
  },
  {
    number: '06',
    title: 'Land Your First Tech Role',
    description: 'Complete real-world projects, build a strong portfolio, and access placement support from our dedicated career team.',
    icon: Award,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } }
}
const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } }
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 sm:px-8 lg:px-12 bg-[#09090b] overflow-hidden relative border-b border-white/[0.04]">
      {/* Background patterns & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[-20%] w-[500px] h-[500px] bg-indigo-500/[0.02] blur-[130px] pointer-events-none rounded-full z-0" />
      <div className="absolute bottom-[10%] right-[-20%] w-[600px] h-[600px] bg-purple-500/[0.015] blur-[150px] pointer-events-none rounded-full z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
            The Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            How It Works
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            A structured 6-step pipeline designed to take you from initial learning to industry placement.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="bg-[#0b0b0e] border border-white/[0.04] hover:border-indigo-500/30 rounded-xl p-6 transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                {/* Subtle internal glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_70%)]" />

                {/* Step Header */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="text-[10px] font-mono text-zinc-600 font-bold uppercase tracking-wider">
                    Step {step.number}
                  </span>
                  <span className="text-[9px] text-indigo-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Learn more →
                  </span>
                </div>

                {/* Icon Container */}
                <div className="w-8 h-8 rounded-lg bg-indigo-500/5 border border-indigo-500/15 text-indigo-400 flex items-center justify-center mb-4 transition-all duration-300 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 relative z-10">
                  <Icon size={14} />
                </div>

                <h3 className="text-sm font-semibold text-white mb-2 transition-colors duration-200 relative z-10 group-hover:text-indigo-300">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed relative z-10">
                  {step.description}
                </p>

                {/* Next step link on hover */}
                {idx < steps.length - 1 && (
                  <div className="mt-4 pt-3 border-t border-white/[0.02] flex items-center gap-1.5 text-[9px] font-medium text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 relative z-10">
                    <ArrowRight size={10} />
                    Next: {steps[idx + 1].title}
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
