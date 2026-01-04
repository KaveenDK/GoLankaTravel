import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchTripById, clearCurrentTrip } from '../../redux/slices/tripSlice'
import { addToCart } from '../../redux/slices/cartSlice'
import { 
  MapPin, Clock, Calendar, Star, CheckCircle, 
  ShieldCheck, AlertCircle, ShoppingCart, ArrowLeft, 
  Heart, Share2, Camera, User
} from 'lucide-react'
import Button from '../../components/ui/Button'
import { cn } from '../../utils/cn'
import TripMap from '../../components/maps/TripMap' // Import Map Component

const TripDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  // Redux State
  const { currentTrip, loading } = useAppSelector((state) => state.trips)
  
  // Local State
  const [activeTab, setActiveTab] = useState<'itinerary' | 'reviews'>('itinerary')
  const [guestCount, setGuestCount] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  // --- FALLBACK MOCK DATA (If API returns nothing or error) ---
  const trip = currentTrip || {
    _id: "mock-id-1",
    name: "Sigiriya & Ancient Cities",
    description: "Experience the majesty of the 8th wonder of the world. Climb the lion rock, explore the ancient water gardens, and immerse yourself in the history of the Sigiriya Kingdom.",
    destination: "Sigiriya, Sri Lanka",
    duration: 3,
    price: 15000,
    image: "https://images.unsplash.com/photo-1586607267156-621d9607eb26?q=80&w=1974",
    category: "Cultural",
    ratingsAverage: 4.8,
    ratingsQuantity: 124,
    itinerary: [
      { day: 1, theme: "Arrival & Climb", activities: [{ time: "08:00", activity: "Climb Sigiriya Rock", description: "Early morning climb to avoid heat." }] },
      { day: 2, theme: "Village Tour", activities: [{ time: "10:00", activity: "Bullock Cart Ride", description: "Traditional village experience." }] }
    ]
  }

  // Fetch Data on Mount
  useEffect(() => {
    if (id) {
      dispatch(fetchTripById(id))
    }
    return () => {
      dispatch(clearCurrentTrip())
    }
  }, [dispatch, id])

  const handleAddToCart = () => {
    dispatch(addToCart({
      tripId: trip._id,
      name: trip.name,
      price: trip.price,
      image: trip.image,
      quantity: guestCount
    }))
    navigate('/cart')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-12 px-4 max-w-7xl mx-auto animate-pulse">
        <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4" />
        <div className="h-[500px] w-full bg-gray-200 dark:bg-gray-800 rounded-3xl mb-8" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 pb-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. HEADER SECTION */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-500 hover:text-purple-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Search
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {trip.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-900 dark:text-white">{trip.ratingsAverage}</span>
                  <span className="underline decoration-gray-300">({trip.ratingsQuantity} reviews)</span>
                </div>
                <span className="hidden md:inline">•</span>
                <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                  <MapPin className="w-4 h-4" />
                  {trip.destination}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setIsLiked(!isLiked)} className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <Heart className={cn("w-5 h-5", isLiked ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300")} />
              </button>
              <button className="p-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. IMAGE GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-10 relative">
          <div className="md:col-span-2 h-full relative group cursor-pointer overflow-hidden">
            <img src={trip.image} alt={trip.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>
          {/* Placeholders for Gallery */}
          <div className="hidden md:flex flex-col gap-2 h-full">
             <div className="h-1/2 bg-gray-200"><img src="https://images.unsplash.com/photo-1546708773-e529532720a7?q=80&w=1000" className="w-full h-full object-cover"/></div>
             <div className="h-1/2 bg-gray-200"><img src="https://images.unsplash.com/photo-1625902399222-120002070629?q=80&w=1000" className="w-full h-full object-cover"/></div>
          </div>
          <div className="hidden md:flex flex-col gap-2 h-full">
             <div className="h-1/2 bg-gray-200"><img src="https://images.unsplash.com/photo-1580826903823-99a224eb7d00?q=80&w=1000" className="w-full h-full object-cover"/></div>
             <div className="h-1/2 bg-gray-200 relative">
               <img src="https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=1000" className="w-full h-full object-cover"/>
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold"><Camera className="w-5 h-5 mr-2"/> View All</div>
             </div>
          </div>
        </div>

        {/* 3. MAIN CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-2">
            
            {/* Highlights Bar */}
            <div className="flex items-center justify-between py-6 border-b border-gray-200 dark:border-gray-700 mb-8">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">Duration</span>
                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500" /> {trip.duration} Days
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">Type</span>
                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" /> {trip.category}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">Season</span>
                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" /> Year Round
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About this Trip</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {trip.description}
              </p>
            </div>

            {/* --- MAP COMPONENT --- */}
            <div className="mb-12">
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Location</h2>
               <TripMap locations={[trip.destination]} />
            </div>

            {/* TABS (Itinerary & Reviews) */}
            <div>
              <div className="flex gap-8 border-b border-gray-200 dark:border-gray-700 mb-6">
                <button onClick={() => setActiveTab('itinerary')} className={cn("pb-4 text-base font-medium transition-all relative", activeTab === 'itinerary' ? "text-purple-600 dark:text-purple-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-400")}>
                  Itinerary
                  {activeTab === 'itinerary' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />}
                </button>
                <button onClick={() => setActiveTab('reviews')} className={cn("pb-4 text-base font-medium transition-all relative", activeTab === 'reviews' ? "text-purple-600 dark:text-purple-400" : "text-gray-500 hover:text-gray-700 dark:text-gray-400")}>
                  Reviews
                  {activeTab === 'reviews' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />}
                </button>
              </div>

              {/* Itinerary / Reviews Content */}
              {/* (Simplified for brevity, refer to previous full code if needed) */}
              <div className="min-h-[200px]">
                 {activeTab === 'itinerary' ? (
                    <div className="space-y-4">
                        {trip.itinerary && trip.itinerary.map((day: any, i: number) => (
                            <div key={i} className="p-4 border rounded-lg dark:border-gray-700">
                                <h4 className="font-bold dark:text-white">Day {day.day}: {day.theme}</h4>
                                <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    {day.activities.map((act: any, j: number) => (
                                        <li key={j}>• {act.activity} ({act.time})</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                 ) : (
                    <div className="text-center text-gray-500 py-8">No reviews yet.</div>
                 )}
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: STICKY BOOKING --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6">
                <div className="mb-6">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Total Price</span>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      LKR {(trip.price * guestCount).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6 border border-gray-100 dark:border-gray-600 flex justify-between items-center">
                    <span className="text-sm font-medium dark:text-white">Travelers</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setGuestCount(Math.max(1, guestCount - 1))} className="w-8 h-8 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center">-</button>
                      <span className="font-bold">{guestCount}</span>
                      <button onClick={() => setGuestCount(guestCount + 1)} className="w-8 h-8 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center">+</button>
                    </div>
                </div>

                <Button onClick={handleAddToCart} className="w-full py-4 text-lg font-semibold shadow-lg shadow-purple-500/25 mb-4">
                  <ShoppingCart className="w-5 h-5 mr-2" /> Book Now
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>Free cancellation up to 48 hours</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TripDetails