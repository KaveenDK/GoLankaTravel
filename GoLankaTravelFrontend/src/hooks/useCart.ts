import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { 
  addToCart, 
  removeFromCart, 
  clearCart, 
  toggleCart 
} from '../redux/slices/cartSlice'
import type { CartItem } from '../types/cart.types'

export const useCart = () => {
  const dispatch = useAppDispatch()
  
  // 1. Get Cart State
  const { items, totalAmount, isOpen } = useAppSelector((state) => state.cart)

  // 2. Helper: Calculate total items count (sum of all quantities)
  const totalItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  // 3. Actions
  const addItem = useCallback((item: CartItem) => {
    dispatch(addToCart(item))
  }, [dispatch])

  const removeItem = useCallback((itemId: string) => {
    dispatch(removeFromCart(itemId))
  }, [dispatch])

  const emptyCart = useCallback(() => {
    dispatch(clearCart())
  }, [dispatch])

  const toggleCartDrawer = useCallback(() => {
    dispatch(toggleCart())
  }, [dispatch])

  // 4. Check if item is already in cart
  const isInCart = useCallback((tripId: string) => {
    return items.some((item) => item.tripId === tripId)
  }, [items])

  return {
    // State
    items,
    totalAmount,
    isOpen,
    totalItemsCount,
    
    // Actions
    addItem,
    removeItem,
    clearCart: emptyCart,
    toggleCart: toggleCartDrawer,
    
    // Helpers
    isInCart
  }
}

export default useCart