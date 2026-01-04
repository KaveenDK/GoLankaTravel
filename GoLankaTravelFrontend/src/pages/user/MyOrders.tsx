import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Clock, AlertCircle, CheckCircle, Search } from 'lucide-react'
import api from '../../services/api' // Assumes axios instance is set up
import Button from '../../components/ui/Button'
import { cn } from '../../utils/cn'

// Define Types
interface Booking {
  _id: string
  trip: {
    _id: string
    name: string
    image: string
    destination: string
    duration: number
  }
  createdAt: string
  startDate: string // hypothetical field
  price: number
  paid: boolean
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

const MyOrders = () => {
  const [orders, setOrders] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace with your actual endpoint
        const res = await api.get('/bookings/my-bookings')
        setOrders(res.data.data.bookings || [])
      } catch (err) {
        // Fallback for demo if API fails or doesn't exist yet
        console.error("Failed to fetch bookings", err)
        setError("Could not load your booking history.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-6"></div>
        {[1, 2].map((i) => (
          <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl w-full"></div>
        ))}
      </div>
    )
  }

  // --- EMPTY STATE ---
  if (!loading && orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <Search className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No trips booked yet</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
          It looks like you haven't started your adventure with us yet. Explore our curated trips to Sri Lanka!
        </p>
        <Link to="/trips">
          <Button className="shadow-lg shadow-purple-500/25">
            Explore Trips
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Trips</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your upcoming adventures and view past receipts.
          </p>
        </div>
        <div className="text-sm font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-lg">
          Total Bookings: {orders.length}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div 
            key={order._id} 
            className="group bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all flex flex-col lg:flex-row gap-6"
          >
            
            {/* 1. Trip Image */}
            <div className="w-full lg:w-48 h-48 lg:h-auto flex-shrink-0 rounded-xl overflow-hidden relative">
              <img 
                src={order.trip.image} 
                alt={order.trip.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* 2. Trip Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {order.trip.name}
                  </h3>
                  
                  {/* Status Badge */}
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border",
                    order.paid 
                      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-800" 
                      : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800"
                  )}>
                    {order.paid ? 'Payment Successful' : 'Payment Pending'}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    {order.trip.destination}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    {order.trip.duration} Days Duration
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    Booked on: {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                    Order ID: #{order._id.slice(-6).toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
                
                {/* Price */}
                <div>
                   <p className="text-xs text-gray-400 uppercase font-bold">Total Paid</p>
                   <p className="text-lg font-bold text-gray-900 dark:text-white">
                     LKR {order.price.toLocaleString()}
                   </p>
                </div>

                <div className="flex gap-3">
                  {/* If not paid, show pay button */}
                  {!order.paid && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white shadow-none">
                      Pay Now
                    </Button>
                  )}
                  
                  <Link to={`/trips/${order.trip._id}`}>
                    <Button variant="outline" size="sm">
                      View Trip Details
                    </Button>
                  </Link>

                  {/* Invoice Download (Mock) */}
                  <button className="text-sm font-medium text-gray-500 hover:text-purple-600 underline decoration-dashed underline-offset-4">
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default MyOrders