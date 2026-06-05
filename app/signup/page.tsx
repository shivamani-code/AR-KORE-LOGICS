'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="min-h-screen bg-[#0A0E1A]">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#F9FAFB] mb-2">
                Get Started
              </h1>
              <p className="text-[#9CA3AF]">
                Join thousands of students becoming industry-ready
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#F9FAFB] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-[#9CA3AF]" size={20} />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-[#0A0E1A] border border-[#1F2937] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:border-[#00E5FF] focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F9FAFB] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-[#9CA3AF]" size={20} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#0A0E1A] border border-[#1F2937] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:border-[#00E5FF] focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F9FAFB] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-[#9CA3AF]" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-[#0A0E1A] border border-[#1F2937] rounded-lg text-[#F9FAFB] placeholder-[#9CA3AF] focus:border-[#00E5FF] focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#9CA3AF] hover:text-[#F9FAFB]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-[#9CA3AF] mt-2">
                  At least 8 characters with uppercase and numbers
                </p>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-[#0A0E1A] border border-[#1F2937] rounded cursor-pointer"
                />
                <span className="text-[#9CA3AF] text-sm">
                  I agree to the{' '}
                  <Link href="#" className="text-[#00E5FF] hover:text-[#14F195]">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-[#00E5FF] hover:text-[#14F195]">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#00E5FF] to-[#14F195] text-[#0A0E1A] rounded-lg font-bold hover:shadow-lg hover:shadow-[#00E5FF]/30 transition"
              >
                Create Account
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1F2937]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#111827] text-[#9CA3AF]">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="py-3 border border-[#1F2937] rounded-lg text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#00E5FF] transition font-semibold">
                Google
              </button>
              <button className="py-3 border border-[#1F2937] rounded-lg text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#00E5FF] transition font-semibold">
                GitHub
              </button>
            </div>

            <p className="text-center text-[#9CA3AF] mt-8">
              Already have an account?{' '}
              <Link href="/login" className="text-[#00E5FF] hover:text-[#14F195] transition font-semibold">
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
