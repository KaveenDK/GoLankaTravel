import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle, XCircle, Loader2, Mail, Lock } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { verifyEmail, clearError } from '../../redux/slices/authSlice'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  // Get email from URL (passed from Register page)
  const emailFromUrl = searchParams.get('email') || ''
  
  const { loading, error } = useAppSelector((state) => state.auth)

  const [email, setEmail] = useState(emailFromUrl)
  const [otp, setOtp] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  // Clear errors on mount
  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp || !email) return

    // Dispatch verify action with OBJECT { email, otp }
    const result = await dispatch(verifyEmail({ email, otp }))

    if (verifyEmail.fulfilled.match(result)) {
      setIsSuccess(true)
    }
  }

  // --- SUCCESS VIEW ---
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in zoom-in duration-300">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verified!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Your email has been verified successfully. You can now access your account.
          </p>
          <Button 
            onClick={() => navigate('/login')}
            className="w-full shadow-green-500/20 shadow-lg bg-green-600 hover:bg-green-700 text-white"
          >
            Continue to Login
          </Button>
        </div>
      </div>
    )
  }

  // --- FORM VIEW ---
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-md w-full">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Mail className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verify Email</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            We've sent a 6-digit code to your email. Please enter it below.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            icon={<Mail className="w-4 h-4"/>}
            disabled={!!emailFromUrl} 
          />

          <Input 
            label="Verification Code"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
            className="text-center tracking-widest font-mono text-lg"
            maxLength={6}
            icon={<Lock className="w-4 h-4"/>}
          />

          <Button 
            type="submit" 
            className="w-full py-3"
            disabled={loading || otp.length < 6}
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Verifying...</>
            ) : (
              'Verify Account'
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Didn't receive the code? Check your spam folder.
        </p>
      </div>
    </div>
  )
}

export default VerifyEmail