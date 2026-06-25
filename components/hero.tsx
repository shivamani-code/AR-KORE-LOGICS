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
              href="/dashboard"
              className="h-10 px-6 bg-white text-black hover:bg-zinc-200 rounded-lg font-medium text-xs transition-colors inline-flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              Start for Free
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#process"
              className="h-10 px-6 bg-[#121216] text-zinc-300 hover:text-white border border-white/[0.06] hover:border-white/[0.12] rounded-lg font-medium text-xs transition-colors inline-flex items-center justify-center w-full sm:w-auto"
            >
              See How It Works
            </Link>
          </motion.div>

          {/* Stats Block */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-6 pt-10 text-zinc-400 text-xs w-full max-w-2xl border-t border-white/[0.04] mt-10"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {['AK', 'RS', 'PM', 'DK'].map((i, idx) => (
                  <div
                    key={idx}
                    className="w-5 h-5 rounded-full border border-[#09090b] bg-zinc-900 flex items-center justify-center text-[7px] font-bold text-zinc-400"
                    style={{ zIndex: 4 - idx }}
                  >{i}</div>
                ))}
              </div>
              <span className="text-zinc-500">·</span>
              <span>4.9/5 from 15,000+ active learners</span>
            </div>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <div>
              <span className="text-white font-bold"><AnimatedCounter target={30} suffix="+" /></span> Paths
            </div>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <div>
              <span className="text-white font-bold"><AnimatedCounter target={92} suffix="%" /></span> Simplicity
            </div>
          </motion.div>

          {/* Dashboard Preview Mockup */}
          <div className="w-full mt-16 relative">
            {/* Ambient glow behind mockup for depth */}
            <div className="absolute inset-0 bg-indigo-500/[0.03] blur-[120px] pointer-events-none rounded-xl" />
            
            <motion.div
              style={{ x: mousePos.x * 0.4, y: mousePos.y * 0.4 }}
              className="w-full max-w-[800px] mx-auto bg-[#0c0c0f]/90 backdrop-blur-md border border-white/[0.06] rounded-xl shadow-2xl overflow-hidden relative z-10"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-black/25">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                  <span className="text-[9px] text-zinc-500 ml-1.5 font-medium tracking-wider uppercase">Workspace Preview</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[9px] text-zinc-400 font-mono">Live Telemetry</span>
                </div>
              </div>

              {/* Panel Content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch text-left">
                
                {/* Left Column: Curriculum Milestones (7 columns) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] font-medium text-indigo-400 uppercase tracking-widest">Active Curriculum</p>
                      <h3 className="text-sm font-semibold text-white mt-1">AI & Machine Learning Engineer</h3>
                    </div>
                    <span className="px-2 py-0.5 bg-white/[0.04] text-zinc-400 text-[8px] font-medium uppercase tracking-wider rounded border border-white/[0.06]">
                      Milestones
                    </span>
                  </div>

                  {/* Vertical Stack Timeline Nodes */}
                  <div className="relative pl-5 space-y-3.5 pt-2">
                    <div className="absolute left-[5px] top-1.5 bottom-1.5 w-[1px] bg-white/[0.06]" />
                    
                    {/* Active segment overlay */}
                    <motion.div 
                      className="absolute left-[5px] top-1.5 w-[1px] bg-indigo-500"
                      style={{ 
                        height: `calc(${Math.min(1, Math.max(0, (progress - 0.20) / 0.76)) * 100}% - 4px)`
                      }}
                    />

                    {journeyNodes.map((node, i) => {
                      const isCompleted = progress >= node.threshold
                      const isActive = !isCompleted && (
                        (i === 0 && progress < journeyNodes[0].threshold) ||
                        (i > 0 && progress >= journeyNodes[i-1].threshold && progress < node.threshold)
                      )
                      
                      return (
                        <div key={i} className="flex items-center gap-3 relative">
                          {/* Node point */}
                          <div className="absolute -left-[21px] flex items-center justify-center">
                            {isCompleted ? (
                              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 flex items-center justify-center">
                                <svg width="5" height="5" viewBox="0 0 8 8" fill="none">
                                  <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            ) : isActive ? (
                              <div className="w-2.5 h-2.5 rounded-full border border-indigo-400 bg-black flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                              </div>
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full border border-white/10 bg-black" />
                            )}
                          </div>

                          {/* Node Label */}
                          <span className={`text-[10px] font-medium transition-colors ${
                            isCompleted 
                              ? 'text-zinc-300' 
                              : isActive 
                              ? 'text-indigo-400 font-semibold' 
                              : 'text-zinc-600'
                          }`}>
                            {node.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Right Column: Telemetry & Widgets (5 columns) */}
                <div className="md:col-span-5 flex flex-col justify-between gap-4">
                  
                  {/* Progress Ring Card */}
                  <div className="bg-[#0f0f13] border border-white/[0.04] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="34" className="stroke-zinc-900" strokeWidth="5.5" fill="transparent" />
                        <motion.circle
                          cx="40" cy="40" r="34"
                          className="stroke-indigo-500 transition-all duration-150"
                          strokeWidth="5.5"
                          fill="transparent"
                          strokeDasharray="213.6"
                          animate={{ strokeDashoffset: 213.6 - (progress * 213.6) }}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-sm font-semibold text-white">{Math.round(progress * 100)}%</span>
                        <span className="text-[7px] text-zinc-500 uppercase tracking-widest font-bold">Progress</span>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Card */}
                  <div className="bg-[#0f0f13] border border-white/[0.04] rounded-xl p-4 flex items-center gap-3">
                    <div className="p-1.5 bg-white/[0.02] border border-white/[0.08] rounded text-zinc-400 flex-shrink-0">
                      <Map size={12} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider">Curriculum Path</p>
                      <p className="text-[10px] font-semibold text-white mt-0.5 truncate">Week 6 of 12</p>
                    </div>
                  </div>

                  {/* Placement Readiness */}
                  <div className="bg-[#0f0f13] border border-white/[0.04] rounded-xl p-4 flex items-center gap-3">
                    <div className="p-1.5 bg-white/[0.02] border border-white/[0.08] rounded text-zinc-400 flex-shrink-0">
                      <Target size={12} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider">Hiring Readiness</p>
                      <p className="text-[10px] font-semibold text-white mt-0.5">78% Match Score</p>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>

            {/* Small Side Indicator Card 1: Floating Left */}
            <motion.div
              style={{ x: mousePos.x * 0.9, y: mousePos.y * 0.7 }}
              className="absolute top-12 left-[-20px] z-20 max-w-[160px] hidden md:block"
            >
              <div className="bg-[#0f0f13]/80 border border-white/[0.08] backdrop-blur-md rounded-xl p-3 shadow-xl flex items-center gap-2.5">
                <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-indigo-400 flex-shrink-0">
                  <Star size={11} />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-[8px] font-bold text-indigo-400 uppercase tracking-wider font-mono">Telemetry</p>
                  <p className="text-[10px] font-semibold text-white mt-0.5 truncate">Rank: Top 5%</p>
                </div>
              </div>
            </motion.div>

            {/* Small Side Indicator Card 2: Floating Right */}
            <motion.div
              style={{ x: mousePos.x * 0.7, y: mousePos.y * 1.1 }}
              className="absolute bottom-12 right-[-20px] z-20 max-w-[160px] hidden md:block"
            >
              <div className="bg-[#0f0f13]/80 border border-white/[0.08] backdrop-blur-md rounded-xl p-3 shadow-xl flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400 flex-shrink-0">
                  <Target size={11} />
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-bold text-emerald-400 uppercase tracking-wider font-mono">Interviews</p>
                  <p className="text-[10px] font-semibold text-white mt-0.5">3 Matches Unlocked</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Corporate Placement Strip */}
      <div className="relative z-10 w-full border-t border-white/[0.04] bg-[#09090b] py-6 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
          <p className="text-[9px] font-medium uppercase tracking-widest text-zinc-500">
            Alumni placements
          </p>
          <div className="flex items-center flex-wrap justify-center gap-8 sm:gap-12">
            {['Google', 'Meta', 'Microsoft', 'Amazon', 'Flipkart', 'AWS'].map((co) => (
              <span key={co} className="text-zinc-600 text-[10px] font-medium tracking-widest uppercase">
                {co}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
