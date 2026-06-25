import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthenticatedUser } from '@/lib/auth'
import { z } from 'zod'

const bookingSchema = z.object({
  mentorId: z.string().min(1, 'Mentor ID is required'),
  type: z.string().min(1, 'Session type is required'),
  date: z.string().min(1, 'Date and time are required'),
  notes: z.string().optional(),
})

export async function GET() {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }

    const mentors = await db.getMentors()
    const sessions = await db.getSessions(user.id)

    return NextResponse.json({
      success: true,
      mentors,
      sessions,
    })
  } catch (error) {
    console.error('Mentors GET API error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }

    const json = await request.json()
    const payload = bookingSchema.parse(json)

    const newSession = await db.createSession({
      studentId: user.id,
      mentorId: payload.mentorId,
      type: payload.type,
      date: payload.date,
      notes: payload.notes,
    })

    return NextResponse.json({
      success: true,
      session: newSession,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.issues[0].message }, { status: 400 })
    }
    console.error('Booking session error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
