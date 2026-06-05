'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-slate-600">
                Sign in to continue your learning journey
              </p>
            </div>

            <form className="space-y-6" noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
                  <input
                    id="password"
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
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <label htmlFor="remember" className="flex items-center gap-2 cursor-pointer">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 bg-white border border-slate-300 rounded cursor-pointer focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-slate-600 text-sm">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-purple-600 hover:text-pink-500 transition text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 py-0.5">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-purple-300/50 transition focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-600">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="py-3 px-4 border border-slate-200 rounded-lg text-slate-700 hover:text-slate-900 hover:border-purple-300 hover:bg-purple-50 transition font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Sign in with Google"
              >
                Google
              </button>
              <button
                type="button"
                className="py-3 px-4 border border-slate-200 rounded-lg text-slate-700 hover:text-slate-900 hover:border-purple-300 hover:bg-purple-50 transition font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Sign in with GitHub"
              >
                GitHub
              </button>
            </div>

            <p className="text-center text-slate-600 mt-8">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-purple-600 hover:text-pink-500 transition font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-1 py-0.5">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
