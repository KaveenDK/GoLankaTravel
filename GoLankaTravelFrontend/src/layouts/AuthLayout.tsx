import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

const AuthLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-gray-900">
      
      {/* --- LEFT SIDE: Form Area --- */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 relative z-10"
      >
        
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="absolute top-8 left-8 flex items-center text-sm font-medium text-gray-500 hover:text-purple-600 transition group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* The Login/Register Page renders here */}
        <div className="w-full max-w-md mx-auto">
           <Outlet />
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} GoLanka Travel. All rights reserved.
        </div>
      </motion.div>

      {/* --- RIGHT SIDE: Visual Area (Hidden on Mobile) --- */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 relative overflow-hidden items-center justify-center">
        
        {/* Background Image with Slow Zoom Animation */}
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
           {/* Fallback to a high-quality Unsplash image if local asset is missing */}
           <img 
             src="https://images.unsplash.com/photo-1586607267156-621d9607eb26?q=80&w=1974&auto=format&fit=crop" 
             alt="Sri Lanka Scenery" 
             className="w-full h-full object-cover opacity-60"
           />
           {/* Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-blue-900/80 mix-blend-multiply" />
        </motion.div>

        {/* Text Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-20 max-w-lg text-center px-12"
        >
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Your Journey to Paradise Begins Here
          </h2>
          <p className="text-purple-100 text-lg leading-relaxed drop-shadow-md">
            "The journey of a thousand miles begins with a single step. Discover the pearl of the Indian Ocean with AI-powered planning."
          </p>
        </motion.div>
      </div>

    </div>
  )
}

export default AuthLayout