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

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-white border border-slate-300 rounded cursor-pointer"
                  />
                  <span className="text-slate-600 text-sm">Remember me</span>
                </label>
                <Link href="#" className="text-purple-600 hover:text-pink-500 transition text-sm font-semibold">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-purple-300/50 transition"
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
              <button className="py-3 border border-slate-200 rounded-lg text-slate-700 hover:text-slate-900 hover:border-purple-300 hover:bg-purple-50 transition font-semibold">
                Google
              </button>
              <button className="py-3 border border-slate-200 rounded-lg text-slate-700 hover:text-slate-900 hover:border-purple-300 hover:bg-purple-50 transition font-semibold">
                GitHub
              </button>
            </div>

            <p className="text-center text-slate-600 mt-8">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-purple-600 hover:text-pink-500 transition font-semibold">
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
