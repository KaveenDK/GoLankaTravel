import { Request, Response, NextFunction } from 'express'
import Trip from '../models/Trip.model'
import AppError from '../utils/appError'
import { sendResponse } from '../utils/apiResponse'
import { generateTripPdf } from '../services/pdf.service'
import { CreateTripDto, UpdateTripDto } from '../dto/trip.dto'

/**
 * @desc    Create a new Trip (Admin)
 * @route   POST /api/v1/trips/save
 * @access  Private (Admin)
 */
export const createTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Use DTO for Type Safety
    const tripData: CreateTripDto = req.body

    // 2. Create Trip
    const trip = await Trip.create(tripData)

    sendResponse(res, 201, true, 'Trip created successfully', trip)

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Get All Trips (With Filter, Sort, Pagination)
 * @route   GET /api/v1/trips/all
 * @access  Public
 */
export const getAllTrips = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Filtering
    const queryObj = { ...(req.query as any) }
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach((el) => delete queryObj[el])

    // Advanced filtering: destination search (regex)
    let findQuery: any = {}
    
    if (queryObj.destination) {
      findQuery.destination = { $regex: queryObj.destination, $options: 'i' }
    }
    
    if (queryObj.category) {
      findQuery.category = queryObj.category
    }
    
    // budget logic
    if (queryObj.budget) {
       const budgetType = (queryObj.budget as string).toLowerCase()

       if (budgetType === 'budget') {
         // Less than or equal to 50,000 LKR
         findQuery.price = { $lte: 50000 }
       } else if (budgetType === 'moderate') {
         // Between 50,000 and 150,000 LKR
         findQuery.price = { $gt: 50000, $lte: 150000 }
       } else if (budgetType === 'luxury') {
         // Greater than 150,000 LKR
         findQuery.price = { $gt: 150000 }
       }
    }

    let query = Trip.find(findQuery)

    // 2. Sorting
    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

    // 3. Pagination
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    query = query.skip(skip).limit(limit)

    // Execute Query
    const trips = await query
    const total = await Trip.countDocuments(findQuery)

    sendResponse(res, 200, true, 'Trips fetched successfully', {
      results: trips.length,
      total,
      page,
      trips
    })

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Get Single Trip by ID
 * @route   GET /api/v1/trips/:id
 * @access  Public
 */
export const getTripById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trip = await Trip.findById(req.params.id)

    if (!trip) {
      return next(new AppError('Trip not found with that ID', 404))
    }

    sendResponse(res, 200, true, 'Trip details fetched', trip)

  } catch (error: any) {
    next(new AppError('Invalid Trip ID', 400))
  }
}

/**
 * @desc    Update Trip
 * @route   PUT /api/v1/trips/update/:id
 * @access  Private (Admin)
 */
export const updateTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateData: UpdateTripDto = req.body

    const trip = await Trip.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    })

    if (!trip) {
      return next(new AppError('Trip not found with that ID', 404))
    }

    sendResponse(res, 200, true, 'Trip updated successfully', trip)

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Delete Trip
 * @route   DELETE /api/v1/trips/delete/:id
 * @access  Private (Admin)
 */
export const deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id)

    if (!trip) {
      return next(new AppError('Trip not found with that ID', 404))
    }

    sendResponse(res, 200, true, 'Trip deleted successfully')

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Generate PDF Report for a Trip
 * @route   POST /api/v1/trips/:id/pdf
 * @access  Private (User/Admin)
 */
export const getTripPdf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trip = await Trip.findById(req.params.id)

    if (!trip) {
      return next(new AppError('Trip not found', 404))
    }

    // Call the PDF Service
    const pdfBuffer = await generateTripPdf(trip)

    // Set headers for PDF download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="trip-${trip.destination}.pdf"`,
      'Content-Length': pdfBuffer.length
    })

    res.end(pdfBuffer)

  } catch (error: any) {
    next(new AppError('Failed to generate PDF: ' + error.message, 500))
  }
}