import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { removeFromCart, addToCart } from '../../redux/slices/cartSlice'
import Button from '../../components/ui/Button'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  // Get Cart Data from Redux
  const { items, totalAmount } = useAppSelector((state) => state.cart)
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  // Handlers
  const handleIncrease = (item: any) => {
    dispatch(addToCart({ ...item, quantity: 1 }))
  }

  const handleDecrease = (item: any) => {
    if (item.quantity > 1) {
      // Sending negative quantity works because the reducer does: current += payload
      dispatch(addToCart({ ...item, quantity: -1 }))
    } else {
      // If quantity is 1, ask to remove or just remove
      dispatch(removeFromCart(item.tripId))
    }
  }

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout')
    } else {
      navigate('/checkout')
    }
  }

  // --- EMPTY STATE ---
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100 dark:border-gray-700">
          <div className="w-20 h-20 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Looks like you haven't added any trips yet. Explore our destinations to find your next adventure.
          </p>
          <Button onClick={() => navigate('/trips')} className="w-full">
            Start Exploring
          </Button>
        </div>
      </div>
    )
  }

  // --- CART CONTENT ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
          <span className="ml-4 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
            {items.length} Items
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COL: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div 
                key={item.tripId} 
                className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-6 transition-all hover:shadow-md"
              >
                {/* Image */}
                <div className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        <Link to={`/trips/${item.tripId}`} className="hover:text-purple-600 transition">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">Standard Package</p>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.tripId)}
                      className="text-gray-400 hover:text-red-500 transition p-2"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-4 sm:mt-0">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-1">
                      <button 
                        onClick={() => handleDecrease(item)}
                        className="p-1 hover:bg-white dark:hover:bg-gray-600 rounded-md transition disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <span className="font-semibold text-gray-900 dark:text-white w-4 text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleIncrease(item)}
                        className="p-1 hover:bg-white dark:hover:bg-gray-600 rounded-md transition"
                      >
                        <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Price per person</p>
                      <p className="text-lg font-bold text-purple-600">
                        LKR {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link 
              to="/trips" 
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-purple-600 mt-4 transition"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>

          {/* RIGHT COL: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>LKR {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Booking Fees</span>
                  <span>LKR 0</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-purple-600">
                    LKR {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button 
                onClick={handleCheckout} 
                className="w-full py-3 text-lg shadow-purple-500/25 shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="mt-6 text-xs text-center text-gray-500">
                <p>Secure Checkout powered by Stripe & PayHere.</p>
                <p className="mt-1">All bookings are protected by our refund policy.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart