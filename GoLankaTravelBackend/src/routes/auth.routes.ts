import express from 'express'
import passport from 'passport'
import { 
  register, 
  login, 
  logout, 
  refreshToken, 
  verifyEmail,
  forgotPassword,
  resetPassword,
  googleCallback 
} from '../controllers/auth.controller'

import { validate } from '../middleware/validation.middleware'
import { 
  registerSchema, 
  loginSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema 
} from '../utils/validators'
import { authLimiter } from '../middleware/rateLimit.middleware'

const router = express.Router()

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user & send OTP
 * @access  Public
 */
router.post('/register', validate(registerSchema), register)

/**
 * @route   POST /api/v1/auth/verify-email
 * @desc    Verify OTP and Activate Account
 * @access  Public
 */
router.post('/verify-email', verifyEmail)

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user & get tokens
 * @access  Public
 */
router.post('/login', validate(loginSchema), login)

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Request Password Reset OTP
 * @access  Public
 */
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword)

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Set new password using OTP
 * @access  Public
 */
router.post('/reset-password', validate(resetPasswordSchema), resetPassword)

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user (Clear cookies)
 * @access  Public
 */
router.post('/logout', logout)

/**
 * @route   GET /api/v1/auth/refresh
 * @desc    Get new Access Token using Refresh Cookie
 * @access  Public
 */
router.get('/refresh', refreshToken)


// --- GOOGLE OAUTH ROUTES ---

/**
 * @route   GET /api/v1/auth/google
 * @desc    Redirect to Google Login Page
 * @access  Public
 */
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  session: false 
}))

/**
 * @route   GET /api/v1/auth/google/callback
 * @desc    Google calls this back after login
 * @access  Public
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=GoogleAuthFailed`,
    session: false 
  }),
  googleCallback
)

// Apply authLimiter to sensitive auth routes
router.post('/login', authLimiter, validate(loginSchema), login)
router.post('/register', authLimiter, validate(registerSchema), register)
router.post('/forgot-password', authLimiter, forgotPassword)

export default router