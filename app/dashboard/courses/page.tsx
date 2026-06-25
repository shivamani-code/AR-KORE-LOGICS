'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain, ArrowRight, ChevronRight, BookOpen, Code2,
  BarChart3, Sparkles, Calendar, Clock, CheckCircle2,
  Play, Layers, Zap, Target, TrendingUp, Star, Users,
  GraduationCap, Map, X, ChevronDown, ChevronUp, Lock,
  Plus, LogIn, Award, ChevronLeft, Code, Terminal, Database, Workflow, Shield, Network
} from 'lucide-react'
import { useUser } from '@/components/user-context'

// ─── Course Catalog Data ─────────────────────────────────────────────────────

const courseCatalog = [
  {
    id: 'ai-cbse9',
    title: 'Artificial Intelligence',
    subtitle: 'Aligned with CBSE Class 9 Curriculum',
    tagline: 'Your 8-Week AI Learning Journey',
    description:
      'Master the fundamentals of Artificial Intelligence through hands-on projects, coding exercises, and real-world applications. Designed specifically for CBSE Class 9 students.',
    duration: '8 Weeks · 40 Learning Days',
    level: 'Beginner Friendly',
    totalModules: 8,
    learningDays: 40,
    icon: Brain,
    accentColor: '#22d3ee',
    accentRgb: '34, 211, 238',
    secondaryColor: '#818cf8',
    skills: ['Python', 'Machine Learning', 'Data Science', 'Gen AI', 'Logic & Loops', 'AI Projects'],
    outcomes: ['Build AI Models', 'Data Analysis', 'Python Programming', 'Gen AI Tools', 'Exam Ready'],
    weeks: [
      {
        week: 1,
        title: 'Start Your AI Journey',
        description: 'Introduction to Artificial Intelligence, its history, types, and real-world applications. Understand how AI is changing the world around us.',
        icon: Brain,
        status: 'active',
        color: '#22d3ee',
        topics: ['What is AI?', 'History of AI', 'Types of AI', 'AI in Daily Life', 'AI Ethics'],
        duration: '5 days',
        resources: 8,
        projects: 1,
        details: "This week covers the foundational concepts of AI — you'll learn what defines intelligence in machines, trace AI's evolution from the Turing Test to modern LLMs, and explore supervised, unsupervised, and reinforcement learning types. You'll also discuss ethical implications and examine real use cases like recommendation engines, medical diagnostics, and autonomous vehicles.",
      },
      {
        week: 2,
        title: 'AI Project Cycle',
        description: 'Learn how to think like an AI engineer. Understand the AI project lifecycle from problem definition to deployment.',
        icon: Target,
        status: 'locked',
        color: '#818cf8',
        topics: ['Problem Framing', 'Data Collection', 'Model Building', 'Testing & Evaluation', 'AI Deployment'],
        duration: '5 days',
        resources: 10,
        projects: 1,
        details: "Walk through the full end-to-end AI project cycle. You'll frame a real-world problem, gather and label data, choose a model architecture, evaluate performance metrics (accuracy, precision, recall), and understand deployment options from cloud APIs to edge devices.",
      },
      {
        week: 3,
        title: 'Understand Data',
        description: 'Data is the fuel for AI. Learn how to collect, clean, visualize and interpret data to power machine learning models.',
        icon: BarChart3,
        status: 'locked',
        color: '#a78bfa',
        topics: ['Types of Data', 'Data Collection', 'Data Cleaning', 'Data Visualization', 'Insights from Data'],
        duration: '5 days',
        resources: 12,
        projects: 2,
        details: "Explore structured vs unstructured data, learn web scraping basics, handle missing values and outliers, and create compelling visualisations using Matplotlib and Seaborn. You'll build two mini-projects: a data dashboard and a cleaned dataset ready for modeling.",
      },
      {
        week: 4,
        title: 'Math for AI',
        description: 'Explore the mathematical concepts that power machine learning algorithms including statistics, probability and linear algebra.',
        icon: Layers,
        status: 'locked',
        color: '#fb923c',
        topics: ['Probability Basics', 'Statistics for AI', 'Matrices & Vectors', 'Functions & Graphs', 'ML Math'],
        duration: '5 days',
        resources: 9,
        projects: 1,
        details: "Build the mathematical intuition behind ML: Bayes' theorem, mean/variance/standard deviation, dot products, matrix multiplication, and gradient concepts. No prior calculus needed — each concept is taught visually and applied directly to ML examples.",
      },
      {
        week: 5,
        title: 'Discover Gen AI',
        description: 'Explore the exciting world of Generative AI — learn about large language models, image generation, and AI creativity tools.',
        icon: Sparkles,
        status: 'locked',
        color: '#f472b6',
        topics: ['What is Gen AI?', 'Large Language Models', 'Prompt Engineering', 'AI Image Generation', 'Responsible AI'],
        duration: '5 days',
        resources: 11,
        projects: 2,
        details: "Deep-dive into transformer architecture, how GPT-4 and Gemini work under the hood, and the art of prompt engineering. You'll experiment with image generation tools, build a prompt library, and discuss hallucination, bias, and responsible deployment of generative systems.",
      },
      {
        week: 6,
        title: 'Python Fundamentals',
        description: 'Master Python programming — the language of AI. From variables to functions, build a solid coding foundation.',
        icon: Code2,
        status: 'locked',
        color: '#4ade80',
        topics: ['Python Basics', 'Variables & Types', 'Control Flow', 'Functions', 'Libraries for AI'],
        duration: '5 days',
        resources: 15,
        projects: 3,
        details: "Hands-on Python coding from scratch: variables, lists, dictionaries, loops, conditionals, and functions. You'll install and use NumPy, Pandas, and Matplotlib — the core trio of data science libraries — completing three mini-coding challenges to solidify your skills.",
      },
      {
        week: 7,
        title: 'Logic & Loops',
        description: 'Deep dive into programming logic, loops, conditionals and data structures to build your first AI programs.',
        icon: Zap,
        status: 'locked',
        color: '#facc15',
        topics: ['For & While Loops', 'If-Else Logic', 'Lists & Dictionaries', 'Functions & Classes', 'Mini AI Programs'],
        duration: '5 days',
        resources: 12,
        projects: 2,
        details: 'Level up your Python by mastering iteration patterns, writing reusable functions, building classes, and combining these into two functional AI programs: a simple text classifier and a rules-based chatbot.',
      },
      {
        week: 8,
        title: 'Lists, Projects & Exam Prep',
        description: 'Bring it all together with capstone projects, exam preparation, and a comprehensive review of all AI concepts learned.',
        icon: GraduationCap,
        status: 'locked',
        color: '#f87171',
        topics: ['Capstone Project', 'Portfolio Building', 'Exam Review', 'Mock Test', 'AI Career Paths'],
        duration: '5 days',
        resources: 10,
        projects: 3,
        details: "Complete your capstone project, package your portfolio, and prepare for the CBSE AI exam with a comprehensive review session and a full mock test. You'll also explore next steps — from advanced AI courses to college programs and career pathways.",
      },
    ],
  }
]

// ─── Week Card Component (expandable) ────────────────────────────────────────

function WeekCard({ week, index, accentRgb }: { week: (typeof courseCatalog[0]['weeks'])[0]; index: number; accentRgb: string }) {
  const router = useRouter()
  const [expanded, setExpanded] = useState(week.status === 'active')
  const IconComp = week.icon
  const isCompleted = week.status === 'completed'
  const isActive = week.status === 'active'
  const isLocked = week.status === 'locked'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        onClick={() => !isLocked && setExpanded(!expanded)}
        className={`w-full text-left group relative rounded-2xl border transition-all duration-300 overflow-hidden ${
          isLocked ? 'cursor-default' : 'cursor-pointer'
        }`}
        style={{
          border: isActive
            ? `1px solid rgba(${accentRgb}, 0.4)`
            : isCompleted
            ? '1px solid rgba(16, 185, 129, 0.3)'
            : isLocked
            ? '1px solid rgba(255,255,255,0.05)'
            : '1px solid rgba(255,255,255,0.08)',
          background: isActive
            ? `rgba(${accentRgb}, 0.04)`
            : isCompleted
            ? 'rgba(16,185,129,0.03)'
            : 'rgba(255,255,255,0.01)',
          boxShadow: isActive ? `0 0 30px rgba(${accentRgb}, 0.08)` : undefined,
          opacity: isLocked ? 0.55 : 1,
        }}
      >
        {isActive && (
          <div
            className="absolute top-0 left-0 right-0 h-[1.5px]"
            style={{ background: `linear-gradient(90deg, transparent, ${week.color}, transparent)` }}
          />
        )}

        <div className="p-5 flex items-start gap-4">
          {/* Week number + connector */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
              style={
                isCompleted
                  ? { background: 'rgba(16,185,129,0.12)', border: '1.5px solid rgba(16,185,129,0.35)' }
                  : isActive
                  ? {
                      background: `rgba(${accentRgb}, 0.12)`,
                      border: `1.5px solid rgba(${accentRgb}, 0.5)`,
                      boxShadow: `0 0 20px rgba(${accentRgb}, 0.25)`,
                    }
                  : { background: 'rgba(255,255,255,0.03)', border: '1.5px dashed rgba(255,255,255,0.1)' }
              }
            >
              {isCompleted ? (
                <CheckCircle2 size={18} className="text-emerald-400" />
              ) : isActive ? (
                <IconComp size={18} style={{ color: week.color }} />
              ) : (
                <Lock size={14} className="text-zinc-700" />
              )}
            </div>
            {index < 7 && (
              <div
                className="w-px mt-2 h-4 flex-1 min-h-[16px]"
                style={{
                  background: isCompleted
                    ? 'linear-gradient(to bottom, rgba(16,185,129,0.4), rgba(16,185,129,0.05))'
                    : 'rgba(255,255,255,0.05)',
                }}
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: week.color }}>
                    Week {week.week}
                  </span>
                  {isCompleted && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
                      Done
                    </span>
                  )}
                  {isActive && (
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                      style={{
                        color: week.color,
                        background: `${week.color}18`,
                        border: `1px solid ${week.color}40`,
                      }}
                    >
                      Active
                    </span>
                  )}
                </div>
                <h3 className={`text-sm font-bold leading-tight mb-1 ${isActive ? 'text-white' : isCompleted ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {week.title}
                </h3>
                <p className={`text-xs leading-relaxed ${isActive || isCompleted ? 'text-zinc-500' : 'text-zinc-700'}`}>
                  {week.description}
                </p>
              </div>
              {!isLocked && (
                expanded ? (
                  <ChevronUp size={14} className="text-zinc-500 flex-shrink-0 mt-1" />
                ) : (
                  <ChevronDown size={14} className="text-zinc-600 flex-shrink-0 mt-1" />
                )
              )}
            </div>

            {/* Expanded content */}
            <AnimatePresence>
              {expanded && !isLocked && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { label: 'Duration', value: week.duration, icon: Clock },
                      { label: 'Resources', value: `${week.resources} files`, icon: BookOpen },
                      { label: 'Projects', value: `${week.projects} labs`, icon: Zap },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
                        <Icon size={11} className="text-zinc-500 mx-auto mb-1" />
                        <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">{label}</p>
                        <p className="text-xs font-bold text-white mt-0.5">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Full details paragraph */}
                  {week.details && (
                    <div
                      className="rounded-xl p-4 mb-4 text-xs text-zinc-400 leading-relaxed"
                      style={{
                        background: `${week.color}08`,
                        border: `1px solid ${week.color}18`,
                      }}
                    >
                      <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: week.color }}>
                        Week Details
                      </p>
                      {week.details}
                    </div>
                  )}

                  {/* Topics */}
                  <div className="mb-4">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mb-2">Topics Covered</p>
                    <div className="flex flex-wrap gap-1.5">
                      {week.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-semibold"
                          style={{
                            background: `${week.color}12`,
                            border: `1px solid ${week.color}25`,
                            color: week.color,
                          }}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/dashboard/module/${week.week}`)
                      }}
                      className="h-9 px-5 text-white text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${week.color}cc, ${week.color}88)`,
                        boxShadow: `0 0 20px ${week.color}30`,
                      }}
                    >
                      <Play size={11} />
                      {isCompleted ? 'Review Week' : 'Start Week'}
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Course Catalog Card ──────────────────────────────────────────────────────

function CourseCatalogCard({
  course,
  isEnrolled,
  onSelect,
  onEnroll,
}: {
  course: (typeof courseCatalog)[0]
  isEnrolled: boolean
  onSelect: () => void
  onEnroll: () => void
}) {
  const IconComp = course.icon
  const isLocked = (course as any).locked

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl border overflow-hidden transition-all duration-300 group"
      style={{
        border: isEnrolled
          ? `1px solid rgba(${course.accentRgb}, 0.4)`
          : isLocked
          ? '1px solid rgba(255,255,255,0.05)'
          : '1px solid rgba(255,255,255,0.08)',
        background: isEnrolled
          ? `rgba(${course.accentRgb}, 0.04)`
          : 'rgba(255,255,255,0.015)',
        opacity: isLocked ? 0.65 : 1,
      }}
    >
      {/* Top accent */}
      {isEnrolled && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${course.accentColor}, transparent)` }}
        />
      )}

      {/* Lock badge */}
      {isLocked && (
        <div className="absolute top-4 right-4">
          <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-white/[0.08] flex items-center justify-center">
            <Lock size={12} className="text-zinc-500" />
          </div>
        </div>
      )}

      {/* Enrolled badge */}
      {isEnrolled && (
        <div className="absolute top-4 right-4">
          <span
            className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              color: course.accentColor,
              background: `rgba(${course.accentRgb}, 0.15)`,
              border: `1px solid rgba(${course.accentRgb}, 0.3)`,
            }}
          >
            ✓ Enrolled
          </span>
        </div>
      )}

      <div className="p-6">
        {/* Icon + Title */}
        <div className="flex items-start gap-3 mb-4 pr-16">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `rgba(${course.accentRgb}, 0.12)`,
              border: `1.5px solid rgba(${course.accentRgb}, 0.25)`,
            }}
          >
            <IconComp size={20} style={{ color: course.accentColor }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">{course.title}</h3>
            <p className="text-[10px] text-zinc-500 mt-0.5">{course.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-2">{course.description}</p>

        {/* Meta badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.07] text-zinc-400 text-[10px] font-semibold">
            {course.level}
          </span>
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.07] text-zinc-400 text-[10px] font-semibold flex items-center gap-1">
            <Clock size={9} /> {course.duration}
          </span>
          <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.07] text-zinc-400 text-[10px] font-semibold">
            {course.totalModules} modules
          </span>
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-1 mb-5">
          {course.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded text-[9px] font-semibold"
              style={{
                background: `rgba(${course.accentRgb}, 0.08)`,
                border: `1px solid rgba(${course.accentRgb}, 0.15)`,
                color: course.accentColor,
              }}
            >
              {skill}
            </span>
          ))}
          {course.skills.length > 4 && (
            <span className="text-[9px] text-zinc-600 font-semibold px-1 self-center">+{course.skills.length - 4}</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {isEnrolled ? (
            <>
              <button
                onClick={onSelect}
                className="flex-1 h-9 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all"
                style={{
                  background: `linear-gradient(135deg, ${course.accentColor}dd, ${course.secondaryColor}aa)`,
                  boxShadow: `0 0 20px rgba(${course.accentRgb}, 0.25)`,
                }}
              >
                <Play size={11} />
                View Course
              </button>
            </>
          ) : isLocked ? (
            <button
              disabled
              className="flex-1 h-9 rounded-xl border border-white/[0.05] text-zinc-600 text-xs font-bold cursor-not-allowed"
            >
              🔒 Locked
            </button>
          ) : (
            <>
              <button
                onClick={onEnroll}
                className="flex-1 h-9 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all"
                style={{
                  background: `linear-gradient(135deg, ${course.accentColor}dd, ${course.secondaryColor}aa)`,
                  boxShadow: `0 0 16px rgba(${course.accentRgb}, 0.2)`,
                }}
              >
                <LogIn size={11} />
                Enroll Now
              </button>
              <button
                onClick={onSelect}
                className="h-9 px-3 rounded-xl border border-white/[0.08] text-zinc-400 text-xs font-bold hover:text-white hover:bg-white/[0.04] transition-all"
              >
                Details
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Roadmap Detailed View ────────────────────────────────────────────────────

function DetailedRoadmap({
  course,
  accentColor,
  accentRgb,
  secondaryColor,
}: {
  course: (typeof courseCatalog)[0]
  accentColor: string
  accentRgb: string
  secondaryColor: string
}) {
  const completedWeeks = course.weeks.filter((w) => w.status === 'completed').length
  const progressPercent = course.weeks.length > 0 ? Math.round((completedWeeks / course.weeks.length) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Roadmap header */}
      <div
        className="relative rounded-2xl overflow-hidden p-6"
        style={{
          background: `linear-gradient(135deg, rgba(${accentRgb}, 0.08) 0%, rgba(0,0,0,0.2) 100%)`,
          border: `1px solid rgba(${accentRgb}, 0.2)`,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, ${secondaryColor}, transparent)` }}
        />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: accentColor }}>
              Course Roadmap
            </p>
            <h2 className="text-xl font-black text-white">{course.title}</h2>
            <p className="text-sm text-zinc-500 mt-1">{course.tagline}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-black" style={{ color: accentColor }}>{progressPercent}%</p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">Complete</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white">{course.weeks.length}</p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">Weeks</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white">{course.learningDays}</p>
              <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-600">Days</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${accentColor}, ${secondaryColor})`,
                boxShadow: `0 0 10px rgba(${accentRgb}, 0.5)`,
              }}
            />
          </div>
          <p className="text-xs text-zinc-500 mt-2">{completedWeeks} of {course.weeks.length} weeks completed</p>
        </div>
      </div>

      {/* Week-by-week detailed timeline */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full">
            {course.weeks.length}-Week Journey
          </span>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </div>

        <div className="space-y-3">
          {course.weeks.map((week, index) => (
            <WeekCard key={week.week} week={week} index={index} accentRgb={accentRgb} />
          ))}
        </div>

        {/* Final milestone */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
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
              <GraduationCap size={26} className="text-amber-400" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 uppercase tracking-wider">
              Certified
            </p>
            <p className="text-xs text-zinc-600 mt-1 max-w-xs">
              Complete all {course.weeks.length} weeks to earn your certification and unlock advanced courses.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Course Detail View ───────────────────────────────────────────────────────

function CourseDetailView({
  course,
  isEnrolled,
  onEnroll,
  onBack,
}: {
  course: (typeof courseCatalog)[0]
  isEnrolled: boolean
  onEnroll: () => void
  onBack: () => void
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'roadmap'>('overview')
  const router = useRouter()
  const IconComp = course.icon
  const completedWeeks = course.weeks.filter((w) => w.status === 'completed').length
  const progressPercent = course.weeks.length > 0 ? Math.round((completedWeeks / course.weeks.length) * 100) : 0
  const activeWeek = course.weeks.find((w) => w.status === 'active')

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition mb-6 group"
      >
        <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Courses
      </button>

      {/* Course Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl overflow-hidden mb-8"
        style={{
          background: `linear-gradient(135deg, rgba(${course.accentRgb}, 0.08) 0%, rgba(${course.accentRgb}, 0.03) 50%, rgba(0,0,0,0.1) 100%)`,
          border: `1px solid rgba(${course.accentRgb}, 0.2)`,
          boxShadow: `0 0 80px rgba(${course.accentRgb}, 0.06), 0 20px 60px rgba(0,0,0,0.4)`,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${course.accentColor} 40%, ${course.secondaryColor} 70%, transparent)` }}
        />

        <div className="relative p-8 md:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Left: Title + Meta */}
            <div className="flex-1">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                style={{
                  background: `rgba(${course.accentRgb}, 0.1)`,
                  border: `1px solid rgba(${course.accentRgb}, 0.25)`,
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: course.accentColor }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: course.accentColor }}>
                  {course.subtitle}
                </span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `rgba(${course.accentRgb}, 0.12)`,
                    border: `1.5px solid rgba(${course.accentRgb}, 0.3)`,
                    boxShadow: `0 0 30px rgba(${course.accentRgb}, 0.2)`,
                  }}
                >
                  <IconComp size={26} style={{ color: course.accentColor }} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                    {course.title}
                  </h1>
                  <p className="text-sm font-semibold text-zinc-400 mt-1">{course.tagline}</p>
                </div>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed max-w-lg mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {course.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
                    style={{
                      background: `rgba(${course.accentRgb}, 0.08)`,
                      border: `1px solid rgba(${course.accentRgb}, 0.18)`,
                      color: course.accentColor,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Stats + enroll */}
            <div className="flex flex-col gap-3 min-w-[220px]">
              {isEnrolled && course.weeks.length > 0 && (
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Course Progress</span>
                    <span className="text-xl font-black" style={{ color: course.accentColor }}>{progressPercent}%</span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${course.accentColor}, ${course.secondaryColor})`,
                        boxShadow: `0 0 10px rgba(${course.accentRgb}, 0.5)`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500 font-medium">{completedWeeks} of {course.totalModules} weeks complete</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 text-center">
                  <Calendar size={14} className="text-zinc-500 mx-auto mb-1.5" />
                  <p className="text-lg font-black text-white">{course.learningDays}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">Learning Days</p>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 text-center">
                  <GraduationCap size={14} className="text-zinc-500 mx-auto mb-1.5" />
                  <p className="text-lg font-black text-white">{course.totalModules}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">Modules</p>
                </div>
              </div>

              {!isEnrolled ? (
                <button
                  onClick={onEnroll}
                  className="w-full h-11 rounded-2xl text-sm font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 group"
                  style={{
                    background: `linear-gradient(135deg, ${course.accentColor}dd, ${course.secondaryColor}aa)`,
                    boxShadow: `0 0 30px rgba(${course.accentRgb}, 0.3)`,
                  }}
                >
                  <LogIn size={14} />
                  Enroll in This Course
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('roadmap')}
                  className="w-full h-11 rounded-2xl text-sm font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 group"
                  style={{
                    background: `linear-gradient(135deg, ${course.accentColor}dd, ${course.secondaryColor}aa)`,
                    boxShadow: `0 0 30px rgba(${course.accentRgb}, 0.3)`,
                  }}
                >
                  <Play size={14} />
                  View Full Roadmap
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs — only for enrolled course with weeks */}
      {isEnrolled && course.weeks.length > 0 && (
        <>
          <div className="flex items-center gap-1 mb-8 p-1 rounded-xl bg-white/[0.02] border border-white/[0.05] w-fit">
            {[
              { id: 'overview', label: 'Weekly Overview', icon: BookOpen },
              { id: 'roadmap', label: 'Full Roadmap', icon: Map },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-white/[0.06] text-white border border-white/[0.1]'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Icon size={12} />
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6"
              >
                {/* Left: Weekly timeline */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full">
                      {course.weeks.length}-Week Journey
                    </span>
                    <div className="flex-1 h-px bg-white/[0.05]" />
                  </div>

                  {course.weeks.map((week, index) => (
                    <WeekCard key={week.week} week={week} index={index} accentRgb={course.accentRgb} />
                  ))}

                  {/* Final milestone */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
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
                        <GraduationCap size={26} className="text-amber-400" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 uppercase tracking-wider">
                        AI Certified
                      </p>
                      <p className="text-xs text-zinc-600 mt-1 max-w-xs">
                        Complete all {course.weeks.length} weeks to earn your CBSE AI certification.
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Right: Spotlight panel */}
                <div className="xl:sticky xl:top-6 space-y-4">
                  {activeWeek && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="relative rounded-2xl overflow-hidden"
                      style={{
                        border: `1px solid rgba(${course.accentRgb}, 0.25)`,
                        background: `rgba(${course.accentRgb}, 0.03)`,
                        boxShadow: `0 0 60px rgba(${course.accentRgb}, 0.08)`,
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 right-0 h-[1.5px]"
                        style={{ background: `linear-gradient(90deg, transparent, ${course.accentColor}, transparent)` }}
                      />
                      <div className="p-6">
                        <span className="text-[9px] font-bold uppercase tracking-widest block mb-1.5" style={{ color: course.accentColor }}>
                          Now Learning
                        </span>
                        <h2 className="text-base font-bold text-white leading-tight mb-1">Week {activeWeek.week}: {activeWeek.title}</h2>
                        <p className="text-xs text-zinc-500 leading-relaxed mb-5">{activeWeek.description}</p>

                        <div className="space-y-2 mb-5">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">This Week's Topics</p>
                          {activeWeek.topics.map((topic, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-400">
                              <div
                                className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                                style={{
                                  background: `rgba(${course.accentRgb}, 0.1)`,
                                  border: `1px solid rgba(${course.accentRgb}, 0.2)`,
                                }}
                              >
                                <span className="text-[8px] font-bold" style={{ color: course.accentColor }}>{i + 1}</span>
                              </div>
                              {topic}
                            </div>
                          ))}
                        </div>

                        {/* Week details */}
                        {activeWeek.details && (
                          <div
                            className="rounded-xl p-3 mb-5 text-[11px] text-zinc-400 leading-relaxed"
                            style={{
                              background: `rgba(${course.accentRgb}, 0.06)`,
                              border: `1px solid rgba(${course.accentRgb}, 0.15)`,
                            }}
                          >
                            {activeWeek.details}
                          </div>
                        )}

                        <button
                          onClick={() => router.push(`/dashboard/module/${activeWeek.week}`)}
                          className="flex items-center justify-center gap-2 w-full h-10 text-white text-xs font-bold rounded-xl transition-all duration-200 group hover:scale-[1.02]"
                          style={{
                            background: `linear-gradient(135deg, ${course.accentColor}dd, ${course.accentColor}88)`,
                            boxShadow: `0 0 20px rgba(${course.accentRgb}, 0.3)`,
                          }}
                        >
                          <Play size={12} />
                          Continue Learning
                          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Outcomes card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-3">Career Outcomes</p>
                    <div className="space-y-2">
                      {course.outcomes.map((outcome) => (
                        <div key={outcome} className="flex items-center gap-2.5">
                          <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                          <span className="text-xs text-zinc-400 font-medium">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Week status overview */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-3">Week Overview</p>
                    <div className="space-y-2">
                      {course.weeks.map((week) => {
                        const isC = week.status === 'completed'
                        const isA = week.status === 'active'
                        return (
                          <div key={week.week} className="flex items-center gap-2.5">
                            <div
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{
                                background: isC ? '#10b981' : isA ? course.accentColor : 'rgba(255,255,255,0.1)',
                                boxShadow: isA ? `0 0 6px ${course.accentColor}` : 'none',
                              }}
                            />
                            <span className={`text-xs flex-1 truncate ${isC ? 'text-zinc-500 line-through decoration-zinc-700' : isA ? 'text-white font-semibold' : 'text-zinc-700'}`}>
                              W{week.week}: {week.title}
                            </span>
                            {isC && <CheckCircle2 size={11} className="text-emerald-500 flex-shrink-0" />}
                            {isA && <span className="text-[8px] font-bold" style={{ color: course.accentColor }}>←</span>}
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'roadmap' && (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <DetailedRoadmap
                  course={course}
                  accentColor={course.accentColor}
                  accentRgb={course.accentRgb}
                  secondaryColor={course.secondaryColor}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Not enrolled — show outcomes + lock message */}
      {!isEnrolled && (
        <div className="space-y-6">
          {/* Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-3">What You'll Learn</p>
              <div className="space-y-2">
                {course.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-center gap-2.5">
                    <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                    <span className="text-xs text-zinc-400 font-medium">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-3">Skills You'll Gain</p>
              <div className="flex flex-wrap gap-1.5">
                {course.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
                    style={{
                      background: `rgba(${course.accentRgb}, 0.08)`,
                      border: `1px solid rgba(${course.accentRgb}, 0.18)`,
                      color: course.accentColor,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Enroll CTA */}
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: `rgba(${course.accentRgb}, 0.04)`,
              border: `1px solid rgba(${course.accentRgb}, 0.15)`,
            }}
          >
            <Award size={32} className="mx-auto mb-3" style={{ color: course.accentColor }} />
            <h3 className="text-base font-bold text-white mb-1">Enroll to Access Full Roadmap</h3>
            <p className="text-xs text-zinc-500 mb-5 max-w-sm mx-auto">
              Enroll in this course to unlock the detailed week-by-week roadmap, topics, resources, and projects.
            </p>
            <button
              onClick={onEnroll}
              className="h-11 px-8 rounded-2xl text-sm font-bold text-white inline-flex items-center gap-2 transition-all"
              style={{
                background: `linear-gradient(135deg, ${course.accentColor}dd, ${course.secondaryColor}aa)`,
                boxShadow: `0 0 30px rgba(${course.accentRgb}, 0.3)`,
              }}
            >
              <LogIn size={14} />
              Enroll Now — It's Free
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function CoursesPage() {
  const { enrolledCourses, setEnrolledCourses, setSelectedCareer, isLoading: isUserLoading } = useUser()
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [roadmapNodes, setRoadmapNodes] = useState<any[] | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await fetch('/api/roadmaps')
        if (res.ok) {
          const data = await res.json()
          if (data.success && data.nodes) {
            setRoadmapNodes(data.nodes)
          }
        }
      } catch (err) {
        console.error('Failed to fetch roadmap nodes for courses catalog:', err)
      }
    }
    fetchRoadmap()
  }, [])

  const handleEnroll = async (courseId: string) => {
    const updated = enrolledCourses.includes(courseId)
      ? enrolledCourses
      : [...enrolledCourses, courseId]
    setEnrolledCourses(updated)
    
    const course = courseCatalog.find((c) => c.id === courseId)
    if (course) {
      setSelectedCareer(course.id)
      try {
        await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ careerPath: course.id, enrolledCourses: updated }),
        })
      } catch (err) {
        console.error('Failed to save course enrollment to backend:', err)
      }
    }
    setSelectedCourse(courseId)
  }

  const getDynamicCourse = () => {
    const course = courseCatalog.find((c) => c.id === selectedCourse) || null
    if (!course || !roadmapNodes) return course

    const mappedWeeks = course.weeks.map((week) => {
      const node = roadmapNodes.find((n) => n.week === week.week)
      if (!node) return week
      return {
        ...week,
        status: node.status === 'current' ? 'active' : node.status,
      }
    })

    return {
      ...course,
      weeks: mappedWeeks,
    }
  }

  const currentCourse = getDynamicCourse()
  const enrolledCount = enrolledCourses.length

  return (
    <div className="min-h-screen relative pb-16 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none -z-10 bg-cyan-500/5" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/4 rounded-full blur-[140px] pointer-events-none -z-10" />

      <AnimatePresence mode="wait">
        {selectedCourse && currentCourse ? (
          <motion.div key="detail">
            <CourseDetailView
              course={currentCourse}
              isEnrolled={enrolledCourses.includes(currentCourse.id)}
              onEnroll={() => handleEnroll(currentCourse.id)}
              onBack={() => setSelectedCourse(null)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="catalog"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Page header */}
            <div className="mb-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight mb-1">Course Catalog</h1>
                  <p className="text-sm text-zinc-500">
                    {enrolledCount > 0
                      ? `You are enrolled in ${enrolledCount} course${enrolledCount > 1 ? 's' : ''}. Select one to continue.`
                      : 'Enroll in a course to start your learning journey.'}
                  </p>
                </div>
                {enrolledCount > 0 && (
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{
                      background: 'rgba(34, 211, 238, 0.1)',
                      border: '1px solid rgba(34, 211, 238, 0.2)',
                      color: '#22d3ee',
                    }}
                  >
                    <Award size={12} />
                    {enrolledCount} Enrolled
                  </div>
                )}
              </div>
            </div>

            {/* Enrolled courses section */}
            {enrolledCount > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full">
                    My Courses
                  </span>
                  <div className="flex-1 h-px bg-white/[0.05]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {courseCatalog
                    .filter((c) => enrolledCourses.includes(c.id))
                    .map((course, i) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                      >
                        <CourseCatalogCard
                          course={course}
                          isEnrolled={true}
                          onSelect={() => setSelectedCourse(course.id)}
                          onEnroll={() => handleEnroll(course.id)}
                        />
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

            {/* All courses / Available courses */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-full">
                  {enrolledCount > 0 ? 'All Courses' : 'Available Courses'}
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {courseCatalog.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <CourseCatalogCard
                      course={course}
                      isEnrolled={enrolledCourses.includes(course.id)}
                      onSelect={() => setSelectedCourse(course.id)}
                      onEnroll={() => handleEnroll(course.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
