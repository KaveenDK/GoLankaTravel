import express from 'express'
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller'
import { protect } from '../middleware/auth.middleware'
import { authorize } from '../middleware/role.middleware'

const router = express.Router()


/**
 * @route   GET /api/v1/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get('/', getAllCategories)

/**
 * @route   GET /api/v1/categories/:id
 * @desc    Get single category details
 * @access  Public
 */
router.get('/:id', getCategoryById)


// 1. Protect all routes below this line (User must be logged in)
router.use(protect)

// 2. Authorize only 'admin' role for routes below
router.use(authorize('admin'))

/**
 * @route   POST /api/v1/categories
 * @desc    Create a new category
 * @access  Private (Admin)
 */
router.post('/', createCategory)

/**
 * @route   PUT /api/v1/categories/:id
 * @desc    Update a category
 * @access  Private (Admin)
 */
router.put('/:id', updateCategory)

/**
 * @route   DELETE /api/v1/categories/:id
 * @desc    Delete a category
 * @access  Private (Admin)
 */
router.delete('/:id', deleteCategory)

export default router