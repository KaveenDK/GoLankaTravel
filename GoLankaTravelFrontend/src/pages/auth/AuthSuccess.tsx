import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAppDispatch } from '../../redux/hooks'
import { checkAuthStatus } from '../../redux/slices/authSlice'

const AuthSuccess = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    // 1. Get token from URL params
    const token = searchParams.get('token')

    if (token) {
      // 2. Save Token to LocalStorage
      localStorage.setItem('token', token)
      
      // 3. Update Redux State (Fetch user details)
      dispatch(checkAuthStatus())

      // 4. Redirect to Home after a brief delay
      setTimeout(() => {
        navigate('/', { replace: true })
      }, 800)
    } else {
      // No token found? Something went wrong. Go back to login.
      navigate('/login?error=GoogleAuthFailed')
    }
  }, [searchParams, navigate, dispatch])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center animate-in fade-in zoom-in duration-300">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Authenticating...</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Please wait while we log you in securely.
        </p>
      </div>
    </div>
  )
}

export default AuthSuccess