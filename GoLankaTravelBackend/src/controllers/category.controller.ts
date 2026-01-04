import { Request, Response, NextFunction } from 'express'
import Category from '../models/Category.model'
import AppError from '../utils/appError'
import { sendResponse } from '../utils/apiResponse'
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto'

/**
 * @desc    Create a new Category
 * @route   POST /api/v1/categories
 * @access  Private (Admin)
 */
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Use DTO for Type Safety
    const { name, description, image }: CreateCategoryDto = req.body

    // 1. Validation
    if (!name) {
      return next(new AppError('Category name is required', 400))
    }

    // 2. Check for duplicate
    const categoryExists = await Category.findOne({ name })
    if (categoryExists) {
      return next(new AppError('Category with this name already exists', 400))
    }

    // 3. Create
    const category = await Category.create({
      name,
      description,
      image
    })

    sendResponse(res, 201, true, 'Category created successfully', category)

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Get All Categories
 * @route   GET /api/v1/categories
 * @access  Public
 */
export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find()
    
    sendResponse(res, 200, true, 'Categories fetched successfully', categories)

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Get Single Category by ID
 * @route   GET /api/v1/categories/:id
 * @access  Public
 */
export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findById(req.params.id)

    if (!category) {
      return next(new AppError('Category not found', 404))
    }

    sendResponse(res, 200, true, 'Category details fetched', category)

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Update Category
 * @route   PUT /api/v1/categories/:id
 * @access  Private (Admin)
 */
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateData: UpdateCategoryDto = req.body

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    })

    if (!category) {
      return next(new AppError('Category not found', 404))
    }

    sendResponse(res, 200, true, 'Category updated successfully', category)

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Delete Category
 * @route   DELETE /api/v1/categories/:id
 * @access  Private (Admin)
 */
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)

    if (!category) {
      return next(new AppError('Category not found', 404))
    }

    sendResponse(res, 200, true, 'Category deleted successfully')

  } catch (error: any) {
    next(error)
  }
}