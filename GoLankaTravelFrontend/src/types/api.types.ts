import type { IUser } from './user.types'

// 1. Generic API Response Wrapper (Matches your backend 'sendResponse' utility)
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
  error?: any
}

// 2. Auth Response (Login/Register returns this data structure)
export interface AuthResponse {
  _id: string
  username: string
  email: string
  role: 'admin' | 'traveler'
  avatar?: string
  accessToken: string
}

// 3. Paginated Response (For 'getAllTrips' if you implemented pagination)
export interface PaginatedResponse<T> {
  results: number
  total: number
  page: number
  trips: T[]
}