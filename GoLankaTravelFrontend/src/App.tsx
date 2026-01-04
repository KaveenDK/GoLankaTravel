import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppDispatch } from './redux/hooks'
import { checkAuthStatus } from './redux/slices/authSlice'

// UI Components
import Toast from './components/ui/Toast'
import ChatWidget from './components/ai/ChatWidget'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

// Public Pages
import Home from './pages/public/Home'
import AllTrips from './pages/public/AllTrips'
import TripDetails from './pages/public/TripDetails'
import Cart from './pages/public/Cart'
import Checkout from './pages/public/Checkout'
import OrderSuccess from './pages/public/OrderSuccess'
import NotFound from './pages/public/NotFound'
import About from './pages/public/About'
import Contact from './pages/public/Contact'
import Privacy from './pages/public/Privacy'
import Terms from './pages/public/Terms'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import VerifyEmail from './pages/auth/VerifyEmail'
import AuthSuccess from './pages/auth/AuthSuccess'

// User Pages
import SmartPlanner from './pages/user/SmartPlanner'
import MyOrders from './pages/user/MyOrders'
import Profile from './pages/user/Profile'

// Admin Pages
import Dashboard from './pages/admin/Dashboard'
import ManageTrips from './pages/admin/ManageTrips'
import ManageUsers from './pages/admin/ManageUsers'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Check if token exists in storage, if so, validate session
    if (localStorage.getItem('token')) {
      dispatch(checkAuthStatus())
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      {/* Global UI Components */}
      <Toast />
      <ChatWidget />

      <Routes>
        
        {/* --- PUBLIC ROUTES (Accessible by everyone) --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<AllTrips />} />
          <Route path="/trips/:id" element={<TripDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/planner" element={<SmartPlanner />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>

        {/* --- AUTH ROUTES (Login/Register) --- */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
        </Route>

        {/* --- PROTECTED USER ROUTES --- */}
        <Route element={<MainLayout />}>
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* --- ADMIN ROUTES --- */}
        <Route path="/admin" element={<MainLayout />}> 
          <Route index element={<Dashboard />} />
          <Route path="trips" element={<ManageTrips />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>

        {/* --- 404 CATCH ALL --- */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App