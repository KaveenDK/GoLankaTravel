import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { apiLimiter } from './middleware/rateLimit.middleware'

import './config/passport'

import globalErrorHandler from './middleware/error.middleware'
import AppError from './utils/appError'

import routes from './routes/index'

const app: Application = express()

// 1. GLOBAL MIDDLEWARE

// Set security HTTP headers
app.use(helmet())

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// --- STRIPE WEBHOOK ---
// We must skip the default JSON parser for the Stripe webhook route
// because it needs the RAW body stream for signature verification.
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/api/v1/webhooks/stripe') {
    next() // Skip json parser
  } else {
    express.json({ limit: '10kb' })(req, res, next)
  }
})

// Body parsers (Standard)
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

// Initialize Passport for authentication
app.use(passport.initialize())

// Apply Rate Limiting Middleware to all API routes
app.use('/api', apiLimiter)


// 2. ROUTES

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'GoLanka Travel API is running successfully! 🚀',
    env: process.env.NODE_ENV
  })
})

// Mount API routes
app.use('/api/v1', routes)


// 3. ERROR HANDLING

// Handle Undefined Routes (404)
app.all(/(.*)/, (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// Global Error Handler Middleware
app.use(globalErrorHandler)

export default app