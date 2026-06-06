'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, send reset email
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-50">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Reset Your Password
              </h1>
              <p className="text-slate-600">
                {submitted
                  ? 'Check your email for reset instructions'
                  : 'Enter your email to receive a password reset link'}
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-blue-300/50 transition"
                >
                  Send Reset Link
                </button>
              </form>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800">
                  We&apos;ve sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
                </p>
              </div>
            )}

            <div className="mt-8 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-cyan-500 transition font-semibold"
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
