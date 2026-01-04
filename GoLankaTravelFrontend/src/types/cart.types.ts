export interface CartItem {
  tripId: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface CartState {
  items: CartItem[]
  totalAmount: number
  isOpen: boolean
}