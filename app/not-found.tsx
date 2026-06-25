import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-void text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative z-10 text-center max-w-md w-full p-8 rounded-2xl border border-white/5 bg-deep/50 backdrop-blur-xl shadow-2xl flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 mb-6 text-brand-bright animate-pulse">
          <Compass className="w-8 h-8" />
        </div>
        
        <h1 className="text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-bright to-accent-cyan mb-2">
          404
        </h1>
        
        <h2 className="text-xl font-bold tracking-tight text-white mb-4">
          Lost in the Void
        </h2>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          The page you are looking for has either migrated to a new coordinate, or it doesn't exist in our career universe.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-brand-primary to-brand-glow text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Navigation
        </Link>
      </div>
    </div>
  )
}
