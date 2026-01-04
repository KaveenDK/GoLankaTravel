import express from 'express'
import {
  getMe,
  updateMe,
  getAllUsers,
  deleteUser,
  updateUserRole
} from '../controllers/user.controller'
import { protect } from '../middleware/auth.middleware'
import { authorize } from '../middleware/role.middleware'

const router = express.Router()

router.use(protect)

/**
 * @route   GET /api/v1/users/me
 * @desc    Get current user's profile
 * @access  Private (Logged In User)
 */
router.get('/me', getMe)

/**
 * @route   PUT /api/v1/users/me
 * @desc    Update current user's profile (Avatar, Name, Theme)
 * @access  Private (Logged In User)
 */
router.put('/me', updateMe)


// Apply 'authorize' middleware to all routes below (Admin Only)
router.use(authorize('admin'))

/**
 * @route   GET /api/v1/users/admin/all
 * @desc    Get all users
 * @access  Private (Admin)
 */
router.get('/admin/all', getAllUsers)

/**
 * @route   PUT /api/v1/users/admin/:id/role
 * @desc    Change a user's role (e.g., promote to admin)
 * @access  Private (Admin)
 */
router.put('/admin/:id/role', updateUserRole)

/**
 * @route   DELETE /api/v1/users/admin/:id
 * @desc    Delete a user account
 * @access  Private (Admin)
 */
router.delete('/admin/:id', deleteUser)

export default router