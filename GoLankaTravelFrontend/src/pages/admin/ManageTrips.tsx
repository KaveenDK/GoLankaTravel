import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Edit, Trash2, MapPin, AlertCircle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
// FIX: Import both actions as named exports
import { fetchTrips, deleteTrip } from '../../redux/slices/tripSlice'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'

const ManageTrips = () => {
  const dispatch = useAppDispatch()
  
  // Redux State
  const { trips, loading, error } = useAppSelector((state) => state.trips)
  
  // Local State
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    // Pass empty string if no filters initially
    dispatch(fetchTrips(''))
  }, [dispatch])

  // Filter Logic
  const filteredTrips = trips.filter(trip => 
    trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      await dispatch(deleteTrip(deleteId))
      setDeleteId(null)
    }
  }

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Trips</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">View, edit, or delete travel packages.</p>
        </div>
        <Link to="/admin/trips/new">
          <Button className="shadow-lg shadow-purple-500/20">
            <Plus className="w-4 h-4 mr-2" /> Add New Trip
          </Button>
        </Link>
      </div>

      {/* 2. Search Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <Input 
          placeholder="Search by trip name or destination..." 
          icon={<Search className="w-4 h-4" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* 3. Trips Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading trips...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">Error: {error}</div>
        ) : filteredTrips.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No trips found matching "{searchTerm}"
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4">Trip Details</th>
                  <th className="px-6 py-4">Destination</th>
                  <th className="px-6 py-4">Price (LKR)</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredTrips.map((trip) => (
                  <tr key={trip._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    
                    {/* Column 1: Image & Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={trip.image} alt={trip.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">{trip.name}</div>
                          <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded inline-block mt-1">
                            {trip.category}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Destination */}
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-purple-500" />
                        {trip.destination}
                      </div>
                    </td>

                    {/* Column 3: Price */}
                    <td className="px-6 py-4 font-mono font-medium text-gray-900 dark:text-white">
                      {trip.price.toLocaleString()}
                    </td>

                    {/* Column 4: Rating */}
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-yellow-500 font-bold">
                        ★ {trip.ratingsAverage} <span className="text-gray-400 font-normal text-xs">({trip.ratingsQuantity})</span>
                      </span>
                    </td>

                    {/* Column 5: Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/trips/edit/${trip._id}`}>
                          <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition" title="Edit Trip">
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => setDeleteId(trip._id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition" 
                          title="Delete Trip"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Delete Confirmation Modal */}
      <Modal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)}
        title="Delete Trip"
      >
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Are you sure?</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            This action cannot be undone. This will permanently delete the trip from the database.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white border-transparent"
              onClick={handleDeleteConfirm}
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  )
}

export default ManageTrips