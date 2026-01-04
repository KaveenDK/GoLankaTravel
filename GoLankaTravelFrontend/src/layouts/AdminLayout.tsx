import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import Sidebar from '../components/layout/Sidebar'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AdminLayout = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // 1. SECURITY CHECK: Must be logged in AND be an admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      
      {/* --- SIDEBAR (Desktop) --- */}
      {/* Hidden on mobile, flex on md and up */}
      <Sidebar />

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Mobile Header (Only visible on small screens) */}
        <header className="md:hidden flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-20">
          <span className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
             <span className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-white text-xs">A</span>
             Admin Panel
          </span>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
           {/* The Dashboard pages render here */}
           <Outlet />
        </main>
      </div>

      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Slide-in Sidebar */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 shadow-2xl md:hidden"
            >
               <div className="flex justify-end p-4">
                 <button onClick={() => setIsMobileMenuOpen(false)}>
                   <X className="w-6 h-6 text-gray-500" />
                 </button>
               </div>
               
               <div className="h-full flex flex-col">
                  {/* Reuse Sidebar logic (simplified for this snippet) */}
                  <Sidebar /> 
                  {/* Note: In a real app, you'd refactor Sidebar.tsx to remove 'hidden md:flex' and control visibility via parent */}
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  )
}

export default AdminLayout