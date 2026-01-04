import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { register, clearError } from '../../redux/slices/authSlice'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
    return () => {
      dispatch(clearError())
    }
  }, [isAuthenticated, navigate, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (formErrors[e.target.name as keyof typeof formErrors]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' })
    }
  }

  const validate = () => {
    let isValid = true
    const errors = { username: '', email: '', password: '', confirmPassword: '' }

    if (!formData.username.trim()) {
      errors.username = 'Username is required'
      isValid = false
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters'
      isValid = false
    }

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
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }

    // Dispatch and check result for navigation
    const resultAction = await dispatch(register(userData))
    
    if (register.fulfilled.match(resultAction)) {
      // Redirect to Verify page with email pre-filled
      navigate(`/verify?email=${encodeURIComponent(formData.email)}`)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Join us today to start planning your dream vacation in Sri Lanka.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3 text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-sm">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="JohnDoe"
          value={formData.username}
          onChange={handleChange}
          error={formErrors.username}
          icon={<User className="w-4 h-4" />}
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
          icon={<Mail className="w-4 h-4" />}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
          icon={<Lock className="w-4 h-4" />}
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={formErrors.confirmPassword}
          icon={<CheckCircle className="w-4 h-4" />}
        />

        <div className="flex items-start gap-2 pt-2">
           <input type="checkbox" required id="terms" className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
           <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400">
             I agree to the <Link to="/terms" className="text-purple-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>.
           </label>
        </div>

        <Button 
          type="submit" 
          className="w-full py-3 text-lg font-semibold shadow-lg shadow-purple-500/25 mt-4"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating Account...
            </>
          ) : (
            'Sign Up'
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link 
          to="/login" 
          className="font-semibold text-purple-600 hover:text-purple-500 transition-colors"
        >
          Sign in here
        </Link>
      </p>
    </div>
  )
}

export default Register