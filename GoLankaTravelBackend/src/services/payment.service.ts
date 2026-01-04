import { v4 as uuidv4 } from 'uuid'

/**
 * Generate a Unique Order ID
 * PayHere and Stripe require a unique reference for every transaction.
 * We use UUID (Universally Unique Identifier) to ensure no collisions.
 */
export const generateOrderId = (): string => {
  return `ORD-${uuidv4()}`
}

/**
 * Format Amount for Payment Gateways
 * Stripe expects amount in 'cents' (integer), while PayHere expects '100.00' (string).
 */
export const formatAmountForStripe = (amountLKR: number): number => {
  // Stripe expects the smallest currency unit (cents/rupee-cents)
  // 1000 LKR -> 100000 cents
  return Math.round(amountLKR * 100)
}

export const formatAmountForPayHere = (amountLKR: number): string => {
  // PayHere expects standard decimal format: "1000.00"
  return amountLKR.toFixed(2)
}