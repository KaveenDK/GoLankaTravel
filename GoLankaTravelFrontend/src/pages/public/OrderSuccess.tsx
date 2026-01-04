import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle, Download, Home, MapPin, Calendar, FileText } from 'lucide-react'
import ReactConfetti from 'react-confetti' 
import Button from '../../components/ui/Button'
import { useWindowSize } from 'react-use' 
import { toast } from 'react-hot-toast' // Used for simulating download start

const OrderSuccess = () => {
  const navigate = useNavigate()
  
  // Confetti Config
  const [showConfetti, setShowConfetti] = useState(true)
  const { width, height } = useWindowSize() 

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  // Mock Data
  const orderId = "GL-" + Math.floor(100000 + Math.random() * 900000)
  const today = new Date().toLocaleDateString()

  const handleDownloadPDF = () => {
    // This triggers the Toast we added globally
    toast.success("Downloading your Trip Itinerary PDF...")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      
      {showConfetti && <ReactConfetti width={width} height={height} recycle={false} numberOfPieces={500} />}

      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 relative z-10">
        
        <div className="bg-emerald-500 h-2 w-full"></div>

        <div className="p-8 text-center">
          
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6 animate-bounce">
            <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Thank you for booking with GoLanka.</p>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-8 border border-dashed border-gray-200 dark:border-gray-600 text-left">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-600">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Order ID</span>
              <span className="font-mono font-bold text-gray-900 dark:text-white">{orderId}</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{today}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Destination</p>
                  <p className="font-medium text-gray-900 dark:text-white">Sri Lanka (Multiple Stops)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 text-center">
               <p className="text-xs text-gray-400 mb-2">A confirmation email has been sent to you.</p>
               <button 
                 onClick={handleDownloadPDF}
                 className="text-purple-600 hover:text-purple-700 text-sm font-semibold flex items-center justify-center mx-auto transition"
               >
                 <Download className="w-4 h-4 mr-2" /> Download Ticket PDF
               </button>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={() => navigate('/orders')} className="w-full">View My Trips</Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full">
              <Home className="w-4 h-4 mr-2" /> Return Home
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default OrderSuccess