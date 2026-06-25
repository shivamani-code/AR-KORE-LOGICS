'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ArrowRight, CheckCircle2, Clock, ChevronRight, Brain } from 'lucide-react'
import { Logo } from '@/components/logo'
import Link from 'next/link'

const careerPaths = [
  {
    id: 'ai-cbse9',
    title: 'Artificial Intelligence',
    subtitle: 'Aligned with CBSE Class 9 Curriculum',
    icon: Brain,
    description: 'Master the fundamentals of Artificial Intelligence through hands-on projects, coding exercises, and real-world applications.',
    duration: '8 Weeks · 40 Days',
    level: 'Beginner Friendly',
    skills: ['Python Fundamentals', 'AI Project Cycle', 'Ethics & Gen AI', 'CBSE Exam Prep'],
    outcomes: ['Build AI Models', 'Data Analysis', 'Python Programming', 'CBSE Exam Ready'],
    accentColor: '#22d3ee',
    accentRgb: '34, 211, 238',
    gradientFrom: 'rgba(34,211,238,0.18)',
    gradientTo: 'rgba(34,211,238,0.02)',
    borderColor: 'rgba(255,255,255,0.06)',
    selectedBorderColor: 'rgba(34,211,238,0.7)',
    chipBg: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-300',
    badgeBg: 'bg-cyan-600',
  },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.075, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

export default function OnboardingPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [isLaunching, setIsLaunching] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const router = useRouter()

  const handleSelect = (id: string) => {
    setSelected(id === selected ? null : id)
  }

  const handleStart = async () => {
    if (!selected || isLaunching) return
    setIsLaunching(true)
    const selectedPath = careerPaths.find((p) => p.id === selected)
    if (selectedPath) {
      try {
        await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ careerPath: selectedPath.title }),
        })
      } catch (err) {
        console.error('Failed to save onboarding settings:', err)
      }
    }
    router.push('/dashboard')
  }

  const handleSkip = async () => {
    if (isLaunching) return
    setIsLaunching(true)
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ careerPath: 'Artificial Intelligence' }),
      })
    } catch (err) {
      console.error('Failed to save default onboarding settings:', err)
    }
    router.push('/dashboard')
  }

  const selectedPath = careerPaths.find((p) => p.id === selected)
  const highlightPath = hovered ? careerPaths.find((p) => p.id === hovered) : selectedPath

  return (
    <main className="min-h-screen bg-[#09090b] text-white overflow-x-hidden relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* ─── Background Ambiance ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Static ambient blobs */}
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-indigo-600/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-[160px]" />
        {/* Dynamic glow that follows selected/hovered path */}
        <AnimatePresence>
          {highlightPath && (
            <motion.div
              key={highlightPath.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[200px] pointer-events-none"
              style={{ background: `radial-gradient(circle, rgba(${highlightPath.accentRgb}, 0.08) 0%, transparent 70%)` }}
            />
          )}
        </AnimatePresence>
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundSize: '40px 40px',
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
          }}
        />
        {/* Top vignette */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#09090b] to-transparent" />
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#09090b] to-transparent" />
      </div>

      {/* ─── Header ─── */}
      <header className="relative z-20 w-full py-5 px-6 sm:px-10 flex items-center justify-between border-b border-white/[0.05]">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="AR KORE LOGICS home">
          <div className="w-9 h-9 bg-indigo-600/10 border border-indigo-500/20 rounded-xl flex items-center justify-center group-hover:border-indigo-500/40 transition-colors">
            <Logo className="w-5 h-5 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-white">AR KORE LOGICS</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
            <span className="w-4 h-4 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-[8px] font-bold">1</span>
            Career Selection
          </span>
          <span className="hidden sm:block text-zinc-700">›</span>
          <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-700 font-medium">
            <span className="w-4 h-4 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-600 text-[8px] font-bold">2</span>
            Workspace Setup
          </span>
        </div>
      </header>

      {/* ─── Hero Text ─── */}
      <div className="relative z-10 text-center pt-14 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.07] text-indigo-300 text-xs font-semibold mb-6"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
          </span>
          Welcome — Let&apos;s set up your workspace
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.08]"
        >
          What do you want to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">
            master?
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
        >
          Pick a career path to unlock your personalised roadmap,{' '}
          <span className="text-zinc-300 font-medium">resources</span>, and{' '}
          <span className="text-zinc-300 font-medium">mentor connections</span>.
        </motion.p>
      </div>

      {/* ─── Career Path Grid ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-44">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {careerPaths.map((path, i) => {
            const isSelected = selected === path.id
            const IconComp = path.icon

            return (
              <motion.div
                key={path.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                onHoverStart={() => setHovered(path.id)}
                onHoverEnd={() => setHovered(null)}
              >
                <button
                  id={`career-path-${path.id}`}
                  onClick={() => handleSelect(path.id)}
                  className="w-full text-left relative overflow-hidden group rounded-2xl transition-all duration-300 focus:outline-none"
                  style={{
                    border: `1px solid ${isSelected ? path.selectedBorderColor : path.borderColor}`,
                    boxShadow: isSelected
                      ? `0 0 0 1px ${path.selectedBorderColor}, 0 0 50px rgba(${path.accentRgb}, 0.18), 0 20px 60px rgba(0,0,0,0.4)`
                      : `0 0 0 0px transparent, 0 8px 32px rgba(0,0,0,0.3)`,
                    transform: isSelected ? 'translateY(-2px)' : undefined,
                  }}
                  aria-pressed={isSelected}
                >
                  {/* Card background fill */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${path.gradientFrom} 0%, ${path.gradientTo} 100%)`,
                      opacity: isSelected ? 1 : 0,
                    }}
                  />

                  {/* Hover sheen */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, rgba(${path.accentRgb}, 0.08) 0%, transparent 60%)`,
                    }}
                  />

                  {/* Top glow line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${path.accentColor}, transparent)`,
                      opacity: isSelected ? 0.8 : 0,
                    }}
                  />

                  {/* Background base */}
                  <div className="absolute inset-0 bg-[#0d0d12] rounded-2xl -z-10" />

                  {/* Selected checkmark */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, rotate: -20 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0, rotate: 20 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="absolute top-4 right-4 z-20"
                      >
                        <CheckCircle2 size={20} style={{ color: path.accentColor }} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card Content */}
                  <div className="relative z-10 p-6 flex flex-col h-full">
                    {/* Icon + Badge row */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `rgba(${path.accentRgb}, 0.12)`,
                          border: `1px solid rgba(${path.accentRgb}, 0.2)`,
                          boxShadow: isSelected ? `0 0 20px rgba(${path.accentRgb}, 0.25)` : 'none',
                        }}
                      >
                        <IconComp size={22} style={{ color: path.accentColor }} />
                      </div>
                    </div>

                    {/* Title block */}
                    <div className="mb-4">
                      <p
                        className="text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-300"
                        style={{ color: `rgba(${path.accentRgb}, 0.7)` }}
                      >
                        {path.subtitle}
                      </p>
                      <h2 className="text-base sm:text-[17px] font-bold text-white leading-tight group-hover:text-white transition-colors">
                        {path.title}
                      </h2>
                      <p className="text-zinc-500 text-xs leading-relaxed mt-1.5 line-clamp-2">
                        {path.description}
                      </p>
                    </div>

                    {/* Duration + Level badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-zinc-400 text-[10px] font-semibold flex items-center gap-1">
                        <Clock size={9} />
                        {path.duration}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-zinc-400 text-[10px] font-semibold">
                        {path.level}
                      </span>
                    </div>

                    {/* Skill chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {path.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`px-2 py-0.5 rounded-md border text-[9px] font-semibold ${path.chipBg}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Career outcomes separator */}
                    <div
                      className="pt-3.5 mt-auto"
                      style={{ borderTop: `1px solid rgba(${path.accentRgb}, 0.1)` }}
                    >
                      <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest block mb-1.5">
                        Career Outcomes
                      </span>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                        {path.outcomes.map((o) => (
                          <span key={o} className="text-[10px] text-zinc-400 font-medium flex items-center gap-1">
                            <ChevronRight size={9} style={{ color: path.accentColor, opacity: 0.7 }} />
                            {o}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Hint text when nothing is selected */}
        <AnimatePresence>
          {!selected && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-center text-zinc-600 text-xs mt-8 font-medium"
            >
              Select a path above to begin — you can always switch later from your dashboard.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Skip Now */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col items-center gap-2 mt-10 mb-4"
        >
          <div className="w-px h-6 bg-gradient-to-b from-transparent to-zinc-800" />
          <button
            id="skip-onboarding-btn"
            onClick={handleSkip}
            className="group flex items-center gap-2 text-zinc-600 hover:text-zinc-400 text-xs font-medium transition-all duration-200 px-5 py-2.5 rounded-xl border border-transparent hover:border-white/[0.07] hover:bg-white/[0.03]"
          >
            <span>Skip for now</span>
            <ChevronRight
              size={12}
              className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
            />
          </button>
          <p className="text-[10px] text-zinc-700 font-medium">
            You can choose a path anytime from your dashboard settings.
          </p>
        </motion.div>
      </div>

      {/* ─── Sticky Bottom Launch Panel ─── */}
      <AnimatePresence>
        {selected && selectedPath && (
          <motion.div
            initial={{ y: 110, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 110, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            {/* Blurred glass panel */}
            <div
              className="relative"
              style={{
                background: 'rgba(10, 10, 14, 0.94)',
                borderTop: `1px solid rgba(${selectedPath.accentRgb}, 0.2)`,
                backdropFilter: 'blur(24px)',
                boxShadow: `0 -20px 60px rgba(0,0,0,0.5), 0 -1px 0 rgba(${selectedPath.accentRgb}, 0.15)`,
              }}
            >
              {/* Animated glow top border */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, rgba(${selectedPath.accentRgb}, 0.6) 40%, rgba(${selectedPath.accentRgb}, 0.6) 60%, transparent 100%)`,
                }}
              />

              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between gap-4">
                {/* Left: Path info */}
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `rgba(${selectedPath.accentRgb}, 0.12)`,
                      border: `1px solid rgba(${selectedPath.accentRgb}, 0.3)`,
                      boxShadow: `0 0 20px rgba(${selectedPath.accentRgb}, 0.2)`,
                    }}
                  >
                    {(() => {
                      const Icon = selectedPath.icon
                      return <Icon size={20} style={{ color: selectedPath.accentColor }} />
                    })()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-bold text-sm leading-none truncate">{selectedPath.title}</p>
                    <p className="text-zinc-500 text-xs mt-1 font-medium">
                      {selectedPath.duration} · {selectedPath.level}
                    </p>
                  </div>
                </div>

                {/* Right: Action area */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="hidden sm:flex flex-col items-end gap-0.5">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Path Selected</span>
                    <span className="text-xs text-zinc-600 font-medium">You can switch anytime</span>
                  </div>

                  <motion.button
                    id="start-journey-btn"
                    onClick={handleStart}
                    disabled={isLaunching}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative h-12 px-8 text-white rounded-xl font-bold text-sm transition-all duration-200 inline-flex items-center gap-2.5 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: `linear-gradient(135deg, ${selectedPath.accentColor}dd, ${selectedPath.accentColor}99)`,
                      boxShadow: `0 0 30px rgba(${selectedPath.accentRgb}, 0.4), 0 4px 16px rgba(0,0,0,0.3)`,
                    }}
                  >
                    {/* Sheen sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                    {isLaunching ? (
                      <>
                        <svg className="animate-spin h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Setting up…
                      </>
                    ) : (
                      <>
                        Start My Journey
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
