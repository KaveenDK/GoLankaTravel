import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { login, clearError } from '../../redux/slices/authSlice'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  // Redux State
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth)

  // Local Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  
  // Validation State
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  })

  // 1. Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
    return () => {
      dispatch(clearError())
    }
  }, [isAuthenticated, navigate, dispatch, location])

  // 2. Input Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (formErrors[e.target.name as keyof typeof formErrors]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' })
    }
  }

  // 3. Validation Logic
  const validate = () => {
    let isValid = true
    const errors = { email: '', password: '' }

    if (!formData.email) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }

    if (!formData.password) {
      errors.password = 'Password is required'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  // 4. Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    await dispatch(login(formData))
  }

  // --- Google Login Handler ---
  const handleGoogleLogin = () => {
    // Redirect to Backend Google Auth Endpoint
    // This triggers the passport.js flow on the server
    window.location.href = 'http://localhost:5000/api/v1/auth/google';
  }

  return (
    <div className="w-full max-w-md mx-auto">
      
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your credentials to access your account.
        </p>
      </div>

      {/* Global Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm">{error}</div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
          icon={<Mail className="w-4 h-4" />}
          autoComplete="email"
        />

        <div className="space-y-1">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            icon={<Lock className="w-4 h-4" />}
            autoComplete="current-password"
          />
          
          <div className="flex justify-end">
            <Link 
              to="/forgot-password" 
              className="text-xs font-medium text-purple-600 hover:text-purple-500 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full py-3 text-lg font-semibold shadow-lg shadow-purple-500/25"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      {/* Social Login Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* FIX: Added type="button" and onClick handler */}
        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
           <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
             <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
             <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
             <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26c.01-.19.01-.38.01-.58z" />
             <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
           </svg>
           <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
        </button>
        
        <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
           <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
             <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-1.1 0-2 .9-2 2v1h3l-.5 3h-2.5v6.8C18.56 20.87 22 16.84 22 12z" />
           </svg>
           <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook</span>
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Don't have an account?{' '}
        <Link 
          to="/register" 
          className="font-semibold text-purple-600 hover:text-purple-500 transition-colors"
        >
          Create free account
        </Link>
      </p>

    </div>
  )
}

export default Login