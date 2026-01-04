import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, CartState } from '../../types/cart.types'

// Check if cart exists in localStorage to persist data on refresh
const storedCart = localStorage.getItem('cart')
const parsedCart = storedCart ? JSON.parse(storedCart) : null

// Initialize State
const initialState: CartState = {
  items: parsedCart ? parsedCart.items : [],
  totalAmount: parsedCart ? parsedCart.totalAmount : 0,
  isOpen: false // Default to closed
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.tripId === newItem.tripId)

      if (existingItem) {
        existingItem.quantity += newItem.quantity
      } else {
        state.items.push(newItem)
      }
      
      // Recalculate Total
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity, 0
      )

      // Open cart when adding item (optional UX preference)
      state.isOpen = true

      // Save to local storage (excluding isOpen state)
      localStorage.setItem('cart', JSON.stringify({ 
        items: state.items, 
        totalAmount: state.totalAmount 
      }))
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.items = state.items.filter((item) => item.tripId !== id)
      
      // Recalculate Total
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity, 0
      )

      localStorage.setItem('cart', JSON.stringify({ 
        items: state.items, 
        totalAmount: state.totalAmount 
      }))
    },

    clearCart: (state) => {
      state.items = []
      state.totalAmount = 0
      localStorage.removeItem('cart')
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    }
  },
})

export const { addToCart, removeFromCart, clearCart, toggleCart } = cartSlice.actions
export default cartSlice.reducer