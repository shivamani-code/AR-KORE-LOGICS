'use client'

import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

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
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-600 text-sm">Sign in to continue your learning journey with AR LOGICS</p>
          </div>

          <form className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/50 backdrop-blur-sm border border-slate-200/50 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:outline-none transition-all duration-300 hover:border-slate-300"
                    required
                  />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-900 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" size={20} aria-hidden="true" />
                  <input
                    id="password"
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
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <label htmlFor="remember" className="flex items-center gap-2 cursor-pointer">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 bg-white border border-slate-300 rounded cursor-pointer focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-slate-600 text-sm font-medium">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-blue-600 hover:text-cyan-600 transition text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 py-0.5">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-400/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              Sign In
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-600">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="py-3 px-4 border border-slate-200/50 rounded-xl text-slate-700 hover:text-slate-900 hover:border-blue-300/50 hover:bg-blue-50/50 backdrop-blur-sm transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-102 active:scale-98"
              aria-label="Sign in with Google"
            >
              Google
            </button>
            <button
              type="button"
              className="py-3 px-4 border border-slate-200/50 rounded-xl text-slate-700 hover:text-slate-900 hover:border-blue-300/50 hover:bg-blue-50/50 backdrop-blur-sm transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-102 active:scale-98"
              aria-label="Sign in with GitHub"
            >
              GitHub
            </button>
          </div>

          <p className="text-center text-slate-600 mt-6 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-cyan-600 transition font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
