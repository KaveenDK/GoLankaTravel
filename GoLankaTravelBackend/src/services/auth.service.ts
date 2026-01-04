import jwt from 'jsonwebtoken'

/**
 * Generate a short-lived Access Token
 * Used for authorizing API requests
 */
export const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    // FIX: Cast to 'any' to resolve the "StringValue" type mismatch
    expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as any,
  })
}

/**
 * Generate a long-lived Refresh Token
 * Used to get a new Access Token when the old one expires
 */
export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: (process.env.REFRESH_TOKEN_EXPIRES_IN || '7d') as any,
  })
}

/**
 * Verify a Refresh Token
 */
export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string)
  } catch (error) {
    throw new Error('Invalid Refresh Token')
  }
}