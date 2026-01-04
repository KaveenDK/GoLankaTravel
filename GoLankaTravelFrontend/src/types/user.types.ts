export interface IUser {
  _id: string
  username: string
  email: string
  role: 'admin' | 'traveler'
  avatar?: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}