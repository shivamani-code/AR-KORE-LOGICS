'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an analytics service
    console.error('Global Error Boundary caught:', error)
  }, [error])

  return (
    <div className="relative min-h-screen bg-void text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-destructive/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-md w-full p-8 rounded-2xl border border-white/5 bg-deep/50 backdrop-blur-xl shadow-2xl flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center border border-destructive/20 mb-6 text-destructive animate-pulse">
          <AlertCircle className="w-8 h-8" />
        </div>
        
        <h2 className="text-xl font-bold tracking-tight text-white mb-2">
          Something went wrong!
        </h2>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          An unexpected error occurred while processing this page. Please try again or contact support if the issue persists.
        </p>

        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-destructive to-red-600 text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <RefreshCw className="w-4 h-4" />
          Attempt Recovery
        </button>
      </div>
    </div>
  )
}
