'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, Code2, CheckCircle2, Bookmark, ExternalLink, Shield, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react'
import { Logo } from '@/components/logo'

const modulesData: Record<string, { title: string; duration: string; resourcesCount: number; projectsCount: number; description: string; overview: string[]; resources: { title: string; type: 'video' | 'article' | 'docs' | 'tool'; url: string; time: string }[]; practice: string[]; assignments: string[]; projects: string[]; notes: string }> = {
  '1': {
    title: 'Start Your AI Journey (Week 1)',
    duration: '5 days',
    resourcesCount: 3,
    projectsCount: 1,
    description: 'Introduction to Artificial Intelligence, its history, domains, and ethical implications.',
    overview: [
      'Understand the definition of intelligence and how human intelligence compares to machine intelligence.',
      'Explore the history of AI, including the Turing Test and major milestones.',
      'Identify three core domains of AI: Data Science, Computer Vision, and Natural Language Processing.',
      'Examine the importance of ethics in AI (privacy, bias, and automated decision-making).',
    ],
    resources: [
      { title: 'CBSE Class 9 AI Curriculum Reference Guide', type: 'docs', url: 'https://cbseacademic.nic.in', time: '15 mins' },
      { title: 'Introduction to AI Domains (CV, NLP, Data Science)', type: 'video', url: 'https://youtube.com', time: '20 mins' },
      { title: 'Ethics in AI: Bias & Fairness Tutorial', type: 'article', url: 'https://scikit-learn.org', time: '10 mins' },
    ],
    practice: [
      'Identify five AI-powered devices you use daily and classify them into CV, NLP, or Data Science.',
      'Evaluate a sample chat script for signs of machine bias or stereotypical training data.',
    ],
    assignments: [
      'Write a 1-page summary explaining the difference between Narrow/Weak AI and General/Strong AI.',
    ],
    projects: [
      'AI Domain Classifier: Categorize modern applications like FaceID, search recommendation, and virtual assistants.',
    ],
    notes: 'Keep the CBSE definitions clear and concise. Pay special attention to the difference between human intelligence and AI.',
  },
  '2': {
    title: 'AI Project Cycle (Week 2)',
    duration: '5 days',
    resourcesCount: 2,
    projectsCount: 1,
    description: 'Understand the framework of developing an AI system from framing the problem to evaluating the model.',
    overview: [
      'Learn the 5 stages of the AI Project Cycle: Problem Framing, Data Acquisition, Data Exploration, Modeling, and Evaluation.',
      'Apply the 4Ws Problem Canvas (Who, What, Where, Why) to structure system requirements.',
      'Explore the concepts of model testing, dataset splitting, and system deployment.',
    ],
    resources: [
      { title: 'Problem Framing with the 4Ws Canvas Guide', type: 'article', url: 'https://cbseacademic.nic.in', time: '12 mins' },
      { title: 'Understanding the 5 Stages of AI Projects', type: 'video', url: 'https://youtube.com', time: '25 mins' },
    ],
    practice: [
      'Define a 4Ws Canvas for a automated school attendance scanner.',
      'List possible data sources you would use to train a waste management classification model.',
    ],
    assignments: [
      'Draft a project proposal outlining the project cycle for a home energy-saving helper.',
    ],
    projects: [
      'Recycler Project Scope: Create a complete project proposal canvas detailing the Who, What, Where, and Why.',
    ],
    notes: 'Remember, the project cycle is iterative. If evaluation fails, you must go back to earlier steps.',
  },
  '3': {
    title: 'Understand Data (Week 3)',
    duration: '5 days',
    resourcesCount: 2,
    projectsCount: 1,
    description: 'Learn how to collect, clean, and visualize data, which is the foundational fuel for any machine learning model.',
    overview: [
      'Understand the differences between structured, semi-structured, and unstructured data.',
      'Master data cleaning techniques, including handling missing values, duplicates, and outliers.',
      'Learn standard visual charting strategies (bar charts, line graphs, scatter plots) to gain insights.',
    ],
    resources: [
      { title: 'Structured vs Unstructured Data Formats Explained', type: 'article', url: 'https://scikit-learn.org', time: '15 mins' },
      { title: 'Introduction to Data Cleaning Tools', type: 'docs', url: 'https://pandas.pydata.org', time: '20 mins' },
    ],
    practice: [
      'Clean a mock table with blank cell values and duplicate rows.',
      'Map daily sales numbers into a structured database format.',
    ],
    assignments: [
      'Identify three insights from a sample dataset of global temperatures using data visualization principles.',
    ],
    projects: [
      'School Performance Dashboard: Construct visual charts summarizing class scores using clean datasets.',
    ],
    notes: 'Garbage in, garbage out! If your training data is dirty, your AI model will make bad decisions.',
  },
  '4': {
    title: 'Math for AI (Week 4)',
    duration: '5 days',
    resourcesCount: 2,
    projectsCount: 1,
    description: 'Explore the key mathematical concepts that power machine learning models, focused on statistics and probability.',
    overview: [
      'Understand statistical metrics: Mean, Median, Mode, and Range.',
      'Learn basic probability rules and how they determine predictive confidence levels.',
      'Build a conceptual foundation of matrices, vectors, and coordinates in multidimensional space.',
    ],
    resources: [
      { title: 'Statistics and Probability Basics for Beginners', type: 'video', url: 'https://youtube.com', time: '30 mins' },
      { title: 'Matrices and Vector Space Visual Intuition', type: 'article', url: 'https://scikit-learn.org', time: '15 mins' },
    ],
    practice: [
      'Calculate the mean, median, and mode for a list of school exam scores.',
      'Represent a 3x3 layout as a numerical grid matrix.',
    ],
    assignments: [
      'Explain how probability theory is used by weather bots to predict rain percentages.',
    ],
    projects: [
      'Matrix Grid Mapper: Transform coordinates from a grid system into coordinate vector formats.',
    ],
    notes: 'Focus on building mathematical intuition. You do not need to memorize complex calculus equations for Class 9.',
  },
  '5': {
    title: 'Discover Gen AI (Week 5)',
    duration: '5 days',
    resourcesCount: 2,
    projectsCount: 1,
    description: 'Dive into the world of Large Language Models (LLMs), image generators, and prompt engineering.',
    overview: [
      'Understand how Generative AI differs from analytical or classification AI systems.',
      'Explore how transformers and Large Language Models predict words sequentially.',
      'Master prompt engineering structures (role prompting, zero-shot and few-shot examples).',
    ],
    resources: [
      { title: 'Introduction to Large Language Models (LLMs)', type: 'video', url: 'https://youtube.com', time: '22 mins' },
      { title: 'Prompt Engineering Guide: Core Structures', type: 'docs', url: 'https://cbseacademic.nic.in', time: '15 mins' },
    ],
    practice: [
      'Write a prompt that instructs an LLM to explain gravity to a 5-year-old vs. a physics major.',
      'Analyze text generations for signs of factual hallucinations.',
    ],
    assignments: [
      'Draft a detailed prompt role configuration to build a virtual history guide bot.',
    ],
    projects: [
      'Virtual Persona Assistant: Create prompt blueprints that customize a chatbot into a specific persona.',
    ],
    notes: 'Generative AI is a helpful tool, but always double-check facts as models can hallucinate.',
  },
  '6': {
    title: 'Python Fundamentals (Week 6)',
    duration: '5 days',
    resourcesCount: 2,
    projectsCount: 1,
    description: 'Learn the basics of Python programming, the official programming language of Artificial Intelligence.',
    overview: [
      'Install Python environments and set up basic syntax structures.',
      'Learn about variables, comments, and standard data types (Integers, Floats, Strings, Booleans).',
      'Master input/output commands and standard mathematical operations in code.',
    ],
    resources: [
      { title: 'Setting Up Python and Writing Your First Script', type: 'docs', url: 'https://python.org', time: '10 mins' },
      { title: 'Python Variables & Arithmetic Operators Tutorial', type: 'video', url: 'https://youtube.com', time: '25 mins' },
    ],
    practice: [
      'Write a Python script that asks for a user name and score, then prints them in a formatted message.',
      'Calculate the area of a circle using Python variables.',
    ],
    assignments: [
      'Write a Python script that computes simple interest from principal, rate, and time inputs.',
    ],
    projects: [
      'Command-Line Calculator: Create a terminal script that performs basic calculations based on user input values.',
    ],
    notes: 'Python is case-sensitive! Check your variables capitalization and spelling to avoid errors.',
  },
  '7': {
    title: 'Logic & Loops (Week 7)',
    duration: '5 days',
    resourcesCount: 2,
    projectsCount: 1,
    description: 'Implement control structures, conditional branches, loops, and list collections in Python.',
    overview: [
      'Master conditional logic using if, elif, and else statements.',
      'Repeat actions efficiently using for loops and while loops.',
      'Understand collection lists and basic dictionary structures to manage records.',
    ],
    resources: [
      { title: 'Control Flow: Conditionals and Loops in Python', type: 'video', url: 'https://youtube.com', time: '30 mins' },
      { title: 'Working with Python Lists & Collections', type: 'article', url: 'https://realpython.com', time: '20 mins' },
    ],
    practice: [
      'Write a Python program that checks if a student score is pass or fail.',
      'Loop through a list of items and print only the items starting with a specific letter.',
    ],
    assignments: [
      'Build a basic number-guessing script with limit counters and loops.',
    ],
    projects: [
      'Keyword Chatbot: Construct a Python script that parses user message text and replies with matching responses.',
    ],
    notes: 'In Python, indentation defines code blocks. Ensure you indent by exactly 4 spaces inside loops and conditional statements.',
  },
  '8': {
    title: 'Lists, Projects & Exam Prep (Week 8)',
    duration: '5 days',
    resourcesCount: 2,
    projectsCount: 1,
    description: 'Review your complete curriculum, finalize your capstone portfolio, and practice mock board exam papers.',
    overview: [
      'Consolidate all knowledge on domains, project cycle stages, ethics, and coding parameters.',
      'Debug, clean, and organize all previous mini-projects into a final portfolio.',
      'Attempt sample CBSE Class 9 AI theory questions and mock test layouts.',
    ],
    resources: [
      { title: 'CBSE Class 9 AI Syllabus Complete Revision Guide', type: 'docs', url: 'https://cbseacademic.nic.in', time: '40 mins' },
      { title: 'Theory Question Bank & Model Mock Exam Papers', type: 'article', url: 'https://cbseacademic.nic.in', time: '30 mins' },
    ],
    practice: [
      'Solve five mock theory questions regarding the 4Ws problem framing canvas.',
      'Refactor a Python project script to add helpful comments and follow clean practices.',
    ],
    assignments: [
      'Complete a full 50-mark mock theory exam sheet under timed conditions.',
    ],
    projects: [
      'Final Capstone Portfolio: Compile and submit a summary document of all Class 9 AI code assets and projects.',
    ],
    notes: 'Double check the 5 stages of the project cycle and lists syntax before your exam. Best of luck!',
  },
}

export default function ModuleLearningPage() {
  const params = useParams()
  const router = useRouter()
  const id = (params?.id as string) || '4'
  const moduleData = modulesData[id] || modulesData['4']

  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'practice' | 'assignments' | 'projects' | 'notes'>('overview')
  const [completed, setCompleted] = useState(false)
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({})
  const [viewedResources, setViewedResources] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const fetchModuleStatus = async () => {
      try {
        const res = await fetch(`/api/modules/${id}`)
        if (res.ok) {
          const data = await res.json()
          if (data.success) {
            setCompleted(data.completed)
            // Auto-complete if not already completed
            if (!data.completed) {
              fetch(`/api/modules/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ complete: true }),
              }).then(() => setCompleted(true)).catch(console.error)
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch module status:', err)
      }
    }
    fetchModuleStatus()
  }, [id])

  const toggleComplete = async () => {
    const targetState = !completed
    setCompleted(targetState)
    try {
      const res = await fetch(`/api/modules/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complete: targetState }),
      })
      if (!res.ok) {
        setCompleted(!targetState)
      }
    } catch (err) {
      console.error('Failed to toggle module status:', err)
      setCompleted(!targetState)
    }
  }

  const toggleBookmark = (resIdx: number) => {
    setBookmarked((prev) => ({
      ...prev,
      [resIdx]: !prev[resIdx],
    }))
  }

  const markViewed = (resIdx: number) => {
    setViewedResources((prev) => ({
      ...prev,
      [resIdx]: true,
    }))
  }

  const navigateToModule = (targetId: number) => {
    router.push(`/dashboard/module/${targetId}`)
  }

  const prevId = parseInt(id) > 1 ? parseInt(id) - 1 : null
  const nextId = parseInt(id) < 8 ? parseInt(id) + 1 : null

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-28 animate-in select-none">
      {/* Back to Roadmap breadcrumb */}
      <Link
        href="/dashboard/roadmaps"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-bright hover:text-brand-glow transition"
      >
        <ArrowLeft size={14} />
        Back to Roadmap
      </Link>

      {/* Module Hero Section */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-primary/5 rounded-full blur-[60px] pointer-events-none" />
        
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-brand-bright uppercase tracking-wider bg-brand-primary/10 border border-brand-primary/20 rounded px-2.5 py-0.5">
              Module {id.padStart(2, '0')}
            </span>
            <span className="text-text-muted text-xs font-semibold">• {moduleData.duration} total</span>
          </div>
          
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
            {moduleData.title}
          </h1>
          <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
            {moduleData.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-1">
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-semibold">
              <Clock size={14} className="text-text-muted" />
              <span>{moduleData.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-semibold">
              <BookOpen size={14} className="text-text-muted" />
              <span>{moduleData.resourcesCount} resources</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-semibold">
              <Code2 size={14} className="text-text-muted" />
              <span>{moduleData.projectsCount} portfolio builds</span>
            </div>
          </div>
        </div>

        <button
          onClick={toggleComplete}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 self-stretch md:self-auto justify-center focus:outline-none focus:ring-4 ${
            completed
              ? 'bg-accent-green/10 border-accent-green/20 text-accent-green hover:bg-accent-green/25 focus:ring-accent-green/15'
              : 'bg-brand-primary border-brand-primary text-white hover:bg-brand-glow focus:ring-brand-primary/20 shadow-lg shadow-brand-primary/25'
          }`}
          aria-label={completed ? 'Module completed' : 'Mark module complete'}
        >
          <CheckCircle2 size={16} className={completed ? 'text-accent-green fill-none' : ''} />
          {completed ? 'Completed' : 'Mark as Complete'}
        </button>
      </div>

      {/* Module Content */}
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-xl min-h-[600px] flex">
        <iframe
          src={`/ai-course/week${id}_ai_posters.html`}
          className="w-full h-[800px] border-none bg-white"
          title={`Week ${id} Content`}
        />
      </div>

      {/* Sticky bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-deep/95 backdrop-blur-md border-t border-white/5 py-4 px-4 sm:px-6 z-30 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {prevId ? (
            <button
              onClick={() => navigateToModule(prevId)}
              className="px-4 py-2 border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] rounded-xl text-xs font-bold text-text-secondary hover:text-white transition duration-200 inline-flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Previous Module
            </button>
          ) : (
            <div />
          )}

          {nextId ? (
            <button
              onClick={() => navigateToModule(nextId)}
              className="px-5 py-2 bg-brand-primary hover:bg-brand-glow text-white rounded-xl text-xs font-bold transition duration-200 inline-flex items-center gap-1 shadow-lg shadow-brand-primary/20 active:scale-[0.98]"
            >
              Next Module
              <ChevronRight size={16} />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-bold text-accent-amber bg-accent-amber/10 border border-accent-amber/25 px-3.5 py-1.5 rounded-xl">
              <Shield size={14} />
              Completed
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
