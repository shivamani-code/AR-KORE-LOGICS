import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthenticatedUser } from '@/lib/auth'

const aiNodes = [
  {
    id: 1,
    week: 1,
    title: 'Start Your AI Journey',
    description: 'Introduction to Artificial Intelligence, its history, types, and real-world applications.',
    iconName: 'brain',
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
    iconName: 'target',
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
    iconName: 'barchart3',
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
    iconName: 'layers',
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
    iconName: 'sparkles',
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
    iconName: 'code2',
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
    iconName: 'zap',
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
    iconName: 'graduationcap',
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
]

export async function GET() {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const progress = await db.getProgress(user.id)
    const rawNodes = aiNodes
    const isHpmani = user.email?.toLowerCase() === 'hpmani91@gmail.com' || user.role === 'admin'

    // Map status based on progress
    const nodes = rawNodes.map((node) => {
      let status: 'completed' | 'current' | 'locked' = 'locked'
      if (progress.completedModules.includes(node.id)) {
        status = 'completed'
      } else if (node.id === progress.currentModuleId) {
        status = 'current'
      } else if (isHpmani) {
        status = 'current' // All nodes open and accessible for all-access user
      }
      return {
        ...node,
        status,
      }
    })

    return NextResponse.json({
      success: true,
      nodes,
      progress: {
        completedModules: progress.completedModules,
        currentModuleId: progress.currentModuleId,
        completionPercentage: progress.completionPercentage,
        streakDays: progress.streakDays,
        careerPath: progress.careerPath,
      },
    })
  } catch (error) {
    console.error('Roadmaps API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
