'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  LayoutGrid,
  BookOpen,
  Map,
  Compass,
  Bot,
  Wrench,
  Users,
  MessageSquare,
  FolderOpen,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Zap,
} from 'lucide-react'

interface Feature {
  id: string
  icon: React.ElementType
  title: string
  badge: string
  category: 'core' | 'ai' | 'community'
  description: string
  details: string[]
  href: string
  external?: boolean
  accent: 'indigo' | 'purple' | 'emerald' | 'cyan'
}

const dashboardFeatures: Feature[] = [
  {
    id: 'roadmaps',
    icon: Map,
    title: 'Career Roadmaps',
    badge: '30+ Specialized Paths',
    category: 'core',
    description: 'Structured, step-by-step learning paths for Full Stack, AI & ML, Cloud, Cybersecurity, DevOps, and Data Science.',
    details: ['Milestone-based progression', 'Industry-vetted curricula', 'Target completion dates'],
    href: '/dashboard/roadmaps',
    accent: 'indigo',
  },
  {
    id: 'ai-mentor',
    icon: Bot,
    title: 'AI Mentor Studio',
    badge: '24/7 AI Assistant',
    category: 'ai',
    description: 'Instant coding assistance, automated code reviews, step-by-step problem debugging, and interview prep.',
    details: ['Real-time code feedback', 'Interactive mock interviews', 'Instant query resolution'],
    href: 'https://ai-mentor-studio-v2-1.onrender.com/',
    external: true,
    accent: 'purple',
  },
  {
    id: 'courses',
    icon: BookOpen,
    title: 'Interactive Courses',
    badge: 'Hands-On Learning',
    category: 'core',
    description: 'Deep-dive video lessons, interactive coding challenges, real-world mini projects, and downloadable guides.',
    details: ['Bite-sized modules', 'Practice exercises', 'Verified certifications'],
    href: '/dashboard/courses',
    accent: 'cyan',
  },
  {
    id: 'planner',
    icon: Compass,
    title: 'Roadmap Planner',
    badge: 'Custom Timeline',
    category: 'core',
    description: 'Customize engineering skill paths, set personal learning goals, and adapt roadmaps to your own pace.',
    details: ['Dynamic goal tracking', 'Skill gap analysis', 'Adaptive pacing'],
    href: 'https://roadmap-nine-zeta.vercel.app/careers',
    external: true,
    accent: 'indigo',
  },
  {
    id: 'toolz',
    icon: Wrench,
    title: 'Toolz Studio',
    badge: 'Developer Toolkit',
    category: 'ai',
    description: 'Essential developer tools in one place: code formatters, regex testers, JSON parsers, and system design calculators.',
    details: ['Fast web utilities', 'Zero-setup developer tools', 'Productivity boosters'],
    href: 'https://toolz-studio-nine.vercel.app/',
    external: true,
    accent: 'purple',
  },
  {
    id: 'mentorship',
    icon: Users,
    title: '1-on-1 Mentorship',
    badge: 'Senior Engineers',
    category: 'community',
    description: 'Book private sessions with engineers from Google, Meta, and Microsoft for 1-on-1 guidance, resume reviews, and advice.',
    details: ['Live mock interviews', 'Direct portfolio reviews', 'Career strategy sessions'],
    href: '/dashboard/mentorship',
    accent: 'emerald',
  },
  {
    id: 'community',
    icon: MessageSquare,
    title: 'Developer Community',
    badge: 'Peer Network',
    category: 'community',
    description: 'Connect with driven learners, participate in hackathons, share project builds, and join active study groups.',
    details: ['Project showcase channel', 'Collaborative study rooms', 'Active discussion forums'],
    href: '/dashboard/community',
    accent: 'cyan',
  },
  {
    id: 'resources',
    icon: FolderOpen,
    title: 'Curated Resource Hub',
    badge: 'Zero-Noise Library',
    category: 'core',
    description: 'Handpicked, noise-free learning resources from top textbooks, NPTEL archives, GitHub repositories, and cheat sheets.',
    details: ['Verified quality links', 'Free downloadable assets', 'Regularly updated content'],
    href: '/dashboard/resources',
    accent: 'indigo',
  },
  {
    id: 'overview',
    icon: LayoutGrid,
    title: 'Overview & Telemetry',
    badge: 'Live Analytics',
    category: 'core',
    description: 'Track overall streak progress, skill index radar, module completions, and real-time hiring readiness scores.',
    details: ['Learning streak tracker', 'Skill readiness radar', 'Placement index'],
    href: '/dashboard',
    accent: 'emerald',
  },
]

const categories = [
  { id: 'all', label: 'All Features' },
  { id: 'core', label: 'Core Learning' },
  { id: 'ai', label: 'AI & Developer Tools' },
  { id: 'community', label: 'Mentorship & Community' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
}

export function DashboardFeatures() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredFeatures = activeCategory === 'all'
    ? dashboardFeatures
    : dashboardFeatures.filter(f => f.category === activeCategory)

  return (
    <section id="features" className="py-28 px-6 sm:px-8 lg:px-12 bg-[#09090b] overflow-hidden relative border-b border-white/[0.04]">
      {/* Background Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/[0.025] blur-[140px] pointer-events-none rounded-full z-0" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/[0.02] blur-[140px] pointer-events-none rounded-full z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-indigo-400 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-2">
            <Sparkles size={12} className="text-indigo-400" />
            Dashboard Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Everything Inside Your Dashboard
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Explore the powerful tools, structured roadmaps, AI assistance, and mentorship features built directly into your student portal.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-[#121216] text-zinc-400 hover:text-white border border-white/[0.06] hover:border-white/[0.12]'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredFeatures.map((feature) => {
            const Icon = feature.icon

            const accentStyles = {
              indigo: {
                border: 'group-hover:border-indigo-500/30',
                iconBg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
                glow: 'bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.04)_0%,transparent_70%)]',
                badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
              },
              purple: {
                border: 'group-hover:border-purple-500/30',
                iconBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
                glow: 'bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.04)_0%,transparent_70%)]',
                badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
              },
              emerald: {
                border: 'group-hover:border-emerald-500/30',
                iconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
                glow: 'bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04)_0%,transparent_70%)]',
                badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
              },
              cyan: {
                border: 'group-hover:border-cyan-500/30',
                iconBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
                glow: 'bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.04)_0%,transparent_70%)]',
                badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
              },
            }[feature.accent]

            const CardWrapper = feature.external ? 'a' : Link

            return (
              <motion.div key={feature.id} variants={cardVariants}>
                <CardWrapper
                  href={feature.href}
                  {...(feature.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`block bg-[#0b0b0e] border border-white/[0.05] ${accentStyles.border} rounded-xl p-6 transition-all duration-300 group relative overflow-hidden h-full flex flex-col justify-between`}
                >
                  {/* Subtle Radial Glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${accentStyles.glow}`} />

                  <div>
                    {/* Header: Icon & Badge */}
                    <div className="flex items-center justify-between mb-5 relative z-10">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${accentStyles.iconBg}`}>
                        <Icon size={18} />
                      </div>
                      <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${accentStyles.badge}`}>
                        {feature.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base font-semibold text-white mb-2 group-hover:text-indigo-200 transition-colors duration-200 relative z-10 flex items-center gap-1.5">
                      {feature.title}
                      {feature.external && <ExternalLink size={12} className="text-zinc-500 group-hover:text-indigo-300" />}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-5 relative z-10">
                      {feature.description}
                    </p>

                    {/* Feature Details List */}
                    <div className="space-y-1.5 mb-6 relative z-10 border-t border-white/[0.04] pt-4">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-zinc-400">
                          <CheckCircle2 size={11} className="text-indigo-400/70 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Link Action */}
                  <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-medium text-zinc-400 group-hover:text-white transition-colors relative z-10">
                    <span>{feature.external ? 'Launch Tool' : 'Access in Dashboard'}</span>
                    <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1 text-indigo-400" />
                  </div>
                </CardWrapper>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
