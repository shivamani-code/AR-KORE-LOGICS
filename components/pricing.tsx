'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Get started with the basics',
    features: [
      'Access to all standard roadmaps',
      '30+ career pathways',
      'Community study resources',
      'Personal progress tracking',
      'Milestone tracking',
    ],
    cta: 'Get Started',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$29',
    period: '/month',
    description: 'Everything you need to succeed',
    features: [
      'Everything in Free',
      'AI Mentor mock interview sessions',
      'Unlimited mentor consultations',
      'High-fidelity system design paths',
      'Interactive portfolio builder',
      'Dedicated placement coordinators',
      'Priority ticketing support',
    ],
    cta: 'Start Free Trial',
    href: '/signup',
    highlighted: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 sm:px-8 lg:px-12 bg-[#09090b] relative border-b border-white/[0.04]">
      {/* Background patterns & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />
      <div className="absolute top-[30%] left-[-20%] w-[500px] h-[500px] bg-indigo-500/[0.015] blur-[150px] pointer-events-none rounded-full z-0" />
      <div className="absolute bottom-[20%] right-[-20%] w-[600px] h-[600px] bg-purple-500/[0.01] blur-[180px] pointer-events-none rounded-full z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Choose the plan that matches your learning pace. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl p-8 border flex flex-col justify-between transition-all duration-300 overflow-hidden ${
                plan.highlighted
                  ? 'bg-[#0c0c0f] border-indigo-500/35 shadow-2xl'
                  : 'bg-[#0b0b0e] border-white/[0.04] hover:border-indigo-500/20'
              }`}
            >
              {/* Subtle internal glows */}
              {plan.highlighted ? (
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.04)_0%,transparent_60%)]" />
              ) : (
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.02)_0%,transparent_70%)]" />
              )}

              {plan.highlighted && (
                <div className="absolute -top-3 right-6 bg-indigo-500/10 border border-indigo-500/35 text-indigo-300 px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase relative z-10">
                  Popular
                </div>
              )}

              <div className="relative z-10">
                <h3 className="text-sm font-semibold text-white mb-1.5">
                  {plan.name}
                </h3>
                <p className="text-zinc-500 text-xs mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-3xl font-semibold text-white">
                    {plan.price}
                  </span>
                  <span className="text-zinc-500 ml-1 text-xs font-mono">
                    {plan.period}
                  </span>
                </div>

                <div className="space-y-3.5 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-2.5">
                      <Check className="text-indigo-400 flex-shrink-0 mt-0.5" size={13} aria-hidden="true" />
                      <span className="text-zinc-400 text-xs leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={plan.href}
                className={`w-full h-10 rounded-lg font-semibold text-xs flex items-center justify-center transition-all duration-300 focus:outline-none relative z-10 ${
                  plan.highlighted
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-[#121216] border border-white/[0.06] hover:border-white/[0.12] text-zinc-300 hover:text-white'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

