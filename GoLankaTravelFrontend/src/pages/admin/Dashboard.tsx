import { Map, Users, DollarSign, ShoppingBag, TrendingUp, ArrowUpRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

// Mock Data for Dashboard Stats
const STATS = [
  {
    label: 'Total Revenue',
    value: 'LKR 4.2M',
    change: '+12.5%',
    icon: DollarSign,
    color: 'text-green-600',
    bg: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    label: 'Total Bookings',
    value: '1,245',
    change: '+8.2%',
    icon: ShoppingBag,
    color: 'text-blue-600',
    bg: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    label: 'Active Users',
    value: '8,520',
    change: '+24.3%',
    icon: Users,
    color: 'text-purple-600',
    bg: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    label: 'Active Trips',
    value: '42',
    change: '+4.5%',
    icon: Map,
    color: 'text-orange-600',
    bg: 'bg-orange-100 dark:bg-orange-900/30'
  }
]

// Mock Data for Recent Orders
const RECENT_ORDERS = [
  { id: '#ORD-7829', user: 'Kasun Perera', trip: 'Kandy Cultural Tour', amount: '45,000', status: 'Completed' },
  { id: '#ORD-7830', user: 'Sarah Jenkins', trip: 'Ella Adventure', amount: '62,500', status: 'Pending' },
  { id: '#ORD-7831', user: 'Mohamed Fazil', trip: 'Mirissa Whale Watch', amount: '12,000', status: 'Processing' },
  { id: '#ORD-7832', user: 'Chen Wei', trip: 'Sigiriya Day Trip', amount: '28,000', status: 'Completed' },
  { id: '#ORD-7833', user: 'Emma Watson', trip: 'Yala Safari', amount: '55,000', status: 'Cancelled' },
]

const Dashboard = () => {
  return (
    <div className="space-y-8">
      
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/trips">
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Add New Trip
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                {stat.change} <TrendingUp className="w-3 h-3 ml-1" />
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. Recent Bookings Table (Takes up 2 columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Bookings</h3>
            <Link to="/admin/orders" className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center">
              View All <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Trip</th>
                  <th className="px-6 py-4">Amount (LKR)</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.id}</td>
                    <td className="px-6 py-4">{order.user}</td>
                    <td className="px-6 py-4 text-gray-500">{order.trip}</td>
                    <td className="px-6 py-4 font-bold">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        order.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                        order.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' :
                        order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' :
                        'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Popular Destinations / Quick Stats (Right Column) */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6">Top Destinations</h3>
          
          <div className="space-y-6">
            {[
              { name: 'Ella', visits: '854', percent: '75%' },
              { name: 'Mirissa', visits: '621', percent: '60%' },
              { name: 'Sigiriya', visits: '445', percent: '45%' },
              { name: 'Kandy', visits: '320', percent: '30%' },
            ].map((place) => (
              <div key={place.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{place.name}</span>
                  <span className="text-gray-500">{place.visits} bookings</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: place.percent }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">System Health</h4>
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              All Systems Operational
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard