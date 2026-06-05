'use client'

import { Heart, MessageCircle, Share2, Plus } from 'lucide-react'

export default function CommunityPage() {
  const posts = [
    {
      author: 'Alex Kumar',
      title: 'Just completed my first React project!',
      content: 'Really proud of myself. Built a todo app with hooks and context API. Looking for feedback on the code!',
      likes: 245,
      replies: 32,
      category: 'Project Showcase',
    },
    {
      author: 'Sarah Chen',
      title: 'Tips for acing the JavaScript interview',
      content: 'Here are the topics I studied for: closures, async/await, promises, event loop, and hoisting. Happy to discuss any of these in comments!',
      likes: 456,
      replies: 78,
      category: 'Interview Tips',
    },
    {
      author: 'Mike Patel',
      title: 'Looking for study buddy for Node.js',
      content: 'Interested in joining a study group? We can work through problems together and share notes. Message me if interested!',
      likes: 128,
      replies: 24,
      category: 'Study Group',
    },
  ]

  const categories = ['All', 'Project Showcase', 'Interview Tips', 'Study Group', 'Questions', 'Resources']

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-[#F9FAFB] mb-2">Community</h1>
          <p className="text-[#9CA3AF]">Connect with fellow learners, share knowledge, and grow together</p>
        </div>
        <button className="px-6 py-2 bg-gradient-to-r from-[#00E5FF] to-[#14F195] text-[#0A0E1A] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00E5FF]/30 transition inline-flex items-center gap-2">
          <Plus size={20} />
          Start Discussion
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-3 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              cat === 'All'
                ? 'bg-[#00E5FF] text-[#0A0E1A]'
                : 'bg-[#111827] text-[#9CA3AF] hover:text-[#F9FAFB] border border-[#1F2937]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post, idx) => (
          <div
            key={idx}
            className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 hover:border-[#00E5FF] transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00E5FF] to-[#14F195] rounded-full flex items-center justify-center text-[#0A0E1A] font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#F9FAFB]">
                    {post.author}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">2 hours ago</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#00E5FF]/10 text-[#00E5FF] text-xs rounded-full font-semibold">
                {post.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#F9FAFB] mb-3">
              {post.title}
            </h3>

            <p className="text-[#9CA3AF] mb-6">
              {post.content}
            </p>

            <div className="flex items-center gap-8 pt-4 border-t border-[#1F2937]">
              <button className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#14F195] transition group">
                <Heart size={18} className="group-hover:fill-current" />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#00E5FF] transition">
                <MessageCircle size={18} />
                <span className="text-sm">{post.replies}</span>
              </button>
              <button className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#7C3AED] transition">
                <Share2 size={18} />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load more button */}
      <div className="text-center">
        <button className="px-8 py-3 border border-[#1F2937] text-[#00E5FF] rounded-lg font-semibold hover:bg-[#00E5FF]/10 transition">
          Load More Posts
        </button>
      </div>
    </div>
  )
}
