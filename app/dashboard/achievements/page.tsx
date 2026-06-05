'use client'

import { Award, Flame, Target, Zap } from 'lucide-react'

export default function AchievementsPage() {
  const achievements = [
    {
      icon: Target,
      title: 'First Steps',
      description: 'Completed your first lesson',
      xp: '100 XP',
      earned: true,
      date: '2 days ago',
    },
    {
      icon: Flame,
      title: '7-Day Streak',
      description: 'Completed lessons for 7 consecutive days',
      xp: '500 XP',
      earned: true,
      date: '1 day ago',
    },
    {
      icon: Award,
      title: 'Resource Master',
      description: 'Completed 10 resources',
      xp: '250 XP',
      earned: true,
      date: 'Today',
    },
    {
      icon: Zap,
      title: '30-Day Streak',
      description: 'Maintain a 30-day learning streak',
      xp: '1000 XP',
      earned: false,
      progress: '12 / 30 days',
    },
  ]

  const totalXP = 850
  const currentLevel = 5
  const nextLevelXP = 1500

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#F9FAFB] mb-2">Achievements & Gamification</h1>
        <p className="text-[#9CA3AF]">Celebrate your learning milestones and earn rewards</p>
      </div>

      {/* XP & Level Card */}
      <div className="bg-gradient-to-r from-[#00E5FF]/10 to-[#14F195]/10 border border-[#1F2937] rounded-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-[#9CA3AF] text-sm mb-2">Current Level</p>
            <div className="text-5xl font-bold text-[#14F195] flex items-end gap-2">
              <span>{currentLevel}</span>
              <span className="text-lg text-[#9CA3AF]">Expert</span>
            </div>
          </div>
          <div>
            <p className="text-[#9CA3AF] text-sm mb-2">Total XP Earned</p>
            <p className="text-5xl font-bold text-[#00E5FF]">{totalXP}</p>
          </div>
          <div>
            <p className="text-[#9CA3AF] text-sm mb-2">XP to Next Level</p>
            <p className="text-5xl font-bold text-[#7C3AED]">{nextLevelXP - totalXP}</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[#9CA3AF] text-sm">Progress to Level 6</p>
            <p className="text-[#F9FAFB] text-sm font-semibold">{Math.round((totalXP / nextLevelXP) * 100)}%</p>
          </div>
          <div className="w-full bg-[#111827] rounded-full h-3">
            <div
              className="bg-gradient-to-r from-[#00E5FF] to-[#14F195] h-3 rounded-full"
              style={{ width: `${(totalXP / nextLevelXP) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div>
        <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Your Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, idx) => {
            const IconComponent = achievement.icon
            return (
              <div
                key={idx}
                className={`rounded-xl p-6 border transition ${
                  achievement.earned
                    ? 'bg-[#111827] border-[#1F2937] hover:border-[#00E5FF]'
                    : 'bg-[#111827]/50 border-[#1F2937] opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    achievement.earned
                      ? 'bg-[#14F195]/20'
                      : 'bg-[#9CA3AF]/20'
                  }`}>
                    <IconComponent className={achievement.earned ? 'text-[#14F195]' : 'text-[#9CA3AF]'} size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${achievement.earned ? 'text-[#F9FAFB]' : 'text-[#9CA3AF]'}`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-[#9CA3AF] mb-2">
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#00E5FF]">
                        +{achievement.xp}
                      </span>
                      <span className="text-xs text-[#9CA3AF]">
                        {achievement.earned ? achievement.date : achievement.progress}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-8">
        <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Weekly Leaderboard</h2>
        
        <div className="space-y-3">
          {[
            { rank: 1, name: 'Alex Kumar', xp: 3450, isCurrent: false },
            { rank: 2, name: 'Sarah Smith', xp: 3200, isCurrent: false },
            { rank: 3, name: 'John Doe', xp: 2950, isCurrent: true },
            { rank: 4, name: 'Emma Wilson', xp: 2780, isCurrent: false },
            { rank: 5, name: 'Mike Johnson', xp: 2650, isCurrent: false },
          ].map((user, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 p-4 rounded-lg ${
                user.isCurrent
                  ? 'bg-[#00E5FF]/10 border border-[#00E5FF]'
                  : 'bg-[#0A0E1A]'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#14F195] flex items-center justify-center text-[#0A0E1A] font-bold text-sm">
                {user.rank}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#F9FAFB]">{user.name}</p>
                {user.isCurrent && <p className="text-xs text-[#00E5FF]">You</p>}
              </div>
              <p className="font-bold text-[#00E5FF]">{user.xp} XP</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
