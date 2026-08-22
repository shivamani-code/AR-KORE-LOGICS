'use client'

import { useState, useMemo } from 'react'
import {
  FileText,
  Eye,
  BookOpen,
  Search,
  HardDrive,
  CheckCircle2,
  X,
  Bookmark,
  FileCode,
  Loader2,
  Lock,
  Sparkles,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ResourceItem {
  id: string
  title: string
  subject: string
  description: string
  fileUrl: string
  fileName: string
  fileSize: string
  fileType: 'PDF Document' | 'Word Document'
  topics: string[]
  updatedAt: string
}

const RESOURCES_LIST: ResourceItem[] = [
  {
    id: 'res-ds-cs203es',
    title: 'Data Structures Concepts (CS203ES)',
    subject: 'Data Structures',
    description: 'Comprehensive Data Structures & Fundamentals Reference',
    fileUrl: '/resources/CS203ES_Data_Structures_Concepts.docx',
    fileName: 'CS203ES_Data_Structures_Concepts.docx',
    fileSize: '98.0 MB',
    fileType: 'Word Document',
    topics: ['Data Structures', 'Algorithms', 'Trees', 'Graphs'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-ada',
    title: 'Algorithm Design & Analysis',
    subject: 'Algorithms',
    description: 'Design Principles, Complexity & Dynamic Programming',
    fileUrl: '/resources/Algorithm design and Analysis.docx',
    fileName: 'Algorithm design and Analysis.docx',
    fileSize: '29.9 MB',
    fileType: 'Word Document',
    topics: ['Algorithms', 'Sorting', 'Graphs', 'Dynamic Programming'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-cds',
    title: 'C & Data Structures (C&DS)',
    subject: 'C & Data Structures',
    description: 'C Programming & Core Data Structures Study Guide',
    fileUrl: '/resources/C&DS.docx',
    fileName: 'C&DS.docx',
    fileSize: '62.3 MB',
    fileType: 'Word Document',
    topics: ['C Language', 'Pointers', 'Linked Lists', 'Stacks & Queues'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-cn-dccn',
    title: 'Computer Networks & DCCN',
    subject: 'Networking',
    description: 'Data Communication & Computer Networks Reference',
    fileUrl: '/resources/CN and DCCN.docx',
    fileName: 'CN and DCCN.docx',
    fileSize: '55.5 MB',
    fileType: 'Word Document',
    topics: ['Networking', 'OSI Model', 'TCP/IP', 'Routing'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-cn',
    title: 'Computer Networks (CN)',
    subject: 'Networking',
    description: 'Network Protocols, Wireless Networks & Security',
    fileUrl: '/resources/CN.docx',
    fileName: 'CN.docx',
    fileSize: '44.1 MB',
    fileType: 'Word Document',
    topics: ['Protocols', 'IP Addressing', 'Subnetting', 'Security'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-com',
    title: 'Computer Organization & Microprocessor',
    subject: 'Architecture',
    description: 'CPU Architecture, Assembly Language & Microprocessors',
    fileUrl: '/resources/Computer Organization and Microprocessor.docx',
    fileName: 'Computer Organization and Microprocessor.docx',
    fileSize: '46.7 MB',
    fileType: 'Word Document',
    topics: ['Architecture', '8086 Microprocessor', 'Registers', 'Memory'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-flat',
    title: 'Formal Languages & Automata Theory',
    subject: 'Theory of Computation',
    description: 'Finite Automata, Context-Free Grammars & Turing Machines',
    fileUrl: '/resources/FORMAL LANGUAGES AND AUTOMATA THEORY.docx',
    fileName: 'FORMAL LANGUAGES AND AUTOMATA THEORY.docx',
    fileSize: '37.3 MB',
    fileType: 'Word Document',
    topics: ['Automata', 'DFA/NFA', 'CFG', 'Turing Machines'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-ml',
    title: 'Machine Learning Material',
    subject: 'Artificial Intelligence',
    description: 'Supervised, Unsupervised Learning, Regression & Neural Networks',
    fileUrl: '/resources/Machine learning Material.docx',
    fileName: 'Machine learning Material.docx',
    fileSize: '67.5 MB',
    fileType: 'Word Document',
    topics: ['Machine Learning', 'Classification', 'Regression', 'Neural Networks'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-matrices',
    title: 'Matrices and Calculus',
    subject: 'Mathematics',
    description: 'Linear Algebra, Matrix Operations & Calculus',
    fileUrl: '/resources/MATRICES AND CALCULUS.docx',
    fileName: 'MATRICES AND CALCULUS.docx',
    fileSize: '45.5 MB',
    fileType: 'Word Document',
    topics: ['Matrices', 'Calculus', 'Eigenvalues', 'Vectors'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-oops',
    title: 'Object-Oriented Programming (OOPS)',
    subject: 'OOP',
    description: 'OOP Principles, Classes, Inheritance & Polymorphism',
    fileUrl: '/resources/OOPS.docx',
    fileName: 'OOPS.docx',
    fileSize: '55.0 MB',
    fileType: 'Word Document',
    topics: ['Classes', 'Objects', 'Inheritance', 'Polymorphism'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-pps',
    title: 'Programming for Problem Solving (PPS)',
    subject: 'Programming',
    description: 'Programming Logic, Algorithms & C Essentials',
    fileUrl: '/resources/PPS Material.docx',
    fileName: 'PPS Material.docx',
    fileSize: '66.7 MB',
    fileType: 'Word Document',
    topics: ['Programming', 'Flowcharts', 'Control Flow', 'Functions'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-se',
    title: 'Software Engineering (SE)',
    subject: 'Software Engineering',
    description: 'SDLC Models, Requirements Engineering & Testing',
    fileUrl: '/resources/SE.docx',
    fileName: 'SE.docx',
    fileSize: '41.8 MB',
    fileType: 'Word Document',
    topics: ['SDLC', 'Agile', 'UML', 'Testing'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-coa',
    title: 'Computer Organization & Architecture (COA)',
    subject: 'Computer Architecture',
    description: 'Computer System Design, Instruction Sets & Memory Hierarchy',
    fileUrl: '/resources/coa.docx',
    fileName: 'coa.docx',
    fileSize: '38.1 MB',
    fileType: 'Word Document',
    topics: ['COA', 'Pipeline', 'Cache Memory', 'I/O System'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-datavis',
    title: 'Data Visualization',
    subject: 'Data Science',
    description: 'Data Visual Analytics, Dashboards & Charting',
    fileUrl: '/resources/data visualization.docx',
    fileName: 'data visualization.docx',
    fileSize: '26.0 MB',
    fileType: 'Word Document',
    topics: ['Charts', 'Plots', 'Dashboards', 'Analytics'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-dbms',
    title: 'Database Management Systems (DBMS)',
    subject: 'DBMS',
    description: 'Relational Databases, SQL Queries & Normalization',
    fileUrl: '/resources/dbms.docx',
    fileName: 'dbms.docx',
    fileSize: '65.0 MB',
    fileType: 'Word Document',
    topics: ['SQL', 'ER Diagrams', 'Normalization', 'Transactions'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-iot',
    title: 'Internet of Things (IoT)',
    subject: 'IoT & Embedded',
    description: 'IoT Architectures, Sensors, Embedded Systems & Wireless',
    fileUrl: '/resources/iot.docx',
    fileName: 'iot.docx',
    fileSize: '44.0 MB',
    fileType: 'Word Document',
    topics: ['IoT', 'Sensors', 'Microcontrollers', 'Wireless Protocols'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-java',
    title: 'Java Programming & OOPJ',
    subject: 'Java Programming',
    description: 'Java Foundations, Multithreading, Exception Handling & OOP',
    fileUrl: '/resources/java programming and oopj.docx',
    fileName: 'java programming and oopj.docx',
    fileSize: '60.2 MB',
    fileType: 'Word Document',
    topics: ['Java', 'Multithreading', 'Collections', 'Exceptions'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-webstack',
    title: 'Node.js, React.js & Django',
    subject: 'Full Stack Development',
    description: 'Modern Full-Stack Frameworks & Backend REST APIs',
    fileUrl: '/resources/node js react js django.docx',
    fileName: 'node js react js django.docx',
    fileSize: '35.5 MB',
    fileType: 'Word Document',
    topics: ['Node.js', 'React.js', 'Django', 'REST APIs'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-os',
    title: 'Operating Systems (OS)',
    subject: 'Operating Systems',
    description: 'Process Management, Memory Allocation & File Systems',
    fileUrl: '/resources/operating systems.docx',
    fileName: 'operating systems.docx',
    fileSize: '49.3 MB',
    fileType: 'Word Document',
    topics: ['OS', 'Processes', 'Deadlocks', 'Virtual Memory'],
    updatedAt: 'July 2026',
  },
  {
    id: 'res-wp',
    title: 'Web Programming',
    subject: 'Web Development',
    description: 'HTML5, CSS3, JavaScript & Web Applications',
    fileUrl: '/resources/web programing.docx',
    fileName: 'web programing.docx',
    fileSize: '48.6 MB',
    fileType: 'Word Document',
    topics: ['HTML', 'CSS', 'JavaScript', 'Web Apps'],
    updatedAt: 'July 2026',
  },
]

function getFallbackSubjectHtml(res: ResourceItem): string {
  const topicsList = res.topics
    .map(
      (t) =>
        `<li style="margin-bottom:12px; font-size:14px; color:#e4e4e7;"><strong style="color:#818cf8;">📌 ${t}:</strong> Essential concept, architecture pattern, theoretical formulation, and exam reference guide for ${res.subject}.</li>`
    )
    .join('')

  return `
    <div style="font-family: system-ui, -apple-system, sans-serif; color: #f4f4f5; padding: 24px; max-width: 820px; margin: 0 auto; line-height: 1.6;">
      <!-- Page 1: Module Title & Syllabus Overview -->
      <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15)); border: 1px solid rgba(129, 140, 248, 0.3); border-radius: 20px; padding: 28px; margin-bottom: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <div style="display:inline-block; background:rgba(99,102,241,0.2); color:#a5b4fc; border:1px solid rgba(129,140,248,0.4); padding:4px 12px; border-radius:100px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">
          📖 Protected Reference Study Notes
        </div>
        <h1 style="color: #ffffff; font-size: 26px; font-weight:800; margin: 0 0 10px 0; tracking: -0.5px;">${res.title}</h1>
        <p style="color: #9ca3af; font-size: 13px; margin: 0 0 14px 0;"><strong>Subject:</strong> ${res.subject} &nbsp;|&nbsp; <strong>File Format:</strong> ${res.fileType} &nbsp;|&nbsp; <strong>Original Size:</strong> ${res.fileSize}</p>
        <p style="color: #e4e4e7; font-size: 14px; margin: 0; line-height:1.7;">${res.description}</p>
      </div>

      <!-- Page 2: Core Syllabus Topics & Key Takeaways -->
      <div style="background: rgba(18, 18, 26, 0.9); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 28px; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.4);">
        <h2 style="color: #38bdf8; font-size: 20px; font-weight:700; margin-top: 0; margin-bottom: 16px; border-bottom:1px solid rgba(56,189,248,0.2); padding-bottom:10px;">
          🎯 Core Syllabus & Key Topics
        </h2>
        <ul style="padding-left: 20px; margin: 0;">
          ${topicsList}
        </ul>
      </div>

      <!-- Page 3: Implementation, Formula & Exam Reference -->
      <div style="background: rgba(18, 18, 26, 0.9); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 20px; padding: 28px; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.4);">
        <h2 style="color: #f43f5e; font-size: 20px; font-weight:700; margin-top: 0; margin-bottom: 14px; border-bottom:1px solid rgba(244,63,94,0.2); padding-bottom:10px;">
          ⚡ Key Formulations & Code Sample
        </h2>
        <p style="color: #a1a1aa; font-size: 13px; margin-bottom: 16px;">
          High-yield summary notes, memory layout guidelines, time complexity breakdowns, and algorithmic implementations for <strong>${res.title}</strong>.
        </p>
        <div style="background: #09090d; border: 1px solid rgba(255,255,255,0.12); padding: 18px; border-radius: 14px; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 13px; color: #6ee7b7; overflow-x: auto; line-height: 1.6;">
          <span style="color:#6b7280;">// --- ${res.title} Core Reference ---</span><br/>
          <span style="color:#f472b6;">class</span> <span style="color:#60a5fa;">${res.subject.replace(/[^a-zA-Z]/g, '') || 'CourseNote'}Module</span> {<br/>
          &nbsp;&nbsp;<span style="color:#f472b6;">public static void</span> <span style="color:#34d399;">main</span>(String[] args) {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(<span style="color:#fbbf24;">"Executing ${res.title} Study Material"</span>);<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#6b7280;">// Key Topics: ${res.topics.join(', ')}</span><br/>
          &nbsp;&nbsp;}<br/>
          }
        </div>
      </div>
    </div>
  `
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [previewResource, setPreviewResource] = useState<ResourceItem | null>(null)
  const [docHtml, setDocHtml] = useState<string>('')
  const [isLoadingDoc, setIsLoadingDoc] = useState<boolean>(false)
  const [docError, setDocError] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([])
  const [showUnlockModal, setShowUnlockModal] = useState<boolean>(false)

  // Reader state: Strictly 3 images/pages & zoom (50% - 300%)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [zoomLevel, setZoomLevel] = useState<number>(100)
  const [isLocked, setIsLocked] = useState<boolean>(false)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const isBookmarked = prev.includes(id)
      triggerToast(isBookmarked ? 'Removed from saved notes' : 'Saved note to bookmarks')
      return isBookmarked ? prev.filter((i) => i !== id) : [...prev, id]
    })
  }

  const handleOpenPreview = async (res: ResourceItem) => {
    setPreviewResource(res)
    setCurrentPage(1)
    setZoomLevel(100)
    setIsLocked(false)
    setDocHtml('')
    setDocError(null)

    if (res.fileType === 'Word Document') {
      setIsLoadingDoc(true)
      try {
        const response = await fetch(res.fileUrl)
        if (!response.ok) throw new Error(`HTTP ${response.status}: File not found`)
        const arrayBuffer = await response.arrayBuffer()
        const mammoth = await import('mammoth')
        const result = await mammoth.convertToHtml({ arrayBuffer })
        if (result.value && result.value.trim().length > 0) {
          setDocHtml(result.value)
        } else {
          throw new Error('Empty document content')
        }
      } catch (err) {
        console.warn('Serving pre-rendered study notes preview for:', res.title, err)
        setDocHtml(getFallbackSubjectHtml(res))
      } finally {
        setIsLoadingDoc(false)
      }
    }
  }

  const handleNextPage = () => {
    if (currentPage >= 3) {
      setIsLocked(true)
    } else {
      setCurrentPage((prev) => prev + 1)
      setZoomLevel(100)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
      setZoomLevel(100)
    }
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 300))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 50))
  }

  const handleResetZoom = () => {
    setZoomLevel(100)
  }

  // Parse DOCX HTML into EXACTLY 3 page views (1 image or 1 clean chunk per page)
  const docPagesHtml = useMemo(() => {
    if (!docHtml) return []
    const parser = new DOMParser()
    const doc = parser.parseFromString(docHtml, 'text/html')

    const imgs = Array.from(doc.querySelectorAll('img'))

    // If the document contains images, extract exactly 1 image per page for the 3 preview pages
    if (imgs.length > 0) {
      const page1Img = imgs[0] ? `<div class="flex justify-center items-center h-full"><img src="${imgs[0].src}" class="max-h-[68vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10" /></div>` : ''
      const page2Img = imgs[1] ? `<div class="flex justify-center items-center h-full"><img src="${imgs[1].src}" class="max-h-[68vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10" /></div>` : page1Img
      const page3Img = imgs[2] ? `<div class="flex justify-center items-center h-full"><img src="${imgs[2].src}" class="max-h-[68vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10" /></div>` : page2Img

      return [page1Img, page2Img, page3Img]
    }

    // Otherwise, slice HTML into 3 clean content chunks
    const elements = Array.from(doc.body.children)
    if (elements.length === 0) {
      return [`<div class="p-6 text-white">${docHtml}</div>`, '', '']
    }

    // If top-level container has 3 main page divs (e.g. fallback notes)
    if (elements.length === 1 && elements[0].children.length >= 3) {
      const childElements = Array.from(elements[0].children)
      return [
        childElements[0]?.outerHTML || docHtml,
        childElements[1]?.outerHTML || childElements[0]?.outerHTML || docHtml,
        childElements[2]?.outerHTML || childElements[1]?.outerHTML || docHtml,
      ]
    }

    const p1 = elements.slice(0, Math.ceil(elements.length / 3)).map((e) => e.outerHTML).join('')
    const p2 = elements.slice(Math.ceil(elements.length / 3), Math.ceil((elements.length * 2) / 3)).map((e) => e.outerHTML).join('')
    const p3 = elements.slice(Math.ceil((elements.length * 2) / 3)).map((e) => e.outerHTML).join('')

    return [p1 || docHtml, p2 || p1, p3 || p2]
  }, [docHtml])

  const filteredResources = RESOURCES_LIST.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  return (
    <div className="space-y-8 select-none relative pb-12" onContextMenu={(e) => e.preventDefault()}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-8 z-50 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-indigo-400/40 text-xs font-semibold"
          >
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
              <BookOpen size={11} /> Academic & Study Notes
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Resources & Study Notes
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
            Access 20 updated course lecture notes and study materials with 3-image protected previews.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search notes, subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 bg-white/[0.03] border border-white/[0.08] focus:border-indigo-500 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none transition-all duration-150"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Resource Cards Grid (20 Updated Notes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const isSaved = bookmarkedIds.includes(res.id)
          const isPdf = res.fileType === 'PDF Document'

          return (
            <div
              key={res.id}
              className="bg-[#0b0b0e] border border-white/[0.08] hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between group shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/[0.03] rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/[0.08] transition-colors" />

              <div>
                {/* Header Badge & Action */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
                        isPdf
                          ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                          : 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                      }`}
                    >
                      {isPdf ? <FileText size={13} /> : <FileCode size={13} />}
                      {res.fileType}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white/[0.03] text-zinc-400 border border-white/[0.06] flex items-center gap-1">
                      <HardDrive size={11} /> {res.fileSize}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleBookmark(res.id)}
                    className={`p-2 rounded-xl transition border ${
                      isSaved
                        ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                        : 'text-zinc-500 hover:text-white bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.06]'
                    }`}
                    aria-label="Save note"
                  >
                    <Bookmark size={15} className={isSaved ? 'fill-current' : ''} />
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition duration-150 mb-4 leading-snug">
                  {res.title}
                </h3>
              </div>

              {/* Bottom Actions - Read Preview Button Only */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <span className="text-[11px] text-zinc-500 font-medium truncate flex items-center gap-1">
                  <Lock size={12} className="text-amber-400/80" /> 3 Images Free Preview
                </span>

                <button
                  onClick={() => handleOpenPreview(res)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-lg shadow-indigo-600/25 active:scale-95"
                >
                  <Eye size={14} />
                  <span>Read Notes</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty Search Filter State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-16 bg-[#0c0c0f] border border-white/[0.06] rounded-2xl p-8 space-y-3">
          <div className="w-12 h-12 bg-white/[0.03] text-zinc-500 rounded-full flex items-center justify-center mx-auto border border-white/[0.06]">
            <BookOpen size={20} />
          </div>
          <h3 className="text-base font-bold text-white">No resources matching search</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Try searching for a different subject or keyword to locate course notes.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Reader Modal: Strictly 1 Image per Page (Max 3 Images Total) */}
      <AnimatePresence>
        {previewResource && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewResource(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="w-full max-w-5xl h-[90vh] bg-[#0c0c10] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-5 py-3.5 bg-[#08080b] border-b border-white/[0.08] flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg flex-shrink-0">
                    {previewResource.fileType === 'PDF Document' ? <FileText size={16} /> : <FileCode size={16} />}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{previewResource.title}</h3>
                    <p className="text-[10px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                      <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded font-semibold text-[9px]">
                        FREE PREVIEW (IMAGE {currentPage} / 3)
                      </span>
                      • Protected Reader Mode
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowUnlockModal(true)}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-lg text-xs transition flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95"
                  >
                    <Lock size={13} />
                    <span>Unlock All Notes</span>
                  </button>

                  <button
                    onClick={() => setPreviewResource(null)}
                    className="p-2 text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition"
                    aria-label="Close Preview Modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Reader Body */}
              <div className="flex-1 bg-[#07070a] relative overflow-hidden flex flex-col">
                {isLocked ? (
                  /* UNBYPASSABLE LOCK SCREEN WALL */
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[#07070a] relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="bg-[#0f0f18] border border-amber-500/40 rounded-3xl p-8 sm:p-10 text-center max-w-lg shadow-2xl space-y-6 relative z-10">
                      <div className="w-16 h-16 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                        <Lock size={32} />
                      </div>

                      <div className="space-y-2">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          3/3 Free Images Viewed
                        </span>
                        <h4 className="text-xl font-bold text-white pt-1">
                          Full Document Locked
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                          You have completed viewing your 3 free preview images. Access to remaining pages & notes is restricted. Upgrade to unlock full notes.
                        </p>
                      </div>

                      <div className="pt-2 space-y-2.5">
                        <button
                          onClick={() => setShowUnlockModal(true)}
                          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                        >
                          <Sparkles size={15} />
                          <span>Unlock Complete Notes</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsLocked(false)
                            setCurrentPage(3)
                          }}
                          className="text-xs text-zinc-500 hover:text-zinc-300 font-semibold"
                        >
                          Back to Image 3
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* WORD DOCUMENT READER: EXACTLY 1 IMAGE PER PAGE VIEW */
                  <div className="flex-1 flex flex-col justify-between overflow-hidden">
                    <div className="flex-1 overflow-auto p-4 sm:p-6 select-none bg-zinc-950/60 flex items-center justify-center relative">
                      {isLoadingDoc ? (
                        <div className="h-full min-h-[300px] flex items-center justify-center text-zinc-400 text-sm gap-3">
                          <Loader2 size={20} className="animate-spin text-indigo-400" />
                          <span>Loading document image...</span>
                        </div>
                      ) : docError ? (
                        <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 space-y-3">
                          <p className="text-sm text-zinc-400">{docError}</p>
                        </div>
                      ) : (
                        <div
                          className="w-full h-full flex flex-col items-center justify-start overflow-y-auto p-6 transition-transform duration-200 origin-center text-zinc-200 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-indigo-300 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-sky-300 [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1.5 [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_th]:border [&_th]:border-white/20 [&_th]:bg-white/5 [&_th]:p-2.5 [&_th]:text-left [&_th]:text-white [&_td]:border [&_td]:border-white/10 [&_td]:p-2.5 [&_img]:max-h-[65vh] [&_img]:w-auto [&_img]:mx-auto [&_img]:rounded-xl [&_img]:shadow-2xl [&_img]:border [&_img]:border-white/10"
                          style={{ transform: `scale(${zoomLevel / 100})` }}
                          dangerouslySetInnerHTML={{
                            __html: docPagesHtml[currentPage - 1] || '<p className="text-zinc-500">End of preview content.</p>',
                          }}
                        />
                      )}
                    </div>

                    {/* Controls Bar */}
                    <div className="bg-[#0b0b10] border-t border-white/10 px-5 py-3 flex items-center justify-between flex-shrink-0 z-20 gap-2 flex-wrap sm:flex-nowrap">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage <= 1}
                        className="px-3.5 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-40 disabled:hover:bg-white/[0.04] text-zinc-300 rounded-lg text-xs font-semibold transition flex items-center gap-1 border border-white/[0.06]"
                      >
                        <ChevronLeft size={14} />
                        <span>Previous Image</span>
                      </button>

                      {/* Zoom Controls */}
                      <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.08] rounded-xl px-2.5 py-1">
                        <button
                          onClick={handleZoomOut}
                          className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/10 transition"
                          title="Zoom Out (Min 50%)"
                        >
                          <ZoomOut size={14} />
                        </button>
                        <span className="text-[11px] font-mono text-zinc-300 min-w-[45px] text-center font-bold">
                          {zoomLevel}%
                        </span>
                        <button
                          onClick={handleZoomIn}
                          className="p-1 text-zinc-400 hover:text-white rounded hover:bg-white/10 transition"
                          title="Zoom In (Max 300%)"
                        >
                          <ZoomIn size={14} />
                        </button>
                        {zoomLevel !== 100 && (
                          <button
                            onClick={handleResetZoom}
                            className="p-1 text-zinc-500 hover:text-indigo-400 rounded hover:bg-white/10 transition ml-1"
                            title="Reset Zoom (100%)"
                          >
                            <RotateCcw size={12} />
                          </button>
                        )}
                      </div>

                      <button
                        onClick={handleNextPage}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-md shadow-indigo-600/30 active:scale-95"
                      >
                        <span>{currentPage >= 3 ? 'Finish Free Preview' : 'Next Image'}</span>
                        {currentPage >= 3 ? <Lock size={13} className="text-amber-300" /> : <ChevronRight size={14} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Unlock Full Access Modal */}
      <AnimatePresence>
        {showUnlockModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUnlockModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#0e0e13] border border-indigo-500/30 rounded-2xl shadow-2xl overflow-hidden relative z-10 p-6 sm:p-8 space-y-6 text-center"
            >
              <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto">
                <ShieldAlert size={28} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Unlock Full Resource Notes</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Gain unrestricted reading access to all 20 updated study resource notes across all computer science & engineering subjects.
                </p>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl text-left space-y-2 text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 size={14} className="text-indigo-400" />
                  <span>Read unlimited pages & diagrams</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 size={14} className="text-indigo-400" />
                  <span>Access all 20 course subjects</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 size={14} className="text-indigo-400" />
                  <span>Protected web reader with zero ads</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setShowUnlockModal(false)
                    triggerToast('Premium upgrade requested! Contacting platform admin.')
                  }}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-indigo-600/30"
                >
                  Upgrade to Pro Access
                </button>
                <button
                  onClick={() => setShowUnlockModal(false)}
                  className="w-full py-2 text-zinc-500 hover:text-zinc-300 text-xs font-semibold"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
