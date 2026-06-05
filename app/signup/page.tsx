'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
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
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Get Started
              </h1>
              <p className="text-slate-600">
                Join thousands of students becoming industry-ready
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-slate-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-slate-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-2" id="password-hint">
                  At least 8 characters with uppercase and numbers
                </p>
              </div>

              <label htmlFor="terms" className="flex items-start gap-2 cursor-pointer">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 bg-white border border-slate-300 rounded cursor-pointer mt-0.5 focus:ring-2 focus:ring-purple-500"
                  required
                />
                <span className="text-slate-600 text-sm">
                  I agree to the{' '}
                  <Link href="#" className="text-purple-600 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 py-0.5">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-purple-600 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 py-0.5">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-purple-300/50 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Create Account
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-600">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="py-3 px-4 border border-slate-200 rounded-lg text-slate-700 hover:text-slate-900 hover:border-purple-300 hover:bg-purple-50 transition font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Sign up with Google"
              >
                Google
              </button>
              <button
                type="button"
                className="py-3 px-4 border border-slate-200 rounded-lg text-slate-700 hover:text-slate-900 hover:border-purple-300 hover:bg-purple-50 transition font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Sign up with GitHub"
              >
                GitHub
              </button>
            </div>

            <p className="text-center text-slate-600 mt-8">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-600 hover:text-pink-500 transition font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 py-0.5">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
