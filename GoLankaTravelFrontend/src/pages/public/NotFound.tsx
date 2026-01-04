import { useNavigate } from 'react-router-dom'
import { Home, Compass, ArrowLeft } from 'lucide-react'
import Button from '../../components/ui/Button'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 text-center">
      
      {/* 1. Visual Element */}
      <div className="relative mb-8">
        <h1 className="text-9xl font-extrabold text-gray-200 dark:text-gray-800">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 px-4">
            Destination Unknown
          </span>
        </div>
      </div>

      {/* 2. Message */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Oops! Looks like you're lost.
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-lg mb-10 text-lg">
        The page you are looking for might have been moved, deleted, or possibly never existed. Let's get you back on track.
      </p>

      {/* 3. Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => navigate(-1)} 
          variant="outline"
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
        
        <Button 
          onClick={() => navigate('/')} 
          className="w-full sm:w-auto shadow-lg shadow-purple-500/25"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Button 
          onClick={() => navigate('/trips')} 
          variant="secondary"
          className="w-full sm:w-auto"
        >
          <Compass className="w-4 h-4 mr-2" />
          Explore Trips
        </Button>
      </div>

      {/* 4. Footer Note */}
      <div className="mt-16 text-sm text-gray-400">
        Error Code: 404_PAGE_NOT_FOUND
      </div>

    </div>
  )
}

export default NotFound