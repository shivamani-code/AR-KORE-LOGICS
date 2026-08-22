import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { DashboardFeatures } from '@/components/dashboard-features'
import { FAQ } from '@/components/faq'
import { FinalCTA } from '@/components/final-cta'
import { Footer } from '@/components/footer'

// Phase 10: Seamless blending transitions between sections
const SeamlessDivider = () => (
  <div className="relative h-16 w-full bg-[#09090b] pointer-events-none z-20">
    <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/80 via-[#09090b]/10 to-[#09090b]/80 backdrop-blur-[1px]" />
    <div className="absolute top-1/2 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent" />
  </div>
)

export default function Page() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      <Hero />
      <SeamlessDivider />
      <DashboardFeatures />
      <SeamlessDivider />
      <FAQ />
      <SeamlessDivider />
      <FinalCTA />
      <Footer />
    </main>
  )
}
