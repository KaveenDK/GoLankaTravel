import { Request, Response, NextFunction } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import { sendResponse } from '../utils/apiResponse'
import { getGeocodeService, getNearbyPlacesService } from '../services/maps.service'

/**
 * @desc    Get Coordinates for a city/address
 * @route   GET /api/v1/maps/geocode?address=Kandy
 */
export const getGeocode = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { address } = req.query

  if (!address) {
    return next(new AppError('Please provide an address parameter', 400))
  }

  const data = await getGeocodeService(address as string)

  sendResponse(res, 200, true, 'Location coordinates fetched successfully', data)
})

/**
 * @desc    Get Nearby Places (Hotels, Attractions)
 * @route   GET /api/v1/maps/nearby?lat=...&lng=...&type=lodging
 */
export const getNearbyPlaces = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { lat, lng, radius, type } = req.query

  if (!lat || !lng) {
    return next(new AppError('Please provide lat and lng parameters', 400))
  }

  const data = await getNearbyPlacesService(
    parseFloat(lat as string), 
    parseFloat(lng as string), 
    radius ? parseInt(radius as string) : 2000,
    type as string || 'tourist_attraction'
  )

  sendResponse(res, 200, true, `Found ${data.length} nearby places`, data)
})