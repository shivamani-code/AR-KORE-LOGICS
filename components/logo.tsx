import React from 'react'

export function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 600 850" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Triangle/A shape */}
      <path 
        d="M300 100 L490 600 H400 L300 370 L200 600 H110 Z" 
        fill="currentColor"
      />
      {/* Internal R curve & leg */}
      <path 
        d="M285 340 H330 C380 340 410 370 410 415 C410 460 380 490 330 490 H285 Z" 
        fill="currentColor"
      />
      <path 
        d="M330 490 L425 600 H335 L255 500 H285 Z" 
        fill="currentColor"
      />
    </svg>
  )
}
