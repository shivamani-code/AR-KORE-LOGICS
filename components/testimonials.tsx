'use client'

import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer at Google',
    text: 'SkillVerse completely transformed my learning journey. The structured roadmaps and mentorship made all the difference in landing my dream job.',
    image: 'PS',
  },
  {
    name: 'Arjun Kumar',
    role: 'Full Stack Developer',
    text: 'The curated resources are exactly what I needed. No more wasting time on random courses. This platform is incredibly focused and effective.',
    image: 'AK',
  },
  {
    name: 'Meera Patel',
    role: 'Data Scientist at Meta',
    text: 'The mentorship sessions were invaluable. My mentor reviewed my projects and gave me real-world insights that helped me crack my interviews.',
    image: 'MP',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with SkillVerse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <article
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 relative hover:shadow-lg hover:border-purple-200 transition"
            >
              <Quote className="text-purple-200 absolute top-6 right-6" size={32} aria-hidden="true" />
              
              <blockquote className="text-slate-700 mb-6 relative z-10 italic">
                "{testimonial.text}"
              </blockquote>

              <div className="flex items-center gap-4 relative z-10">
                <div
                  className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                  aria-label={`Avatar for ${testimonial.name}`}
                >
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-bold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
