import { Response } from 'express'

/**
 * Standardize API Responses
 * @param res - Express Response Object
 * @param statusCode - HTTP Status Code (200, 201, 400, etc.)
 * @param success - Boolean indicating success or failure
 * @param message - A human-readable message for the user/developer
 * @param data - (Optional) The actual data payload (e.g., user object, list of trips)
 */
export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: any = null
) => {
  const responsePayload: any = {
    success,
    message,
  }

  if (data !== null && data !== undefined) {
    responsePayload.data = data
  }

  res.status(statusCode).json(responsePayload)
}