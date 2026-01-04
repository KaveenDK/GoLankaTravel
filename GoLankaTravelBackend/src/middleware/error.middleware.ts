import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/appError'

/**
 * Handle MongoDB "CastError" (e.g., Invalid ID like '12345')
 */
const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400)
}

/**
 * Handle MongoDB "Duplicate Fields" (e.g., User with same email already exists)
 */
const handleDuplicateFieldsDB = (err: any) => {
  // Regex to extract the duplicate value within quotes
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
  const message = `Duplicate field value: ${value}. Please use another value!`
  return new AppError(message, 400)
}

/**
 * Handle MongoDB "Validation Error" (e.g., Missing required fields)
 */
const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message)
  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

/**
 * Handle JWT Invalid Token Error
 */
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401)

/**
 * Handle JWT Expired Token Error
 */
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401)

/**
 * Send Detailed Error (Development Mode)
 */
const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

/**
 * Send Clean Error (Production Mode)
 */
const sendErrorProd = (err: any, res: Response) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    })
  } 
  // B) Programming or other unknown error: don't leak details
  else {
    // 1) Log error
    console.error('ERROR 💥', err)

    // 2) Send generic message
    res.status(500).json({
      success: false,
      status: 'error',
      message: 'Something went very wrong!',
    })
  }
}

/**
 * GLOBAL ERROR HANDLING MIDDLEWARE
 */
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else {
    let error = { ...err }
    error.message = err.message

    if (err.name === 'CastError') error = handleCastErrorDB(error)
    if (err.code === 11000) error = handleDuplicateFieldsDB(err)
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error)
    if (err.name === 'JsonWebTokenError') error = handleJWTError()
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()

    sendErrorProd(error, res)
  }
}

export default globalErrorHandler