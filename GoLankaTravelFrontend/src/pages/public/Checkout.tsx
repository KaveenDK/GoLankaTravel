import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { clearCart } from '../../redux/slices/cartSlice'
import { ShieldCheck, CreditCard, Wallet, Lock, ArrowLeft, Loader2 } from 'lucide-react'
import Button from '../../components/ui/Button'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  // Redux State
  const { items, totalAmount } = useAppSelector((state) => state.cart)
  const { user } = useAppSelector((state) => state.auth)

  // Local State
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'payhere'>('card')
  const [formData, setFormData] = useState({
    firstName: user?.username?.split(' ')[0] || '',
    lastName: user?.username?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  })

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart')
    }
  }, [items, navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // SIMULATION: In a real app, this is where you call Stripe or PayHere API
    // We simulate a network delay here to show the loading state
    setTimeout(() => {
      // 1. Payment Successful
      console.log('Payment Processed via:', paymentMethod)
      console.log('Order Details:', { items, total: totalAmount, user: formData })

      // 2. Clear Cart in Redux
      dispatch(clearCart())

      // 3. Redirect to 3D Success Page
      navigate('/success')
      
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/cart')} 
            className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COL: Billing & Payment Form --- */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Contact Info */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <input 
                    type="text" name="firstName" required
                    value={formData.firstName} onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <input 
                    type="text" name="lastName" required
                    value={formData.lastName} onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <input 
                    type="email" name="email" required
                    value={formData.email} onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number (For Trip Updates)</label>
                  <input 
                    type="tel" name="phone" placeholder="+94 7X XXX XXXX" required
                    value={formData.phone} onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                Payment Method
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card Option */}
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`cursor-pointer border rounded-xl p-4 flex items-center gap-4 transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-1 ring-purple-500' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                  }`}
                >
                  <div className="p-2 bg-white rounded-md shadow-sm">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Credit / Debit Card</p>
                    <p className="text-xs text-gray-500">Visa, Mastercard, Amex</p>
                  </div>
                </div>

                {/* PayHere Option */}
                <div 
                  onClick={() => setPaymentMethod('payhere')}
                  className={`cursor-pointer border rounded-xl p-4 flex items-center gap-4 transition-all ${
                    paymentMethod === 'payhere' 
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 ring-1 ring-orange-500' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-orange-300'
                  }`}
                >
                  <div className="p-2 bg-white rounded-md shadow-sm">
                    <Wallet className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">PayHere / Genie</p>
                    <p className="text-xs text-gray-500">Local Payment Gateway</p>
                  </div>
                </div>
              </div>

              {/* Secure Badge */}
              <div className="mt-6 flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                <ShieldCheck className="w-5 h-5" />
                <span>All transactions are secure and encrypted.</span>
              </div>
            </div>
          </div>


          {/* --- RIGHT COL: Order Summary --- */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              
              {/* Items List */}
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.tripId} className="flex justify-between items-start text-sm">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{item.name}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>LKR {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Taxes & Fees</span>
                  <span>LKR 0</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-purple-600 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span>Total</span>
                  <span>LKR {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Pay Button */}
              <Button 
                onClick={handlePayment} 
                className="w-full mt-6 py-4 text-lg font-bold shadow-purple-500/25 shadow-lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" /> Pay LKR {totalAmount.toLocaleString()}
                  </>
                )}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout