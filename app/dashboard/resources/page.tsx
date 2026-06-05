'use client'

import { BookOpen, ExternalLink, Bookmark } from 'lucide-react'
import { useState, useEffect } from 'react'

const resourcesByCareer: Record<string, any[]> = {
  fullstack: [
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
  ],
  'ai-ml': [
    {
      title: 'Python for Data Science',
      source: 'DataCamp',
      type: 'Video Course',
      difficulty: 'Beginner',
      duration: '8 hours',
      category: 'python',
    },
    {
      title: 'TensorFlow Crash Course',
      source: 'Google Developers',
      type: 'Video Course',
      difficulty: 'Intermediate',
      duration: '6 hours',
      category: 'ml',
    },
    {
      title: 'Deep Learning Specialization',
      source: 'Coursera',
      type: 'Course Series',
      difficulty: 'Advanced',
      duration: '40 hours',
      category: 'ml',
    },
    {
      title: 'NumPy and Pandas Guide',
      source: 'Real Python',
      type: 'Article',
      difficulty: 'Beginner',
      duration: '3 hours',
      category: 'python',
    },
  ],
}

export default function ResourcesPage() {
  const [selectedCareer, setSelectedCareer] = useState<string>('fullstack')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('selectedCareer') : null
    if (stored) {
      setSelectedCareer(stored === 'Full Stack Development' ? 'fullstack' : stored === 'AI & Machine Learning' ? 'ai-ml' : 'fullstack')
    }
  }, [])

  const resources = resourcesByCareer[selectedCareer] || resourcesByCareer.fullstack
  const allCategories = [...new Set(resources.map(r => r.category))]
  const categories = ['all', ...allCategories]

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Resources</h1>
        <p className="text-slate-600">Access curated learning resources from trusted sources</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
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
            className="bg-white border border-slate-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="text-purple-600" size={20} />
              </div>
              <button className="text-slate-400 hover:text-pink-500 transition">
                <Bookmark size={20} />
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition">
              {resource.title}
            </h3>

            <p className="text-sm text-slate-600 mb-4">
              {resource.source}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-semibold">
                {resource.type}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {resource.difficulty}
              </span>
            </div>

            <p className="text-sm text-slate-600 mb-4">
              Duration: {resource.duration}
            </p>

            <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-300/50 transition inline-flex items-center justify-center gap-2">
              View Resource
              <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
