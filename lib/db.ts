import { createClient } from '@/lib/supabase/server'

export interface DBUser {
  id: string
  name: string
  email: string
  role: 'student' | 'mentor' | 'admin'
  careerPath: string
  enrolledCourses: string[]
  joinedAt: string
}

export interface DBMentor {
  id: string
  name: string
  title: string
  company: string
  expertise: string[]
  experience: string
  bio: string
  availability: string
  rating: number
  sessionCount: number
}

export interface DBSession {
  id: string
  studentId: string
  mentorId: string
  type: string
  date: string
  status: 'pending' | 'confirmed' | 'cancelled'
  notes?: string
}

export interface DBPost {
  id: string
  authorId: string
  authorName: string
  authorRole: string
  title: string
  content: string
  tags: string[]
  upvotes: number
  commentCount: number
  createdAt: string
  comments: DBComment[]
  upvotedBy: string[]
}

export interface DBComment {
  id: string
  postId: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
}

export interface DBProgress {
  userId: string
  careerPath: string
  completedModules: number[]
  currentModuleId: number
  completionPercentage: number
  streakDays: number
  lastUpdated: string
}

export const db = {
  // --- USERS MODULE ---
  async getUsers(): Promise<DBUser[]> {
    const supabase = await createClient()
    const { data, error } = await supabase.from('users').select('*')
    if (error) throw error
    return (data || []).map(u => {
      const isHpmani = u.email?.toLowerCase() === 'hpmani91@gmail.com'
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        role: isHpmani ? 'admin' : u.role,
        careerPath: u.career_path,
        enrolledCourses: isHpmani
          ? (u.enrolled_courses?.length ? u.enrolled_courses : ['ai-cbse9', 'ai-ml'])
          : (u.enrolled_courses || []),
        joinedAt: u.joined_at,
      }
    })
  },

  async createUser(user: Omit<DBUser, 'id' | 'joinedAt'> & { passwordHash?: string }): Promise<DBUser> {
    const supabase = await createClient()
    const { data: { user: authUser } } = await supabase.auth.getUser()
    if (!authUser) throw new Error('Not authenticated in Supabase Auth')

    const isHpmani = user.email?.toLowerCase() === 'hpmani91@gmail.com'
    const role = isHpmani ? 'admin' : user.role

    const { data, error } = await supabase
      .from('users')
      .insert({
        id: authUser.id,
        name: user.name,
        email: user.email,
        role,
        career_path: user.careerPath,
      })
      .select()
      .single()

    if (error) throw error
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      careerPath: data.career_path,
      enrolledCourses: data.enrolled_courses || (isHpmani ? ['ai-cbse9', 'ai-ml'] : []),
      joinedAt: data.joined_at,
    }
  },

  async getUserByEmail(email: string): Promise<DBUser | undefined> {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle()
    if (error) throw error
    if (!data) return undefined
    const isHpmani = data.email?.toLowerCase() === 'hpmani91@gmail.com'
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: isHpmani ? 'admin' : data.role,
      careerPath: data.career_path,
      enrolledCourses: isHpmani
        ? (data.enrolled_courses?.length ? data.enrolled_courses : ['ai-cbse9', 'ai-ml'])
        : (data.enrolled_courses || []),
      joinedAt: data.joined_at,
    }
  },

  async getUserById(id: string): Promise<DBUser | undefined> {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle()
    if (error) throw error
    if (!data) return undefined
    const isHpmani = data.email?.toLowerCase() === 'hpmani91@gmail.com'
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: isHpmani ? 'admin' : data.role,
      careerPath: data.career_path,
      enrolledCourses: isHpmani
        ? (data.enrolled_courses?.length ? data.enrolled_courses : ['ai-cbse9', 'ai-ml'])
        : (data.enrolled_courses || []),
      joinedAt: data.joined_at,
    }
  },

  async updateUserCareerPath(userId: string, careerPath: string): Promise<void> {
    const supabase = await createClient()
    const { error } = await supabase
      .from('users')
      .update({ career_path: careerPath })
      .eq('id', userId)
    if (error) throw error

    // Also update progress
    const { data: progress } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    if (progress) {
      const { error: progressError } = await supabase
        .from('progress')
        .update({
          career_path: careerPath,
          completed_modules: [],
          current_module_id: 1,
          completion_percentage: 0,
        })
        .eq('user_id', userId)
      if (progressError) throw progressError
    } else {
      const { error: progressError } = await supabase
        .from('progress')
        .insert({
          user_id: userId,
          career_path: careerPath,
          completed_modules: [],
          current_module_id: 1,
          completion_percentage: 0,
          streak_days: 0,
        })
      if (progressError) throw progressError
    }
  },

  async updateUserProfile(userId: string, name: string, email: string): Promise<void> {
    const supabase = await createClient()
    const { error } = await supabase
      .from('users')
      .update({ name, email })
      .eq('id', userId)
    if (error) throw error
  },

  async updateUserEnrollments(userId: string, enrolledCourses: string[], selectedCareer: string): Promise<void> {
    const supabase = await createClient()
    const { error } = await supabase
      .from('users')
      .update({ 
        enrolled_courses: enrolledCourses,
        career_path: selectedCareer 
      })
      .eq('id', userId)
    if (error) throw error
  },

  // --- PROGRESS MODULE ---
  async getProgress(userId: string): Promise<DBProgress> {
    const supabase = await createClient()
    let { data: progress, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) throw error

    if (!progress) {
      // Create default progress for the user
      const user = await this.getUserById(userId)
      const { data: newProgress, error: insertError } = await supabase
        .from('progress')
        .insert({
          user_id: userId,
          career_path: user?.careerPath || 'Artificial Intelligence',
          completed_modules: [],
          current_module_id: 1,
          completion_percentage: 0,
          streak_days: 0,
        })
        .select()
        .single()

      if (insertError) throw insertError
      progress = newProgress
    }

    return {
      userId: progress.user_id,
      careerPath: progress.career_path,
      completedModules: progress.completed_modules || [],
      currentModuleId: progress.current_module_id,
      completionPercentage: progress.completion_percentage,
      streakDays: progress.streak_days,
      lastUpdated: progress.last_updated,
    }
  },

  async updateProgress(userId: string, completedModules: number[], currentModuleId: number): Promise<DBProgress> {
    const supabase = await createClient()
    const totalModules = 8
    const percent = Math.min(Math.round((completedModules.length / totalModules) * 100), 100)

    const { data: existingProgress } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    let result
    if (existingProgress) {
      const { data, error } = await supabase
        .from('progress')
        .update({
          completed_modules: completedModules,
          current_module_id: currentModuleId,
          completion_percentage: percent,
          last_updated: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .select()
        .single()
      if (error) throw error
      result = data
    } else {
      const user = await this.getUserById(userId)
      const { data, error } = await supabase
        .from('progress')
        .insert({
          user_id: userId,
          career_path: user?.careerPath || 'Artificial Intelligence',
          completed_modules: completedModules,
          current_module_id: currentModuleId,
          completion_percentage: percent,
          streak_days: 0,
        })
        .select()
        .single()
      if (error) throw error
      result = data
    }

    return {
      userId: result.user_id,
      careerPath: result.career_path,
      completedModules: result.completed_modules || [],
      currentModuleId: result.current_module_id,
      completionPercentage: result.completion_percentage,
      streakDays: result.streak_days,
      lastUpdated: result.last_updated,
    }
  },

  // --- MENTORS & SESSIONS ---
  async getMentors(): Promise<DBMentor[]> {
    const supabase = await createClient()
    const { data, error } = await supabase.from('mentors').select('*')
    if (error) throw error
    const demoMentorIds = ['m_ananya', 'm_rohan']
    return (data || [])
      .filter(m => !demoMentorIds.includes(m.id))
      .map(m => ({
        id: m.id,
        name: m.name,
        title: m.title,
        company: m.company,
        expertise: m.expertise || [],
        experience: m.experience,
        bio: m.bio,
        availability: m.availability,
        rating: Number(m.rating),
        sessionCount: m.session_count,
      }))
  },

  async getSessions(userId: string): Promise<DBSession[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('student_id', userId)
    if (error) throw error
    return (data || []).map(s => ({
      id: s.id,
      studentId: s.student_id,
      mentorId: s.mentor_id,
      type: s.type,
      date: s.date,
      status: s.status,
      notes: s.notes,
    }))
  },

  async createSession(session: Omit<DBSession, 'id' | 'status'>): Promise<DBSession> {
    const supabase = await createClient()
    const id = 's_' + Math.random().toString(36).substring(2, 11)
    const { data, error } = await supabase
      .from('sessions')
      .insert({
        id,
        student_id: session.studentId,
        mentor_id: session.mentorId,
        type: session.type,
        date: session.date,
        status: 'confirmed',
        notes: session.notes,
      })
      .select()
      .single()

    if (error) throw error

    // Increment session count for mentor
    const { data: mentor } = await supabase
      .from('mentors')
      .select('session_count')
      .eq('id', session.mentorId)
      .single()

    if (mentor) {
      await supabase
        .from('mentors')
        .update({ session_count: (mentor.session_count || 0) + 1 })
        .eq('id', session.mentorId)
    }

    return {
      id: data.id,
      studentId: data.student_id,
      mentorId: data.mentor_id,
      type: data.type,
      date: data.date,
      status: data.status,
      notes: data.notes,
    }
  },

  // --- COMMUNITY POSTS & COMMENTS ---
  async getPosts(): Promise<DBPost[]> {
    const supabase = await createClient()
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (postsError) throw postsError

    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: true })

    if (commentsError) throw commentsError

    const demoPostIds = ['p_cbse_prep', 'p_python_tips']

    return (posts || [])
      .filter(p => !demoPostIds.includes(p.id))
      .map(p => {
        const postComments = (comments || [])
          .filter(c => c.post_id === p.id)
          .map(c => ({
            id: c.id,
            postId: c.post_id,
            authorId: c.author_id,
            authorName: c.author_name,
            content: c.content,
            createdAt: c.created_at,
          }))

        return {
          id: p.id,
          authorId: p.author_id,
          authorName: p.author_name,
          authorRole: p.author_role,
          title: p.title,
          content: p.content,
          tags: p.tags || [],
          upvotes: p.upvotes,
          commentCount: postComments.length,
          createdAt: p.created_at,
          comments: postComments,
          upvotedBy: p.upvoted_by || [],
        }
      })
  },

  async createPost(post: Omit<DBPost, 'id' | 'upvotes' | 'commentCount' | 'createdAt' | 'comments' | 'upvotedBy'>): Promise<DBPost> {
    const supabase = await createClient()
    const id = 'p_' + Math.random().toString(36).substring(2, 11)
    const { data, error } = await supabase
      .from('posts')
      .insert({
        id,
        author_id: post.authorId,
        author_name: post.authorName,
        author_role: post.authorRole,
        title: post.title,
        content: post.content,
        tags: post.tags || [],
        upvotes: 0,
        comment_count: 0,
        upvoted_by: [],
      })
      .select()
      .single()

    if (error) throw error

    return {
      id: data.id,
      authorId: data.author_id,
      authorName: data.author_name,
      authorRole: data.author_role,
      title: data.title,
      content: data.content,
      tags: data.tags || [],
      upvotes: data.upvotes,
      commentCount: 0,
      createdAt: data.created_at,
      comments: [],
      upvotedBy: data.upvoted_by || [],
    }
  },

  async upvotePost(postId: string, userId: string): Promise<DBPost | undefined> {
    const supabase = await createClient()
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (fetchError) throw fetchError
    if (!post) return undefined

    const upvotedBy = post.upvoted_by || []
    const idx = upvotedBy.indexOf(userId)
    let newUpvotes = post.upvotes

    if (idx === -1) {
      upvotedBy.push(userId)
      newUpvotes++
    } else {
      upvotedBy.splice(idx, 1)
      newUpvotes = Math.max(0, newUpvotes - 1)
    }

    const { data: updatedPost, error: updateError } = await supabase
      .from('posts')
      .update({
        upvoted_by: upvotedBy,
        upvotes: newUpvotes,
      })
      .eq('id', postId)
      .select()
      .single()

    if (updateError) throw updateError

    // Fetch comments
    const { data: comments } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    const formattedComments = (comments || []).map(c => ({
      id: c.id,
      postId: c.post_id,
      authorId: c.author_id,
      authorName: c.author_name,
      content: c.content,
      createdAt: c.created_at,
    }))

    return {
      id: updatedPost.id,
      authorId: updatedPost.author_id,
      authorName: updatedPost.author_name,
      authorRole: updatedPost.author_role,
      title: updatedPost.title,
      content: updatedPost.content,
      tags: updatedPost.tags || [],
      upvotes: updatedPost.upvotes,
      commentCount: formattedComments.length,
      createdAt: updatedPost.created_at,
      comments: formattedComments,
      upvotedBy: updatedPost.upvoted_by || [],
    }
  },

  async createComment(comment: Omit<DBComment, 'id' | 'createdAt'>): Promise<DBComment> {
    const supabase = await createClient()
    const id = 'c_' + Math.random().toString(36).substring(2, 11)
    const { data, error } = await supabase
      .from('comments')
      .insert({
        id,
        post_id: comment.postId,
        author_id: comment.authorId,
        author_name: comment.authorName,
        content: comment.content,
      })
      .select()
      .single()

    if (error) throw error

    // Increment comment count in posts table
    const { data: post } = await supabase
      .from('posts')
      .select('comment_count')
      .eq('id', comment.postId)
      .single()

    if (post) {
      await supabase
        .from('posts')
        .update({ comment_count: (post.comment_count || 0) + 1 })
        .eq('id', comment.postId)
    }

    return {
      id: data.id,
      postId: data.post_id,
      authorId: data.author_id,
      authorName: data.author_name,
      content: data.content,
      createdAt: data.created_at,
    }
  },
}
