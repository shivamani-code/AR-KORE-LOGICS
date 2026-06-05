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
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Choose the plan that works for you. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl p-8 border transition ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 shadow-2xl shadow-purple-300/20 transform md:scale-105'
                  : 'bg-white border-slate-200 hover:border-purple-200 hover:shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 right-8 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                {plan.description}
              </p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900">
                  {plan.price}
                </span>
                <span className="text-slate-600 ml-2">
                  {plan.period}
                </span>
              </div>

              <button className={`w-full py-3 rounded-lg font-semibold transition mb-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-300/50'
                  : 'bg-purple-100 text-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white'
              }`}>
                {plan.cta}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-center gap-3">
                    <Check className="text-green-500" size={20} />
                    <span className="text-slate-700">
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
