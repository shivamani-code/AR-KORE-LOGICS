'use client'

import { motion } from 'framer-motion'
import { Map, Library, Users, Code, LineChart, MessageSquare } from 'lucide-react'

const benefits = [
  {
    icon: Map,
    title: 'Curated Roadmaps',
    description: 'Follow clear step-by-step career trajectories structured by senior industry professionals across 30+ domains.',
    accent: 'indigo',
    radius: 'rounded-2xl',   // 16px — intentional variation
  },
  {
    icon: Library,
    title: 'Centralized Resources',
    description: 'Save hours of search time. Access only the highest-quality tutorials, documentation, and exercises — curated for you.',
    accent: 'cyan',
    radius: 'rounded-xl',    // 12px
  },
  {
    icon: Users,
    title: '1-on-1 Mentorship',
    description: 'Schedule video calls, request mock interviews, and receive actionable code reviews from senior engineers.',
    accent: 'indigo',
    radius: 'rounded-2xl',
  },
  {
    icon: Code,
    title: 'Real-World Projects',
    description: 'Build production-grade applications for your portfolio with step-by-step guidance and mentor code reviews.',
    accent: 'cyan',
    radius: 'rounded-xl',
  },
  {
    icon: LineChart,
    title: 'Progress Intelligence',
    description: 'Track progress, measure hours logged, unlock milestones, and see your industry readiness score grow.',
    accent: 'indigo',
    radius: 'rounded-2xl',
  },
  {
    icon: MessageSquare,
    title: 'Active Community',
    description: 'Join focused study groups, share code insights, participate in hackathons, and grow alongside peers.',
    accent: 'cyan',
    radius: 'rounded-xl',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } }
}

export function Benefits() {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#09090b] overflow-hidden relative" aria-labelledby="benefits-heading">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4"
          >
            Why AR KORE LOGICS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            id="benefits-heading"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-5"
          >
            Everything you need to become industry-ready
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            AR KORE LOGICS provides the complete stack of learning tools, guidance, and community support in a unified workspace.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            const isIndigo = benefit.accent === 'indigo'
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={`bg-zinc-900/50 border border-zinc-800/60 ${benefit.radius} p-7 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/60 hover:shadow-xl flex flex-col items-start group cursor-pointer relative overflow-hidden`}
              >
                {/* Subtle accent gradient on hover */}
                <div className={`absolute inset-0 ${benefit.radius} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  isIndigo
                    ? 'bg-gradient-to-br from-indigo-600/5 to-transparent'
                    : 'bg-gradient-to-br from-cyan-500/5 to-transparent'
                }`} />

                <div className={`relative p-3 ${benefit.radius} border mb-5 transition-all duration-300 group-hover:scale-105 ${
                  isIndigo
                    ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                    : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                }`}>
                  <Icon size={18} aria-hidden="true" />
                </div>

                <h3 className="relative text-sm font-semibold text-white mb-2.5 group-hover:text-indigo-300 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="relative text-sm text-zinc-400 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
