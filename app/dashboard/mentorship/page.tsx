'use client'

import { useState, useEffect } from 'react'
import { Star, Calendar, MessageCircle, X, ArrowRight, Video } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Mentor {
  id: string
  name: string
  title: string
  company: string
  expertise: string[]
  experience: string
  bio: string
  availability: string
  rating: number
  sessionCount: number
}

interface Session {
  id: string
  studentId: string
  mentorId: string
  type: string
  date: string
  status: 'pending' | 'confirmed' | 'cancelled'
  notes?: string
}

export default function MentorshipPage() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Booking Modal State
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null)
  const [sessionType, setSessionType] = useState('1-on-1 Coaching')
  const [sessionDate, setSessionDate] = useState('')
  const [sessionNotes, setSessionNotes] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const [bookingError, setBookingError] = useState('')

  const fetchMentorsAndSessions = async () => {
    try {
      const res = await fetch('/api/mentors')
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setMentors(data.mentors)
          setSessions(data.sessions)
        }
      }
    } catch (error) {
      console.error('Error fetching mentorship data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMentorsAndSessions()
  }, [])

  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingMentor || !sessionDate) return
    setIsBooking(true)
    setBookingError('')

    try {
      const res = await fetch('/api/mentors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mentorId: bookingMentor.id,
          type: sessionType,
          date: sessionDate,
          notes: sessionNotes,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setSessions((prev) => [data.session, ...prev])
        setBookingMentor(null)
        setSessionDate('')
        setSessionNotes('')
      } else {
        setBookingError(data.error || 'Failed to book session')
      }
    } catch (err) {
      console.error(err)
      setBookingError('Network error. Please try again.')
    } finally {
      setIsBooking(false)
    }
  }

  const getMentorName = (mentorId: string) => {
    const m = mentors.find((mentor) => mentor.id === mentorId)
    return m ? m.name : 'Expert Advisor'
  }

  return (
    <div className="space-y-8 select-none relative">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Expert Mentorship</h1>
        <p className="text-sm text-text-secondary">
          Schedule 1-on-1 consultations with industry leaders to accelerate your Career OS goals.
        </p>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-text-secondary text-sm">Loading advisors directory...</div>
      ) : (
        <>
          {/* Mentor Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-[#0b0b0e] border border-white/[0.06] rounded-2xl p-6 sm:p-8 hover:border-indigo-500/30 transition-all duration-300 group shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">{mentor.name}</h3>
                      <p className="text-xs sm:text-sm text-indigo-400 font-medium">
                        {mentor.title} at <span className="text-white font-semibold">{mentor.company}</span>
                      </p>
                    </div>
                    <div className="w-11 h-11 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-full flex items-center justify-center font-bold text-base sm:text-lg">
                      {mentor.name.charAt(0)}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary mb-5 leading-relaxed">{mentor.bio}</p>

                  <div className="flex items-center gap-1.5 mb-5">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs sm:text-sm font-bold text-white">{mentor.rating}</span>
                    <span className="text-xs sm:text-sm text-text-muted font-medium">
                      ({mentor.sessionCount} sessions)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {mentor.expertise.map((skill, sidx) => (
                      <span
                        key={sidx}
                        className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] sm:text-xs rounded-md font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white/[0.01] border border-white/[0.06] rounded-xl">
                    <div>
                      <p className="text-[10px] text-text-muted mb-1 font-semibold uppercase tracking-wider">
                        Availability
                      </p>
                      <p className="text-xs text-white font-bold truncate">{mentor.availability}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted mb-1 font-semibold uppercase tracking-wider">
                        Experience
                      </p>
                      <p className="text-xs text-white font-bold">{mentor.experience}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setBookingMentor(mentor)}
                      className="flex-1 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 active:scale-[0.98] border border-indigo-500/30"
                    >
                      <Calendar size={14} />
                      Book Session
                    </button>
                    <button className="px-4 py-2.5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/[0.15] text-white rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 inline-flex items-center justify-center gap-2">
                      <MessageCircle size={14} />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* My Sessions Section */}
          <div className="bg-[#0b0b0e] border border-white/[0.06] rounded-2xl p-6 sm:p-8 shadow-md">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-6 tracking-tight">Your Consultations</h2>

            {sessions.length === 0 ? (
              <div className="text-center py-8 text-sm text-text-secondary border border-dashed border-white/[0.06] rounded-xl bg-white/[0.01]">
                No consultations scheduled yet. Book an expert session above!
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-[#0c0c0f] border border-white/[0.06] border-l-4 border-l-indigo-500 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                      <div>
                        <p className="font-semibold text-white text-sm sm:text-base">{session.type}</p>
                        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                          with {getMentorName(session.mentorId)}
                        </p>
                        {session.notes && (
                          <p className="text-xs text-text-secondary mt-1.5 italic bg-white/[0.02] p-2 rounded border border-white/[0.04]">
                            Notes: &ldquo;{session.notes}&rdquo;
                          </p>
                        )}
                      </div>
                      <div className="text-right sm:items-end flex flex-col">
                        <span className="text-xs sm:text-sm font-bold text-indigo-400">{session.date}</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold rounded uppercase tracking-wider mt-1 w-max">
                          {session.status}
                        </span>
                      </div>
                    </div>
                    <button className="text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition duration-250 font-bold flex items-center gap-1.5">
                      <Video size={13} />
                      Join Consultation Room &rarr;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Booking Dialog Modal */}
      <AnimatePresence>
        {bookingMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingMentor(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#0c0c0f] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden relative z-10 p-6 sm:p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="text-indigo-400" size={18} />
                  Book Consultation
                </h2>
                <button
                  onClick={() => setBookingMentor(null)}
                  className="p-1 hover:bg-white/[0.04] rounded-lg transition text-zinc-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {bookingError && (
                <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-400 text-xs rounded-lg font-medium mb-4">
                  {bookingError}
                </div>
              )}

              <form onSubmit={handleBookSession} className="space-y-4">
                <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-xs space-y-1 mb-2">
                  <p className="text-zinc-500">Mentor Selected</p>
                  <p className="text-sm font-bold text-white">{bookingMentor.name}</p>
                  <p className="text-[10px] text-indigo-400">{bookingMentor.title}</p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Session Topic / Type
                  </label>
                  <select
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value)}
                    className="w-full h-10 px-4 bg-[#0f0f13] border border-white/[0.06] hover:border-white/[0.1] focus:border-indigo-500 rounded-lg text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  >
                    <option value="1-on-1 Coaching">1-on-1 Coaching</option>
                    <option value="Resume & Portfolio Audit">Resume & Portfolio Audit</option>
                    <option value="System Design & Architecture">System Design & Architecture</option>
                    <option value="Mock Tech Interview">Mock Tech Interview</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Date & Time
                  </label>
                  <input
                    type="text"
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    placeholder="E.g., Tomorrow at 3:30 PM"
                    className="w-full h-10 px-4 bg-[#0f0f13] border border-white/[0.06] hover:border-white/[0.1] focus:border-indigo-500 rounded-lg text-white text-xs placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                    required
                  />
                  <p className="text-[9px] text-text-muted mt-1">
                    Mentor Availability: {bookingMentor.availability}
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Consultation Notes (Optional)
                  </label>
                  <textarea
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    placeholder="Describe what you want to focus on (e.g., Code review of SQL normalisation, PyTorch training loss debugging...)"
                    rows={3}
                    className="w-full p-4 bg-[#0f0f13] border border-white/[0.06] hover:border-white/[0.1] focus:border-indigo-500 rounded-lg text-white text-xs placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingMentor(null)}
                    className="px-4 py-2 border border-white/[0.06] hover:bg-white/[0.02] text-zinc-400 hover:text-white rounded-lg text-xs font-bold transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isBooking || !sessionDate.trim()}
                    className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                  >
                    {isBooking ? 'Booking...' : 'Book Session'}
                    <ArrowRight size={12} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
