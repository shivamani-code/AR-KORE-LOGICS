'use client'

import { Code2, Lock, Users, Zap, Cloud, Palette, Shield, Smartphone } from 'lucide-react'

const careerPaths = [
  {
    title: 'Full Stack Development',
    difficulty: 'Intermediate',
    duration: '6 months',
    students: '12,500+',
    icon: Code2,
  },
  {
    title: 'Cybersecurity',
    difficulty: 'Advanced',
    duration: '8 months',
    students: '5,200+',
    icon: Shield,
  },
  {
    title: 'AI & Machine Learning',
    difficulty: 'Advanced',
    duration: '7 months',
    students: '8,900+',
    icon: Zap,
  },
  {
    title: 'Data Science',
    difficulty: 'Intermediate',
    duration: '6 months',
    students: '7,800+',
    icon: Lock,
  },
  {
    title: 'Cloud Computing',
    difficulty: 'Intermediate',
    duration: '5 months',
    students: '6,300+',
    icon: Cloud,
  },
  {
    title: 'UI/UX Design',
    difficulty: 'Beginner',
    duration: '4 months',
    students: '9,100+',
    icon: Palette,
  },
  {
    title: 'DevOps Engineering',
    difficulty: 'Advanced',
    duration: '6 months',
    students: '4,500+',
    icon: Users,
  },
  {
    title: 'Mobile App Development',
    difficulty: 'Intermediate',
    duration: '5 months',
    students: '10,200+',
    icon: Smartphone,
  },
]

export function CareerPaths() {
  return (
    <section id="roadmaps" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Choose Your Career Path
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore 30+ carefully curated roadmaps designed by industry experts to get you job-ready
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerPaths.map((path, idx) => {
            const IconComponent = path.icon
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-purple-200 transition group cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-300/50 transition">
                  <IconComponent className="text-white" size={24} />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {path.title}
                </h3>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Difficulty</span>
                    <span className={`font-semibold ${
                      path.difficulty === 'Beginner' ? 'text-green-600' :
                      path.difficulty === 'Intermediate' ? 'text-blue-600' :
                      'text-purple-600'
                    }`}>
                      {path.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Duration</span>
                    <span className="text-slate-900">{path.duration}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Enrolled</span>
                    <span className="text-slate-900">{path.students}</span>
                  </div>
                </div>

                <button className="w-full px-4 py-2 bg-purple-100 text-purple-600 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white transition">
                  View Roadmap
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
