'use client'

import Link from 'next/link'
import { motion, useScroll } from 'framer-motion'
import { ArrowRight, Star, Target, Map } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } }
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let current = 0
    const step = 16
    const increment = target / (1000 / step)
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, step)
    return () => clearInterval(timer)
  }, [started, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const journeyNodes = [
  { label: 'Python Fundamentals', threshold: 0.20 },
  { label: 'Data Structures & Algorithms', threshold: 0.35 },
  { label: 'Machine Learning Basics', threshold: 0.50 },
  { label: 'Deep Learning & Neural Nets', threshold: 0.65 },
  { label: 'AI System Design', threshold: 0.78 },
  { label: 'Interview Preparation', threshold: 0.90 },
  { label: 'Placement Matching', threshold: 0.96 },
]

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })
  const [progress, setProgress] = useState(0.35)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.onChange((latest) => {
      const start = 0
      const end = 500
      const p = Math.min(Math.max((latest - start) / (end - start), 0), 1)
      setProgress(0.35 + p * 0.63)
    })
  }, [scrollY])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 8,
        y: (e.clientY / window.innerHeight - 0.5) * 8
      })

      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setSpotlightPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative bg-[#09090b] pt-32 pb-16 px-6 sm:px-8 lg:px-12 overflow-hidden min-h-screen flex flex-col justify-center border-b border-white/[0.04]"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Soft, restrained mouse-follow brand spotlight */}
        <div 
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(99, 102, 241, 0.03), transparent 80%)`
          }}
        />
      </div>

      {/* Curved Glowing Arc (Event Horizon depth effect) */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[300px] pointer-events-none overflow-visible z-0 select-none opacity-85">
        <svg className="w-full h-full text-indigo-500/20" viewBox="0 0 1200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
              <stop offset="25%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.75" />
              <stop offset="75%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Background thick blur path */}
          <path d="M-50 240 C350 30, 850 30, 1250 240" stroke="url(#arc-gradient)" strokeWidth="48" strokeLinecap="round" className="opacity-15 blur-2xl" />
          {/* Medium blur path */}
          <path d="M-50 240 C350 30, 850 30, 1250 240" stroke="url(#arc-gradient)" strokeWidth="16" strokeLinecap="round" className="opacity-25 blur-md" />
          {/* Thin glowing beam path */}
          <path d="M-50 240 C350 30, 850 30, 1250 240" stroke="url(#arc-gradient)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {/* Concentrated radial core glow behind peak */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[400px] h-[60px] bg-purple-500/8 blur-[45px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 py-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="flex flex-col items-center text-center w-full"
        >
          {/* Minimal Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-medium rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-300 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Now enrolling · Batch 2026
          </motion.div>
          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-[3.5rem] font-semibold tracking-tight text-white leading-[1.1] max-w-3xl mx-auto text-balance"
          >
            Master AI, AI Tools & Modern Tech — <span className="text-zinc-400">Made Simple.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed mt-6"
          >
            We make learning tech simple. Get curated roadmaps, regular updates on the latest AI tools, and 1-on-1 mentorship to stay ahead without the clutter.
          </motion.p>

          {/* Clean Actions */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-8 justify-center"
          >
            <Link
              href="/login"
              className="h-10 px-6 bg-white text-black hover:bg-zinc-200 rounded-lg font-medium text-xs transition-colors inline-flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              Start for Free
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#features"
              className="h-10 px-6 bg-[#121216] text-zinc-300 hover:text-white border border-white/[0.06] hover:border-white/[0.12] rounded-lg font-medium text-xs transition-colors inline-flex items-center justify-center w-full sm:w-auto"
            >
              Explore Features
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
