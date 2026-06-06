'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, Circle, Lock } from 'lucide-react'

const roadmapData: Record<string, any> = {
  fullstack: {
    title: 'Full Stack Development Roadmap',
    phases: [
      {
        name: 'Phase 1: Basics',
        status: 'completed',
        icon: CheckCircle2,
        color: 'text-green-500',
        borderColor: 'border-green-500',
        items: [
          { title: 'HTML & CSS Fundamentals', resources: 5, hours: 2, completed: true },
          { title: 'JavaScript Basics', resources: 8, hours: 4, completed: true },
          { title: 'Git & GitHub', resources: 4, hours: 1.5, completed: true },
        ],
      },
      {
        name: 'Phase 2: Frontend Advanced',
        status: 'in-progress',
        icon: Circle,
        color: 'text-blue-500',
        borderColor: 'border-blue-500',
        items: [
          { title: 'React Fundamentals', resources: 12, hours: 6, completed: false },
          { title: 'State Management', resources: 8, hours: 4, completed: false },
        ],
      },
      {
        name: 'Phase 3: Backend',
        status: 'locked',
        icon: Lock,
        color: 'text-slate-400',
        borderColor: 'border-slate-400',
        items: [
          { title: 'Node.js & Express', resources: 10, hours: 5, completed: false },
          { title: 'Databases', resources: 9, hours: 5, completed: false },
        ],
      },
    ],
    progress: 45,
    total: 51,
  },
  'ai-ml': {
    title: 'AI & Machine Learning Roadmap',
    phases: [
      {
        name: 'Phase 1: Fundamentals',
        status: 'completed',
        icon: CheckCircle2,
        color: 'text-green-500',
        borderColor: 'border-green-500',
        items: [
          { title: 'Python Basics', resources: 10, hours: 5, completed: true },
          { title: 'NumPy & Pandas', resources: 8, hours: 4, completed: true },
        ],
      },
      {
        name: 'Phase 2: Machine Learning',
        status: 'in-progress',
        icon: Circle,
        color: 'text-blue-500',
        borderColor: 'border-blue-500',
        items: [
          { title: 'Supervised Learning', resources: 12, hours: 6, completed: false },
          { title: 'Neural Networks', resources: 10, hours: 5, completed: false },
        ],
      },
    ],
    progress: 30,
    total: 45,
  },
}

export default function RoadmapsPage() {
  const [selectedCareer, setSelectedCareer] = useState<string>('fullstack')
  
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('selectedCareer') : null
    if (stored) {
      setSelectedCareer(stored === 'Full Stack Development' ? 'fullstack' : stored === 'AI & Machine Learning' ? 'ai-ml' : 'fullstack')
    }
  }, [])

  const roadmap = roadmapData[selectedCareer] || roadmapData.fullstack

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">My Roadmaps</h1>
        <p className="text-slate-600">Track your progress through structured learning paths</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">{roadmap.title}</h2>
        
        <div className="space-y-8">
          {roadmap.phases.map((phase: any, idx: number) => {
            const IconComponent = phase.icon
            const isLocked = phase.status === 'locked'
            
            return (
              <div key={idx}>
                <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                  isLocked ? 'text-slate-400' : 'text-slate-900'
                }`}>
                  <IconComponent className={phase.color} size={24} />
                  {phase.name}
                </h3>
                <div className={`ml-8 space-y-3 ${isLocked ? 'opacity-50' : ''}`}>
                  {phase.items.map((item: any, itemIdx: number) => (
                    <div
                      key={itemIdx}
                      className={`flex items-center gap-4 p-4 rounded-lg border-l-4 ${phase.borderColor} ${
                        isLocked ? 'bg-slate-100 border-slate-300' : 'bg-slate-50 border-slate-300 hover:bg-white hover:shadow-sm'
                      } transition`}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="text-green-500" size={20} />
                      ) : isLocked ? (
                        <Lock className="text-slate-400" size={20} />
                      ) : (
                        <Circle className="text-blue-500" size={20} />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <p className="text-sm text-slate-600">{item.resources} resources • {item.hours} hours</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-2">Overall Progress</p>
              <div className="w-64 bg-slate-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-3 rounded-full" style={{ width: `${Math.round((roadmap.progress / roadmap.total) * 100)}%` }} />
              </div>
              <p className="text-sm text-slate-600 mt-2">{roadmap.progress}% of {roadmap.total} modules completed</p>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-300/50 transition">
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
