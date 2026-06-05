'use client'

import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Get started with the basics',
    features: [
      'Access to all roadmaps',
      '30+ career paths',
      'Community resources',
      'Progress tracking',
      'Basic achievements',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$29',
    period: '/month',
    description: 'Everything you need to succeed',
    features: [
      'Everything in Free',
      'AI Mentor sessions',
      'Unlimited mentor bookings',
      'Premium roadmaps',
      'Resume builder',
      'Career guidance',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0E1A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#F9FAFB] mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            Choose the plan that works for you. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl p-8 border transition ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-[#111827] to-[#0A0E1A] border-[#00E5FF] shadow-2xl shadow-[#00E5FF]/20 transform md:scale-105'
                  : 'bg-[#111827] border-[#1F2937] hover:border-[#14F195]'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 right-8 bg-[#14F195] text-[#0A0E1A] px-4 py-1 rounded-full text-sm font-bold">
                  Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-[#F9FAFB] mb-2">
                {plan.name}
              </h3>
              <p className="text-[#9CA3AF] text-sm mb-6">
                {plan.description}
              </p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-[#F9FAFB]">
                  {plan.price}
                </span>
                <span className="text-[#9CA3AF] ml-2">
                  {plan.period}
                </span>
              </div>

              <button className={`w-full py-3 rounded-lg font-semibold transition mb-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#14F195] text-[#0A0E1A] hover:shadow-lg hover:shadow-[#00E5FF]/30'
                  : 'bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0A0E1A]'
              }`}>
                {plan.cta}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-center gap-3">
                    <Check className="text-[#14F195]" size={20} />
                    <span className="text-[#9CA3AF]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
