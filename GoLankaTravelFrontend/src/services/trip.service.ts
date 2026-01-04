import api from './api'
import type { ITrip } from '../types/trip.types'

// --- Response Types ---

interface GetAllTripsResponse {
  status: string
  results: number
  data: {
    trips: ITrip[]
  }
}

interface GetOneTripResponse {
  status: string
  data: {
    trip: ITrip
  }
}

// --- Service ---

const tripService = {
  /**
   * Fetch all trips with optional query parameters.
   * Endpoint: GET /api/v1/trips/all
   */
  getAllTrips: async (queryString: string = ''): Promise<ITrip[]> => {
    const query = queryString && !queryString.startsWith('?') ? `?${queryString}` : queryString
    
    const response = await api.get<GetAllTripsResponse>(`/trips/all${query}`)
    return response.data.data.trips
  },

  /**
   * Fetch a single trip by ID.
   * Endpoint: GET /api/v1/trips/:id
   */
  getTripById: async (id: string): Promise<ITrip> => {
    const response = await api.get<GetOneTripResponse>(`/trips/${id}`)
    return response.data.data.trip
  },

  /**
   * Create a new trip (Admin only).
   * Endpoint: POST /api/v1/trips/save
   */
  createTrip: async (tripData: Partial<ITrip>): Promise<ITrip> => {
    const response = await api.post<GetOneTripResponse>('/trips/save', tripData)
    return response.data.data.trip
  },

  /**
   * Update an existing trip (Admin only).
   * Endpoint: PUT /api/v1/trips/update/:id
   */
  updateTrip: async (id: string, tripData: Partial<ITrip>): Promise<ITrip> => {
    const response = await api.put<GetOneTripResponse>(`/trips/update/${id}`, tripData)
    return response.data.data.trip
  },

  /**
   * Delete a trip (Admin only).
   * Endpoint: DELETE /api/v1/trips/delete/:id
   */
  deleteTrip: async (id: string): Promise<void> => {
    await api.delete(`/trips/delete/${id}`)
  },

  /**
   * Get Top 5 Cheapest Trips.
   * Endpoint: GET /api/v1/trips/all?sort=price&limit=5
   */
  getTop5Cheap: async (): Promise<ITrip[]> => {
    const response = await api.get<GetAllTripsResponse>('/trips/all?sort=price&limit=5') 
    return response.data.data.trips
  },

  /**
   * Get Trip Statistics.
   * Endpoint: GET /api/v1/admin/stats (or trips/stats if you added it)
   */
  getTripStats: async () => {
    const response = await api.get('/admin/stats')
    return response.data.data
  }
}

export default tripService