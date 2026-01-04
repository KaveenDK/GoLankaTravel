import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Plane, Cloud } from 'lucide-react'

// Array of high-quality background images
const slides = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dxq00wvem/image/upload/v1767560039/shashank-hudkar-KYBc1eq0dJo-unsplash_1_ztnt7g.jpg",
    location: "Sigiriya Rock Fortress",
    desc: "Ancient palace located in the central Matale District"
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dxq00wvem/image/upload/v1767560207/yves-alarie-3R50kTNBKiE-unsplash_wkeoat.jpg",
    location: "Nine Arch Bridge",
    desc: "Iconic colonial-era railway bridge in Ella"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop",
    location: "Mirissa Beach",
    desc: "Golden sands and whale watching in the south"
  }
]

const Hero3DReplacement = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-[#0f172a] flex items-center justify-center">
      
      {/* ==================== LAYER 1: BACKGROUND SLIDER ==================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={slides[currentSlide].image} 
            alt="Sri Lanka Travel" 
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay Gradient (Crucial for text visibility) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-[#0f172a]/40 to-[#0f172a]" />
        </motion.div>
      </AnimatePresence>


      {/* ==================== LAYER 2: 3D EARTH ANIMATION ==================== */}
      {/* Centered Overlay behind main text but in front of images */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
        
        {/* 1. Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>

        {/* 2. Rotating Earth Image */}
        <div className="relative w-64 h-64 md:w-[550px] md:h-[550px] opacity-80 mix-blend-screen">
           <motion.img 
             src="https://upload.wikimedia.org/wikipedia/commons/2/22/Earth_Western_Hemisphere_transparent_background.png" 
             alt="Globe" 
             className="w-full h-full object-contain drop-shadow-2xl"
             animate={{ rotate: 360 }}
             transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
           />

           {/* 3. Orbiting Plane */}
           <motion.div 
             className="absolute top-0 left-0 w-full h-full"
             animate={{ rotate: 360 }}
             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 md:-translate-y-8">
                <Plane className="w-6 h-6 md:w-10 md:h-10 text-white fill-purple-500 rotate-90 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
             </div>
           </motion.div>

           {/* 4. Floating Clouds */}
           <motion.div 
             className="absolute top-1/4 -left-12 text-white/30"
             animate={{ x: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           >
             <Cloud className="w-12 h-12 md:w-20 md:h-20 fill-white/10 blur-sm" />
           </motion.div>

           <motion.div 
             className="absolute bottom-1/4 -right-12 text-white/30"
             animate={{ x: [0, -40, 0], opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           >
             <Cloud className="w-16 h-16 md:w-24 md:h-24 fill-white/10 blur-sm" />
           </motion.div>
        </div>
      </div>


      {/* ==================== LAYER 3: UI ELEMENTS ==================== */}
      
      {/* Floating Location Card (Bottom Right) */}
      <motion.div 
        className="absolute bottom-8 right-4 md:right-8 z-30 hidden md:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        key={currentSlide} // Re-animate on slide change
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4 max-w-xs hover:bg-white/20 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{slides[currentSlide].location}</h3>
            <p className="text-gray-400 text-xs">{slides[currentSlide].desc}</p>
          </div>
        </div>
      </motion.div>

      {/* Slide Indicators (Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-purple-500" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  )
}

export default Hero3DReplacement