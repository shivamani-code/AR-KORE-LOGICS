'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle2, Award, Clock, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@/components/user-context'

const careerPaths = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Learn Python, statistical modeling, PyTorch deep learning networks, and LLM orchestration.',
    duration: '8-12 months',
    colorClass: 'border-indigo-500',
    accentColor: '#6366F1',
    glowClass: 'shadow-[0_0_30px_rgba(99,102,241,0.15)]',
    hoverBg: 'hover:bg-indigo-500/5',
    selectedBg: 'bg-indigo-500/5',
    skills: ['Python', 'PyTorch', 'NLP Basics', 'LLM Tuning'],
    outcomes: ['Machine Learning Engineer', 'Data Scientist', 'AI Researcher'],
  },
]

export function CareerPaths() {
  const { selectedCareer: userSelectedCareer, setSelectedCareer: setUserSelectedCareer } = useUser()
  const [selectedCareer, setSelectedCareer] = useState<string | null>(userSelectedCareer)
  const router = useRouter()

  useEffect(() => {
    if (userSelectedCareer) {
      const matched = careerPaths.find(p => p.title.toLowerCase() === userSelectedCareer.toLowerCase() || p.id === userSelectedCareer)
      if (matched) {
        setSelectedCareer(matched.id)
      }
    }
  }, [userSelectedCareer])

  const handleSelect = (careerId: string) => {
    setSelectedCareer(careerId)
  }

  const handleLaunch = async () => {
    if (!selectedCareer) return
    const path = careerPaths.find(p => p.id === selectedCareer)
    if (path) {
      setUserSelectedCareer(path.id)
      try {
        await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ careerPath: path.id }),
        })
      } catch (err) {
        console.error('Failed to save selected career:', err)
      }
      router.push('/dashboard')
    }
  }

  const selectedPathInfo = careerPaths.find(p => p.id === selectedCareer)

  return (
    <section id="roadmaps" className="py-8 bg-white/[0.02] rounded-3xl border border-white/5 relative overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="px-6 sm:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-left mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Choose Your Career Path
          </h2>
          <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
            Select a career path to update your Career Workspace. You can switch paths at any time.
          </p>
        </div>

        {/* 4x2 Grid of Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {careerPaths.map((path) => {
            const isSelected = selectedCareer === path.id
            return (
              <button
                key={path.id}
                onClick={() => handleSelect(path.id)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between h-[210px] overflow-hidden group focus:outline-none focus:ring-2 focus:ring-brand-primary/50 ${
                  isSelected
                    ? `border-t-2 border-x border-b ${path.colorClass} ${path.selectedBg} ${path.glowClass}`
                    : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.06]'
                }`}
                aria-pressed={isSelected}
                aria-label={`Select ${path.title}`}
              >
                {/* Background color glow on hover/selected */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(120px circle at 50% 50%, ${path.accentColor}0e, transparent 70%)`
                  }}
                />

                <div className="w-full relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-white transition duration-200">
                      {path.title}
                    </h3>
                    
                    {/* Checkmark Badge */}
                    {isSelected && (
                      <CheckCircle2 size={16} className="text-white fill-none" style={{ color: path.accentColor }} />
                    )}
                  </div>
                  <p className="text-xs text-text-secondary mb-4 leading-relaxed line-clamp-3">
                    {path.description}
                  </p>
                </div>

                <div className="relative z-10">
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block mb-1">Duration</span>
                  <span className="text-xs text-text-secondary font-bold">{path.duration}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Outcome details drawer */}
        <AnimatePresence>
          {selectedPathInfo && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl relative"
            >
              {/* Glow border line on top */}
              <div 
                className="absolute top-0 left-6 right-6 h-[1.5px] rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${selectedPathInfo.accentColor}, transparent)` }}
              />

              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-4 flex-1">
                  <div>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">Detailed Outcomes</span>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      Becoming a {selectedPathInfo.title}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                        <Clock size={11} /> Skills You Will Build
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPathInfo.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] text-text-secondary text-[10px] sm:text-xs rounded font-semibold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                        <Award size={11} /> Target Job Roles
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPathInfo.outcomes.map((role, rIdx) => (
                          <span
                            key={rIdx}
                            className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.08] text-white/90 text-[10px] sm:text-xs rounded flex items-center gap-1.5 font-semibold"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-auto flex-shrink-0">
                  <button
                    onClick={handleLaunch}
                    className="w-full lg:w-auto h-12 px-8 text-white font-bold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${selectedPathInfo.accentColor}, ${selectedPathInfo.accentColor}bb)`,
                      boxShadow: `0 0 25px ${selectedPathInfo.accentColor}35`
                    }}
                  >
                    Launch Career OS Workspace
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
