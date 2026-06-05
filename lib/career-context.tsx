'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface CareerContextType {
  selectedCareer: string | null
  setSelectedCareer: (career: string | null) => void
}

const CareerContext = createContext<CareerContextType | undefined>(undefined)

export function CareerProvider({ children }: { children: React.ReactNode }) {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load career from localStorage on mount
    const stored = typeof window !== 'undefined' ? localStorage.getItem('selectedCareer') : null
    setSelectedCareer(stored)
    setIsLoading(false)
  }, [])

  const handleSetCareer = (career: string | null) => {
    setSelectedCareer(career)
    if (typeof window !== 'undefined') {
      if (career) {
        localStorage.setItem('selectedCareer', career)
      } else {
        localStorage.removeItem('selectedCareer')
      }
    }
  }

  if (isLoading) {
    return <>{children}</>
  }

  return (
    <CareerContext.Provider value={{ selectedCareer, setSelectedCareer: handleSetCareer }}>
      {children}
    </CareerContext.Provider>
  )
}

export function useCareer() {
  const context = useContext(CareerContext)
  if (context === undefined) {
    throw new Error('useCareer must be used within CareerProvider')
  }
  return context
}
