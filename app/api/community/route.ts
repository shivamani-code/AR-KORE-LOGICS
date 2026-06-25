import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAuthenticatedUser } from '@/lib/auth'
import { z } from 'zod'

const postSchema = z.object({
  type: z.enum(['post', 'comment', 'upvote']),
  postId: z.string().optional(), // required for comments and upvotes
  title: z.string().min(3, 'Title must be at least 3 characters').optional(), // required for posts
  content: z.string().min(1, 'Content is required').optional(), // required for posts and comments
  tags: z.array(z.string()).optional(), // optional for posts
})

export async function GET() {
  try {
    const posts = await db.getPosts()
    return NextResponse.json({
      success: true,
      posts,
    })
  } catch (error) {
    console.error('Community GET API error:', error)
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
    const payload = postSchema.parse(json)

    if (payload.type === 'post') {
      if (!payload.title || !payload.content) {
        return NextResponse.json({ success: false, error: 'Title and Content are required for posts' }, { status: 400 })
      }
      const newPost = await db.createPost({
        authorId: user.id,
        authorName: user.name,
        authorRole: user.role === 'admin' ? 'Admin' : user.role === 'mentor' ? 'Mentor' : 'Student',
        title: payload.title,
        content: payload.content,
        tags: payload.tags || [],
      })
      return NextResponse.json({ success: true, post: newPost })
    }

    if (payload.type === 'upvote') {
      if (!payload.postId) {
        return NextResponse.json({ success: false, error: 'Post ID is required for upvotes' }, { status: 400 })
      }
      const updatedPost = await db.upvotePost(payload.postId, user.id)
      return NextResponse.json({ success: true, post: updatedPost })
    }

    if (payload.type === 'comment') {
      if (!payload.postId || !payload.content) {
        return NextResponse.json({ success: false, error: 'Post ID and Content are required for comments' }, { status: 400 })
      }
      const newComment = await db.createComment({
        postId: payload.postId,
        authorId: user.id,
        authorName: user.name + (user.role !== 'student' ? ` (${user.role === 'admin' ? 'Admin' : 'Mentor'})` : ''),
        content: payload.content,
      })
      return NextResponse.json({ success: true, comment: newComment })
    }

    return NextResponse.json({ success: false, error: 'Invalid action type' }, { status: 400 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.issues[0].message }, { status: 400 })
    }
    console.error('Community POST API error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
