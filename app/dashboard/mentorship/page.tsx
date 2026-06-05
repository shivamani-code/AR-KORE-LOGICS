'use client'

import { Star, Calendar, MessageCircle } from 'lucide-react'

export default function MentorshipPage() {
  const mentors = [
    {
      name: 'Sarah Chen',
      title: 'Senior Full Stack Engineer at Google',
      rating: 4.9,
      reviews: 245,
      expertise: ['React', 'Node.js', 'PostgreSQL'],
      availability: '3 slots/week',
      price: '$29/hour',
      bio: '8 years of experience building scalable web applications',
    },
    {
      name: 'Raj Patel',
      title: 'ML Engineer at Meta',
      rating: 4.8,
      reviews: 198,
      expertise: ['Python', 'TensorFlow', 'NLP'],
      availability: '2 slots/week',
      price: '$39/hour',
      bio: '6 years building ML solutions for production',
    },
    {
      name: 'Emma Rodriguez',
      title: 'Senior DevOps Engineer at Amazon',
      rating: 4.9,
      reviews: 312,
      expertise: ['Kubernetes', 'AWS', 'Docker'],
      availability: '4 slots/week',
      price: '$34/hour',
      bio: '9 years in cloud infrastructure and DevOps',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#F9FAFB] mb-2">Find Your Mentor</h1>
        <p className="text-[#9CA3AF]">Connect with industry experts for 1-on-1 guidance</p>
      </div>

      {/* Mentor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mentors.map((mentor, idx) => (
          <div
            key={idx}
            className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 hover:border-[#00E5FF] transition group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-[#F9FAFB]">
                  {mentor.name}
                </h3>
                <p className="text-[#9CA3AF] text-sm">
                  {mentor.title}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#00E5FF] to-[#14F195] rounded-full flex items-center justify-center text-[#0A0E1A] font-bold text-lg">
                {mentor.name.charAt(0)}
              </div>
            </div>

            <p className="text-[#9CA3AF] mb-4 text-sm">
              {mentor.bio}
            </p>

            <div className="flex items-center gap-1 mb-4">
              <Star size={16} className="text-[#14F195] fill-[#14F195]" />
              <span className="font-bold text-[#F9FAFB]">{mentor.rating}</span>
              <span className="text-[#9CA3AF] text-sm">({mentor.reviews} reviews)</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {mentor.expertise.map((skill, sidx) => (
                <span
                  key={sidx}
                  className="px-3 py-1 bg-[#00E5FF]/10 text-[#00E5FF] text-xs rounded-full font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[#0A0E1A] rounded-lg">
              <div>
                <p className="text-[#9CA3AF] text-xs mb-1">Availability</p>
                <p className="text-[#F9FAFB] font-semibold">{mentor.availability}</p>
              </div>
              <div>
                <p className="text-[#9CA3AF] text-xs mb-1">Rate</p>
                <p className="text-[#F9FAFB] font-semibold">{mentor.price}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-2 bg-gradient-to-r from-[#00E5FF] to-[#14F195] text-[#0A0E1A] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00E5FF]/30 transition inline-flex items-center justify-center gap-2">
                <Calendar size={16} />
                Book Session
              </button>
              <button className="px-4 py-2 border border-[#1F2937] text-[#9CA3AF] rounded-lg font-semibold hover:text-[#F9FAFB] hover:border-[#00E5FF] transition inline-flex items-center justify-center gap-2">
                <MessageCircle size={16} />
                Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* My Sessions Section */}
      <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-8">
        <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Your Upcoming Sessions</h2>
        
        <div className="space-y-4">
          <div className="bg-[#0A0E1A] rounded-lg p-4 border-l-4 border-[#00E5FF]">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-[#F9FAFB]">React Architecture Discussion</p>
                <p className="text-sm text-[#9CA3AF]">with Sarah Chen</p>
              </div>
              <span className="text-sm font-bold text-[#00E5FF]">Tomorrow, 2:00 PM</span>
            </div>
            <button className="text-sm text-[#00E5FF] hover:text-[#14F195] transition font-semibold">
              Join Meeting →
            </button>
          </div>

          <div className="bg-[#0A0E1A] rounded-lg p-4 border-l-4 border-[#7C3AED]">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-[#F9FAFB]">Code Review - Your Project</p>
                <p className="text-sm text-[#9CA3AF]">with Emma Rodriguez</p>
              </div>
              <span className="text-sm font-bold text-[#7C3AED]">Friday, 3:00 PM</span>
            </div>
            <button className="text-sm text-[#7C3AED] hover:text-[#14F195] transition font-semibold">
              Reschedule →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
