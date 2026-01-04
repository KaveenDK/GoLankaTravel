import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/appError'

/**
 * Authorization Middleware
 * Restricts access to specific user roles (e.g., 'admin').
 * @param roles - List of allowed roles (e.g., 'admin', 'moderator')
 */
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    
    // 1. Security Check: Ensure user is logged in first
    // (req.user is set by the 'protect' middleware)
    if (!req.user) {
      return next(new AppError('User not authenticated. Please login.', 401))
    }

    // 2. Check Role
    if (!roles.includes((req.user as any).role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }

    // 3. Access Granted
    next()
  }
}