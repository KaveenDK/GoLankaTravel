import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { 
  login, 
  register, 
  logout, 
  checkAuthStatus,
  verifyEmail
} from '../redux/slices/authSlice'
import type { LoginCredentials, RegisterData } from '../types/auth.types'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  
  // 1. Select Auth State from Redux
  const { user, isAuthenticated, loading, error, token } = useAppSelector((state) => state.auth)

  // 2. Wrap Redux Actions in useCallback 
  // (Prevents infinite loops if these functions are used in useEffect dependencies)

  const loginUser = useCallback(async (credentials: LoginCredentials) => {
    return dispatch(login(credentials))
  }, [dispatch])

  const registerUser = useCallback(async (data: RegisterData) => {
    return dispatch(register(data))
  }, [dispatch])

  const logoutUser = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  const verifyUserEmail = useCallback(async (token: string) => {
    return dispatch(verifyEmail(token))
  }, [dispatch])

  const refreshAuth = useCallback(() => {
    return dispatch(checkAuthStatus())
  }, [dispatch])

  // 3. Helper Functions for Role Checking
  const hasRole = useCallback((role: string) => {
    return isAuthenticated && user?.role === role
  }, [isAuthenticated, user])

  return {
    // Properties
    user,
    isAuthenticated,
    loading,
    error,
    token,
    
    // Actions
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    verifyEmail: verifyUserEmail,
    checkAuthStatus: refreshAuth,

    // Role Helpers
    hasRole,
    isAdmin: hasRole('admin'),
    isUser: hasRole('user')
  }
}

export default useAuth