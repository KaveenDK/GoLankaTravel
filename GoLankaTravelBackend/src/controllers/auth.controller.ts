import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/User.model'
import { generateToken, generateRefreshToken } from '../services/auth.service'
import { sendEmail, sendVerificationEmail } from '../services/email.service' 
import AppError from '../utils/appError'
import { sendResponse } from '../utils/apiResponse'
import catchAsync from '../utils/catchAsync'

// Cookie Options (Secure in Production)
const cookieOptions = {
  httpOnly: true, // Prevents XSS attacks (JS cannot read this cookie)
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  sameSite: process.env.NODE_ENV === 'production' ? 'none' as const : 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Days
}

// Helper to generate 6-digit random code
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString()

/**
 * @desc    Register a new user & Send Verification Email
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body

  // 1. Check if user exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return next(new AppError('User already exists with this email', 400))
  }

  // 2. Generate OTP
  const otp = generateOTP()
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000) // Valid for 10 mins

  // 3. Create User (Unverified)
  await User.create({
    username,
    email,
    password,
    role: 'traveler',
    otp,
    otpExpires,
    isVerified: false
  })

  // 4. Send Email
  try {
    await sendVerificationEmail(email, otp)
  } catch (err) {
    // If email fails, we shouldn't leave a "broken" user in the DB ideally, 
    // but for now, we just return the error.
    return next(new AppError('Could not send verification email. Please try again.', 500))
  }

  // 5. Send Response
  sendResponse(res, 201, true, 'Registration successful! Please check your email for the verification code.')
})

/**
 * @desc    Verify Email with OTP & Login
 * @route   POST /api/v1/auth/verify-email
 * @access  Public
 */
export const verifyEmail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, otp } = req.body

  // 1. Find user and select secret fields
  const user = await User.findOne({ email }).select('+otp +otpExpires')

  if (!user) return next(new AppError('User not found', 404))
  if (user.isVerified) return next(new AppError('User already verified', 400))

  // 2. Validate OTP
  if (!user.otp || user.otp !== otp) {
    return next(new AppError('Invalid verification code', 400))
  }

  // 3. Check Expiry
  if (user.otpExpires && user.otpExpires < new Date()) {
    return next(new AppError('Verification code expired', 400))
  }

  // 4. Update User
  user.isVerified = true
  user.otp = undefined
  user.otpExpires = undefined
  await user.save()

  // 5. Generate Tokens (Login User)
  const accessToken = generateToken(user._id.toString(), user.role)
  const refreshToken = generateRefreshToken(user._id.toString())

  // 6. Set Cookie
  res.cookie('jwt', refreshToken, cookieOptions)

  // 7. Return Response
  sendResponse(res, 200, true, 'Email verified successfully!', {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    accessToken
  })
})

/**
 * @desc    Login user & Get Tokens
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400))
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Invalid email or password', 401))
  }

  // --- NEW: Check if verified ---
  if (!user.isVerified) {
    return next(new AppError('Please verify your email first', 401))
  }

  const accessToken = generateToken(user._id.toString(), user.role)
  const refreshToken = generateRefreshToken(user._id.toString())

  res.cookie('jwt', refreshToken, cookieOptions)

  sendResponse(res, 200, true, 'Login successful', {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    accessToken
  })
})

/**
 * @desc    Forgot Password - Send OTP
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) return next(new AppError('User not found', 404))

  // Generate OTP
  const otp = generateOTP()
  user.otp = otp
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 mins
  await user.save({ validateBeforeSave: false }) // Skip other validation

  try {
    await sendEmail(email, 'Password Reset Code - GoLanka Travel', `Your password reset code is: <b>${otp}</b>`)
  } catch (error) {
    user.otp = undefined
    user.otpExpires = undefined
    await user.save({ validateBeforeSave: false })
    return next(new AppError('There was an error sending the email. Try again later!', 500))
  }

  sendResponse(res, 200, true, 'Password reset code sent to email.')
})

/**
 * @desc    Reset Password with OTP
 * @route   POST /api/v1/auth/reset-password
 * @access  Public
 */
export const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, otp, newPassword } = req.body

  const user = await User.findOne({ email }).select('+otp +otpExpires')

  if (!user) return next(new AppError('User not found', 404))

  if (!user.otp || user.otp !== otp) {
    return next(new AppError('Invalid code', 400))
  }

  if (user.otpExpires && user.otpExpires < new Date()) {
    return next(new AppError('Code expired', 400))
  }

  // Update Password (Model pre-save hook will hash this)
  user.password = newPassword
  user.otp = undefined
  user.otpExpires = undefined
  await user.save()

  sendResponse(res, 200, true, 'Password reset successful. You can now login.')
})

/**
 * @desc    Refresh Access Token
 * @route   GET /api/v1/auth/refresh
 * @access  Public (Uses Cookie)
 */
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = req.cookies
    if (!cookies?.jwt) {
      return next(new AppError('No refresh token found. Please login again.', 401))
    }

    const refreshToken = cookies.jwt
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload

    const user = await User.findById(decoded.id)
    if (!user) {
      return next(new AppError('User not found', 401))
    }

    const accessToken = generateToken(user._id.toString(), user.role)
    sendResponse(res, 200, true, 'Token refreshed', { accessToken })

  } catch (error) {
    return next(new AppError('Invalid or expired refresh token', 403))
  }
}

/**
 * @desc    Logout User / Clear Cookie
 * @route   POST /api/v1/auth/logout
 * @access  Public
 */
export const logout = (req: Request, res: Response) => {
  res.clearCookie('jwt', { ...cookieOptions, maxAge: 0 })
  sendResponse(res, 200, true, 'Logged out successfully')
}

/**
 * @desc    Google Auth Callback
 * @route   GET /api/v1/auth/google/callback
 * @access  Public
 */
export const googleCallback = (req: Request, res: Response) => {
  const user = req.user as any

  if (!user) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=GoogleAuthFailed`)
  }

  const accessToken = generateToken(user._id.toString(), user.role)
  const refreshToken = generateRefreshToken(user._id.toString())

  res.cookie('jwt', refreshToken, cookieOptions)

  res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${accessToken}`)
}