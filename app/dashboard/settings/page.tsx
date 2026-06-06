'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Save, Lock } from 'lucide-react'

const careerOptions = [
  'Full Stack Development',
  'AI & Machine Learning',
  'Cybersecurity',
  'Data Science',
  'Cloud Computing',
  'DevOps Engineering',
  'UI/UX Design',
  'Mobile App Development',
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'career' | 'security'>('profile')
  const [career, setCareer] = useState('Full Stack Development')
  const [email, setEmail] = useState('john@example.com')
  const [name, setName] = useState('John Doe')
  const [isSaved, setIsSaved] = useState(false)
  const router = useRouter()

  const handleSave = () => {
    // Save to localStorage for now
    localStorage.setItem('selectedCareer', career)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleChangePassword = () => {
    router.push('/forgot-password')
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Manage your profile and learning preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 font-medium transition border-b-2 ${
            activeTab === 'profile'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('career')}
          className={`px-4 py-2 font-medium transition border-b-2 ${
            activeTab === 'career'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Learning Path
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 font-medium transition border-b-2 ${
            activeTab === 'security'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Security
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-md">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Profile Information</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition duration-300"
              >
                <Save size={18} />
                Save Changes
              </button>
              {isSaved && (
                <p className="text-green-600 text-sm mt-2">Saved successfully!</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Learning Path Tab */}
      {activeTab === 'career' && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-md">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Your Learning Path</h2>

          <div className="space-y-4">
            <p className="text-slate-600 mb-4">
              Select your learning path to customize your dashboard and learning resources.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {careerOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setCareer(option)}
                  className={`p-4 rounded-lg border-2 text-left transition ${
                    career === option
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <p className="font-semibold text-slate-900">{option}</p>
                  <ChevronRight
                    className={`mt-2 transition ${
                      career === option ? 'text-blue-600' : 'text-slate-400'
                    }`}
                    size={18}
                  />
                </button>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition duration-300"
              >
                <Save size={18} />
                Save Learning Path
              </button>
              {isSaved && (
                <p className="text-green-600 text-sm mt-2">Learning path updated!</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-md">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Security</h2>

          <div className="space-y-6">
            <div className="p-4 border border-slate-200 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">Password</h3>
                <p className="text-sm text-slate-600">Change your password regularly to keep your account secure</p>
              </div>
              <button
                onClick={handleChangePassword}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50 transition"
              >
                <Lock size={18} />
                Change
              </button>
            </div>

            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">Two-Factor Authentication</h3>
              <p className="text-sm text-slate-600 mb-4">
                Add an extra layer of security to your account
              </p>
              <button className="px-4 py-2 border border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50 transition font-medium">
                Enable 2FA
              </button>
            </div>

            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-900 mb-2">Delete Account</h3>
              <p className="text-sm text-red-800 mb-4">
                Permanently delete your account and all associated data
              </p>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
