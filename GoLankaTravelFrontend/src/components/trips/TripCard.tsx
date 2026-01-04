import { Link } from 'react-router-dom'
import { MapPin, Clock, Star, ArrowRight, Heart } from 'lucide-react'
import { useState } from 'react'
import type { ITrip } from '../../types/trip.types'
import Button from '../ui/Button'
import { cn } from '../../utils/cn'

interface TripCardProps {
  trip?: ITrip
  isLoading?: boolean
}

const TripCard = ({ trip, isLoading = false }: TripCardProps) => {
  const [isLiked, setIsLiked] = useState(false)

  // --- SKELETON LOADING STATE ---
  if (isLoading || !trip) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-full flex flex-col animate-pulse">
        <div className="h-56 bg-gray-200 dark:bg-gray-700 w-full relative">
           <div className="absolute top-4 right-4 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
        </div>
        <div className="p-5 flex-1 flex flex-col space-y-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="flex gap-4">
             <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
             <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
          <div className="flex-1"></div>
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
             <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
             <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    )
  }

  // --- REAL CARD CONTENT ---
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full relative">
      
      {/* 1. Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={trip.image} 
          alt={trip.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay Gradient (for text readability if needed) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-purple-600 uppercase tracking-wide shadow-sm z-10">
          {trip.category}
        </div>

        {/* Like Button (Heart) */}
        <button 
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white backdrop-blur-md p-2 rounded-full transition-all duration-300 z-10 group/heart"
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-colors duration-300", 
              isLiked ? "fill-red-500 text-red-500" : "text-white group-hover/heart:text-red-500"
            )} 
          />
        </button>

        {/* Rating Badge (Bottom Right) */}
        <div className="absolute bottom-4 right-4 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-white shadow-sm z-10">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs font-bold">{trip.ratingsAverage}</span>
          <span className="text-[10px] text-gray-300">({trip.ratingsQuantity})</span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Title */}
        <div className="mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-purple-600 transition-colors">
            {trip.name}
          </h3>
        </div>

        {/* Location & Duration */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-purple-500" />
            <span className="truncate max-w-[100px]">{trip.destination}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-purple-500" />
            <span>{trip.duration} Days</span>
          </div>
        </div>

        {/* Divider (Spacer to push footer down) */}
        <div className="flex-1"></div>

        {/* 3. Footer Section (Price & Button) */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-2">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Starting from</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              <span className="text-purple-600 text-sm align-top mr-1">LKR</span>
              {trip.price.toLocaleString()}
            </p>
          </div>

          <Link to={`/trips/${trip._id}`}>
            <Button size="sm" className="rounded-xl pl-4 pr-3 group-hover:bg-purple-700 transition-all">
              Details <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TripCard