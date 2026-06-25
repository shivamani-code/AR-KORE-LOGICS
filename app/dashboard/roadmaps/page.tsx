'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle2, Lock, Trophy, ArrowRight, Brain, Code2, Database,
  Sparkles, Layers, Target, BarChart3, Zap, GraduationCap, ChevronRight, Play
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── AI Course Roadmap Data ──────────────────────────────────────────────────

const aiRoadmap = {
  title: 'Artificial Intelligence',
  subtitle: 'Aligned with CBSE Class 9 Curriculum',
  description: 'Your 8-Week AI Learning Journey. Master the fundamentals of Artificial Intelligence through hands-on projects and coding exercises.',
  progress: 0, // Assuming new user
  accentColor: '#22d3ee',
  accentRgb: '34, 211, 238',
  secondaryColor: '#818cf8',
  nodes: [
    {
      id: 1,
      week: 1,
      title: 'Start Your AI Journey',
      description: 'Introduction to Artificial Intelligence, its history, types, and real-world applications.',
      status: 'active',
      icon: Brain,
      phase: 'Foundation',
      color: '#22d3ee',
      expandedInfo: {
        duration: '5 days',
        resourcesCount: 8,
        projectsCount: 1,
        difficulty: 'Beginner',
        tasks: ['What is AI?', 'History of AI', 'Types of AI', 'AI in Daily Life', 'AI Ethics'],
      },
    },
    {
      id: 2,
      week: 2,
      title: 'AI Project Cycle',
      description: 'Learn how to think like an AI engineer. Understand the AI project lifecycle from problem definition to deployment.',
      status: 'locked',
      icon: Target,
      phase: 'Foundation',
      color: '#818cf8',
      expandedInfo: {
        duration: '5 days',
        resourcesCount: 10,
        projectsCount: 1,
        difficulty: 'Beginner',
        tasks: ['Problem Framing', 'Data Collection', 'Model Building', 'Testing & Evaluation', 'AI Deployment'],
      },
    },
    {
      id: 3,
      week: 3,
      title: 'Understand Data',
      description: 'Data is the fuel for AI. Learn how to collect, clean, visualize and interpret data to power machine learning models.',
      status: 'locked',
      icon: BarChart3,
      phase: 'Core Skills',
      color: '#a78bfa',
      expandedInfo: {
        duration: '5 days',
        resourcesCount: 12,
        projectsCount: 2,
        difficulty: 'Intermediate',
        tasks: ['Types of Data', 'Data Collection', 'Data Cleaning', 'Data Visualization', 'Insights from Data'],
      },
    },
    {
      id: 4,
      week: 4,
      title: 'Math for AI',
      description: 'Explore the mathematical concepts that power machine learning algorithms including statistics, probability and linear algebra.',
      status: 'locked',
      icon: Layers,
      phase: 'Core Skills',
      color: '#fb923c',
      expandedInfo: {
        duration: '5 days',
        resourcesCount: 9,
        projectsCount: 1,
        difficulty: 'Intermediate',
        tasks: ['Probability Basics', 'Statistics for AI', 'Matrices & Vectors', 'Functions & Graphs', 'ML Math'],
      },
    },
    {
      id: 5,
      week: 5,
      title: 'Discover Gen AI',
      description: 'Explore the exciting world of Generative AI — learn about large language models, image generation, and AI creativity tools.',
      status: 'locked',
      icon: Sparkles,
      phase: 'Advanced',
      color: '#f472b6',
      expandedInfo: {
        duration: '5 days',
        resourcesCount: 11,
        projectsCount: 2,
        difficulty: 'Intermediate',
        tasks: ['What is Gen AI?', 'Large Language Models', 'Prompt Engineering', 'AI Image Generation', 'Responsible AI'],
      },
    },
    {
      id: 6,
      week: 6,
      title: 'Python Fundamentals',
      description: 'Master Python programming — the language of AI. From variables to functions, build a solid coding foundation.',
      status: 'locked',
      icon: Code2,
      phase: 'Advanced',
      color: '#4ade80',
      expandedInfo: {
        duration: '5 days',
        resourcesCount: 15,
        projectsCount: 3,
        difficulty: 'Intermediate',
        tasks: ['Python Basics', 'Variables & Types', 'Control Flow', 'Functions', 'Libraries for AI'],
      },
    },
    {
      id: 7,
      week: 7,
      title: 'Logic & Loops',
      description: 'Deep dive into programming logic, loops, conditionals and data structures to build your first AI programs.',
      status: 'locked',
      icon: Zap,
      phase: 'Advanced',
      color: '#facc15',
      expandedInfo: {
        duration: '5 days',
        resourcesCount: 12,
        projectsCount: 2,
        difficulty: 'Intermediate',
        tasks: ['For & While Loops', 'If-Else Logic', 'Lists & Dictionaries', 'Functions & Classes', 'Mini AI Programs'],
      },
    },
    {
      id: 8,
      week: 8,
      title: 'Lists, Projects & Exam Prep',
      description: 'Bring it all together with capstone projects, exam preparation, and a comprehensive review of all AI concepts learned.',
      status: 'future',
      icon: GraduationCap,
      phase: 'Placement',
      color: '#f87171',
      expandedInfo: {
        duration: '5 days',
        resourcesCount: 10,
        projectsCount: 3,
        difficulty: 'Advanced',
        tasks: ['Capstone Project', 'Portfolio Building', 'Exam Review', 'Mock Test', 'AI Career Paths'],
      },
    },
  ],
}

const iconMap: Record<string, any> = {
  brain: Brain,
  target: Target,
  barchart3: BarChart3,
  layers: Layers,
  sparkles: Sparkles,
  code2: Code2,
  zap: Zap,
  graduationcap: GraduationCap,
}

export default function RoadmapsPage() {
  const [expandedNode, setExpandedNode] = useState<number | null>(3)
  const [isClient, setIsClient] = useState(false)
  const [roadmapData, setRoadmapData] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    const fetchRoadmap = async () => {
      try {
        const res = await fetch('/api/roadmaps')
        if (res.ok) {
          const data = await res.json()
          if (data.success) {
            setRoadmapData(data)
            // Auto-expand the active node
            const active = data.nodes?.find((n: any) => n.status === 'current' || n.status === 'active')
            if (active) {
              setExpandedNode(active.id)
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch roadmap:', err)
      }
    }
    fetchRoadmap()
  }, [])

  const path = roadmapData
    ? {
        title: 'Artificial Intelligence',
        subtitle: 'Aligned with CBSE Class 9 Curriculum',
        progress: roadmapData.progress?.completionPercentage ?? 0,
        accentRgb: '34, 211, 238',
        accentColor: '#22d3ee',
        secondaryColor: '#818cf8',
        nodes: roadmapData.nodes.map((node: any) => ({
          ...node,
          icon: iconMap[node.iconName?.toLowerCase()] || Brain,
        })),
      }
    : {
        ...aiRoadmap,
        nodes: aiRoadmap.nodes.map((n: any) => ({
          ...n,
          icon: n.icon,
        })),
      }

  const completedCount = path.nodes.filter((n: any) => n.status === 'completed').length

  if (!isClient) return null

  return (
    <div className="min-h-screen relative pb-16 overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none -z-10 transition-all duration-700"
        style={{ background: `radial-gradient(circle, rgba(${path.accentRgb}, 0.07) 0%, transparent 70%)` }}
      />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/4 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* ─── Page Header ──────────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Title */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `rgba(${path.accentRgb}, 0.12)`, border: `1px solid rgba(${path.accentRgb}, 0.25)` }}
              >
                <Layers size={15} style={{ color: path.accentColor }} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: path.accentColor }}>
                My Roadmap
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {path.title}
            </h1>
            <p className="text-sm text-zinc-500 mt-1 font-medium">{path.subtitle}</p>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-3">
            {/* Progress card */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-3.5 min-w-[160px]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Path Progress</span>
                <span className="text-sm font-bold" style={{ color: path.accentColor }}>{path.progress}%</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${path.progress}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${path.accentColor}, ${path.secondaryColor})`,
                    boxShadow: `0 0 10px rgba(${path.accentRgb}, 0.5)`,
                  }}
                />
              </div>
            </div>

            {/* Modules card */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Brain size={15} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Weeks Done</p>
                <p className="text-sm font-bold text-white mt-0.5">{completedCount} / {path.nodes.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Timeline Layout ───────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto space-y-3">
          {path.nodes.map((node: any, idx: number) => {
            const isCompleted = node.status === 'completed'
            const isActive = node.status === 'active' || node.status === 'current'
            const isLocked = node.status === 'locked'
            const isFuture = node.status === 'future' || (!isCompleted && !isActive && !isLocked)
            const isExpanded = expandedNode === node.id
            const IconComp = node.icon
            const isLast = idx === path.nodes.length - 1

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Phase label */}
                {(idx === 0 || path.nodes[idx - 1].phase !== node.phase) && (
                  <div className="flex items-center gap-3 mb-3 mt-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full">
                      {node.phase}
                    </span>
                    <div className="flex-1 h-px bg-white/[0.05]" />
                  </div>
                )}

                <button
                  onClick={() => {
                    if (isActive || isCompleted) {
                      setExpandedNode(isExpanded ? null : node.id)
                    }
                  }}
                  disabled={isLocked || isFuture}
                  className={`w-full text-left group relative rounded-2xl border transition-all duration-300 overflow-hidden focus:outline-none ${
                    isLocked || isFuture ? 'cursor-default opacity-60' : 'cursor-pointer'
                  }`}
                  style={{
                    border: isActive
                      ? `1px solid ${node.color}60`
                      : isCompleted
                        ? '1px solid rgba(16, 185, 129, 0.25)'
                        : '1px solid rgba(255,255,255,0.06)',
                    background: isActive
                      ? `${node.color}0A`
                      : isCompleted
                        ? 'rgba(16, 185, 129, 0.03)'
                        : 'rgba(255,255,255,0.01)',
                    boxShadow: isActive
                      ? `0 0 30px ${node.color}15, 0 4px 24px rgba(0,0,0,0.3)`
                      : '0 2px 12px rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Active top glow line */}
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 right-0 h-[1.5px]"
                      style={{ background: `linear-gradient(90deg, transparent, ${node.color}, transparent)` }}
                    />
                  )}

                  <div className="p-5 flex items-start gap-4">
                    {/* Step number + connector line */}
                    <div className="flex flex-col items-center flex-shrink-0 relative">
                      {/* Node icon circle */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={
                          isCompleted
                            ? { background: 'rgba(16,185,129,0.12)', border: '1.5px solid rgba(16,185,129,0.35)' }
                            : isActive
                              ? {
                                  background: `${node.color}15`,
                                  border: `1.5px solid ${node.color}80`,
                                  boxShadow: `0 0 20px ${node.color}40`,
                                }
                              : { background: 'rgba(255,255,255,0.03)', border: '1.5px dashed rgba(255,255,255,0.1)' }
                        }
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={18} className="text-emerald-400" />
                        ) : isActive ? (
                          <IconComp size={18} style={{ color: node.color }} />
                        ) : isFuture ? (
                          <Trophy size={16} className="text-zinc-600" />
                        ) : (
                          <Lock size={15} className="text-zinc-700" />
                        )}
                      </div>

                      {/* Vertical connector */}
                      {!isLast && (
                        <div className="w-px mt-2 flex-1 min-h-[20px]"
                          style={{
                            background: isCompleted
                              ? 'linear-gradient(to bottom, rgba(16,185,129,0.4), rgba(16,185,129,0.1))'
                              : 'rgba(255,255,255,0.06)',
                          }}
                        />
                      )}
                    </div>

                    {/* Node content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className={`text-sm font-bold leading-tight ${
                              isCompleted ? 'text-zinc-300' : isActive ? 'text-white' : 'text-zinc-500'
                            }`}>
                              Week {node.week}: {node.title}
                            </h3>
                            {isCompleted && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                                Done
                              </span>
                            )}
                            {isActive && (
                              <span
                                className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                                style={{
                                  color: node.color,
                                  background: `${node.color}15`,
                                  border: `1px solid ${node.color}50`,
                                }}
                              >
                                Active
                              </span>
                            )}
                            {isFuture && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400/70 bg-amber-400/5 border border-amber-400/15 px-2 py-0.5 rounded-full">
                                Final
                              </span>
                            )}
                          </div>
                          <p className={`text-xs leading-relaxed ${isCompleted || isActive ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            {node.description}
                          </p>
                        </div>

                        {/* Expand chevron */}
                        {(isActive || isCompleted) && (
                          <ChevronRight
                            size={14}
                            className="text-zinc-600 flex-shrink-0 mt-1 transition-transform duration-300"
                            style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                          />
                        )}
                      </div>

                      {/* Expandable detail row */}
                      <AnimatePresence>
                        {isExpanded && node.expandedInfo && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            {/* Topics */}
                            <div className="space-y-2 mb-4">
                              <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mb-1">Topics</p>
                              {node.expandedInfo.tasks.map((task: string, tIdx: number) => (
                                <div key={tIdx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                                  <div
                                    className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{ background: `${node.color}15`, border: `1px solid ${node.color}30` }}
                                  >
                                    <span className="text-[8px] font-bold" style={{ color: node.color }}>{tIdx + 1}</span>
                                  </div>
                                  <span className="leading-relaxed">{task}</span>
                                </div>
                              ))}
                            </div>

                            {/* CTA buttons */}
                            <div className="flex gap-2 flex-wrap mt-4">
                              <Link
                                href={`/dashboard/module/${node.id}`}
                                className="h-9 px-5 text-white text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 group"
                                style={{
                                  background: `linear-gradient(135deg, ${node.color}cc, ${node.color}88)`,
                                  boxShadow: `0 0 20px ${node.color}30`,
                                }}
                              >
                                <Play size={11} />
                                Enter Workspace
                                <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              </motion.div>
            )
          })}

          {/* Final milestone */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col items-center py-8 gap-4"
          >
            <div className="w-px h-8 bg-gradient-to-b from-white/10 to-transparent" />
            <div className="relative flex items-center justify-center">
              <span className="animate-pulse absolute w-20 h-20 rounded-full bg-amber-500/10 blur-sm" />
              <div
                className="w-16 h-16 flex items-center justify-center relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))',
                  border: '1.5px solid rgba(245,158,11,0.3)',
                  borderRadius: '50%',
                  boxShadow: '0 0 40px rgba(245,158,11,0.15)',
                }}
              >
                <Trophy size={26} className="text-amber-400" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 uppercase tracking-wider">
                AI Certified
              </p>
              <p className="text-xs text-zinc-600 mt-1 max-w-xs">
                Complete all 8 weeks to earn your CBSE Class 9 AI certification.
              </p>
            </div>
          </motion.div>
      </div>
    </div>
  )
}
