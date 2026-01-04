import { motion } from 'framer-motion'
import { Map } from 'lucide-react'
import type { ITrip } from '../../types/trip.types'
import TripCard from './TripCard'
import { staggerContainer, staggerItem } from '../../utils/animations'

interface TripListProps {
  trips: ITrip[]
  isLoading?: boolean
}

const TripList = ({ trips, isLoading = false }: TripListProps) => {
  
  // --- LOADING STATE ---
  // If loading is true, show 6 skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
           <TripCard key={i} isLoading={true} />
        ))}
      </div>
    )
  }

  // --- EMPTY STATE ---
  if (!trips || trips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in duration-500">
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-full mb-4">
          <Map className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
          No trips found
        </h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto">
          We couldn't find any trips matching your criteria. Try adjusting your filters.
        </p>
      </div>
    )
  }

  // --- STAGGERED GRID LAYOUT ---
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {trips.map((trip) => (
        <motion.div key={trip._id} variants={staggerItem}>
           <TripCard trip={trip} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default TripList