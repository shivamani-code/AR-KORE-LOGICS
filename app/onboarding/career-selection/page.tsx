'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const careerPaths = [
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Master frontend and backend technologies to build complete web applications',
    duration: '6-9 months',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Learn to build intelligent systems using Python, TensorFlow, and modern ML frameworks',
    duration: '8-12 months',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP'],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Become a security expert and protect systems from threats',
    duration: '6-8 months',
    skills: ['Penetration Testing', 'Network Security', 'Encryption', 'OWASP'],
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Turn data into insights with analytics, visualization, and statistical modeling',
    duration: '7-10 months',
    skills: ['Python', 'SQL', 'Pandas', 'Tableau'],
  },
  {
    id: 'cloud',
    title: 'Cloud Computing',
    description: 'Master AWS, GCP, and Azure to build scalable cloud infrastructure',
    duration: '5-7 months',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'DevOps'],
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    description: 'Build and maintain robust CI/CD pipelines and infrastructure',
    duration: '6-8 months',
    skills: ['Jenkins', 'Git', 'Linux', 'Cloud Platforms'],
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Create beautiful and intuitive user experiences',
    duration: '5-6 months',
    skills: ['Figma', 'Design Systems', 'UX Research', 'Prototyping'],
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Build iOS and Android applications with modern frameworks',
    duration: '6-9 months',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
  },
]

export default function CareerSelectionPage() {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)
  const router = useRouter()

  const handleSelect = (careerId: string) => {
    setSelectedCareer(careerId)
    // Store in localStorage for now (later connect to database)
    localStorage.setItem('selectedCareer', careerId)
    // Redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard')
    }, 300)
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">
              Choose Your Learning Path
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto text-pretty">
              Select a career path that interests you. You can always change this later in your dashboard settings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {careerPaths.map((path) => (
              <button
                key={path.id}
                onClick={() => handleSelect(path.id)}
                className={`text-left p-4 sm:p-6 rounded-xl border-2 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  selectedCareer === path.id
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-lg'
                }`}
                aria-pressed={selectedCareer === path.id}
                aria-label={`Select ${path.title} career path`}
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {path.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-4">
                  {path.description}
                </p>
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-1 font-semibold">Duration</p>
                  <p className="text-xs sm:text-sm text-slate-700">{path.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1 font-semibold">Key Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {path.skills.slice(0, 2).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {path.skills.length > 2 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                        +{path.skills.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                {selectedCareer === path.id && (
                  <div className="mt-4 flex items-center gap-2 text-purple-600 font-semibold">
                    Redirecting <ArrowRight size={16} className="animate-pulse" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-600">
              Not sure yet?{' '}
              <Link href="/dashboard" className="text-purple-600 hover:text-pink-500 font-semibold transition">
                Skip for now
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
