import Trip, { ITrip } from '../models/Trip.model'

/**
 * Create a new Trip
 */
export const createTripService = async (tripData: Partial<ITrip>) => {
  const trip = await Trip.create(tripData)
  return trip
}

/**
 * Get All Trips with Advanced Filtering
 * @param queryParams - The req.query object from Express
 */
export const getAllTripsService = async (queryParams: any) => {
  // 1. Filtering
  const queryObj = { ...queryParams }
  const excludedFields = ['page', 'sort', 'limit', 'fields']
  excludedFields.forEach((el) => delete queryObj[el])

  // 2. Advanced Filtering: Numeric Operators (gte, gt, lte, lt)
  let queryStr = JSON.stringify(queryObj)
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
  
  let findQuery = JSON.parse(queryStr)

  // 3. Specific Logic: Destination Search (Regex)
  if (queryParams.destination) {
    findQuery.destination = { $regex: queryParams.destination, $options: 'i' }
  }
  
  // Specific Logic: Category
  if (queryParams.category) {
    findQuery.category = queryParams.category
  }

  // Initialize Query
  let query = Trip.find(findQuery)

  // 4. Sorting
  if (queryParams.sort) {
    const sortBy = (queryParams.sort as string).split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  // 5. Pagination
  const page = parseInt(queryParams.page as string) || 1
  const limit = parseInt(queryParams.limit as string) || 10
  const skip = (page - 1) * limit

  query = query.skip(skip).limit(limit)

  // Execute Query
  const trips = await query
  const total = await Trip.countDocuments(findQuery)

  return { trips, total, page, limit }
}

/**
 * Get Single Trip by ID
 */
export const getTripByIdService = async (id: string) => {
  const trip = await Trip.findById(id)
  return trip
}

/**
 * Update Trip
 */
export const updateTripService = async (id: string, updateData: Partial<ITrip>) => {
  const trip = await Trip.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
  return trip
}

/**
 * Delete Trip
 */
export const deleteTripService = async (id: string) => {
  const trip = await Trip.findByIdAndDelete(id)
  return trip
}