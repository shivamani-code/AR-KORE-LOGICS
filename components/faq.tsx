'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How does the roadmap progression work?',
    answer: 'Each career path is broken down into structured modules. When you complete the resources, practice assignments, and projects for a module, you can mark it complete. This automatically unlocks the next milestone in your trajectory.',
  },
  {
    question: 'Can I switch my career path at any time?',
    answer: 'Absolutely. AR KORE LOGICS is built to support your exploration. You can choose a path during onboarding, and if you change your mind later, you can select a different career path in your Settings. Your completed modules stay saved.',
  },
  {
    question: 'How do 1-on-1 mentor sessions work?',
    answer: 'Premium members can access our Mentor Directory, filter by domain expertise, and book 30-minute video slots directly. You can use these sessions for resume reviews, mock interviews, or coding guidance.',
  },
  {
    question: 'What is included in the Free tier?',
    answer: 'The Free tier gives you full access to all standard roadmaps, progress tracking, community sharing, and basic learning resources. You can browse roadmaps and start learning at no cost.',
  },
  {
    question: 'Are the learning resources kept up to date?',
    answer: 'Yes. Our teams and community members continuously review resources to replace outdated links with fresh, high-quality documentation, videos, and tutorials from platforms like NPTEL and FreeCodeCamp.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-32 px-6 sm:px-8 lg:px-12 bg-[#09090b] relative overflow-hidden" aria-labelledby="faq-heading">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
            Have Questions?
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white" id="faq-heading">
            Common Questions
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Quick details about how roadmaps, resources, and mentorship work.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          className="space-y-3"
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }
                }}
                className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? 'border-white/10 bg-white/[0.02]'
                    : 'border-white/[0.04] bg-transparent hover:border-white/[0.08]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-zinc-200 hover:text-white transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs font-semibold pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={14} className="text-zinc-500" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-white/[0.04] pt-3.5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

