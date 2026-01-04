export interface RegisterUserDto {
  username: string
  email: string
  password: string
}


export interface LoginUserDto {
  email: string
  password: string
}


export interface UpdateUserDto {
  username?: string
  avatar?: string
  preferences?: {
    theme?: 'light' | 'dark'
    currency?: string
  }
}


export interface UserResponseDto {
  id: string
  username: string
  email: string
  role: 'admin' | 'traveler'
  avatar: string
  preferences: {
    theme: string
    currency: string
  }
  createdAt: Date
}