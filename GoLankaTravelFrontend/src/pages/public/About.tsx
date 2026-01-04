import { Map, Users, Heart, Globe, ShieldCheck, Zap } from 'lucide-react'
import Card from '../../components/ui/Card'

const About = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="relative py-20 bg-purple-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            {/* Abstract Background Pattern */}
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Discover Sri Lanka Like Never Before
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            We are GoLanka Travel, your AI-powered companion for exploring the pearl of the Indian Ocean. 
            We blend cutting-edge technology with authentic local experiences.
          </p>
        </div>
      </div>

      {/* 2. OUR MISSION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            To revolutionize travel planning in Sri Lanka by making it personalized, seamless, and sustainable. 
            We believe every journey should be as unique as the traveler embarking on it.
          </p>
        </div>

        {/* 3. CORE FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 text-center hover:-translate-y-1 transition-transform duration-300 border-t-4 border-purple-500">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI-Powered Planning</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our smart algorithms generate itineraries tailored to your budget, interests, and schedule in seconds.
            </p>
          </Card>

          <Card className="p-8 text-center hover:-translate-y-1 transition-transform duration-300 border-t-4 border-blue-500">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Map className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Curated Destinations</h3>
            <p className="text-gray-600 dark:text-gray-400">
              From hidden waterfalls to ancient temples, we guide you to the most breathtaking spots on the island.
            </p>
          </Card>

          <Card className="p-8 text-center hover:-translate-y-1 transition-transform duration-300 border-t-4 border-green-500">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Secure & Reliable</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Book with confidence. We partner with trusted local guides and use secure payment gateways like Stripe.
            </p>
          </Card>
        </div>
      </div>

      {/* 4. STATISTICS */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Destinations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">10k+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. TEAM (Static Placeholder) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Member 1 */}
          <div className="text-center group">
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="CEO" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Alex Perera</h3>
            <p className="text-purple-600 font-medium mb-2">Founder & CEO</p>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">Passionate traveler with a vision to digitize Sri Lankan tourism.</p>
          </div>

          {/* Member 2 */}
          <div className="text-center group">
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="CTO" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Sarah De Silva</h3>
            <p className="text-purple-600 font-medium mb-2">Head of AI</p>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">Tech enthusiast driving the smart itinerary engine behind GoLanka.</p>
          </div>

          {/* Member 3 */}
          <div className="text-center group">
            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="COO" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Ryan Fernando</h3>
            <p className="text-purple-600 font-medium mb-2">Operations Lead</p>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">Ensuring every booking and trip runs smoothly on the ground.</p>
          </div>

        </div>
      </div>

      {/* 6. CALL TO ACTION */}
      <div className="bg-purple-900 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Globe className="w-12 h-12 mx-auto mb-6 text-purple-300" />
          <h2 className="text-3xl font-bold mb-4">Ready to start your adventure?</h2>
          <p className="text-lg text-purple-100 mb-8">
            Join thousands of travelers who have found their perfect Sri Lankan getaway with us.
          </p>
          <a 
            href="/register" 
            className="inline-block bg-white text-purple-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
          >
            Get Started Free
          </a>
        </div>
      </div>

    </div>
  )
}

export default About