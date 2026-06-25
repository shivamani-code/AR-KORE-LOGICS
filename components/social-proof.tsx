'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Users, Star, GraduationCap, Award } from 'lucide-react'

function StatsCounter({ target, suffix = '', duration = 1200 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let current = 0
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, step)
    return () => clearInterval(timer)
  }, [started, target, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}
const statsData = [
  {
    icon: Users,
    value: 15000,
    suffix: '+',
    label: 'Learners Guided',
    desc: 'Actively tracking roadmaps daily',
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '/5',
    label: 'Mentor Rating',
    desc: 'Direct 1-on-1 guidance & sessions',
    isDecimal: true,
  },
  {
    icon: GraduationCap,
    value: 92,
    suffix: '%',
    label: 'Simplicity Index',
    desc: 'Students finding our paths easier than usual',
  },
  {
    icon: Award,
    value: 500,
    suffix: '+',
    label: 'AI Tools & Resources',
    desc: 'Curated, reviewed, and updated regularly',
  }
]
export function SocialProof() {
  return (
    <section className="py-32 px-6 sm:px-8 lg:px-12 bg-[#09090b] relative overflow-hidden border-b border-white/[0.04]">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      {/* Volumetric background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/[0.015] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#0b0b0e] border border-white/[0.04] hover:border-indigo-500/30 rounded-xl p-6 transition-all duration-300 group relative overflow-hidden cursor-pointer"
              >
                {/* Subtle internal glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_70%)]" />

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="p-2 bg-indigo-500/5 border border-indigo-500/15 rounded-lg text-indigo-400 group-hover:border-indigo-500/35 group-hover:bg-indigo-500/10 transition-all duration-300">
                    <Icon size={14} />
                  </div>
                </div>

                <div className="space-y-1 relative z-10">
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    {stat.isDecimal ? (
                      <>4.9{stat.suffix}</>
                    ) : (
                      <StatsCounter target={stat.value} suffix={stat.suffix} />
                    )}
                  </h3>
                  <p className="text-[10px] font-bold text-zinc-300 tracking-wider uppercase">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

