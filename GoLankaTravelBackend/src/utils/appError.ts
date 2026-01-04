class AppError extends Error {
  public statusCode: number
  public status: string
  public isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)

    this.statusCode = statusCode
    
    // If status code starts with 4 (e.g., 404, 400), status is 'fail'
    // If status code starts with 5 (e.g., 500), status is 'error'
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    
    // We flag this as 'operational' so we can distinguish between
    // trusted errors (user input error) and programming bugs (unknown errors)
    this.isOperational = true

    // Capture the stack trace so we know where the error happened
    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError