'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
const row1 = [
  {
    name: 'Rahul Sharma',
    role: 'Product Marketer',
    company: 'Media Agency, Delhi',
    text: 'Learning to use and integrate AI tools like Midjourney and ChatGPT into my daily tasks seemed so overwhelming. AR KORE LOGICS made it incredibly easy. Their weekly digests keep me updated on new tools without having to browse hours of videos.',
    initials: 'RS',
    rating: 5,
    tag: 'AI Tools Learner',
  },
  {
    name: 'Ananya Krishnan',
    role: 'BTech CSE Student',
    company: 'VIT Vellore',
    text: 'Standard university classes are very heavy on theory. Having a dedicated mentor to guide me through coding projects and practical AI tools made everything much easier than usual. The roadmap is crystal clear!',
    initials: 'AK',
    rating: 5,
    tag: 'BTech Student',
  },
  {
    name: 'Kunal Goel',
    role: 'Frontend Developer',
    company: 'SaaS Startup, Noida',
    text: 'I wanted to learn how to build LLM-powered features. The API integrations and vector database roadmaps here are super simplified. I got direct guidance on how to integrate AI tools directly into my React projects.',
    initials: 'KG',
    rating: 5,
    tag: 'AI Integrations',
  },
]

const row2 = [
  {
    name: 'Priya Patel',
    role: 'Content Lead',
    company: 'Fintech Corp, Mumbai',
    text: 'The sheer volume of new AI tools releasing every week is crazy. The regular updates and simplified courses on this platform help me stay ahead. The 1-on-1 mentor guidance kept me on the right track.',
    initials: 'PP',
    rating: 5,
    tag: 'Tech Learner',
  },
  {
    name: 'Vikram Malhotra',
    role: 'Business Operations',
    company: 'Logistics Co, Pune',
    text: 'I had zero technical background and felt left behind by the AI wave. The Python and basic automation roadmaps are designed to make tech easy. The community study groups made coding feel less intimidating.',
    initials: 'VM',
    rating: 5,
    tag: 'AI Automation',
  },
  {
    name: 'Sneha Reddy',
    role: 'UX Designer',
    company: 'Design Studio, Bengaluru',
    text: 'I wanted to leverage AI tools for user research and prototyping. This platform made it so simple. The mentorship sessions helped me get direct answers on how to use AI tools to speed up my design workflow.',
    initials: 'SR',
    rating: 5,
    tag: 'AI Design',
  },
]

function TestimonialCard({ t }: { t: typeof row1[0] }) {
  return (
    <div className="w-[360px] bg-[#0c0c0f] border border-white/[0.06] hover:border-white/[0.12] rounded-xl p-6 transition-all duration-200 flex flex-col justify-between whitespace-normal flex-shrink-0 group cursor-pointer">
      <div>
        <div className="flex justify-between items-center mb-5">
          <div className="flex gap-0.5">
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} size={9} className="fill-zinc-400 text-zinc-400" />
            ))}
          </div>
          <span className="text-[9px] font-medium px-2.5 py-0.5 rounded-full border text-zinc-400 bg-white/[0.02] border-white/[0.06]">
            {t.tag}
          </span>
        </div>

        <Quote size={14} className="text-zinc-800 mb-3 transition-colors duration-200 group-hover:text-indigo-500/20" />
        <p className="text-zinc-400 text-xs leading-relaxed mb-5">
          "{t.text}"
        </p>
      </div>

      <div className="flex items-center gap-3 border-t border-white/[0.04] pt-4">
        <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-center font-bold text-[9px] text-zinc-300 flex-shrink-0">
          {t.initials}
        </div>
        <div>
          <h4 className="text-[11px] font-semibold text-white">{t.name}</h4>
          <p className="text-[9px] text-zinc-500">{t.role} · <span className="text-zinc-600">{t.company}</span></p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 sm:px-8 lg:px-12 bg-[#09090b] overflow-hidden relative border-b border-white/[0.04]">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
            Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            What Our Students Say
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Real feedback from students, creators, and developers who simplified their tech learning and AI tool adoption.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full animate-marquee-hover">
          {/* Row 1 */}
          <div className="relative w-full overflow-hidden py-2 flex">
            <div className="flex gap-4 animate-marquee">
              {row1.map((t, idx) => <TestimonialCard key={idx} t={t} />)}
              {row1.map((t, idx) => <TestimonialCard key={`c-${idx}`} t={t} />)}
            </div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#09090b] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#09090b] to-transparent pointer-events-none z-10" />
          </div>

          {/* Row 2 */}
          <div className="relative w-full overflow-hidden py-2 flex">
            <div className="flex gap-4 animate-marquee [animation-direction:reverse] [animation-duration:30s]">
              {row2.map((t, idx) => <TestimonialCard key={idx} t={t} />)}
              {row2.map((t, idx) => <TestimonialCard key={`c-${idx}`} t={t} />)}
            </div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#09090b] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#09090b] to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

