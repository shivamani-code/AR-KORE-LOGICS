'use client'

import Link from 'next/link'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, create user account here
    // For now, redirect to career selection
    setTimeout(() => {
      router.push('/onboarding/career-selection')
    }, 300)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="w-full max-w-md px-4 sm:px-6 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-blue-200/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AR</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-600 text-sm">Join AR LOGICS and start your learning journey</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/50 backdrop-blur-sm border border-slate-200/50 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition-all duration-300 hover:border-slate-300"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-sm font-semibold text-slate-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
                <input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/50 backdrop-blur-sm border border-slate-200/50 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition-all duration-300 hover:border-slate-300"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-sm font-semibold text-slate-900 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50/50 backdrop-blur-sm border border-slate-200/50 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition-all duration-300 hover:border-slate-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                At least 8 characters with uppercase and numbers
              </p>
            </div>

            <label htmlFor="terms" className="flex items-start gap-2 cursor-pointer">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 bg-white border border-slate-300 rounded cursor-pointer mt-0.5 focus:ring-2 focus:ring-blue-500"
                required
              />
              <span className="text-slate-600 text-xs sm:text-sm font-medium">
                I agree to the{' '}
                <Link href="#" className="text-blue-600 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" className="text-blue-600 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-400/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              Create Account
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-600">Or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="py-3 px-4 border border-slate-200/50 rounded-xl text-slate-700 hover:text-slate-900 hover:border-blue-300/50 hover:bg-blue-50/50 backdrop-blur-sm transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-102 active:scale-98"
              aria-label="Sign up with Google"
            >
              Google
            </button>
            <button
              type="button"
              className="py-3 px-4 border border-slate-200/50 rounded-xl text-slate-700 hover:text-slate-900 hover:border-blue-300/50 hover:bg-blue-50/50 backdrop-blur-sm transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-102 active:scale-98"
              aria-label="Sign up with GitHub"
            >
              GitHub
            </button>
          </div>

          <p className="text-center text-slate-600 mt-6 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-cyan-600 transition font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
