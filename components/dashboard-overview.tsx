'use client'

import { BookOpen, TrendingUp, Zap, Flame } from 'lucide-react'

export function DashboardOverview() {
  const stats = [
    {
      icon: BookOpen,
      label: 'Current Roadmap',
      value: 'Full Stack Development',
      change: '45% complete',
      color: 'from-[#00E5FF]',
    },
    {
      icon: TrendingUp,
      label: 'Progress',
      value: '45%',
      change: '+5% this week',
      color: 'from-[#14F195]',
    },
    {
      icon: BookOpen,
      label: 'Resources Completed',
      value: '23',
      change: 'of 51 total',
      color: 'from-[#7C3AED]',
    },
    {
      icon: Flame,
      label: 'Learning Streak',
      value: '12 days',
      change: 'Keep it going!',
      color: 'from-[#F97316]',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#F9FAFB] mb-2">Welcome back, John!</h1>
        <p className="text-[#9CA3AF]">Here&apos;s your learning progress this week</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon
          return (
            <div
              key={idx}
              className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 hover:border-[#00E5FF] transition"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} to-[#14F195] rounded-lg flex items-center justify-center mb-4`}>
                <IconComponent className="text-[#0A0E1A]" size={24} />
              </div>
              <p className="text-[#9CA3AF] text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-[#F9FAFB] mb-2">{stat.value}</p>
              <p className="text-sm text-[#14F195]">{stat.change}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning Widget */}
        <div className="lg:col-span-2 bg-[#111827] border border-[#1F2937] rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Continue Learning</h2>
          
          <div className="space-y-4">
            {[
              { title: 'React Fundamentals', progress: 75, next: 'Hooks & State Management' },
              { title: 'Node.js Basics', progress: 60, next: 'Express.js' },
              { title: 'Database Design', progress: 40, next: 'SQL Queries' },
            ].map((course, idx) => (
              <div key={idx} className="bg-[#0A0E1A] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-[#F9FAFB]">{course.title}</h3>
                    <p className="text-sm text-[#9CA3AF]">Next: {course.next}</p>
                  </div>
                  <span className="text-sm font-bold text-[#00E5FF]">{course.progress}%</span>
                </div>
                <div className="w-full bg-[#1F2937] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#00E5FF] to-[#14F195] h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-2 bg-[#00E5FF]/10 text-[#00E5FF] rounded-lg font-semibold hover:bg-[#00E5FF] hover:text-[#0A0E1A] transition">
            View All Courses
          </button>
        </div>

        {/* Upcoming Sessions Widget */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Upcoming Sessions</h2>
          
          <div className="space-y-4">
            <div className="bg-[#0A0E1A] rounded-lg p-4 border-l-4 border-[#00E5FF]">
              <p className="font-semibold text-[#F9FAFB] mb-1">Mentorship Session</p>
              <p className="text-sm text-[#9CA3AF]">With Sarah Chen</p>
              <p className="text-sm text-[#14F195] mt-2">Tomorrow at 2:00 PM</p>
            </div>

            <div className="bg-[#0A0E1A] rounded-lg p-4 border-l-4 border-[#7C3AED]">
              <p className="font-semibold text-[#F9FAFB] mb-1">Code Review Session</p>
              <p className="text-sm text-[#9CA3AF]">React Project</p>
              <p className="text-sm text-[#14F195] mt-2">Friday at 3:00 PM</p>
            </div>
          </div>

          <button className="w-full mt-6 py-2 bg-[#00E5FF]/10 text-[#00E5FF] rounded-lg font-semibold hover:bg-[#00E5FF] hover:text-[#0A0E1A] transition">
            Book More Sessions
          </button>
        </div>
      </div>
    </div>
  )
}
