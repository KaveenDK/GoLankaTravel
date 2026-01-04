import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchTrips } from '../../redux/slices/tripSlice'
import TripCard from '../../components/trips/TripCard'
import TripFilters from '../../components/trips/TripFilters'
import { Search, Filter, X } from 'lucide-react'
import Button from '../../components/ui/Button'
import { cn } from '../../utils/cn'

const AllTrips = () => {
  const dispatch = useAppDispatch()
  
  // Redux State
  const { trips, loading, error } = useAppSelector((state) => state.trips)
  
  // Local State for Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]) // Max 100k LKR default
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Fetch trips on mount
  useEffect(() => {
    // In a real app, you might pass filter params to the API here
    // For now, we fetch all and filter client-side for smoother UX on small datasets
    dispatch(fetchTrips('')) 
  }, [dispatch])

  // --- Filtering Logic ---
  const filteredTrips = trips.filter((trip) => {
    // 1. Search (Name or Destination)
    const matchesSearch = trip.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
    
    // 2. Category
    const matchesCategory = selectedCategory === 'All' || trip.category === selectedCategory
    
    // 3. Price
    const matchesPrice = trip.price >= priceRange[0] && trip.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* 1. Page Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Explore Sri Lanka
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Discover our curated selection of immersive travel experiences. From the misty tea gardens of Nuwara Eliya to the golden beaches of Mirissa.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* 2. Filters Sidebar (Desktop: Static | Mobile: Drawer) */}
        <aside className={cn(
            "lg:w-1/4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-fit sticky top-24 transition-transform duration-300 z-30",
            "fixed inset-y-0 left-0 w-64 lg:static lg:transform-none transform",
            isFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          <div className="flex justify-between items-center lg:hidden mb-4">
            <h2 className="font-bold text-lg">Filters</h2>
            <button onClick={() => setIsFilterOpen(false)}><X className="w-5 h-5" /></button>
          </div>

          {/* Pass state setters to the Filter Component */}
          <TripFilters 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </aside>

        {/* Overlay for Mobile Sidebar */}
        {isFilterOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* 3. Main Content Area */}
        <div className="flex-1">
          
          {/* Top Bar: Search & Mobile Filter Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search destinations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none transition"
              />
            </div>

            {/* Mobile Filter Button */}
            <Button 
              variant="outline" 
              className="lg:hidden w-full sm:w-auto"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
            
            <span className="text-sm text-gray-500 hidden sm:block">
              Showing {filteredTrips.length} trips
            </span>
          </div>

          {/* 4. Trips Grid */}
          {loading ? (
             // SKELETON LOADER
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1, 2, 3, 4, 5, 6].map((i) => (
                 <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
               ))}
             </div>
          ) : error ? (
            // ERROR STATE
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => dispatch(fetchTrips(''))}>Try Again</Button>
            </div>
          ) : filteredTrips.length === 0 ? (
            // EMPTY STATE
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No trips found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            // SUCCESS STATE
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default AllTrips