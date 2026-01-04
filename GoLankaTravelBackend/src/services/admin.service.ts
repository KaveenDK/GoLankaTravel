import User from '../models/User.model'
import Trip from '../models/Trip.model'
import Order from '../models/Order.model'

/**
 * Get Global Dashboard Statistics
 * Aggregates Users, revenue, and recent activity
 */
export const getDashboardStatsService = async () => {
  // 1. Basic Counts
  // Count only 'travelers', not admins
  const totalUsers = await User.countDocuments({ role: 'traveler' })
  const totalTrips = await Trip.countDocuments()
  const totalOrders = await Order.countDocuments()

  // 2. Calculate Total Revenue (Only from 'Confirmed' or 'Paid' orders)
  // We use MongoDB Aggregation Pipeline for efficiency
  const revenueStats = await Order.aggregate([
    { 
      $match: { 
        orderStatus: { $in: ['Confirmed', 'Delivered'] }, 
        'paymentInfo.status': 'Paid' 
      } 
    },
    { 
      $group: { 
        _id: null, 
        totalRevenue: { $sum: '$totalPrice' } 
      } 
    }
  ])

  const totalRevenue = revenueStats.length > 0 ? revenueStats[0].totalRevenue : 0

  // 3. Get Recent Orders (Latest 5)
  const recentOrders = await Order.find()
    .sort({ createdAt: -1 }) // Newest first
    .limit(5)
    .populate('user', 'username email avatar') // Get user details
    .select('totalPrice orderStatus createdAt user')

  // 4. Get Popular Trip Categories (Optional but cool)
  const tripsByCategory = await Trip.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ])

  return {
    overview: {
      totalUsers,
      totalTrips,
      totalOrders,
      totalRevenue
    },
    recentOrders,
    tripsByCategory
  }
}

/**
 * Get All Users (with pagination)
 */
export const getAllUsersService = async () => {
  return await User.find().select('-password')
}

/**
 * Delete a User (Admin Action)
 */
export const deleteUserService = async (userId: string) => {
  return await User.findByIdAndDelete(userId)
}