import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Define types for UI state
interface ToastState {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  isVisible: boolean
}

interface UiState {
  theme: 'light' | 'dark'
  isModalOpen: boolean
  modalType: string | null
  modalProps: any | null
  // New Toast State
  toast: ToastState
}

// Check local storage for theme preference
const storedTheme = localStorage.getItem('theme') as 'light' | 'dark'

const initialState: UiState = {
  theme: storedTheme || 'light',
  isModalOpen: false,
  modalType: null,
  modalProps: null,
  toast: {
    message: '',
    type: 'info',
    isVisible: false
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // 1. Toggle Theme
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      state.theme = newTheme
      
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(newTheme)
      
      localStorage.setItem('theme', newTheme)
    },

    // 2. Modals
    openModal: (state, action: PayloadAction<{ type: string; props?: any }>) => {
      state.isModalOpen = true
      state.modalType = action.payload.type
      state.modalProps = action.payload.props || null
    },
    closeModal: (state) => {
      state.isModalOpen = false
      state.modalType = null
      state.modalProps = null
    },

    // 3. Toasts / Notifications (NEW)
    showToast: (state, action: PayloadAction<{ message: string; type?: ToastState['type'] }>) => {
      state.toast.message = action.payload.message
      state.toast.type = action.payload.type || 'info'
      state.toast.isVisible = true
    },
    hideToast: (state) => {
      state.toast.isVisible = false
    }
  },
})

export const { toggleTheme, openModal, closeModal, showToast, hideToast } = uiSlice.actions
export default uiSlice.reducer