import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const MainLayout = () => {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* 1. Navigation Bar (Fixed at top) */}
      <Navbar />

      {/* 2. Page Content (Dynamic with Animation) */}
      <AnimatePresence mode='wait'>
        {/* key={location.pathname} tells React to re-render animation on route change */}
        <motion.main 
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-grow pt-16"
        > 
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {/* 3. Footer (Always at bottom) */}
      <Footer />
    </div>
  )
}

export default MainLayout