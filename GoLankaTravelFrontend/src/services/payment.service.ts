import api from './api'

// --- Types ---

export interface PaymentSessionResponse {
  status: string
  session: {
    id: string
    url: string
  }
}

export interface CheckoutPayload {
  tripId: string
  quantity: number
  date?: string // Optional: if you allow selecting a start date
}

const paymentService = {
  /**
   * Initiates a Stripe Checkout Session.
   * Sends the trip details to the backend, which returns a Stripe URL.
   * Endpoint: POST /api/v1/bookings/checkout-session/:tripId
   */
  createCheckoutSession: async (tripId: string): Promise<PaymentSessionResponse> => {
    try {
      // We pass the tripId in the URL as per RESTful conventions typically used with Stripe sessions
      const response = await api.get<PaymentSessionResponse>(`/bookings/checkout-session/${tripId}`)
      return response.data
    } catch (error) {
      console.error('Payment Service Error (Create Session):', error)
      throw new Error('Failed to initialize payment gateway.')
    }
  },

  /**
   * For cart checkout (multiple items).
   * Endpoint: POST /api/v1/bookings/checkout-cart
   */
  createCartCheckoutSession: async (items: CheckoutPayload[]): Promise<PaymentSessionResponse> => {
    try {
      const response = await api.post<PaymentSessionResponse>('/bookings/checkout-cart', { items })
      return response.data
    } catch (error) {
      console.error('Payment Service Error (Cart Checkout):', error)
      throw new Error('Failed to initialize cart checkout.')
    }
  },

  /**
   * Verifies a payment status after redirect from Stripe.
   * Useful if you want to show a success message based on a session_id query param.
   * Endpoint: GET /api/v1/bookings/verify/:sessionId
   */
  verifyPaymentSession: async (sessionId: string): Promise<{ paid: boolean; orderId?: string }> => {
    try {
      const response = await api.get<{ status: string; paid: boolean; orderId?: string }>(`/bookings/verify/${sessionId}`)
      return { 
        paid: response.data.paid, 
        orderId: response.data.orderId 
      }
    } catch (error) {
      console.error('Payment verification failed:', error)
      return { paid: false }
    }
  }
}

export default paymentService