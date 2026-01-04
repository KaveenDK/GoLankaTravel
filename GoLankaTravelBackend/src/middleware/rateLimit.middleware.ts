import rateLimit from 'express-rate-limit'
import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '../utils/apiResponse'

/**
 * 1. General API Rate Limiter
 * Applied to all standard API routes to prevent DDoS
 * Limit: 100 requests per 15 minutes per IP
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, 429, false, 'Too many requests from this IP, please try again after 15 minutes')
  }
})

/**
 * 2. Auth Rate Limiter (Stricter)
 * Applied to Login, Register, Forgot Password
 * Limit: 10 requests per 15 minutes per IP
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, 
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, 429, false, 'Too many login attempts. Please try again later.')
  }
})

/**
 * 3. AI Service Rate Limiter
 * Applied to Gemini AI generation to save costs
 * Limit: 20 requests per 1 hour per IP
 */
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'AI Usage limit exceeded', // Fallback message
  handler: (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, 429, false, 'You have reached your hourly AI planning limit. Please try again later.')
  }
})