'use client'

import { Star, Calendar } from 'lucide-react'

const mentors = [
  {
    name: 'Sarah Chen',
    role: 'Senior Full Stack Engineer',
    company: 'Google',
    experience: '8 years',
    rating: 4.9,
    reviews: 245,
    expertise: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    name: 'Raj Patel',
    role: 'ML Engineer',
    company: 'Meta',
    experience: '6 years',
    rating: 4.8,
    reviews: 198,
    expertise: ['Python', 'TensorFlow', 'NLP'],
  },
  {
    name: 'Emma Rodriguez',
    role: 'Senior DevOps Engineer',
    company: 'Amazon',
    experience: '9 years',
    rating: 4.9,
    reviews: 312,
    expertise: ['Kubernetes', 'AWS', 'Docker'],
  },
  {
    name: 'Akshay Singh',
    role: 'Cybersecurity Specialist',
    company: 'Microsoft',
    experience: '7 years',
    rating: 4.7,
    reviews: 156,
    expertise: ['Network Security', 'Penetration Testing', 'Cryptography'],
  },
]

export function MentorsSection() {
  return (
    <section id="mentors" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F9FAFB] mb-4">
            Learn From Industry Mentors
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            Connect with 200+ experienced mentors from top tech companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mentors.map((mentor, idx) => (
            <div
              key={idx}
              className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 hover:border-[#00E5FF] transition group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#F9FAFB]">
                    {mentor.name}
                  </h3>
                  <p className="text-[#9CA3AF] text-sm">
                    {mentor.role} at {mentor.company}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={16} className="text-[#14F195] fill-[#14F195]" />
                    <span className="font-bold text-[#F9FAFB]">{mentor.rating}</span>
                  </div>
                  <p className="text-[#9CA3AF] text-xs">{mentor.reviews} reviews</p>
                </div>
              </div>

              <p className="text-[#9CA3AF] text-sm mb-4">
                {mentor.experience} of professional experience
              </p>

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

              <button className="w-full px-4 py-2 bg-gradient-to-r from-[#00E5FF] to-[#14F195] text-[#0A0E1A] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00E5FF]/30 transition inline-flex items-center justify-center gap-2 group-hover:scale-105">
                <Calendar size={16} />
                Book Session
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
