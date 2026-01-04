import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import tripService from '../../services/trip.service'
import type { ITrip } from '../../types/trip.types'

// Define the State Interface
interface TripState {
  trips: ITrip[]
  currentTrip: ITrip | null
  total: number
  page: number
  loading: boolean
  error: string | null
}

const initialState: TripState = {
  trips: [],
  currentTrip: null,
  total: 0,
  page: 1,
  loading: false,
  error: null,
}

// --- ASYNC THUNKS ---

// 1. Fetch All Trips
export const fetchTrips = createAsyncThunk(
  'trips/fetchAll',
  async (queryParams: string = '', { rejectWithValue }) => {
    try {
      // Calls the service which handles the API request
      const data = await tripService.getAllTrips(queryParams)
      return data // Expecting ITrip[]
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch trips')
    }
  }
)

// 2. Fetch Single Trip by ID
export const fetchTripById = createAsyncThunk(
  'trips/fetchOne',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await tripService.getTripById(id)
      return data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch trip details')
    }
  }
)

// 3. Delete Trip (This was missing in your previous code)
export const deleteTrip = createAsyncThunk(
  'trips/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await tripService.deleteTrip(id)
      return id // Return the ID of the deleted trip to update state
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete trip')
    }
  }
)

// 4. Create Trip (Useful for Admin)
export const createTrip = createAsyncThunk(
  'trips/create',
  async (tripData: any, { rejectWithValue }) => {
    try {
      const data = await tripService.createTrip(tripData)
      return data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create trip')
    }
  }
)

// --- SLICE ---
const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    clearCurrentTrip: (state) => {
      state.currentTrip = null
      state.error = null
    },
    clearErrors: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch All Trips ---
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false
        // Assuming the service returns an array of trips
        state.trips = action.payload 
        state.total = action.payload.length
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // --- Fetch Single Trip ---
      .addCase(fetchTripById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTripById.fulfilled, (state, action) => {
        state.loading = false
        state.currentTrip = action.payload
      })
      .addCase(fetchTripById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // --- Delete Trip ---
      .addCase(deleteTrip.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.loading = false
        // Instantly remove the deleted trip from the UI list
        state.trips = state.trips.filter((trip) => trip._id !== action.payload)
        state.total -= 1
      })
      .addCase(deleteTrip.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      
      // --- Create Trip ---
      .addCase(createTrip.fulfilled, (state, action) => {
        state.trips.push(action.payload)
        state.total += 1
      })
  },
})

export const { clearCurrentTrip, clearErrors } = tripSlice.actions
export default tripSlice.reducer