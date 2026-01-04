import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.model'
import AppError from '../utils/appError'

/**
 * 1. PROTECT MIDDLEWARE
 * Verifies the JWT Access Token and attaches the user to req.user
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token

    // 1. Get token from Authorization header
    // Header format: "Bearer <token>"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    // 2. Check if token exists
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      )
    }

    // 3. Verify Token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)

    // 4. Check if User still exists
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
      return next(
        new AppError('The user belonging to this token no longer exists.', 401)
      )
    }

    // 5. Grant Access: Attach user to the request object
    req.user = currentUser as any
    next()

  } catch (error: any) {
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token. Please log in again!', 401))
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Your token has expired! Please log in again.', 401))
    }
    
    // Generic error
    return next(new AppError('Authentication failed', 401))
  }
}

/**
 * 2. RESTRICT TO (RBAC)
 * Checks if the logged-in user has permission to perform this action.
 * Usage: router.use(restrictTo('admin', 'manager'))
 */
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // req.user is set by the 'protect' middleware above
    // We check if the user's role is included in the allowed roles
    if (!roles.includes((req.user as any).role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }

    next()
  }
}