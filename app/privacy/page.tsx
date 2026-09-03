import Link from 'next/link'
import { ArrowLeft, Lock, Eye, ShieldCheck, Database, Cookie } from 'lucide-react'
import { Logo } from '@/components/logo'

export const metadata = {
  title: 'Privacy Policy | AR KORE LOGICS',
  description: 'Privacy Policy explaining how AR KORE LOGICS collects, handles, and protects your personal and educational data.',
}

export default function PrivacyPage() {
  const lastUpdated = 'September 2026'

  return (
    <main className="min-h-screen bg-[#09090b] text-white selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-hidden flex flex-col justify-between">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none z-0" />

      {/* Top Header */}
      <header className="w-full py-6 px-6 sm:px-12 border-b border-white/[0.04] relative z-10 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2.5" aria-label="AR KORE LOGICS home">
          <Logo className="w-5.5 h-5.5 text-white" />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            AR KORE LOGICS
          </span>
        </Link>
        <div className="flex items-center gap-4 text-xs font-medium">
          <Link href="/login" className="text-zinc-400 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-3 py-1.5 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16 flex-1 w-full">
        <div className="mb-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-xs font-medium mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Login
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <ShieldCheck size={18} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Privacy Policy
            </h1>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Last Updated: <span className="text-zinc-300 font-medium">{lastUpdated}</span>
          </p>
        </div>

        {/* Highlight Callout */}
        <div className="bg-[#0f0f13] border border-white/[0.06] rounded-xl p-5 sm:p-6 mb-10 text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-2">
          <p className="font-semibold text-white flex items-center gap-2">
            <Lock size={16} className="text-indigo-400" />
            Our Privacy Commitment
          </p>
          <p className="text-zinc-400">
            At AR KORE LOGICS, your privacy and trust are paramount. This Privacy Policy outlines how we collect, store, safeguard, and use your personal information when you interact with our educational ecosystem and career services.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">01.</span> Information We Collect
            </h2>
            <p className="text-zinc-400">
              We collect information that you provide directly to us, as well as data automatically generated during your platform usage:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-[#0c0c0f] border border-white/[0.04] rounded-lg p-3.5 space-y-1.5">
                <div className="text-white font-medium text-xs flex items-center gap-1.5">
                  <Eye size={13} className="text-indigo-400" /> Information You Provide
                </div>
                <ul className="text-zinc-400 text-[11px] list-disc list-inside space-y-1">
                  <li>Full name, email address, password credentials.</li>
                  <li>Career goals, tech skill interests, and bio.</li>
                  <li>Mentorship requests and feedback submissions.</li>
                </ul>
              </div>
              <div className="bg-[#0c0c0f] border border-white/[0.04] rounded-lg p-3.5 space-y-1.5">
                <div className="text-white font-medium text-xs flex items-center gap-1.5">
                  <Database size={13} className="text-indigo-400" /> Usage & Progress Data
                </div>
                <ul className="text-zinc-400 text-[11px] list-disc list-inside space-y-1">
                  <li>Course completion milestones and quiz responses.</li>
                  <li>Roadmap nodes unlocked and learning activity streaks.</li>
                  <li>Device type, browser details, and IP addresses.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">02.</span> How We Use Your Data
            </h2>
            <p className="text-zinc-400">
              We use your data strictly to deliver, personalize, and elevate your learning experience:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-zinc-400">
              <li>Customizing your personalized career roadmaps and module recommendations.</li>
              <li>Facilitating mentor bookings, scheduled sessions, and collaborative learning communities.</li>
              <li>Monitoring platform stability, diagnosing server performance, and preventing fraudulent logins.</li>
              <li>Sending essential account updates, security alerts, and milestone notifications.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">03.</span> Data Protection & Security
            </h2>
            <p className="text-zinc-400">
              We implement industry-standard encryption (TLS/HTTPS), salted password hashing, and secure token-based authentication (Supabase Auth / JWT) to protect your account data. Access to production databases is strictly restricted to authorized systems with least-privilege protocols.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">04.</span> Sharing & Third-Party Disclosure
            </h2>
            <p className="text-zinc-400">
              <strong className="text-zinc-200">We do NOT sell your personal data to advertisers or third parties.</strong> Data is shared only with trusted infrastructure providers required to operate AR KORE LOGICS (e.g. database hosting, cloud authentication, and telemetry providers), under strict confidentiality agreements.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">05.</span> Cookies & Local Storage
            </h2>
            <div className="flex items-start gap-3 bg-[#0c0c0f] border border-white/[0.04] rounded-lg p-3.5">
              <Cookie size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                We use strictly necessary session cookies and local storage tokens to keep you logged in and persist your interface preferences (e.g. theme mode and roadmap state). You may manage cookies via your browser settings.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">06.</span> Your Rights & Data Choices
            </h2>
            <p className="text-zinc-400">
              Depending on your location, you have rights under applicable privacy laws (including GDPR and CCPA) to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-zinc-400">
              <li>Request a copy of your stored personal profile and learning progress data.</li>
              <li>Correct inaccurate details in your user profile settings.</li>
              <li>Request full account deletion and erasure of your associated data.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">07.</span> Contact Us
            </h2>
            <p className="text-zinc-400">
              For any privacy inquiries, data subject access requests, or questions regarding this Privacy Policy, please contact our privacy compliance officer at{' '}
              <a href="mailto:privacy@arkorelogics.com" className="text-indigo-400 hover:text-indigo-300 underline">
                privacy@arkorelogics.com
              </a>.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 px-6 text-center text-xs text-zinc-600 relative z-10 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center max-w-4xl mx-auto gap-3">
        <p>&copy; 2026 AR KORE LOGICS. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="hover:text-zinc-400 transition-colors">
            Terms of Service
          </Link>
          <Link href="/login" className="hover:text-zinc-400 transition-colors">
            Sign In
          </Link>
        </div>
      </footer>
    </main>
  )
}
