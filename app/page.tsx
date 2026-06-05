import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { Testimonials } from '@/components/testimonials'
import { Pricing } from '@/components/pricing'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  )
}
