import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import authService from '../../services/auth.service'
import type { AuthState, LoginCredentials, RegisterData, AuthResponse, User } from '../../types/auth.types'

// 1. Initial State
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'), 
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
}

// 2. Async Thunks

export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      return await authService.login(credentials)
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Login failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const register = createAsyncThunk<AuthResponse, RegisterData>(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      return await authService.register(data)
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Registration failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const verifyEmail = createAsyncThunk<AuthResponse, { email: string, otp: string }>(
  'auth/verifyEmail',
  async (data, thunkAPI) => {
    try {
      return await authService.verifyEmail(data)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Verification failed'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const checkAuthStatus = createAsyncThunk<User>(
  'auth/checkStatus',
  async (_, thunkAPI) => {
    try {
      const response = await authService.getCurrentUser()
      return (response as any).data 
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Session expired')
    }
  }
)

// 3. The Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout()
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => { state.loading = true; state.error = null })
      .addCase(login.fulfilled, (state, action: any) => {
        state.loading = false
        state.isAuthenticated = true
        // Backend returns: { success: true, message: "...", data: { accessToken: "...", ...userProps } }
        // We need to be careful with the mapping
        const payloadData = action.payload.data || action.payload
        state.user = payloadData
        state.token = payloadData.accessToken
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload as string
      })

      // REGISTER
      .addCase(register.pending, (state) => { state.loading = true; state.error = null })
      .addCase(register.fulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = false 
        state.user = null
        state.token = null
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // VERIFY EMAIL
      .addCase(verifyEmail.pending, (state) => { state.loading = true; state.error = null })
      .addCase(verifyEmail.fulfilled, (state, action: any) => {
        state.loading = false
        state.isAuthenticated = true
        const payloadData = action.payload.data || action.payload
        state.user = payloadData
        state.token = payloadData.accessToken
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // CHECK AUTH STATUS
      .addCase(checkAuthStatus.fulfilled, (state, action: any) => {
        state.isAuthenticated = true
        state.user = action.payload 
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.token = null
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer