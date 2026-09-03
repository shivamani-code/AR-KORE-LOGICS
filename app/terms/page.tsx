import Link from 'next/link'
import { ArrowLeft, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react'
import { Logo } from '@/components/logo'

export const metadata = {
  title: 'Terms of Service | AR KORE LOGICS',
  description: 'Terms of Service and conditions for using AR KORE LOGICS career navigation and learning platform.',
}

export default function TermsPage() {
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
              <FileText size={18} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Terms of Service
            </h1>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Last Updated: <span className="text-zinc-300 font-medium">{lastUpdated}</span>
          </p>
        </div>

        {/* Highlight Callout */}
        <div className="bg-[#0f0f13] border border-white/[0.06] rounded-xl p-5 sm:p-6 mb-10 text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-2">
          <p className="font-semibold text-white flex items-center gap-2">
            <ShieldCheck size={16} className="text-indigo-400" />
            Quick Overview
          </p>
          <p className="text-zinc-400">
            Welcome to AR KORE LOGICS. By accessing or using our platform, learning modules, mentorship programs, and career tools, you agree to comply with and be bound by the following terms. Please review them carefully before using our services.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-10 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">01.</span> Acceptance of Terms
            </h2>
            <p className="text-zinc-400">
              By creating an account, checking the agreement box during authentication, or accessing any part of the AR KORE LOGICS platform (&ldquo;Service&rdquo;), you confirm that you are at least 13 years of age (or the applicable legal age in your jurisdiction) and agree to be bound by these Terms of Service.
            </p>
            <p className="text-zinc-400">
              If you do not agree to these terms, you must not check the agreement box and you may not access or use the platform.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">02.</span> User Accounts & Authentication
            </h2>
            <div className="text-zinc-400 space-y-2">
              <p>
                To access courses, roadmaps, and mentorship tools, you must register for an account with accurate and up-to-date information.
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-zinc-400">
                <li>You are responsible for safeguarding your login credentials and password.</li>
                <li>You agree not to share your account with third parties or allow multiple users to share a single seat.</li>
                <li>You must notify AR KORE LOGICS immediately if you suspect unauthorized access or security breaches.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">03.</span> Learning Content & Intellectual Property
            </h2>
            <p className="text-zinc-400">
              All learning materials, interactive code sandboxes, roadmap structures, video lectures, guides, and text content provided on AR KORE LOGICS are the exclusive intellectual property of AR KORE LOGICS and its licensors.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-[#0c0c0f] border border-white/[0.04] rounded-lg p-3.5 space-y-1">
                <div className="text-emerald-400 font-semibold text-xs flex items-center gap-1.5">
                  <CheckCircle2 size={13} /> Allowed
                </div>
                <p className="text-zinc-400 text-[11px]">
                  Personal, non-commercial educational study, portfolio building, and completing platform projects.
                </p>
              </div>
              <div className="bg-[#0c0c0f] border border-white/[0.04] rounded-lg p-3.5 space-y-1">
                <div className="text-rose-400 font-semibold text-xs flex items-center gap-1.5">
                  ✕ Prohibited
                </div>
                <p className="text-zinc-400 text-[11px]">
                  Redistributing, screen recording for commercial sale, reselling, or scraping platform courses and mentor content.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">04.</span> Acceptable Use & Code of Conduct
            </h2>
            <p className="text-zinc-400">
              When engaging in community discussions, interacting with mentors, or submitting code reviews, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-zinc-400">
              <li>Maintain respectful and professional communication with fellow learners and mentors.</li>
              <li>Refrain from posting malicious code, reverse-engineering platform APIs, or probing security vulnerabilities.</li>
              <li>Avoid harassment, spam, hate speech, or sharing plagiarized solutions in community challenges.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">05.</span> Mentorship & Career Guidance Disclaimer
            </h2>
            <p className="text-zinc-400">
              AR KORE LOGICS provides structured educational tools, mentorship connections, and career roadmap simulations. While our curriculum is designed to prepare learners for real-world tech careers, we do not guarantee specific employment outcomes, job offers, or salary levels.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">06.</span> Account Suspension & Termination
            </h2>
            <p className="text-zinc-400">
              We reserve the right to suspend or terminate your account access at any time if we determine, in our sole discretion, that you have violated these Terms of Service or engaged in abusive or unlawful behavior.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">07.</span> Changes to Terms
            </h2>
            <p className="text-zinc-400">
              We may update these terms periodically to reflect new features, regulations, or platform policies. Any material modifications will be posted here with an updated revision date.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs">08.</span> Contact & Support
            </h2>
            <p className="text-zinc-400">
              If you have any questions or concerns regarding our Terms of Service, please contact our legal and support team at{' '}
              <a href="mailto:support@arkorelogics.com" className="text-indigo-400 hover:text-indigo-300 underline">
                support@arkorelogics.com
              </a>.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 px-6 text-center text-xs text-zinc-600 relative z-10 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center max-w-4xl mx-auto gap-3">
        <p>&copy; 2026 AR KORE LOGICS. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-zinc-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/login" className="hover:text-zinc-400 transition-colors">
            Sign In
          </Link>
        </div>
      </footer>
    </main>
  )
}
