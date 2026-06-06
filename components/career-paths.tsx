'use client'

import { Code2, Lock, Users, Zap, Cloud, Palette, Shield, Smartphone, ArrowRight } from 'lucide-react'

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
    <section id="roadmaps" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/20 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Choose Your Learning Path
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore 30+ carefully curated roadmaps designed by industry experts to get you job-ready
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {careerPaths.map((path, idx) => {
            const IconComponent = path.icon
            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm border border-slate-150 rounded-2xl p-6 hover:shadow-xl hover:border-blue-350 transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-2 relative"
              >
                <div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-blue-300/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <IconComponent className="text-white" size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {path.title}
                  </h3>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Difficulty</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                        path.difficulty === 'Beginner' ? 'bg-green-50 text-green-700 border-green-200' :
                        path.difficulty === 'Intermediate' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-indigo-55 bg-opacity-10 bg-indigo-50 text-indigo-700 border-indigo-200'
                      }`}>
                        {path.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Duration</span>
                      <span className="text-slate-900 font-medium">{path.duration}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Enrolled</span>
                      <span className="text-slate-900 font-medium">{path.students}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-semibold border border-blue-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white hover:border-transparent transition-all duration-300 inline-flex items-center justify-center gap-2 group-hover:translate-x-0 group-hover:shadow-md active:scale-95">
                  View Roadmap
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
