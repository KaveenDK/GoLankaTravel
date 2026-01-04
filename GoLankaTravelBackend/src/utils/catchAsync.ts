import { Request, Response, NextFunction } from 'express'

/**
 * Wraps async controller functions to catch errors automatically
 * and pass them to the Global Error Handler.
 */
const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

export default catchAsync