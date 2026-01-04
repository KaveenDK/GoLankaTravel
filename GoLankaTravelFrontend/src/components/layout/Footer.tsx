import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-purple-900/20">
                G
              </div>
              <span className="text-xl font-bold text-white tracking-wide">GoLanka</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Experience Sri Lanka like never before. AI-powered itineraries, immersive 3D previews, and seamless bookings for your dream vacation.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide uppercase text-xs">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-purple-400 transition-colors duration-200">About Us</Link></li>
              <li><Link to="/trips" className="hover:text-purple-400 transition-colors duration-200">All Destinations</Link></li>
              <li><Link to="/planner" className="hover:text-purple-400 transition-colors duration-200">AI Planner</Link></li>
              <li><Link to="/contact" className="hover:text-purple-400 transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide uppercase text-xs">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                <span>123 Galle Road,<br/>Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-purple-500 shrink-0" />
                <a href="mailto:hello@golanka.com" className="hover:text-white transition-colors">hello@golanka.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-purple-500 shrink-0" />
                <a href="tel:+94771234567" className="hover:text-white transition-colors">+94 77 123 4567</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wide uppercase text-xs">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 hover:text-white text-gray-400 transition-all duration-300 transform hover:scale-110" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 hover:text-white text-gray-400 transition-all duration-300 transform hover:scale-110" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 hover:text-white text-gray-400 transition-all duration-300 transform hover:scale-110" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} GoLanka Travel. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer