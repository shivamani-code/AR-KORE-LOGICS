import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthenticatedUser } from '@/lib/auth'
import { z } from 'zod'

const settingsSchema = z.object({
  careerPath: z.string().optional(),
  enrolledCourses: z.array(z.string()).optional(),
  name: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
})

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }

    const json = await request.json()
    const payload = settingsSchema.parse(json)

    if (payload.enrolledCourses && payload.careerPath) {
      await db.updateUserEnrollments(user.id, payload.enrolledCourses, payload.careerPath)
    } else if (payload.careerPath) {
      await db.updateUserCareerPath(user.id, payload.careerPath)
    }
    
    if (payload.name || payload.email) {
      const targetName = payload.name ?? user.name
      const targetEmail = payload.email ?? user.email
      await db.updateUserProfile(user.id, targetName, targetEmail)
    }

    return NextResponse.json({
      success: true,
      careerPath: payload.careerPath,
      name: payload.name,
      email: payload.email,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.issues[0].message }, { status: 400 })
    }
    console.error('Settings update error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
