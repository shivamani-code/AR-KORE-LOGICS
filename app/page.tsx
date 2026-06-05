import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { CareerPaths } from '@/components/career-paths'
import { HowItWorks } from '@/components/how-it-works'
import { MentorsSection } from '@/components/mentors-section'
import { Testimonials } from '@/components/testimonials'
import { Pricing } from '@/components/pricing'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0A0E1A]">
      <Navbar />
      <Hero />
      <CareerPaths />
      <HowItWorks />
      <MentorsSection />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  )
}
