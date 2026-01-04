import { Request, Response, NextFunction } from 'express'
import Order from '../models/Order.model'
import Cart from '../models/Cart.model'
import AppError from '../utils/appError'
import { sendResponse } from '../utils/apiResponse'

/**
 * @desc    Create new order
 * @route   POST /api/v1/orders/create
 * @access  Private (User)
 */
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      orderItems, 
      paymentInfo, 
      itemsPrice, 
      taxPrice, 
      shippingPrice, 
      totalPrice 
    } = req.body

    // 1. Basic Validation
    if (!orderItems || orderItems.length === 0) {
      return next(new AppError('No order items', 400))
    }

    const user = req.user as any

    // 2. Create the Order
    const order = await Order.create({
      user: user._id, 
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      paymentStatus: 'COMPLETED'
    } as any)

    // 3. Clear the User's Cart after successful order
    await Cart.findOneAndDelete({ userId: user._id })

    sendResponse(res, 201, true, 'Order created successfully', order)

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Get Single Order
 * @route   GET /api/v1/orders/:id
 * @access  Private
 */
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Populate user name and email
    const order = await Order.findById(req.params.id).populate('user', 'username email')

    if (!order) {
      return next(new AppError('Order not found with this ID', 404))
    }

    const currentUser = req.user as any
    const orderUser = order.user as any 

    // Optional: Check if the user requesting is the owner or an admin
    if (currentUser.role !== 'admin' && orderUser._id.toString() !== currentUser._id.toString()) {
        return next(new AppError('Not authorized to view this order', 403))
    }

    sendResponse(res, 200, true, 'Order details fetched', order)

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Get logged in user orders
 * @route   GET /api/v1/orders/myorders
 * @access  Private
 */
export const myOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as any
    const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 })

    sendResponse(res, 200, true, 'User orders fetched', orders)

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Get all orders (Admin)
 * @route   GET /api/v1/orders/admin/all
 * @access  Private (Admin)
 */
export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find()
        .populate('user', 'id username')
        .sort({ createdAt: -1 })

    let totalAmount = 0
    orders.forEach((order: any) => {
      totalAmount += order.totalPrice
    })

    sendResponse(res, 200, true, 'All orders fetched', {
      totalAmount,
      orders
    })

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Update Order Status (Admin)
 * @route   PUT /api/v1/orders/admin/:id
 * @access  Private (Admin)
 */
export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return next(new AppError('Order not found', 404))
    }

    if (order.orderStatus === 'Delivered') {
      return next(new AppError('You have already delivered this order', 400))
    }

    // Update status
    order.orderStatus = req.body.status

    if (req.body.status === 'Delivered') {
      order.deliveredAt = new Date()
    }

    await order.save()

    sendResponse(res, 200, true, 'Order status updated', order)

  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Delete Order
 * @route   DELETE /api/v1/orders/admin/:id
 * @access  Private (Admin)
 */
export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)

    if (!order) {
      return next(new AppError('Order not found', 404))
    }

    sendResponse(res, 200, true, 'Order deleted successfully')

  } catch (error: any) {
    next(error)
  }
}