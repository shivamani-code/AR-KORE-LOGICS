'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="py-32 px-6 sm:px-8 lg:px-12 bg-[#09090b] relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div className="relative bg-[#0c0c0f] border border-white/[0.06] rounded-xl p-12 sm:p-16 text-center overflow-hidden">
          
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400"
            >
              Free to Start · No Credit Card Required
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              id="cta-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white leading-tight"
            >
              Ready to start your journey to becoming an AI Engineer?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-zinc-400 text-xs sm:text-sm leading-relaxed"
            >
              Join thousands of students building structured skills, tracking milestones, and landing real tech roles with AR KORE LOGICS.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center items-center pt-8"
          >
            <Link
              href="/dashboard"
              className="px-6 h-10 bg-white hover:bg-zinc-200 text-black rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
            >
              Start Learning for Free
              <ArrowRight size={13} />
            </Link>
            <Link
              href="#how-it-works"
              className="px-6 h-10 bg-transparent text-zinc-300 hover:text-white rounded-lg text-xs font-semibold border border-white/[0.06] hover:border-white/[0.12] transition-colors inline-flex items-center justify-center"
            >
              See How It Works
            </Link>
          </motion.div>

          <p className="relative z-10 text-[9px] text-zinc-600 uppercase tracking-widest pt-8 font-medium">
            Switch paths at any time · No commitment
          </p>
        </div>
      </div>
    </section>
  )
}

