import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user: authUser } } = await supabase.auth.getUser()

    if (!authUser) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const user = await db.getUserById(authUser.id)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User session not found' },
        { status: 401 }
      )
    }

    const isHpmani = user.email?.toLowerCase() === 'hpmani91@gmail.com' || authUser.email?.toLowerCase() === 'hpmani91@gmail.com'
    const role = isHpmani ? 'admin' : user.role
    const enrolledCourses = isHpmani && (!user.enrolledCourses || user.enrolledCourses.length === 0)
      ? ['ai-cbse9', 'ai-ml']
      : user.enrolledCourses

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
        careerPath: user.careerPath,
        enrolledCourses,
        isUnlocked: isHpmani || role === 'admin',
      },
    })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
