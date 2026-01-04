import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Map, Users, Settings, LogOut, FileText } from 'lucide-react'
import { useAppDispatch } from '../../redux/hooks'
import { logout } from '../../redux/slices/authSlice'
import { cn } from '../../utils/cn'

const Sidebar = () => {
  const dispatch = useAppDispatch()

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Trips', path: '/admin/trips', icon: Map },
    { name: 'Manage Users', path: '/admin/users', icon: Users },
  ]

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 hidden md:flex flex-col shadow-sm z-30">
      
      {/* Sidebar Header */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-purple-600 rounded-md flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">Admin Panel</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
        
        {adminLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/admin'}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              )
            }
          >
            <link.icon className={cn("w-5 h-5 mr-3 transition-colors", 
              "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
            )} />
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="flex items-center gap-3 mb-4 px-2">
           <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">
             AD
           </div>
           <div className="overflow-hidden">
             <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Administrator</p>
             <p className="text-xs text-gray-500 truncate">admin@golanka.com</p>
           </div>
        </div>
        <button
          onClick={() => dispatch(logout())}
          className="flex w-full items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar