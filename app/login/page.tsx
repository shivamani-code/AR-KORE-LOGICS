'use client'

import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/logo'

const miniRoadmapNodes = [
  { label: 'Computer Networks', status: 'completed' },
  { label: 'Linux Foundations', status: 'completed' },
  { label: 'Python Scripting', status: 'active' },
  { label: 'Web Security', status: 'locked' },
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy to log in.')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid email or password')
        setIsLoading(false)
        return
      }

      if (data.user?.name) {
        // user state is fetched directly from API in UserProvider
      }
      if (data.user?.careerPath) {
        // user state is fetched directly from API in UserProvider
      }

      router.push('/dashboard')
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
              Your roadmap to becoming{' '}
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
            
            <h1 className="text-xl font-semibold tracking-tight text-white">Welcome back</h1>
            <p className="text-zinc-400 text-xs">
              Enter your credentials to access your Career Workspace.
            </p>
          </div>



          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-400 text-xs rounded-lg font-medium">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-zinc-500 pointer-events-none" size={14} aria-hidden="true" />
                <input
                  id="email"
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
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-zinc-500 hover:text-white text-[11px] font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-zinc-500 pointer-events-none" size={14} aria-hidden="true" />
                <input
                  id="password"
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

            <div className="space-y-3 pt-1">
              <div className="flex items-center">
                <label htmlFor="remember" className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-3.5 h-3.5 bg-zinc-950 border-white/[0.08] text-indigo-600 rounded focus:ring-offset-0 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="text-zinc-400 text-xs font-medium">Keep me signed in</span>
                </label>
              </div>

              <div>
                <label htmlFor="login-terms" className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    id="login-terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    required
                    className="w-4 h-4 mt-0.5 bg-zinc-950 border-white/[0.08] text-indigo-600 rounded focus:ring-offset-0 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="text-zinc-400 text-xs font-medium leading-normal">
                    I agree to the{' '}
                    <Link
                      href="/terms"
                      target="_blank"
                      className="text-zinc-200 hover:text-white font-medium underline underline-offset-2 transition-colors"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/privacy"
                      target="_blank"
                      className="text-zinc-200 hover:text-white font-medium underline underline-offset-2 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-white text-black hover:bg-zinc-200 rounded-lg text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-white active:scale-[0.98] mt-2 disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-zinc-500 text-xs pt-2">
            New to AR KORE LOGICS?{' '}
            <Link
              href="/signup"
              className="text-zinc-300 hover:text-white font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded px-1"
            >
              Create an account
            </Link>
          </p>

          {/* Skip option */}
          <div className="flex flex-col items-center gap-2 pt-6 border-t border-white/[0.04] mt-6">
            <Link
              href="/dashboard"
              className="group flex items-center gap-1 text-zinc-500 hover:text-zinc-300 text-xs font-medium transition-colors"
            >
              <span>Skip login and go to dashboard</span>
              <ArrowRight size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

