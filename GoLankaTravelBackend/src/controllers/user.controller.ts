import { Request, Response, NextFunction } from 'express'
import User from '../models/User.model'
import AppError from '../utils/appError'
import { sendResponse } from '../utils/apiResponse'

/**
 * @desc    Get Current User Profile
 * @route   GET /api/v1/users/me
 * @access  Private (User)
 */
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // req.user is set by the auth middleware
    const currentUser = req.user as any

    // We explicitly exclude the password field
    const user = await User.findById(currentUser._id).select('-password')

    if (!user) {
      return next(new AppError('User not found', 404))
    }

    sendResponse(res, 200, true, 'User profile fetched', user)

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Update User Profile (Name, Avatar, Theme)
 * @route   PUT /api/v1/users/me
 * @access  Private (User)
 */
export const updateMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUser = req.user as any

    // 1. Prevent Password Updates here (Use dedicated auth route for that)
    if (req.body.password || req.body.role) {
      return next(new AppError('This route is not for password or role updates.', 400))
    }

    // 2. Filter allowable fields
    const { username, avatar, preferences } = req.body
    
    // 3. Build update object dynamically
    const updateData: any = {}
    if (username) updateData.username = username
    if (avatar) updateData.avatar = avatar
    if (preferences) updateData.preferences = preferences

    // 4. Update User
    const updatedUser = await User.findByIdAndUpdate(currentUser._id, updateData, {
      new: true,
      runValidators: true
    }).select('-password')

    sendResponse(res, 200, true, 'Profile updated successfully', updatedUser)

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Get All Users (Admin)
 * @route   GET /api/v1/users/admin/all
 * @access  Private (Admin)
 */
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt')
    
    sendResponse(res, 200, true, 'All users fetched', {
      count: users.length,
      users
    })

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Delete User (Admin)
 * @route   DELETE /api/v1/users/admin/:id
 * @access  Private (Admin)
 */
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return next(new AppError('User not found', 404))
    }

    sendResponse(res, 200, true, 'User deleted successfully')

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Promote/Demote User Role (Admin)
 * @route   PUT /api/v1/users/admin/:id/role
 * @access  Private (Admin)
 */
export const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.body
    
    if (!['admin', 'traveler'].includes(role)) {
      return next(new AppError('Invalid role provided', 400))
    }

    const user = await User.findByIdAndUpdate(req.params.id, { role }, {
      new: true,
      runValidators: true
    })

    if (!user) {
      return next(new AppError('User not found', 404))
    }

    sendResponse(res, 200, true, `User role updated to ${role}`, user)

  } catch (error: any) {
    next(error)
  }
}