import api from './api'
import type { LoginCredentials, RegisterData, User, AuthResponse } from '../types/auth.types'

const authService = {
  /**
   * Logs in a user.
   * Endpoint: POST /api/v1/auth/login
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    
    const token = (response.data as any)?.data?.accessToken || response.data.token
    
    if (token) {
      localStorage.setItem('token', token)
    }
    return response.data
  },

  /**
   * Registers a new user.
   * Endpoint: POST /api/v1/auth/register
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data)
    return response.data
  },

  /**
   * Logs out the user.
   * Endpoint: POST /api/v1/auth/logout
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.warn('Logout API call failed', error)
    } finally {
      localStorage.removeItem('token')
    }
  },

  /**
   * Verifies user email address via token (OTP).
   * Endpoint: POST /api/v1/auth/verify-email
   */
  verifyEmail: async (data: { email: string, otp: string }): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/verify-email', data)
    
    const token = (response.data as any)?.data?.accessToken || response.data.token
    
    if (token) {
      localStorage.setItem('token', token)
    }
    return response.data
  },

  /**
   * Checks if the current session/token is valid and returns user data.
   * Endpoint: GET /api/v1/users/me
   */
  getCurrentUser: async (): Promise<{ data: { user: User } }> => {
    const response = await api.get<{ data: { user: User } }>('/users/me')
    return response.data
  },

  /**
   * Forgot Password - Request Reset Link
   * Endpoint: POST /api/v1/auth/forgot-password
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  /**
   * Reset Password - Submit new password with token
   * Endpoint: POST /api/v1/auth/reset-password
   */
  resetPassword: async (token: string, password: string, passwordConfirm: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/reset-password', {
      otp: token,
      newPassword: password,
      confirmPassword: passwordConfirm 
    })
    
    const newToken = (response.data as any)?.data?.accessToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    }
    return response.data
  }
}

export default authService