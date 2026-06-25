'use client'

import Link from 'next/link'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/logo'

const miniRoadmapNodes = [
  { label: 'Computer Networks', status: 'completed' },
  { label: 'Linux Foundations', status: 'completed' },
  { label: 'Python Scripting', status: 'active' },
  { label: 'Web Security', status: 'locked' },
]

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, careerInterest: 'AI & Machine Learning' }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Registration failed. Please check inputs.')
        setIsLoading(false)
        return
      }

      if (data.user?.name) {
        // Fetch via API later
      }
      if (data.user?.careerPath) {
        // Fetch via API later
      }

      router.push('/onboarding')
    } catch (err) {
      console.error(err)
      setError('Connection error. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#09090b] flex flex-col md:flex-row relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none z-0" />
      
      {/* LEFT PANEL: Visual Brand Preview (42% on desktop) */}
      <div className="hidden md:flex md:w-[42%] bg-[#0c0c0f] border-r border-white/[0.04] relative flex-col justify-between p-12 overflow-hidden select-none z-10">
        
        {/* Branding header */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="AR KORE LOGICS home">
            <Logo className="w-5.5 h-5.5 text-white" />
            <span className="text-[15px] font-semibold tracking-tight text-white">
              AR KORE LOGICS
            </span>
          </Link>
        </div>

        {/* Middle graphics block */}
        <div className="relative z-10 my-auto space-y-8 max-w-sm">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight tracking-tight">
              Start your journey to becoming{' '}
              <span className="text-zinc-400">
                industry-ready
              </span>
              .
            </h2>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Structured paths. Real-world skills. 1-on-1 expert mentorship.
            </p>
          </div>

          {/* Mini roadmap preview widget */}
          <div className="bg-[#0f0f13] border border-white/[0.06] rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-widest">Current Path Preview</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-white/[0.02] border border-white/[0.06] rounded text-zinc-400 font-medium uppercase tracking-wider">Milestones</span>
            </div>
            
            <div className="relative space-y-3.5 pl-5">
              {/* Vertical connector line */}
              <div className="absolute left-[5px] top-1.5 bottom-1.5 w-[1px] bg-white/[0.06]" />
              
              {miniRoadmapNodes.map((node, idx) => (
                <div key={idx} className="flex items-center gap-3 relative">
                  {/* Circle Indicator */}
                  <div className="absolute -left-[19px] flex items-center justify-center">
                    {node.status === 'completed' ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 flex items-center justify-center">
                        <svg width="5" height="5" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    ) : node.status === 'active' ? (
                      <div className="w-2.5 h-2.5 rounded-full border border-indigo-400 bg-[#09090b] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      </div>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full border border-white/10 bg-[#09090b]" />
                    )}
                  </div>
                  
                  {/* Node Name */}
                  <span className={`text-[11px] font-medium transition-colors ${
                    node.status === 'completed' ? 'text-zinc-400' :
                    node.status === 'active' ? 'text-indigo-400 font-semibold' :
                    'text-zinc-600'
                  }`}>
                    {node.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer social stats */}
        <div className="relative z-10 text-[11px] text-zinc-500 font-medium">
          Join <strong className="text-zinc-300 font-semibold">12,000+</strong> learners charting their paths.
        </div>
      </div>

      {/* RIGHT PANEL: Form Container */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10 bg-[#09090b]">
        <div className="w-full max-w-[340px] space-y-6">
          <div className="flex flex-col space-y-2 text-center md:text-left">
            {/* Small mobile branding header */}
            <div className="flex justify-center md:hidden mb-4">
              <Link href="/" className="flex items-center gap-2" aria-label="AR KORE LOGICS home">
                <Logo className="w-5 h-5 text-white" />
                <span className="text-base font-semibold tracking-tight text-white">
                  AR KORE LOGICS
                </span>
              </Link>
            </div>
            
            <h1 className="text-xl font-semibold tracking-tight text-white">Create Account</h1>
            <p className="text-zinc-400 text-xs">
              Sign up today and get access to your customized dashboard.
            </p>
          </div>

          {/* Social login button */}
          <button
            type="button"
            className="w-full h-10 bg-transparent hover:bg-white/[0.02] border border-white/[0.06] rounded-lg text-zinc-300 hover:text-white text-xs font-medium flex items-center justify-center gap-2.5 transition-colors focus:outline-none focus:ring-1 focus:ring-white"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            Sign up with Google
          </button>

          <div className="flex items-center gap-3 my-5 text-[9px] text-zinc-600 font-bold uppercase tracking-widest before:content-[''] before:h-[1px] before:bg-white/[0.04] before:flex-1 after:content-[''] after:h-[1px] after:bg-white/[0.04] after:flex-1">
            or email
          </div>

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-400 text-xs rounded-lg font-medium">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-zinc-500 pointer-events-none" size={14} aria-hidden="true" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-10 pl-9 pr-4 bg-[#0f0f13] border border-white/[0.06] hover:border-white/[0.1] focus:border-indigo-500 rounded-lg text-white text-xs placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-zinc-500 pointer-events-none" size={14} aria-hidden="true" />
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-10 pl-9 pr-4 bg-[#0f0f13] border border-white/[0.06] hover:border-white/[0.1] focus:border-indigo-500 rounded-lg text-white text-xs placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  required
                  aria-label="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-zinc-500 pointer-events-none" size={14} aria-hidden="true" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 pl-9 pr-10 bg-[#0f0f13] border border-white/[0.06] hover:border-white/[0.1] focus:border-indigo-500 rounded-lg text-white text-xs placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  required
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-zinc-500 hover:text-white transition-colors focus:outline-none rounded p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}
                </button>
              </div>
            </div>

            <div className="pt-1">
              <label htmlFor="terms" className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 bg-zinc-950 border-white/[0.08] text-indigo-600 rounded focus:ring-offset-0 focus:ring-indigo-500 cursor-pointer"
                  required
                />
                <span className="text-zinc-500 text-xs font-medium leading-normal">
                  I agree to the{' '}
                  <Link href="#" className="text-zinc-300 hover:text-white font-medium transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-zinc-300 hover:text-white font-medium transition-colors">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-white text-black hover:bg-zinc-200 rounded-lg text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-white active:scale-[0.98] mt-2 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Get Started'}
            </button>
          </form>

          <p className="text-center text-zinc-500 text-xs pt-2">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-zinc-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded px-1"
            >
              Sign in
            </Link>
          </p>


        </div>
      </div>
    </main>
  )
}

