import { Filter, Tag, DollarSign, X } from 'lucide-react'
import { cn } from '../../utils/cn'

interface TripFiltersProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
}

const CATEGORIES = [
  "All",
  "Adventure",
  "Relaxation",
  "Cultural",
  "Wildlife",
  "Honeymoon",
  "Road Trip"
]

const TripFilters = ({ 
  selectedCategory, 
  setSelectedCategory, 
  priceRange, 
  setPriceRange 
}: TripFiltersProps) => {

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([0, parseInt(e.target.value)])
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-purple-600" />
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Filter Trips</h3>
        </div>
        {(selectedCategory !== "All" || priceRange[1] < 100000) && (
             <button 
               onClick={() => { setSelectedCategory("All"); setPriceRange([0, 100000]); }}
               className="text-xs text-red-500 flex items-center gap-1 hover:underline"
             >
               <X className="w-3 h-3" /> Clear
             </button>
        )}
      </div>

      {/* 1. Categories Section */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Tag className="w-4 h-4 text-gray-400" /> Categories
        </h4>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border",
                selectedCategory === category
                  ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200 dark:shadow-none"
                  : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-transparent hover:border-purple-200 dark:hover:border-gray-600 hover:bg-white dark:hover:bg-gray-700"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Price Range Section */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-400" /> Max Price
        </h4>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-gray-500 font-medium">LKR 0</span>
            <span className="text-sm font-bold text-purple-600 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded">
              LKR {priceRange[1].toLocaleString()}
            </span>
          </div>
          
          <input
            type="range"
            min="0"
            max="300000" // Max price limit (300k LKR)
            step="5000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <p className="text-xs text-gray-400 mt-3 text-center">
            Slide to adjust your budget
          </p>
        </div>
      </div>

    </div>
  )
}

export default TripFilters