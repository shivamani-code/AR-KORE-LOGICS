import { createClient } from '@/lib/supabase/server'
import { db, DBUser } from '@/lib/db'

export async function getAuthenticatedUser(): Promise<DBUser | null> {
  try {
    const supabase = await createClient()
    const { data: { user: authUser } } = await supabase.auth.getUser()
    if (!authUser) return null

    const user = await db.getUserById(authUser.id)
    return user || null
  } catch (error) {
    console.error('getAuthenticatedUser error:', error)
    return null
  }
}
