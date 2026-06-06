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
    <section id="pricing" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto text-pretty">
            Choose the plan that works for you. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl p-6 sm:p-8 border transition ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300 shadow-2xl shadow-blue-300/20 lg:scale-105'
                  : 'bg-white border-slate-200 hover:border-blue-200 hover:shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 right-4 sm:right-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                  Popular
                </div>
              )}

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                {plan.description}
              </p>

              <div className="mb-8">
                <span className="text-4xl sm:text-5xl font-bold text-slate-900">
                  {plan.price}
                </span>
                <span className="text-slate-600 ml-2 text-sm sm:text-base">
                  {plan.period}
                </span>
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-300/50'
                    : 'bg-blue-100 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:text-white'
                }`}
                aria-label={`${plan.cta} for ${plan.name} plan`}
              >
                {plan.cta}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-0.5" size={20} aria-hidden="true" />
                    <span className="text-slate-700 text-sm sm:text-base">
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
