import Cart, { ICartItem } from '../models/Cart.model'

/**
 * Get Cart by User ID
 */
export const getCartByUserId = async (userId: string) => {
  let cart = await Cart.findOne({ userId })
  return cart
}

/**
 * Add Item to Cart (or Update Quantity if exists)
 */
export const addItemToCart = async (userId: string, item: ICartItem) => {
  let cart = await Cart.findOne({ userId })

  if (!cart) {
    // 1. If no cart exists, create a new one
    cart = await Cart.create({
      userId,
      items: [item],
      totalPrice: item.price * item.quantity
    })
  } else {
    // 2. If cart exists, check if item is already in it
    const itemIndex = cart.items.findIndex((p) => p.tripId.toString() === item.tripId)

    if (itemIndex > -1) {
      // a) Item exists, update quantity
      let product = cart.items[itemIndex]
      product.quantity += item.quantity
      cart.items[itemIndex] = product
    } else {
      // b) Item does not exist, push to array
      cart.items.push(item)
    }

    // 3. Recalculate Total Price
    cart.totalPrice = calculateTotal(cart.items)
    await cart.save()
  }

  return cart
}

/**
 * Remove Item from Cart
 */
export const removeItemFromCart = async (userId: string, tripId: string) => {
  let cart = await Cart.findOne({ userId })

  if (!cart) return null

  // Filter out the item to be removed
  cart.items = cart.items.filter((item) => item.tripId.toString() !== tripId)

  // Recalculate Total
  cart.totalPrice = calculateTotal(cart.items)
  
  await cart.save()
  return cart
}

/**
 * Clear Cart
 */
export const clearCartByUserId = async (userId: string) => {
  const cart = await Cart.findOneAndDelete({ userId })
  return cart
}

/**
 * Calculate Total Price of Cart
 */
const calculateTotal = (items: ICartItem[]): number => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
}