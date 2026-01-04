import { motion } from 'framer-motion'
import { MapPin, Clock, Calendar, Coffee, Camera, Moon, Sun, Utensils } from 'lucide-react'
import { cn } from '../../utils/cn'

// Define Types (Matches your API types)
export interface Activity {
  time: string
  activity: string
  description?: string
  icon?: string
}

export interface DayPlan {
  day: number
  theme: string
  activities: Activity[]
}

interface ItineraryTimelineProps {
  itinerary: DayPlan[]
  isLoading?: boolean
}

const ItineraryTimeline = ({ itinerary, isLoading = false }: ItineraryTimelineProps) => {

  // --- LOADING SKELETON ---
  if (isLoading) {
    return (
      <div className="space-y-8 p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="w-1 h-32 bg-gray-200 dark:bg-gray-700 mt-2" />
            </div>
            <div className="flex-1 space-y-3 pt-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl w-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // --- EMPTY STATE ---
  if (!itinerary || itinerary.length === 0) {
    return (
      <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Itinerary Yet</h3>
        <p className="text-gray-500 text-sm max-w-xs mx-auto">
          Use the AI Planner form to generate a personalized travel plan for your Sri Lankan adventure.
        </p>
      </div>
    )
  }

  // --- TIMELINE CONTENT ---
  return (
    <div className="relative pl-4 md:pl-6">
      {/* Vertical Line running through the whole timeline */}
      <div className="absolute left-[2.25rem] md:left-[2.75rem] top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-transparent opacity-20 dark:opacity-40" />

      <div className="space-y-12 pb-12">
        {itinerary.map((day, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="relative group"
          >
            
            {/* Day Header (Sticky Badge) */}
            <div className="flex items-start gap-6">
              <div className="sticky top-24 z-10 flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg ring-4 ring-white dark:ring-gray-900 font-bold text-sm">
                  D{day.day}
                </div>
              </div>
              
              <div className="flex-1 pt-1.5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-purple-600 dark:text-purple-400">Day {day.day}:</span> 
                  {day.theme}
                </h3>
                
                {/* Activities Card */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md">
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    
                    {day.activities.map((act, actIndex) => (
                      <motion.div 
                        key={actIndex} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.15) + (actIndex * 0.1) }}
                        className="p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex gap-4 md:gap-6 group/item"
                      >
                        {/* Time Column */}
                        <div className="w-20 flex-shrink-0 text-right pt-0.5">
                          <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md inline-block">
                            {act.time}
                          </span>
                        </div>

                        {/* Icon Column (Dynamic based on keywords) */}
                        <div className="mt-0.5 text-purple-500 bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg h-fit">
                           {getActivityIcon(act.activity)}
                        </div>

                        {/* Details Column */}
                        <div className="flex-1">
                          <p className="text-base font-semibold text-gray-900 dark:text-white leading-tight mb-1 group-hover/item:text-purple-600 transition-colors">
                            {act.activity}
                          </p>
                          {act.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                              {act.description}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}

                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Helper: Choose an icon based on activity text keywords
const getActivityIcon = (text: string) => {
  const lower = text.toLowerCase()
  if (lower.includes('breakfast') || lower.includes('coffee')) return <Coffee className="w-4 h-4" />
  if (lower.includes('lunch') || lower.includes('dinner') || lower.includes('eat')) return <Utensils className="w-4 h-4" />
  if (lower.includes('visit') || lower.includes('explore') || lower.includes('tour') || lower.includes('see')) return <Camera className="w-4 h-4" />
  if (lower.includes('arrive') || lower.includes('check-in') || lower.includes('travel') || lower.includes('drive')) return <MapPin className="w-4 h-4" />
  if (lower.includes('morning') || lower.includes('sunrise')) return <Sun className="w-4 h-4" />
  if (lower.includes('night') || lower.includes('evening') || lower.includes('sunset')) return <Moon className="w-4 h-4" />
  return <Clock className="w-4 h-4" />
}

export default ItineraryTimeline