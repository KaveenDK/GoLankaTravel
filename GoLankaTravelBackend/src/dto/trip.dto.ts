export interface CreateTripDto {
  name: string
  destination: string
  description: string
  price: number
  currency: string
  duration: number
  category: string
  image: string
  startDate?: Date
  endDate?: Date
  itinerary?: {
    day: number
    theme?: string
    activities?: {
      time?: string
      activity: string
      description?: string
      location?: string
    }[]
  }[]
}


export interface UpdateTripDto {
  name?: string
  destination?: string
  description?: string
  price?: number
  currency?: string
  duration?: number
  category?: string
  image?: string
  startDate?: Date
  endDate?: Date
  itinerary?: {
    day: number
    theme?: string
    activities?: {
      time?: string
      activity: string
      description?: string
      location?: string
    }[]
  }[]
}