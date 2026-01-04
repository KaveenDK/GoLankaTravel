import { useState, useEffect } from 'react'
import { User, Mail, Calendar, Camera, Save, Loader2, Shield, Settings } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { checkAuthStatus } from '../../redux/slices/authSlice'
import api from '../../services/api'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'

const Profile = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  // Local state for form handling
  const [formData, setFormData] = useState({
    username: '',
    avatar: '',
    theme: 'dark',
    currency: 'LKR'
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Initialize form with Redux user data
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        avatar: user.avatar || '',
        theme: user.preferences?.theme || 'dark', 
        currency: user.preferences?.currency || 'LKR'
      })
    }
  }, [user])

  // Handle Input Change for text inputs and selects
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear messages when user starts typing again
    if (message) setMessage(null)
  }

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // API call to update user profile
      // Endpoint: PUT /api/v1/users/me
      await api.put('/users/me', {
        username: formData.username,
        avatar: formData.avatar,
        preferences: {
          theme: formData.theme,
          currency: formData.currency
        }
      })

      // Refresh User Data in Redux to reflect changes immediately
      await dispatch(checkAuthStatus()).unwrap()

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (error: any) {
      // Handle API errors gracefully
      const errorMsg = error.response?.data?.message || 'Failed to update profile.'
      setMessage({ type: 'error', text: errorMsg })
    } finally {
      setLoading(false)
    }
  }

  // Show loading spinner if user data isn't loaded yet
  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Page Header */}
      <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your profile details and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Profile Summary Card */}
        <div className="md:col-span-1">
          <Card className="p-6 text-center h-full border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="relative inline-block mb-4">
              <img 
                src={formData.avatar || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg mx-auto"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + user.username
                }}
              />
              <div className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-md border-2 border-white dark:border-gray-800">
                <Camera className="w-4 h-4" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{user.username}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 truncate px-2">{user.email}</p>

            <div className="flex flex-col gap-3 text-sm text-left bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Shield className="w-4 h-4 text-purple-500" />
                <span className="font-medium">Role:</span>
                <span className="capitalize bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded text-xs ml-auto">
                  {user.role}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Joined:</span>
                <span className="ml-auto text-gray-500 dark:text-gray-400">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Edit Form */}
        <div className="md:col-span-2">
          <Card className="p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <User className="w-5 h-5 text-purple-600" />
              Edit Profile Information
            </h3>

            {message && (
              <div className={`p-4 mb-6 rounded-lg text-sm flex items-center gap-2 ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 gap-6">
                <Input
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  icon={<User className="w-4 h-4" />}
                  placeholder="Enter your username"
                />

                <Input
                  label="Avatar URL"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  icon={<Camera className="w-4 h-4" />}
                  placeholder="https://example.com/my-photo.jpg"
                />

                {/* Read-Only Email Field */}
                <div className="opacity-60 cursor-not-allowed">
                  <Input
                    label="Email Address"
                    name="email"
                    value={user.email}
                    disabled
                    icon={<Mail className="w-4 h-4" />}
                    placeholder="email@example.com"
                  />
                  <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Email cannot be changed for security reasons.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mt-2">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-purple-600" />
                  App Preferences
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
                    <div className="relative">
                      <select
                        name="theme"
                        value={formData.theme}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all appearance-none"
                      >
                        <option value="light">Light Mode ☀️</option>
                        <option value="dark">Dark Mode 🌙</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Currency</label>
                    <div className="relative">
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all appearance-none"
                      >
                        <option value="LKR">LKR (Sri Lankan Rupee)</option>
                        <option value="USD">USD (US Dollar)</option>
                        <option value="EUR">EUR (Euro)</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full md:w-auto min-w-[140px] shadow-lg shadow-purple-500/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" /> Save Changes
                    </>
                  )}
                </Button>
              </div>

            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile