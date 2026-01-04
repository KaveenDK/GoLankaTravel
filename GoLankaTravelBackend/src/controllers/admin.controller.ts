import { Request, Response, NextFunction } from 'express'
import catchAsync from '../utils/catchAsync'
import { sendResponse } from '../utils/apiResponse'
import AppError from '../utils/appError'
import { 
  getDashboardStatsService, 
  getAllUsersService, 
  deleteUserService 
} from '../services/admin.service'

/**
 * @desc    Get Admin Dashboard Stats (Revenue, Users, etc.)
 * @route   GET /api/v1/admin/stats
 * @access  Private (Admin only)
 */
export const getDashboardStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const stats = await getDashboardStatsService()

  sendResponse(res, 200, true, 'Dashboard statistics fetched successfully', stats)
})

/**
 * @desc    Get All Users
 * @route   GET /api/v1/admin/users
 * @access  Private (Admin only)
 */
export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const users = await getAllUsersService()

  sendResponse(res, 200, true, 'All users fetched successfully', users)
})

/**
 * @desc    Delete a User
 * @route   DELETE /api/v1/admin/users/:id
 * @access  Private (Admin only)
 */
export const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params

  const deletedUser = await deleteUserService(id)

  if (!deletedUser) {
    return next(new AppError('User not found', 404))
  }

  sendResponse(res, 200, true, 'User deleted successfully')
})