'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface UserContextType {
  userName: string
  selectedCareer: string
  enrolledCourses: string[]
  isLoading: boolean
  setUserName: (name: string) => void
  setSelectedCareer: (career: string) => void
  setEnrolledCourses: (courses: string[]) => void
  refreshUserData: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState('Learner')
  const [selectedCareer, setSelectedCareer] = useState('')
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        if (data.success && data.user) {
          if (data.user.name) {
            setUserName(data.user.name.split(' ')[0])
          }
          if (data.user.careerPath) {
            setSelectedCareer(data.user.careerPath)
          }
          if (data.user.enrolledCourses && Array.isArray(data.user.enrolledCourses)) {
            setEnrolledCourses(data.user.enrolledCourses)
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch user data in UserProvider:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <UserContext.Provider
      value={{
        userName,
        selectedCareer,
        enrolledCourses,
        isLoading,
        setUserName,
        setSelectedCareer,
        setEnrolledCourses,
        refreshUserData: fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
