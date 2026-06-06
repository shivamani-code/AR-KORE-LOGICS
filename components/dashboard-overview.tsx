'use client'

import { BookOpen, TrendingUp, Zap, Flame } from 'lucide-react'

export function DashboardOverview() {
  const stats = [
    {
      icon: BookOpen,
      label: 'Current Roadmap',
      value: 'Full Stack Development',
      change: '45% complete',
      color: 'from-blue-600 to-cyan-500',
    },
    {
      icon: TrendingUp,
      label: 'Progress',
      value: '45%',
      change: '+5% this week',
      color: 'from-green-500 to-emerald-400',
    },
    {
      icon: BookOpen,
      label: 'Resources Completed',
      value: '23',
      change: 'of 51 total',
      color: 'from-blue-600 to-cyan-500',
    },
    {
      icon: Flame,
      label: 'Learning Streak',
      value: '12 days',
      change: 'Keep it going!',
      color: 'from-orange-500 to-yellow-400',
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Welcome back, John!</h1>
        <p className="text-sm sm:text-base text-slate-600">Here&apos;s your learning progress this week</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:border-blue-200 transition"
            >
              <div className={`w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4 flex-shrink-0`}>
                <IconComponent className="text-white" size={20} aria-hidden="true" />
              </div>
              <p className="text-slate-600 text-xs sm:text-sm mb-1">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{stat.value}</p>
              <p className="text-xs sm:text-sm text-green-600">{stat.change}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning Widget */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Continue Learning</h2>
          
          <div className="space-y-4">
            {[
              { title: 'React Fundamentals', progress: 75, next: 'Hooks & State Management' },
              { title: 'Node.js Basics', progress: 60, next: 'Express.js' },
              { title: 'Database Design', progress: 40, next: 'SQL Queries' },
            ].map((course, idx) => (
              <div key={idx} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{course.title}</h3>
                    <p className="text-sm text-slate-600">Next: {course.next}</p>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition">
            View All Courses
          </button>
        </div>

        {/* Upcoming Sessions Widget */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Upcoming Sessions</h2>
          
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="font-semibold text-slate-900 mb-1">Mentorship Session</p>
              <p className="text-sm text-slate-600">With Sarah Chen</p>
              <p className="text-sm text-green-600 mt-2">Tomorrow at 2:00 PM</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-600">
              <p className="font-semibold text-slate-900 mb-1">Code Review Session</p>
              <p className="text-sm text-slate-600">React Project</p>
              <p className="text-sm text-green-600 mt-2">Friday at 3:00 PM</p>
            </div>
          </div>

          <button className="w-full mt-6 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition">
            Book More Sessions
          </button>
        </div>
      </div>
    </div>
  )
}
