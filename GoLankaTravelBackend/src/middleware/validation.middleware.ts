import { Request, Response, NextFunction } from 'express'
import { Schema } from 'joi'
import AppError from '../utils/appError'

/**
 * Middleware to validate request body against a Joi Schema
 * @param schema - The Joi Schema to validate against
 */
export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    
    // Validate the request body
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })

    if (error) {
      // Extract clean error messages
      const errorMessage = error.details
        .map((detail) => detail.message.replace(/"/g, ''))
        .join(', ')

      return next(new AppError(`Validation Error: ${errorMessage}`, 400))
    }

    // Validation passed, proceed to controller
    next()
  }
}

export default validate