'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Compass, BarChart2, Code2, Video, Trophy, Award, ChevronRight, Check } from 'lucide-react'

// --- HELPER SUB-COMPONENTS FOR HIGH-FIDELITY SHOWCASE PANELS ---

interface PathwayCardProps {
  name: string
  desc: string
  tags: string[]
  stats: string
  isActive?: boolean
}

function PathwayCard({ name, desc, tags, stats, isActive = false }: PathwayCardProps) {
  return (
    <div
      className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden ${
        isActive
          ? 'bg-[#0f0f13] border-indigo-500/30 shadow-xl'
          : 'bg-[#0b0b0e] border-white/[0.04] hover:border-white/[0.08]'
      }`}
    >
      {isActive && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.03)_0%,transparent_60%)]" />
      )}
      <div className="flex justify-between items-start relative z-10">
        <h4 className="text-xs font-semibold text-white tracking-wide">{name}</h4>
        {isActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
        )}
      </div>
      <p className="text-[10px] text-zinc-400 mt-1.5 leading-relaxed relative z-10">{desc}</p>
      <div className="flex flex-wrap gap-1 mt-3 relative z-10">
        {tags.map((tag) => (
          <span key={tag} className="text-[8px] bg-zinc-950 text-zinc-500 px-1.5 py-0.5 rounded border border-white/[0.04]">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-3.5 flex justify-between items-center text-[9px] text-zinc-500 font-mono relative z-10">
        <span>{stats}</span>
        <span className={isActive ? 'text-indigo-400' : 'text-zinc-600'}>Select →</span>
      </div>
    </div>
  )
}

export function StepRoadmapShowcase() {
  const cards = [
    {
      name: 'AI Research Engineer',
      desc: 'Master deep learning systems, PyTorch, core transformers, and custom kernel optimization.',
      tags: ['PyTorch', 'Transformers', 'CUDA', 'GPUs'],
      stats: 'Salary Index: $140k+',
      isActive: true
    },
    {
      name: 'MLOps Architect',
      desc: 'Build high-performance distributed training, inference servers, and CI/CD pipelines.',
      tags: ['Kubeflow', 'Triton', 'Docker', 'GCP'],
      stats: 'Salary Index: $155k+'
    },
    {
      name: 'NLP & LLM Specialist',
      desc: 'Focus on Vector databases, fine-tuning LLMs, Retrieval Augmented Generation, and agents.',
      tags: ['LangChain', 'VectorDBs', 'Fine-tuning', 'RAG'],
      stats: 'Salary Index: $135k+'
    },
    {
      name: 'CV & Robotics Developer',
      desc: 'Implement real-time object tracking, neural graphics models, and OpenCV workloads.',
      tags: ['YOLO', 'TensorRT', 'OpenCV', 'ROS'],
      stats: 'Salary Index: $125k+'
    }
  ]

  return (
    <div className="space-y-4 w-full h-full flex flex-col justify-center">
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Stage 1 · Choose Pathway</h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">Select a tailored industry curriculum designed by staff engineers</p>
        </div>
        <span className="text-[9px] text-zinc-500 bg-white/[0.02] border border-white/[0.06] px-2 py-0.5 rounded font-mono">
          30+ Pathways
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {cards.map((c, i) => (
          <PathwayCard key={i} {...c} />
        ))}
      </div>
    </div>
  )
}

interface ModuleRowProps {
  label: string
  status: 'completed' | 'active' | 'locked'
}

function ModuleRow({ label, status }: ModuleRowProps) {
  return (
    <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[10px] border transition-colors ${
      status === 'active'
        ? 'bg-indigo-500/5 border-indigo-500/20 text-indigo-300 font-medium'
        : status === 'completed'
          ? 'bg-zinc-950/20 border-white/[0.04] text-zinc-400'
          : 'bg-zinc-950/40 border-transparent text-zinc-600'
    }`}>
      {status === 'completed' ? (
        <div className="w-3.5 h-3.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 text-[8px]">✓</div>
      ) : status === 'active' ? (
        <div className="w-3.5 h-3.5 rounded-full border border-indigo-500/50 bg-zinc-950 flex items-center justify-center shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.5)]" />
        </div>
      ) : (
        <div className="w-3.5 h-3.5 rounded-full border border-white/[0.02] bg-zinc-950 flex items-center justify-center shrink-0 text-[8px] opacity-40">🔒</div>
      )}
      <span className={status === 'completed' ? 'line-through opacity-50' : ''}>{label}</span>
    </div>
  )
}

export function StepProgressShowcase() {
  return (
    <div className="w-full h-full flex flex-col justify-center space-y-4">
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Stage 2 · Track Progress</h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">Real-time telemetry of your skills and milestone completions</p>
        </div>
        <span className="text-[9px] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">
          Telemetry Active
        </span>
      </div>

      <div className="grid grid-cols-12 gap-4 items-stretch">
        <div className="col-span-5 bg-[#0b0b0e] border border-white/[0.04] rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="34" className="stroke-zinc-900" strokeWidth="5.5" fill="transparent" />
              <circle
                cx="40" cy="40" r="34"
                className="stroke-indigo-500 transition-all duration-300"
                strokeWidth="5.5"
                fill="transparent"
                strokeDasharray="213.6"
                strokeDashoffset={213.6 - (68 / 100) * 213.6}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-sm font-semibold text-white">68%</span>
              <span className="text-[7px] text-zinc-500 uppercase tracking-widest font-bold">Progress</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[9px] text-zinc-300 font-medium bg-zinc-950 px-2 rounded border border-white/[0.04]">
            <span>Streak: 15 Days</span>
          </div>
        </div>

        <div className="col-span-7 bg-[#0b0b0e] border border-white/[0.04] rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">Curriculum Flow</span>
          <div className="space-y-1.5">
            <ModuleRow label="Linear Algebra & Calculus" status="completed" />
            <ModuleRow label="Python Scripting for ML" status="completed" />
            <ModuleRow label="Attention Mechanism & Transformers" status="active" />
            <ModuleRow label="Distributed Model Scale" status="locked" />
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProjectCardProps {
  title: string
  status: string
  statusColor: string
  metrics: { label: string; val: string }[]
  desc: string
}

function ProjectCard({ title, status, statusColor, metrics, desc }: ProjectCardProps) {
  return (
    <div className="p-4 bg-[#0b0b0e] border border-white/[0.04] rounded-xl flex flex-col justify-between hover:border-white/[0.08] transition-all duration-200">
      <div className="space-y-2">
        <div className="flex justify-between items-start gap-2">
          <h4 className="text-[11px] font-semibold text-white leading-snug line-clamp-2">{title}</h4>
          <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${statusColor}`}>
            {status}
          </span>
        </div>
        <p className="text-[10px] text-zinc-400 leading-relaxed line-clamp-2">{desc}</p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-white/[0.04] grid grid-cols-3 gap-2 text-center bg-zinc-950/20 rounded-lg p-1.5">
        {metrics.map((m, i) => (
          <div key={i} className="space-y-0.5">
            <span className="text-[7px] text-zinc-500 font-medium uppercase tracking-wider block">{m.label}</span>
            <span className="text-[9px] text-white font-semibold font-mono">{m.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function StepProjectsShowcase() {
  const projects = [
    {
      title: 'LLM RAG Chatbot over API Documentation',
      status: 'DEPLOYED',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      metrics: [
        { label: 'Relevance', val: '94.2%' },
        { label: 'Latency', val: '124ms' },
        { label: 'Tests', val: '8/8 Pass' }
      ],
      desc: 'Retrieval Augmented Generation pipeline connected to Pinecone, parsing docs with LangChain.'
    },
    {
      title: 'Realtime Video Segmentation Web Service',
      status: 'COMPLETED',
      statusColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      metrics: [
        { label: 'Accuracy', val: '92.0% mAP' },
        { label: 'Throughput', val: '62 FPS' },
        { label: 'Tests', val: '12/12 Pass' }
      ],
      desc: 'Quantized with TensorRT for high-throughput distributed GPU inference.'
    }
  ]

  return (
    <div className="w-full h-full flex flex-col justify-center space-y-4">
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Stage 3 · Build Portfolio</h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">Solve live production-grade scenarios validated by test suites</p>
        </div>
        <span className="text-[9px] text-zinc-500 bg-white/[0.02] border border-white/[0.06] px-2 py-0.5 rounded font-mono">
          Sandbox Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {projects.map((proj, idx) => (
          <ProjectCard key={idx} {...proj} />
        ))}
      </div>
    </div>
  )
}

export function StepInterviewsShowcase() {
  return (
    <div className="w-full h-full flex flex-col justify-center space-y-4">
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Stage 4 · Mock Interviews</h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">Practice live technical mock interviews with staff engineers</p>
        </div>
        <span className="text-[9px] text-zinc-500 bg-white/[0.02] border border-white/[0.06] px-2 py-0.5 rounded font-mono">
          Mock active
        </span>
      </div>

      <div className="grid grid-cols-12 gap-4 items-stretch">
        <div className="col-span-5 bg-[#0b0b0e] border border-white/[0.04] rounded-xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[190px]">
          <div className="w-12 h-12 rounded-full bg-indigo-950/40 border border-indigo-500/25 flex items-center justify-center text-indigo-400 text-xs font-semibold z-10">
            SC
          </div>
          <div className="mt-3 z-10">
            <h4 className="text-xs font-semibold text-white">Sarah Chen</h4>
            <p className="text-[9px] text-zinc-500 mt-0.5">Staff AI Scientist @ Meta</p>
          </div>
        </div>

        <div className="col-span-7 bg-[#0b0b0e] border border-white/[0.04] rounded-xl p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-[7px] font-semibold text-indigo-400 uppercase tracking-widest font-mono">Interviewer Dialogue</span>
              <p className="text-[10px] text-zinc-300 italic leading-relaxed bg-zinc-950/60 p-2 rounded border border-white/[0.02]">
                "Explain why we normalize activation values after self-attention blocks in transformer models."
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[7px] font-semibold text-zinc-500 uppercase tracking-widest font-mono">Candidate Telemetry</span>
              <p className="text-[10px] text-zinc-400 leading-relaxed line-clamp-2">
                "Layer normalization prevents internal covariate shift and stabilizes training dynamics..."
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex justify-between items-center text-[9px]">
            <div className="flex gap-3">
              <div>
                <span className="text-zinc-500 uppercase tracking-wider block text-[7px] font-medium font-mono">Coding</span>
                <span className="text-white font-semibold">9.6/10</span>
              </div>
              <div>
                <span className="text-zinc-500 uppercase tracking-wider block text-[7px] font-medium font-mono">Systems</span>
                <span className="text-white font-semibold">9.2/10</span>
              </div>
            </div>
            <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/25 font-bold uppercase text-[7px]">
              Strong Hire
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface OfferCardProps {
  company: string
  role: string
  match: string
  status: string
  statusColor: string
}

function OfferCard({ company, role, match, status, statusColor }: OfferCardProps) {
  return (
    <div className="p-4 bg-[#0b0b0e] border border-white/[0.04] rounded-xl text-left space-y-2 relative group hover:border-white/[0.08] transition-all duration-200">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-white">{company}</span>
        <span className="text-[8px] font-mono bg-white/[0.02] border border-white/[0.06] text-zinc-400 px-1.5 py-0.5 rounded">
          {match}
        </span>
      </div>
      <p className="text-[10px] text-zinc-400 leading-relaxed">{role}</p>

      <div className={`text-[8px] font-bold border rounded p-1.5 text-center mt-2.5 ${statusColor}`}>
        {status}
      </div>
    </div>
  )
}

export function StepPlacementShowcase() {
  const offers = [
    {
      company: 'Google DeepMind',
      role: 'Associate AI Scientist',
      match: '98% Match',
      status: 'Offer Unlocked',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      company: 'Meta AI Research',
      role: 'Machine Learning Engineer',
      match: '96% Match',
      status: 'Interview Scheduled',
      statusColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    }
  ]

  return (
    <div className="w-full h-full flex flex-col justify-center space-y-4 text-center">
      <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-500/5 border border-emerald-500/15 mx-auto mb-1">
        <Award className="text-emerald-400" size={20} />
      </div>

      <div>
        <span className="text-[9px] font-semibold text-indigo-400 uppercase tracking-widest font-mono">Stage 5 · Placement Ready</span>
        <h3 className="text-sm font-semibold text-white mt-1">Ready for Placement</h3>
        <p className="text-[10px] text-zinc-400 mt-1 max-w-xs mx-auto leading-relaxed">
          Your skill telemetry places you in the top candidate pools.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto w-full pt-1">
        {offers.map((offer, idx) => (
          <OfferCard key={idx} {...offer} />
        ))}
      </div>

      <button className="mt-2 h-9 px-6 bg-white hover:bg-zinc-200 text-black rounded-lg font-semibold text-[11px] transition-colors w-auto self-center flex items-center gap-1 hover:cursor-pointer">
        Sign Offer Letter
        <ChevronRight size={12} />
      </button>
    </div>
  )
}

// --- MAIN PRODUCT DEMO SCROLL-PINNED EXPERIENCE ---

const demoSteps = [
  {
    id: 0,
    title: 'Choose Roadmap',
    description: 'Select from 30+ career trajectories curated by senior AI engineers. Skip the noise and follow a direct, structured path to competence.',
    icon: Compass,
  },
  {
    id: 1,
    title: 'Track Progress',
    description: 'Visualize your progress with live skill indexes and milestone tracking. Your personalized dashboard updates in real time as you complete modules.',
    icon: BarChart2,
  },
  {
    id: 2,
    title: 'Build Projects',
    description: 'Solve real-world industry tasks in our integrated workspaces. Run tests to validate your code and get automatic structural reviews.',
    icon: Code2,
  },
  {
    id: 3,
    title: 'Mock Interviews',
    description: 'Prepare for big-tech evaluations with AI-driven mock interviews, optimize your tech profile, and get detailed diagnostic feedback.',
    icon: Video,
  },
  {
    id: 4,
    title: 'Placement Ready',
    description: 'Unlock direct matchmaking pipelines with our 320+ hiring partners. Track applications, resume approvals, and interview invites.',
    icon: Trophy,
  }
]

export function ProductDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll position of the entire h-[500vh] container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // State to hold active step
  const [activeStep, setActiveStep] = useState(0)

  // Map scroll progress to active step index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 5 steps, so we map latest (0 to 1) into index 0 to 4
    const step = Math.min(Math.floor(latest * 5), 4)
    setActiveStep(step)
  })

  // Dynamic values for visual line highlights
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section 
      ref={containerRef} 
      id="process" 
      className="relative h-[500vh] bg-[#09090b] z-20"
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden py-12 px-6 sm:px-8 lg:px-12">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />
        
        {/* Soft atmospheric gradient glows for depth */}
        <div className="absolute top-[20%] left-1/4 w-[700px] h-[700px] bg-indigo-500/[0.015] rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-[20%] right-1/4 w-[600px] h-[600px] bg-purple-500/[0.01] rounded-full blur-[150px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Narrative storytelling & Active indicator line (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400 mb-3">
              Transformation Path
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-6">
              Your Career Journey
            </h2>
            
            {/* Scroll-tracked timeline list */}
            <div className="relative pl-8 space-y-6 py-2">
              {/* Background track line */}
              <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-white/[0.04]" />
              
              {/* Active progress filler line */}
              <motion.div 
                className="absolute left-[3px] top-2 w-[1.5px] bg-indigo-500 origin-top shadow-[0_0_10px_rgba(99,102,241,0.4)]" 
                style={{ height: fillHeight }}
              />

              {demoSteps.map((step) => {
                const isActive = activeStep === step.id
                const Icon = step.icon
                
                return (
                  <div key={step.id} className="relative group transition-all duration-300">
                    
                    {/* Circle Indicator on the line */}
                    <div className="absolute -left-[35px] top-1.5 flex items-center justify-center">
                      <div className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 flex items-center justify-center ${
                        isActive 
                          ? 'bg-indigo-500 border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' 
                          : 'bg-[#09090b] border-white/[0.08]'
                      }`}>
                        {isActive && <Check size={5} className="text-white" />}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono tracking-wider transition-colors ${
                          isActive ? 'text-indigo-400' : 'text-zinc-600'
                        }`}>
                          0{step.id + 1}
                        </span>
                        <h4 className={`text-xs font-semibold tracking-wide transition-colors ${
                          isActive ? 'text-white' : 'text-zinc-500'
                        }`}>
                          {step.title}
                        </h4>
                      </div>
                      
                      {/* Active step description transitions */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[11px] text-zinc-400 leading-relaxed mt-2.5 overflow-hidden"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Transforming Product Viewport Mockup (7 cols) */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <div className="w-full bg-[#0c0c0f]/90 backdrop-blur-md border border-white/[0.06] rounded-xl shadow-2xl relative flex flex-col min-h-[460px] p-6 justify-center overflow-hidden">
              
              {/* Soft purple radial backdrop glow inside showcase for depth */}
              <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-500/[0.025] blur-[80px] pointer-events-none rounded-full" />
              
              {/* Showcase Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06] mb-5 bg-transparent relative z-10">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                  <span className="text-[8px] text-zinc-500 ml-1.5 font-medium uppercase tracking-wider">
                    WORKSPACE TELEMETRY
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_6px_rgba(99,102,241,0.5)]" />
                  <span className="text-[8px] text-zinc-400 font-mono">Stage 0{activeStep + 1}</span>
                </div>
              </div>

              {/* Showcase Inner Body (Morphing transition container) */}
              <div className="flex-1 flex flex-col justify-center overflow-hidden relative z-10">
                <AnimatePresence mode="wait">
                  {activeStep === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      className="w-full"
                    >
                      <StepRoadmapShowcase />
                    </motion.div>
                  )}
                  {activeStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      className="w-full"
                    >
                      <StepProgressShowcase />
                    </motion.div>
                  )}
                  {activeStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      className="w-full"
                    >
                      <StepProjectsShowcase />
                    </motion.div>
                  )}
                  {activeStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      className="w-full"
                    >
                      <StepInterviewsShowcase />
                    </motion.div>
                  )}
                  {activeStep === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      className="w-full"
                    >
                      <StepPlacementShowcase />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
