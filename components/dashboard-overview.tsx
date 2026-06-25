'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Flame, Trophy, ArrowRight, BookOpen, LogIn } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUser } from '@/components/user-context'

const careerInfo: Record<string, any> = {

  'ai-ml': {
    title: 'AI & Machine Learning Engineer',
    description: 'Design intelligence layers using mathematical optimization models, neural network architectures, and LLM orchestration.',
    duration: '12 Months',
    level: 'Advanced',
    modules: '48 Modules',
    progress: 30,
    modulesDone: '14/48',
    streak: '5 days',
    projectsDone: '3/10',
    skills: [
      { name: 'Python Basics', earned: true },
      { name: 'NumPy & Pandas Analytics', earned: true },
      { name: 'Supervised Models', earned: true },
      { name: 'Neural Nets (PyTorch)', earned: false },
      { name: 'NLP Foundations', earned: false },
      { name: 'LLM Fine-tuning', earned: false },
    ],
    upNext: {
      title: 'Neural Networks & PyTorch',
      duration: '8 hours',
      resources: '15 Resources',
      projects: '1 Image Recognition Challenge',
      progress: 5,
    },
    nodes: [
      { name: 'Python basics', status: 'completed' },
      { name: 'Pandas & NumPy', status: 'completed' },
      { name: 'Neural Nets', status: 'active' },
      { name: 'NLP basics', status: 'locked' },
      { name: 'LLM Fine-tuning', status: 'locked' },
    ]
  },
  // AI CBSE9 course enrolled from courses page
  'ai-cbse9': {
    title: 'Artificial Intelligence',
    description: 'Master the fundamentals of Artificial Intelligence through hands-on projects, coding exercises, and real-world applications. Designed for CBSE Class 9 students.',
    duration: '8 Weeks',
    level: 'Beginner Friendly',
    modules: '8 Modules',
    progress: 0,
    modulesDone: '0/8',
    streak: '0 days',
    projectsDone: '0/8',
    skills: [
      { name: 'Python', earned: false },
      { name: 'Data Science', earned: false },
      { name: 'Machine Learning', earned: false },
      { name: 'Gen AI', earned: false },
      { name: 'AI Projects', earned: false },
    ],
    upNext: {
      title: 'Understand Data',
      duration: '5 days',
      resources: '12 Resources',
      projects: '2 Labs',
      progress: 30,
    },
    nodes: [
      { name: 'AI Intro', status: 'active' },
      { name: 'Project Cycle', status: 'locked' },
      { name: 'Data Basics', status: 'locked' },
      { name: 'Math for AI', status: 'locked' },
      { name: 'Gen AI', status: 'locked' },
    ]
  }
}

export function DashboardOverview() {
  const { userName, enrolledCourses, selectedCareer, setSelectedCareer, isLoading: isUserLoading } = useUser()
  const [isClient, setIsClient] = useState(false)
  const [roadmapData, setRoadmapData] = useState<any>(null)
  const [isRoadmapLoading, setIsRoadmapLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)

    const fetchRoadmap = async () => {
      if (selectedCareer === 'ai-cbse9' || enrolledCourses.includes('ai-cbse9')) {
        try {
          const res = await fetch('/api/roadmaps')
          if (res.ok) {
            const data = await res.json()
            if (data.success) setRoadmapData(data)
          }
        } catch (err) {
          console.error('Failed to fetch overview roadmap:', err)
        }
      }
      setIsRoadmapLoading(false)
    }

    if (!isUserLoading) {
      fetchRoadmap()
    }
  }, [selectedCareer, enrolledCourses, isUserLoading])

  const isLoading = isUserLoading || isRoadmapLoading
  const isEnrolled = enrolledCourses.length > 0
  const info = selectedCareer ? (careerInfo[selectedCareer] || null) : null

  // Dynamic overrides from API
  const progressPercent = roadmapData?.progress?.completionPercentage ?? (info?.progress ?? 0)
  const streak = roadmapData?.progress?.streakDays ? `${roadmapData.progress.streakDays} days` : (info?.streak ?? '0 days')
  const completedCount = roadmapData?.progress?.completedModules?.length ?? 0
  const totalModules = roadmapData?.nodes?.length ?? (info ? 8 : 0)
  const modulesDoneStr = selectedCareer ? `${completedCount}/${totalModules}` : '—'

  const activeNode = roadmapData?.nodes?.find((n: any) => n.status === 'active' || n.status === 'current')
  const upNextTitle = activeNode ? activeNode.title : (roadmapData?.nodes?.length > 0 ? 'All modules completed!' : '—')
  const upNextDuration = activeNode ? activeNode.duration : '—'
  const upNextResources = activeNode ? `${activeNode.resources} Resources` : '—'
  const upNextProjects = activeNode ? `${activeNode.projects} Labs` : '—'

  // Calculate module progress: if activeNode is Week 3, show 30%, if other active week show 15%, if all completed show 100%, else 0%
  const activeModuleProgress = activeNode ? (activeNode.id === 3 ? 30 : 15) : (roadmapData?.nodes?.length > 0 ? 100 : 0)

  // SVG Progress Ring Parameters
  const radius = 54
  const strokeWidth = 5
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = isClient ? circumference - (progressPercent / 100) * circumference : circumference

  // ── Empty state: not enrolled in any course ─────────────────────────────────
  if (!isEnrolled && !isLoading) {
    return (
      <div className="space-y-6 pb-12">
        {/* Welcome Heading */}
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white mb-1">
            Good morning, {userName}
          </h1>
          <p className="text-xs text-zinc-500">
            Enroll in a course to start tracking your learning progress.
          </p>
        </div>

        {/* Empty enroll prompt */}
        <div className="bg-[#0c0c0f] border border-dashed border-white/[0.10] rounded-xl p-10 flex flex-col items-center justify-center gap-5 text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <BookOpen size={26} className="text-indigo-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white mb-1">No Course Enrolled</h2>
            <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
              Browse the course catalog, enroll in a course, and your roadmap, stats, and progress will appear here.
            </p>
          </div>
          <Link
            href="/dashboard/courses"
            className="h-9 px-5 bg-white text-black hover:bg-zinc-200 rounded-lg font-semibold text-xs transition inline-flex items-center gap-1.5 mt-1"
          >
            <LogIn size={13} />
            Browse & Enroll
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Empty Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Modules Finished', icon: Trophy },
            { label: 'Daily Streak', icon: Flame },
          ].map((item, idx) => {
            const IconComp = item.icon
            return (
              <div key={idx} className="bg-[#0c0c0f] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{item.label}</span>
                  <IconComp size={14} className="text-zinc-700" />
                </div>
                <p className="text-2xl font-semibold text-zinc-700 mt-3">—</p>
                <p className="text-[10px] text-zinc-800 mt-1 font-medium">Enroll in a course to see stats</p>
              </div>
            )
          })}
        </div>


      </div>
    )
  }

  // ── Loading state ────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-6 pb-12">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white mb-1">Good morning, {userName}</h1>
          <p className="text-xs text-zinc-500">Loading your course data…</p>
        </div>
        <div className="h-40 bg-[#0c0c0f] border border-white/[0.06] rounded-xl animate-pulse" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-[#0c0c0f] border border-white/[0.06] rounded-xl animate-pulse" />
          <div className="h-24 bg-[#0c0c0f] border border-white/[0.06] rounded-xl animate-pulse" />
        </div>
      </div>
    )
  }

  // ── Enrolled state: show course + stats ──────────────────────────────────────
  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Heading */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-white mb-1">
          Good morning, {userName}
        </h1>
        <p className="text-xs text-zinc-500">
          You have completed <span className="text-white font-medium">{progressPercent}%</span> of your {info?.title ?? 'course'} roadmap.
        </p>
      </div>

      {/* Enrolled course switcher (if multiple) */}
      {enrolledCourses.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {enrolledCourses.map((id) => {
            const courseInfo = careerInfo[id]
            if (!courseInfo) return null
            return (
              <button
                key={id}
                onClick={() => setSelectedCareer(id)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  selectedCareer === id
                    ? 'bg-white text-black'
                    : 'bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white'
                }`}
              >
                {courseInfo.title}
              </button>
            )
          })}
        </div>
      )}

      {/* Main Path Info Card */}
      <div className="bg-[#0c0c0f] border border-white/[0.06] rounded-xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-4 text-center lg:text-left max-w-xl">
            <span className="inline-flex items-center px-2.5 py-0.5 bg-white/[0.02] border border-white/[0.06] rounded text-[9px] font-semibold text-zinc-400 uppercase tracking-wider">
              Current Course
            </span>
            <h2 className="text-lg font-semibold text-white tracking-tight">
              {info?.title ?? '—'}
            </h2>
            <p className="text-zinc-400 text-xs leading-relaxed">
              {info?.description ?? ''}
            </p>

            {/* Sizing details */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1.5">
              <span className="px-2.5 py-0.5 bg-white/[0.02] border border-white/[0.06] text-zinc-400 text-[10px] rounded font-medium">
                Duration: {info?.duration ?? '—'}
              </span>
              <span className="px-2.5 py-0.5 bg-white/[0.02] border border-white/[0.06] text-zinc-400 text-[10px] rounded font-medium">
                Level: {info?.level ?? '—'}
              </span>
              <span className="px-2.5 py-0.5 bg-white/[0.02] border border-white/[0.06] text-zinc-400 text-[10px] rounded font-medium">
                Syllabus: {info?.modules ?? '—'}
              </span>
            </div>

            <div className="pt-2 flex gap-3 justify-center lg:justify-start">
              <Link
                href="/dashboard/courses"
                className="h-9 px-4 bg-white text-black hover:bg-zinc-200 rounded-lg font-semibold text-xs transition inline-flex items-center gap-1.5"
              >
                Continue Learning
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/dashboard/roadmaps"
                className="h-9 px-4 bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.08] rounded-lg font-semibold text-xs transition inline-flex items-center gap-1.5"
              >
                View Roadmap
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Symmetrical Mini Ring chart */}
          <div className="flex-shrink-0 relative w-32 h-32 flex items-center justify-center">
            <svg width={120} height={120} className="transform -rotate-90">
              <circle
                cx={60}
                cy={60}
                r={radius}
                className="stroke-white/[0.02]"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <motion.circle
                cx={60}
                cy={60}
                r={radius}
                className="stroke-indigo-500"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute text-center">
              <p className="text-xl font-semibold text-white leading-none">
                {progressPercent}%
              </p>
              <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider mt-1">
                Complete
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Modules Finished', value: modulesDoneStr, trend: '+2 since yesterday', icon: Trophy },
          { label: 'Daily Streak', value: streak, trend: 'Keep it going', icon: Flame },
        ].map((item, idx) => {
          const IconComp = item.icon
          return (
            <div key={idx} className="bg-[#0c0c0f] border border-white/[0.06] rounded-xl p-5 transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{item.label}</span>
                <IconComp size={14} className="text-zinc-500" />
              </div>
              <p className="text-2xl font-semibold text-white mt-3">{item.value}</p>
              <p className="text-[10px] text-zinc-600 mt-1 font-medium">{item.trend}</p>
            </div>
          )
        })}
      </div>


    </div>
  )
}
