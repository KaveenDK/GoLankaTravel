import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MapPin, ShieldCheck, Sparkles, Star } from 'lucide-react'

import Hero3DReplacement from '../../components/Hero3DReplacement'
import Button from '../../components/ui/Button'

const Home = () => {
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  
  // Parallax effect for the Hero Text (moves slower than scroll)
  const y1 = useTransform(scrollY, [0, 500], [0, 200])

  return (
    <div className="w-full bg-white dark:bg-gray-900 overflow-x-hidden">
      
      {/* ==================== 1. HERO SECTION (With Earth Animation) ==================== */}
      <section className="relative h-screen w-full bg-[#0f172a] flex items-center justify-center overflow-hidden">
        
        {/* A. The Earth Animation Layer (Background) */}
        <div className="absolute inset-0 z-0">
           <Hero3DReplacement />
           {/* Gradient fade at bottom to blend into next section */}
           <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent z-10" />
        </div>

        {/* B. The UI Overlay Layer (Foreground Text) */}
        <motion.div 
          style={{ y: y1 }}
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 mt-[-50px]"
        >
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-purple-300 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            #1 AI Travel Planner in Sri Lanka
          </motion.div>

          {/* Animated Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-purple-200 drop-shadow-2xl mb-6 tracking-tight"
          >
            Explore the <br className="hidden md:block" />
            <span className="text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">Unexplored</span>
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light"
          >
            Plan your dream Sri Lankan getaway in seconds. 
            Immersive 3D maps, AI-curated itineraries, and seamless booking.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg" 
              onClick={() => navigate('/planner')}
              className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30 px-8 h-12 text-base rounded-full"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Plan with AI
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/trips')}
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-md px-8 h-12 text-base rounded-full"
            >
              Explore Trips
            </Button>
          </motion.div>
        </motion.div>

        {/* C. Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-sm flex flex-col items-center z-20"
        >
          <span className="mb-2 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </motion.div>
      </section>


      {/* ==================== 2. VALUE PROPS (Animated Grid) ==================== */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Why Travel with GoLanka?
            </motion.h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We combine cutting-edge technology with authentic local experiences to create unforgettable journeys.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              delay={0.1}
              icon={<Sparkles className="w-8 h-8 text-purple-600" />}
              title="AI Smart Planner"
              desc="Tell us your budget and interests, and our AI creates a personalized day-by-day itinerary in seconds."
            />
            <FeatureCard 
              delay={0.2}
              icon={<MapPin className="w-8 h-8 text-emerald-500" />}
              title="Immersive 3D Maps"
              desc="Don't just look at photos. Spin the globe, zoom into cities, and visualize your trip before you book."
            />
            <FeatureCard 
              delay={0.3}
              icon={<ShieldCheck className="w-8 h-8 text-blue-500" />}
              title="Secure & Verified"
              desc="All trips are curated by top-rated agencies. Payments are secured with Stripe & PayHere."
            />
          </div>
        </div>
      </section>


      {/* ==================== 3. POPULAR TRIPS (Preview Cards) ==================== */}
      <section className="py-24 px-4 bg-white dark:bg-black relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Trending Destinations
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Handpicked experiences loved by travelers.
              </p>
            </div>
            <Link 
              to="/trips" 
              className="hidden md:flex items-center text-purple-600 hover:text-purple-500 font-semibold transition group"
            >
              View All <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Real Image Cards */}
            <TripPreviewCard 
              image="https://res.cloudinary.com/dxq00wvem/image/upload/v1767560039/shashank-hudkar-KYBc1eq0dJo-unsplash_1_ztnt7g.jpg"
              title="Sigiriya Rock Fortress"
              price="LKR 15,000"
              duration="1 Day"
              rating={4.9}
            />
            <TripPreviewCard 
              image="https://res.cloudinary.com/dxq00wvem/image/upload/v1767560207/yves-alarie-3R50kTNBKiE-unsplash_wkeoat.jpg"
              title="Ella Train Journey"
              price="LKR 12,500"
              duration="2 Days"
              rating={4.8}
            />
            <TripPreviewCard 
              image="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop"
              title="Mirissa Whale Watching"
              price="LKR 20,000"
              duration="1 Day"
              rating={4.7}
            />
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" onClick={() => navigate('/trips')}>View All Trips</Button>
          </div>
        </div>
      </section>

      {/* ==================== 4. TESTIMONIALS ==================== */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">What Travelers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
             <TestimonialCard 
               name="Sarah Jenkins"
               from="UK"
               text="The AI planner saved me hours of research. Sri Lanka was breathtaking!"
               rating={5}
             />
             <TestimonialCard 
               name="David Chen"
               from="Singapore"
               text="Booking was seamless and the local guides were incredibly friendly."
               rating={5}
             />
             <TestimonialCard 
               name="Emily Rose"
               from="Australia"
               text="I loved the 3D map feature. It really helped me visualize the distance between cities."
               rating={4}
             />
          </div>
        </div>
      </section>

      {/* ==================== 5. FINAL CTA ==================== */}
      <section className="py-24 bg-purple-900 text-white text-center relative overflow-hidden">
        {/* Decorative Background Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600 rounded-full blur-[100px] opacity-30 translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg text-purple-100 mb-8">
            Join thousands of travelers who are discovering Sri Lanka in a smarter, more immersive way.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-900 hover:bg-gray-100 font-bold px-10 h-14 text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            onClick={() => navigate('/register')}
          >
            Create Free Account
          </Button>
        </div>
      </section>

    </div>
  )
}

// --- HELPER COMPONENTS ---

const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 transition-all duration-300"
  >
    <div className="mb-6 bg-gray-50 dark:bg-gray-700 w-16 h-16 rounded-2xl flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
      {desc}
    </p>
  </motion.div>
)

const TripPreviewCard = ({ image, title, price, duration, rating }: any) => (
  <div className="group relative rounded-3xl overflow-hidden shadow-lg cursor-pointer">
    <div className="h-96 w-full overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
      <div className="transform translate-y-4 group-hover:translate-y-0 transition duration-300">
        <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 block">Recommended</span>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <div className="flex items-center gap-4 text-white/90 text-sm">
          <span className="flex items-center gap-1"><Sparkles className="w-3 h-3"/> {duration}</span>
          <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400"/> {rating}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center opacity-0 group-hover:opacity-100 transition duration-300 delay-100">
           <span className="font-bold text-white text-lg">{price}</span>
           <span className="text-white text-sm font-medium underline decoration-purple-500 underline-offset-4">View Details</span>
        </div>
      </div>
    </div>
  </div>
)

const TestimonialCard = ({ name, from, text, rating }: any) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition">
    <div className="flex gap-1 mb-4">
      {[...Array(rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
    </div>
    <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
        {name[0]}
      </div>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{name}</h4>
        <p className="text-xs text-gray-500">{from}</p>
      </div>
    </div>
  </div>
)

export default Home