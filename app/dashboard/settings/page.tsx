'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Lock } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (res.ok) {
          const data = await res.json()
          if (data.success && data.user) {
            setName(data.user.name)
            setEmail(data.user.email)
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
      }
    }
    fetchUser()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    setError('')
    try {
      const payload = {
        name,
        email,
      }

      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        localStorage.setItem('userName', name.split(' ')[0])
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000)
      } else {
        setError(data.error || 'Failed to update settings')
      }
    } catch (err) {
      console.error(err)
      setError('Connection error. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = () => {
    router.push('/forgot-password')
  }

  return (
    <div className="max-w-3xl select-none">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Settings</h1>
        <p className="text-sm text-text-secondary">Manage your profile and learning preferences</p>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-400 text-xs rounded-lg font-medium mb-6">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-white/5">
        <button
          onClick={() => { setActiveTab('profile'); setError('') }}
          className={`px-4 py-2 font-bold text-sm transition-all duration-300 border-b-2 -mb-[2px] ${
            activeTab === 'profile'
              ? 'border-brand-primary text-brand-bright'
              : 'border-transparent text-text-muted hover:text-white'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => { setActiveTab('security'); setError('') }}
          className={`px-4 py-2 font-bold text-sm transition-all duration-300 border-b-2 -mb-[2px] ${
            activeTab === 'security'
              ? 'border-brand-primary text-brand-bright'
              : 'border-transparent text-text-muted hover:text-white'
          }`}
        >
          Security
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-6 tracking-tight">Profile Information</h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/[0.02] border border-white/[0.08] focus:border-brand-primary rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-brand-primary/10 text-sm transition duration-300"
              />
            </div>

            <div>
              <label htmlFor="emailAddress" className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/[0.02] border border-white/[0.08] focus:border-brand-primary rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-brand-primary/10 text-sm transition duration-300"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleSave}
                disabled={isSaving || !name.trim() || !email.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-glow text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-brand-primary/20 active:scale-[0.98] text-xs sm:text-sm disabled:opacity-50"
              >
                <Save size={16} />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              {isSaved && (
                <p className="text-accent-green text-xs sm:text-sm mt-2 font-bold animate-pulse">Changes saved successfully!</p>
              )}
            </div>
          </div>
        </div>
      )}



      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-6 tracking-tight">Security Preferences</h2>

          <div className="space-y-6">
            <div className="p-5 border border-white/[0.06] bg-white/[0.01] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Password</h3>
                <p className="text-xs sm:text-sm text-text-muted mt-0.5 leading-relaxed">Change your password regularly to keep your credentials secure.</p>
              </div>
              <button
                onClick={handleChangePassword}
                className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] text-white rounded-xl transition duration-300 text-xs sm:text-sm font-bold flex-shrink-0"
              >
                <Lock size={14} />
                Change Password
              </button>
            </div>

            <div className="p-5 border border-white/[0.06] bg-white/[0.01] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Two-Factor Authentication (2FA)</h3>
                <p className="text-xs sm:text-sm text-text-muted mt-0.5 leading-relaxed">
                  Add an extra safety layer checking logins via verification codes.
                </p>
              </div>
              <button className="px-4 py-2 bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] text-white rounded-xl transition duration-300 text-xs sm:text-sm font-bold flex-shrink-0">
                Configure 2FA
              </button>
            </div>

            <div className="p-5 border border-red-500/20 bg-red-500/5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <h3 className="font-bold text-red-400 text-sm sm:text-base">Delete Workspace Account</h3>
                <p className="text-xs sm:text-sm text-red-300/60 mt-0.5 leading-relaxed">
                  Permanently delete your profile and all progress maps.
                </p>
              </div>
              <button className="px-4 py-2 bg-red-600/10 hover:bg-red-600/25 border border-red-500/20 text-red-400 rounded-xl transition duration-300 text-xs sm:text-sm font-bold flex-shrink-0 active:scale-[0.98]">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
