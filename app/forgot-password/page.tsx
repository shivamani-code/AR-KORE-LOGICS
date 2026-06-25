'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/logo'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, send reset email
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-white selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-hidden flex flex-col justify-between">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none z-0" />
      
      {/* Small top header */}
      <header className="w-full py-6 px-8 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2.5" aria-label="AR KORE LOGICS home">
          <Logo className="w-5.5 h-5.5 text-white" />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            AR KORE LOGICS
          </span>
        </Link>
      </header>

      {/* Main container */}
      <div className="py-20 px-4 relative z-10 flex-1 flex items-center justify-center">
        <div className="max-w-[360px] w-full">
          <div className="bg-[#0c0c0f] border border-white/[0.06] rounded-xl p-6 shadow-xl animate-in">
            <div className="text-center mb-6">
              <h1 className="text-xl font-semibold text-white mb-1.5 tracking-tight">
                Reset your password
              </h1>
              <p className="text-zinc-400 text-xs leading-relaxed">
                {submitted
                  ? 'Check your email for reset instructions'
                  : 'Enter your email to receive a password reset link'}
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-zinc-500 pointer-events-none" size={14} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full h-10 pl-9 pr-4 bg-[#0f0f13] border border-white/[0.06] hover:border-white/[0.1] focus:border-indigo-500 rounded-lg text-white text-xs placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-white text-black hover:bg-zinc-200 rounded-lg text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-white active:scale-[0.98]"
                >
                  Send Reset Link
                </button>
              </form>
            ) : (
              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-4 text-center">
                <p className="text-emerald-400 text-xs leading-relaxed">
                  We&apos;ve sent a password reset link to <strong className="text-white font-semibold">{email}</strong>. Please check your inbox and follow the instructions.
                </p>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors text-xs font-medium focus:outline-none rounded px-2.5 py-1"
              >
                <ArrowLeft size={14} />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="w-full py-6 text-center text-xs text-zinc-600 relative z-10 border-t border-white/[0.03]">
        &copy; {new Date().getFullYear()} AR KORE LOGICS. All rights reserved.
      </footer>
    </main>
  )
}

