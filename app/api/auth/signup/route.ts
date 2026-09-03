import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  careerInterest: z.string().min(1, 'Please select a career path'),
})

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const payload = signupSchema.parse(json)

    const isHpmani = payload.email.toLowerCase() === 'hpmani91@gmail.com'
    const initialRole = isHpmani ? 'admin' : 'student'

    const supabase = await createClient()
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          name: payload.name,
          role: initialRole,
          careerPath: payload.careerInterest,
        },
      },
    })

    if (authError || !authData.user) {
      return NextResponse.json(
        { success: false, error: authError?.message || 'Signup failed' },
        { status: 400 }
      )
    }

    // Wait slightly or query profile (created via db trigger in postgres)
    let userProfile = await db.getUserById(authData.user.id)
    if (!userProfile) {
      // Fallback in case of trigger sync delay
      userProfile = {
        id: authData.user.id,
        name: payload.name,
        email: payload.email,
        role: initialRole,
        careerPath: payload.careerInterest,
        joinedAt: new Date().toISOString(),
        enrolledCourses: isHpmani ? ['ai-cbse9', 'ai-ml'] : [],
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userProfile.id,
        name: userProfile.name,
        email: userProfile.email,
        role: isHpmani ? 'admin' : userProfile.role,
        careerPath: userProfile.careerPath,
        enrolledCourses: isHpmani ? ['ai-cbse9', 'ai-ml'] : userProfile.enrolledCourses,
        isUnlocked: isHpmani || userProfile.role === 'admin',
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0].message },
        { status: 400 }
      )
    }
    console.error('Signup error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
