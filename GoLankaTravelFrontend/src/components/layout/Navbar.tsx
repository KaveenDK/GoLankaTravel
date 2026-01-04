import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingCart, LogOut, LayoutDashboard, Map, User as UserIcon } from 'lucide-react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { logout } from '../../redux/slices/authSlice'
import Button from '../ui/Button'
import { cn } from '../../utils/cn'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  // Get state from Redux
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const cartItems = useAppSelector((state) => state.cart.items)
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    setIsProfileOpen(false)
    setIsMobileMenuOpen(false)
    navigate('/login')
  }

  const closeMenus = () => {
    setIsMobileMenuOpen(false)
    setIsProfileOpen(false)
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Trips', path: '/trips' },
    { name: 'AI Planner', path: '/planner' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. LOGO */}
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMenus}>
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-200">
              G
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              GoLanka
            </span>
          </Link>

          {/* 2. DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 3. RIGHT SIDE (Cart & Auth) */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full border-2 border-white dark:border-gray-900">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Auth State Check */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1 pr-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  {user.avatar && user.avatar.startsWith('http') ? (
                     <img 
                       src={user.avatar} 
                       alt={user.username} 
                       className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                     />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                    {user.username}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 duration-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.username}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                    
                    <div className="py-1">
                      {user.role === 'admin' ? (
                        <Link 
                          to="/admin" 
                          onClick={closeMenus}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      ) : (
                        <Link 
                          to="/orders" 
                          onClick={closeMenus}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          <Map className="w-4 h-4 mr-2" />
                          My Trips
                        </Link>
                      )}

                      <Link 
                        to="/profile" 
                        onClick={closeMenus}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        <UserIcon className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-100 dark:border-gray-800 py-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* 4. MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center gap-4">
             {/* Cart Icon Mobile */}
             <Link to="/cart" className="relative text-gray-600 dark:text-gray-300">
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full border-2 border-white dark:border-gray-900">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-purple-600 focus:outline-none p-1 rounded-md"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 animate-in slide-in-from-top-5 duration-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMenus}
                className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Auth Buttons */}
            {isAuthenticated && user ? (
               <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
                 <div className="px-3 mb-3 flex items-center gap-3">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{user.username}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                 </div>

                 {user.role === 'admin' ? (
                    <Link to="/admin" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                      Admin Dashboard
                    </Link>
                 ) : (
                    <Link to="/orders" onClick={closeMenus} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                      My Trips
                    </Link>
                 )}

                 <Link 
                   to="/profile"
                   onClick={closeMenus}
                   className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                 >
                   Profile Settings
                 </Link>
                 
                 <button 
                   onClick={handleLogout}
                   className="w-full text-left px-3 py-2 mt-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                 >
                   Sign Out
                 </button>
               </div>
            ) : (
              <div className="mt-4 flex flex-col gap-3 px-3">
                <Button variant="outline" className="w-full justify-center" onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}>Login</Button>
                <Button className="w-full justify-center" onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}>Sign Up</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar