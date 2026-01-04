/**
 * Formats a number into a Sri Lankan Rupee currency string.
 * Example: 45000 -> "LKR 45,000"
 * * @param amount - The price in numerical format
 * @returns The formatted string
 */
export const formatLKR = (amount: number | undefined | null): string => {
  if (amount === undefined || amount === null) return 'LKR 0'

  // We use 'en-US' locale for the comma separation (e.g., 1,000) 
  // but manually prepend "LKR" as it's cleaner than the standard "Rs."
  return `LKR ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

/**
 * Formats a number into a US Dollar currency string.
 * Example: 150 -> "$150.00"
 */
export const formatUSD = (amount: number | undefined | null): string => {
  if (amount === undefined || amount === null) return '$0.00'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Calculates the percentage discount between an original price and a selling price.
 * Useful for showing "20% OFF" badges.
 * * @param originalPrice 
 * @param sellingPrice 
 * @returns The discount percentage (e.g., 20)
 */
export const calculateDiscountPercentage = (originalPrice: number, sellingPrice: number): number => {
  if (!originalPrice || originalPrice <= 0) return 0
  if (sellingPrice >= originalPrice) return 0

  const discount = ((originalPrice - sellingPrice) / originalPrice) * 100
  return Math.round(discount)
}