// 1. User Interface
export interface User {
  _id: string
  username: string
  email: string
  role: 'traveler' | 'admin' | 'guide' 
  avatar?: string
  preferences?: {
    theme?: 'light' | 'dark'
    currency?: string
  }
  isVerified?: boolean
  createdAt?: string
}

// 2. Login Credentials (Payload for Login)
export interface LoginCredentials {
  email: string
  password: string
}

// 3. Register Data (Payload for Sign Up)
export interface RegisterData {
  username: string
  email: string
  password: string
  confirmPassword?: string
}

// 4. API Responses
export interface AuthResponse {
  success: boolean
  message: string
  token?: string 
  data: {
    user: User
    accessToken?: string
  }
}

// 5. Redux Auth State
export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}