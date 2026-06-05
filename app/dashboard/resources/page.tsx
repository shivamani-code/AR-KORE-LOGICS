'use client'

import { BookOpen, ExternalLink, Bookmark } from 'lucide-react'
import { useState } from 'react'

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const resources = [
    {
      title: 'React Official Documentation',
      source: 'React Docs',
      type: 'Documentation',
      difficulty: 'Intermediate',
      duration: '3 hours',
      category: 'frontend',
    },
    {
      title: 'JavaScript The Weird Parts',
      source: 'FreeCodeCamp',
      type: 'Video Course',
      difficulty: 'Beginner',
      duration: '12 hours',
      category: 'javascript',
    },
    {
      title: 'Node.js Best Practices',
      source: 'GitHub',
      type: 'Article',
      difficulty: 'Advanced',
      duration: '2 hours',
      category: 'backend',
    },
    {
      title: 'Complete SQL Masterclass',
      source: 'Udemy',
      type: 'Video Course',
      difficulty: 'Intermediate',
      duration: '22 hours',
      category: 'database',
    },
    {
      title: 'CSS Tricks - Flexbox Guide',
      source: 'CSS Tricks',
      type: 'Article',
      difficulty: 'Beginner',
      duration: '1.5 hours',
      category: 'frontend',
    },
    {
      title: 'Express.js Official Guide',
      source: 'Express Docs',
      type: 'Documentation',
      difficulty: 'Intermediate',
      duration: '4 hours',
      category: 'backend',
    },
  ]

  const categories = ['all', 'frontend', 'backend', 'javascript', 'database']

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#F9FAFB] mb-2">Resources</h1>
        <p className="text-[#9CA3AF]">Access curated learning resources from trusted sources</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${
              selectedCategory === cat
                ? 'bg-[#00E5FF] text-[#0A0E1A]'
                : 'bg-[#111827] text-[#9CA3AF] hover:text-[#F9FAFB] border border-[#1F2937]'
            }`}
          >
            {cat === 'all' ? 'All Resources' : cat}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((resource, idx) => (
          <div
            key={idx}
            className="bg-[#111827] border border-[#1F2937] rounded-xl p-6 hover:border-[#00E5FF] transition group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-[#00E5FF]/10 rounded-lg flex items-center justify-center">
                <BookOpen className="text-[#00E5FF]" size={20} />
              </div>
              <button className="text-[#9CA3AF] hover:text-[#14F195] transition">
                <Bookmark size={20} />
              </button>
            </div>

            <h3 className="text-lg font-bold text-[#F9FAFB] mb-2 group-hover:text-[#00E5FF] transition">
              {resource.title}
            </h3>

            <p className="text-sm text-[#9CA3AF] mb-4">
              {resource.source}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-[#00E5FF]/10 text-[#00E5FF] text-xs rounded font-semibold">
                {resource.type}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                resource.difficulty === 'Beginner' ? 'bg-[#14F195]/10 text-[#14F195]' :
                resource.difficulty === 'Intermediate' ? 'bg-[#7C3AED]/10 text-[#7C3AED]' :
                'bg-[#F97316]/10 text-[#F97316]'
              }`}>
                {resource.difficulty}
              </span>
            </div>

            <p className="text-sm text-[#9CA3AF] mb-4">
              Duration: {resource.duration}
            </p>

            <button className="w-full py-2 bg-[#00E5FF]/10 text-[#00E5FF] rounded-lg font-semibold hover:bg-[#00E5FF] hover:text-[#0A0E1A] transition inline-flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#00E5FF]/20">
              View Resource
              <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
