export interface IActivity {
  _id?: string
  time: string
  activity: string
  description?: string
  location?: string
}

export interface IDayPlan {
  _id?: string
  day: number
  theme: string
  activities: IActivity[]
}

export interface ITrip {
  _id: string
  name: string
  destination: string
  description: string
  price: number
  currency: string
  duration: number
  category: string
  image: string
  startDate?: string // Dates from API are always strings (ISO format)
  endDate?: string
  itinerary: IDayPlan[]
  generatedByAI: boolean
  ratingsAverage: number
  ratingsQuantity: number
  createdAt: string
  updatedAt: string
}

// Type for creating a new trip (some fields are optional or omitted)
export type CreateTripData = Omit<ITrip, '_id' | 'createdAt' | 'updatedAt' | 'ratingsAverage' | 'ratingsQuantity'>