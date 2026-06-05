'use client'

import { MapPin, CheckCircle2, Circle, Lock } from 'lucide-react'

export default function RoadmapsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#F9FAFB] mb-2">My Roadmaps</h1>
        <p className="text-[#9CA3AF]">Track your progress through structured learning paths</p>
      </div>

      <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-8">
        <h2 className="text-2xl font-bold text-[#F9FAFB] mb-8">Full Stack Development Roadmap</h2>
        
        <div className="space-y-8">
          {/* Phase 1 */}
          <div>
            <h3 className="text-lg font-bold text-[#F9FAFB] mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-[#14F195]" size={24} />
              Phase 1: Basics
            </h3>
            <div className="ml-8 space-y-3">
              <div className="flex items-center gap-4 p-4 bg-[#0A0E1A] rounded-lg border-l-4 border-[#14F195]">
                <CheckCircle2 className="text-[#14F195]" size={20} />
                <div className="flex-1">
                  <p className="font-semibold text-[#F9FAFB]">HTML & CSS Fundamentals</p>
                  <p className="text-sm text-[#9CA3AF]">5 resources • 2 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[#0A0E1A] rounded-lg border-l-4 border-[#14F195]">
                <CheckCircle2 className="text-[#14F195]" size={20} />
                <div className="flex-1">
                  <p className="font-semibold text-[#F9FAFB]">JavaScript Basics</p>
                  <p className="text-sm text-[#9CA3AF]">8 resources • 4 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[#0A0E1A] rounded-lg border-l-4 border-[#14F195]">
                <CheckCircle2 className="text-[#14F195]" size={20} />
                <div className="flex-1">
                  <p className="font-semibold text-[#F9FAFB]">Git & GitHub</p>
                  <p className="text-sm text-[#9CA3AF]">4 resources • 1.5 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div>
            <h3 className="text-lg font-bold text-[#F9FAFB] mb-4 flex items-center gap-2">
              <Circle className="text-[#00E5FF]" size={24} />
              Phase 2: Frontend Advanced
            </h3>
            <div className="ml-8 space-y-3">
              <div className="flex items-center gap-4 p-4 bg-[#0A0E1A] rounded-lg border-l-4 border-[#00E5FF]">
                <Circle className="text-[#00E5FF]" size={20} />
                <div className="flex-1">
                  <p className="font-semibold text-[#F9FAFB]">React Fundamentals</p>
                  <p className="text-sm text-[#9CA3AF]">12 resources • 6 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[#0A0E1A] rounded-lg border-l-4 border-[#00E5FF]">
                <Circle className="text-[#00E5FF]" size={20} />
                <div className="flex-1">
                  <p className="font-semibold text-[#F9FAFB]">State Management</p>
                  <p className="text-sm text-[#9CA3AF]">8 resources • 4 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div>
            <h3 className="text-lg font-bold text-[#9CA3AF] mb-4 flex items-center gap-2">
              <Lock className="text-[#9CA3AF]" size={24} />
              Phase 3: Backend
            </h3>
            <div className="ml-8 space-y-3 opacity-50">
              <div className="flex items-center gap-4 p-4 bg-[#0A0E1A] rounded-lg border-l-4 border-[#9CA3AF]">
                <Lock className="text-[#9CA3AF]" size={20} />
                <div className="flex-1">
                  <p className="font-semibold text-[#F9FAFB]">Node.js & Express</p>
                  <p className="text-sm text-[#9CA3AF]">10 resources • 5 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[#0A0E1A] rounded-lg border-l-4 border-[#9CA3AF]">
                <Lock className="text-[#9CA3AF]" size={20} />
                <div className="flex-1">
                  <p className="font-semibold text-[#F9FAFB]">Databases</p>
                  <p className="text-sm text-[#9CA3AF]">9 resources • 5 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#1F2937]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#9CA3AF] text-sm mb-2">Overall Progress</p>
              <div className="w-64 bg-[#0A0E1A] rounded-full h-3">
                <div className="bg-gradient-to-r from-[#00E5FF] to-[#14F195] h-3 rounded-full" style={{ width: '45%' }} />
              </div>
              <p className="text-sm text-[#9CA3AF] mt-2">45% of 51 modules completed</p>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-[#00E5FF] to-[#14F195] text-[#0A0E1A] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00E5FF]/30 transition">
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
