'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface UserContextType {
  userName: string
  userEmail: string
  userRole: string
  isUnlocked: boolean
  selectedCareer: string
  enrolledCourses: string[]
  isLoading: boolean
  setUserName: (name: string) => void
  setUserEmail: (email: string) => void
  setUserRole: (role: string) => void
  setSelectedCareer: (career: string) => void
  setEnrolledCourses: (courses: string[]) => void
  refreshUserData: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState('Learner')
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState('student')
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
          if (data.user.email) {
            setUserEmail(data.user.email)
          }
          if (data.user.role) {
            setUserRole(data.user.role)
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

  const isUnlocked =
    userEmail.toLowerCase() === 'hpmani91@gmail.com' ||
    userRole === 'admin'

  return (
    <UserContext.Provider
      value={{
        userName,
        userEmail,
        userRole,
        isUnlocked,
        selectedCareer,
        enrolledCourses,
        isLoading,
        setUserName,
        setUserEmail,
        setUserRole,
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
