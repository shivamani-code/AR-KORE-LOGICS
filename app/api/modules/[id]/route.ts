import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthenticatedUser } from '@/lib/auth'

export async function GET(request: Request, context: any) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }

    const { id } = await context.params
    const progress = await db.getProgress(user.id)
    const isHpmani = user.email?.toLowerCase() === 'hpmani91@gmail.com' || user.role === 'admin'

    // Check completion status
    const isCompleted = progress.completedModules.includes(parseInt(id))
    const isCurrent = progress.currentModuleId === parseInt(id)
    const isLocked = !isHpmani && !isCompleted && !isCurrent && parseInt(id) > progress.currentModuleId

    return NextResponse.json({
      success: true,
      status: isCompleted ? 'completed' : isCurrent ? 'current' : isLocked ? 'locked' : (isHpmani ? 'current' : 'future'),
      completed: isCompleted,
    })
  } catch (error) {
    console.error('Modules GET API error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request, context: any) {
  try {
    const user = await getAuthenticatedUser()
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
    }

    const { id } = await context.params
    const json = await request.json()
    const { complete } = json

    const progress = await db.getProgress(user.id)
    let completedModules = [...progress.completedModules]
    let currentModuleId = progress.currentModuleId
    const targetId = parseInt(id)

    if (complete) {
      if (!completedModules.includes(targetId)) {
        completedModules.push(targetId)
      }
      // Increment active node if target node is the active node
      if (targetId === currentModuleId) {
        currentModuleId = targetId < 8 ? targetId + 1 : targetId
      }
    } else {
      completedModules = completedModules.filter((m) => m !== targetId)
      // Revert current module back to lowest uncompleted module
      if (targetId <= currentModuleId) {
        currentModuleId = targetId
      }
    }

    const updatedProgress = await db.updateProgress(user.id, completedModules, currentModuleId)

    return NextResponse.json({
      success: true,
      progress: {
        completedModules: updatedProgress.completedModules,
        currentModuleId: updatedProgress.currentModuleId,
        completionPercentage: updatedProgress.completionPercentage,
      },
    })
  } catch (error) {
    console.error('Modules POST API error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
