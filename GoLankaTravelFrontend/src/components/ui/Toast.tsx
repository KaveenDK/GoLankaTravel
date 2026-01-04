import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { hideToast } from '../../redux/slices/uiSlice'
import { slideDown } from '../../utils/animations'

const Toast = () => {
  const dispatch = useAppDispatch()
  const { toast } = useAppSelector((state) => state.ui)

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast())
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [toast.isVisible, dispatch])

  // Icon mapping based on type
  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      default: return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  // Color border mapping
  const getBorderColor = () => {
    switch (toast.type) {
      case 'success': return 'border-l-green-500'
      case 'error': return 'border-l-red-500'
      case 'warning': return 'border-l-yellow-500'
      default: return 'border-l-blue-500'
    }
  }

  return (
    <AnimatePresence>
      {toast.isVisible && (
        <div className="fixed top-6 right-0 left-0 flex justify-center pointer-events-none z-[100]">
          <motion.div
            variants={slideDown}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`pointer-events-auto flex items-center gap-3 min-w-[300px] max-w-md bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 border-l-4 ${getBorderColor()}`}
          >
            {/* Icon */}
            <div className="flex-shrink-0">
              {getIcon()}
            </div>

            {/* Message */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {toast.message}
              </p>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => dispatch(hideToast())}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Toast