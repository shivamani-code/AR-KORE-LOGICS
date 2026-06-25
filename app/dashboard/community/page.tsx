'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Share2, Plus, X, ArrowRight, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Comment {
  id: string
  postId: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
}

interface Post {
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
  comments: Comment[]
  upvotedBy: string[]
}

export default function CommunityPage() {
  const categories = ['All', 'Project Showcase', 'Interview Tips', 'Study Group', 'Questions', 'Resources']
  const [posts, setPosts] = useState<Post[]>([])
  const [userId, setUserId] = useState<string>('')
  const [selectedCat, setSelectedCat] = useState('All')
  const [isLoading, setIsLoading] = useState(true)

  // Post creation modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newCategory, setNewCategory] = useState('Questions')
  const [isSubmittingPost, setIsSubmittingPost] = useState(false)
  const [postError, setPostError] = useState('')

  // Comments toggles & inputs
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({})
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [submittingComment, setSubmittingComment] = useState<Record<string, boolean>>({})

  const fetchUserAndPosts = async () => {
    try {
      const userRes = await fetch('/api/auth/me')
      if (userRes.ok) {
        const userData = await userRes.json()
        if (userData.success && userData.user) {
          setUserId(userData.user.id)
        }
      }
      
      const postsRes = await fetch('/api/community')
      if (postsRes.ok) {
        const postsData = await postsRes.json()
        if (postsData.success) {
          setPosts(postsData.posts)
        }
      }
    } catch (error) {
      console.error('Error loading community data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserAndPosts()
  }, [])

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) return
    setIsSubmittingPost(true)
    setPostError('')

    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'post',
          title: newTitle,
          content: newContent,
          tags: [newCategory],
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setPosts((prev) => [data.post, ...prev])
        setNewTitle('')
        setNewContent('')
        setNewCategory('Questions')
        setIsModalOpen(false)
      } else {
        setPostError(data.error || 'Failed to create discussion')
      }
    } catch (err) {
      console.error(err)
      setPostError('Network error. Please try again.')
    } finally {
      setIsSubmittingPost(false)
    }
  }

  const handleUpvote = async (postId: string) => {
    if (!userId) return

    // Optimistic update
    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id === postId) {
          const upvotedBy = p.upvotedBy || []
          const idx = upvotedBy.indexOf(userId)
          const newUpvoted = [...upvotedBy]
          let upvotes = p.upvotes
          if (idx === -1) {
            newUpvoted.push(userId)
            upvotes++
          } else {
            newUpvoted.splice(idx, 1)
            upvotes = Math.max(0, upvotes - 1)
          }
          return { ...p, upvotedBy: newUpvoted, upvotes }
        }
        return p
      })
    )

    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'upvote',
          postId,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        // Fetch to sync DB if error
        fetchUserAndPosts()
      }
    } catch (err) {
      console.error('Failed to upvote:', err)
      fetchUserAndPosts()
    }
  }

  const handleCreateComment = async (e: React.FormEvent, postId: string) => {
    e.preventDefault()
    const content = commentInputs[postId]
    if (!content || !content.trim()) return

    setSubmittingComment((prev) => ({ ...prev, [postId]: true }))

    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'comment',
          postId,
          content: content.trim(),
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((p) => {
            if (p.id === postId) {
              const updatedComments = [...(p.comments || []), data.comment]
              return {
                ...p,
                comments: updatedComments,
                commentCount: updatedComments.length,
              }
            }
            return p
          })
        )
        setCommentInputs((prev) => ({ ...prev, [postId]: '' }))
      }
    } catch (err) {
      console.error('Failed to create comment:', err)
    } finally {
      setSubmittingComment((prev) => ({ ...prev, [postId]: false }))
    }
  }

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  const filteredPosts = posts.filter(
    (post) => selectedCat === 'All' || post.tags?.some((tag) => tag.toLowerCase() === selectedCat.toLowerCase())
  )

  return (
    <div className="space-y-8 select-none relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Platform Community</h1>
          <p className="text-sm text-text-secondary">
            Share benchmarks, code files, design systems, and network with fellow learners.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-brand-primary hover:bg-brand-glow text-white rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 inline-flex items-center gap-2 shadow-lg shadow-brand-primary/20 active:scale-[0.98] border border-brand-primary/30"
        >
          <Plus size={16} />
          Start Discussion
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2.5 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 border ${
              selectedCat === cat
                ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20'
                : 'bg-white/[0.03] text-text-muted hover:text-white border-white/[0.08] hover:border-white/[0.15]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      {isLoading ? (
        <div className="py-20 text-center text-text-secondary text-sm">Loading discussions...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="py-20 text-center text-text-secondary border border-white/[0.06] rounded-2xl bg-white/[0.01]">
          No discussions found in this category. Be the first to start one!
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => {
            const hasLiked = post.upvotedBy?.includes(userId)
            const commentsOpen = !!expandedComments[post.id]

            return (
              <div
                key={post.id}
                className="bg-[#0b0b0e] border border-white/[0.06] rounded-2xl p-6 sm:p-8 hover:border-indigo-500/30 transition-all duration-300 group shadow-lg"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center font-bold text-base">
                      {post.authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                        {post.authorName}
                        <span className="text-[9px] px-1.5 py-0.5 bg-white/[0.04] border border-white/[0.08] text-zinc-400 rounded uppercase font-semibold">
                          {post.authorRole}
                        </span>
                      </p>
                      <p className="text-[10px] text-text-muted mt-0.5">
                        {new Date(post.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  {post.tags?.[0] && (
                    <span className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] sm:text-xs rounded-md font-semibold">
                      {post.tags[0]}
                    </span>
                  )}
                </div>

                {/* Post Body */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 group-hover:text-indigo-400 transition duration-200">
                  {post.title}
                </h3>
                <p className="text-text-secondary mb-6 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>

                {/* Actions row */}
                <div className="flex items-center gap-8 pt-4 border-t border-white/5">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className={`flex items-center gap-2 transition-colors duration-200 group font-bold ${
                      hasLiked ? 'text-rose-500' : 'text-text-muted hover:text-rose-400'
                    }`}
                  >
                    <Heart size={16} className={hasLiked ? 'fill-current' : 'group-hover:fill-current'} />
                    <span className="text-xs sm:text-sm">{post.upvotes}</span>
                  </button>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className={`flex items-center gap-2 transition-colors duration-200 font-bold ${
                      commentsOpen ? 'text-indigo-400' : 'text-text-muted hover:text-indigo-400'
                    }`}
                  >
                    <MessageCircle size={16} />
                    <span className="text-xs sm:text-sm">{post.commentCount}</span>
                  </button>
                  <button className="flex items-center gap-2 text-text-muted hover:text-cyan-400 transition-colors duration-200 font-bold">
                    <Share2 size={16} />
                    <span className="text-xs sm:text-sm">Share</span>
                  </button>
                </div>

                {/* Comments Section */}
                <AnimatePresence>
                  {commentsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden mt-6 pt-6 border-t border-white/[0.04]"
                    >
                      <div className="space-y-4 mb-6">
                        {post.comments && post.comments.length > 0 ? (
                          post.comments.map((comment) => (
                            <div key={comment.id} className="bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-zinc-300">{comment.authorName}</span>
                                <span className="text-[9px] text-text-muted">
                                  {new Date(comment.createdAt).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                                {comment.content}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-xs text-text-muted">
                            No comments yet. Write one below!
                          </div>
                        )}
                      </div>

                      {/* Add Comment Form */}
                      <form onSubmit={(e) => handleCreateComment(e, post.id)} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ''}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                          }
                          placeholder="Write a comment..."
                          className="flex-1 h-9 px-3 bg-[#0f0f13] border border-white/[0.06] hover:border-white/[0.1] focus:border-indigo-500/50 rounded-lg text-xs text-white placeholder-zinc-600 focus:outline-none transition-all duration-150"
                        />
                        <button
                          type="submit"
                          disabled={submittingComment[post.id] || !commentInputs[post.id]?.trim()}
                          className="h-9 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold transition disabled:opacity-50"
                        >
                          Send
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      )}

      {/* Discussion Creation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-[#0c0c0f] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden relative z-10 p-6 sm:p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="text-indigo-400" size={18} />
                  Start a Discussion
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-white/[0.04] rounded-lg transition text-zinc-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {postError && (
                <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-400 text-xs rounded-lg font-medium mb-4">
                  {postError}
                </div>
              )}

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Discussion Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="E.g., Tips for deploying Next.js apps with SSL"
                    className="w-full h-10 px-4 bg-[#0f0f13] border border-white/[0.06] hover:border-white/[0.1] focus:border-indigo-500 rounded-lg text-white text-xs placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full h-10 px-4 bg-[#0f0f13] border border-white/[0.06] hover:border-white/[0.1] focus:border-indigo-500 rounded-lg text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  >
                    {categories.filter((cat) => cat !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Content
                  </label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Write details of your showcase, question or resource here..."
                    rows={5}
                    className="w-full p-4 bg-[#0f0f13] border border-white/[0.06] hover:border-white/[0.1] focus:border-indigo-500 rounded-lg text-white text-xs placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-white/[0.06] hover:bg-white/[0.02] text-zinc-400 hover:text-white rounded-lg text-xs font-bold transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingPost || !newTitle.trim() || !newContent.trim()}
                    className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                  >
                    {isSubmittingPost ? 'Posting...' : 'Post Discussion'}
                    <ArrowRight size={12} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
