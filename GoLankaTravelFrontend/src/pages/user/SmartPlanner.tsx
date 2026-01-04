import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Save, RefreshCw, Share2, Loader2, CheckCircle2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import PlannerForm from '../../components/ai/PlannerForm'
import type { PlannerFormData } from '../../components/ai/PlannerForm'
import ItineraryTimeline from '../../components/ai/ItineraryTimeline'
import Button from '../../components/ui/Button'

// --- TYPES ---
export interface Activity {
  time: string
  activity: string
  description?: string
  icon?: string // e.g., 'food', 'travel', 'sightseeing'
}

export interface DayPlan {
  day: number
  theme: string
  activities: Activity[]
}

const SmartPlanner = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  // --- STATE ---
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0) // For the loading animation text
  const [showResult, setShowResult] = useState(false)
  const [itinerary, setItinerary] = useState<DayPlan[]>([])
  const [planData, setPlanData] = useState<PlannerFormData | null>(null)

  // --- HANDLERS ---

  const handleGeneratePlan = async (data: PlannerFormData) => {
    setIsGenerating(true)
    setPlanData(data)
    
    // Simulate AI "Thinking" Steps
    const steps = [
      "Analyzing your preferences...",
      "Searching for best flights & hotels...",
      "Curating local experiences...",
      "Finalizing your perfect itinerary..."
    ]

    // Cycle through loading messages
    let step = 0
    const interval = setInterval(() => {
      step++
      setGenerationStep(step)
      if (step >= steps.length) clearInterval(interval)
    }, 800)

    // SIMULATION: Call your Real AI Backend here
    // const response = await api.post('/trips/generate', data)
    
    setTimeout(() => {
      const mockItinerary = generateMockItinerary(data.duration, data.interests)
      setItinerary(mockItinerary)
      setIsGenerating(false)
      setShowResult(true)
      toast.success("Itinerary generated successfully!", { icon: '✨' })
    }, 4000)
  }

  const handleSaveTrip = () => {
    if (!isAuthenticated) {
      toast.error("Please login to save your trip.")
      navigate('/login', { state: { from: '/planner' } })
      return
    }
    // Call API to save trip to user profile
    toast.success("Trip saved to your profile!")
  }

  const handleReset = () => {
    setShowResult(false)
    setItinerary([])
    setPlanData(null)
    setGenerationStep(0)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      
      {/* 1. Header Section (Hidden when showing results to save space) */}
      {!showResult && (
        <div className="max-w-4xl mx-auto text-center mb-12 animate-in fade-in slide-in-from-bottom-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Gemini AI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Design Your Perfect <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              Sri Lankan Adventure
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tell us your budget, interests, and duration. Our intelligent planner will craft a day-by-day itinerary just for you in seconds.
          </p>
        </div>
      )}

      {/* 2. Main Content Area */}
      <div className="max-w-6xl mx-auto">
        
        {/* VIEW A: Loading State (AI Thinking UI) */}
        {isGenerating ? (
          <div className="h-[60vh] w-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden relative">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 animate-pulse"></div>
            
            {/* Loader Content */}
            <div className="relative z-10 flex flex-col items-center max-w-md w-full px-4">
                <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mb-8 shadow-lg ring-4 ring-purple-100 dark:ring-purple-900/30 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-purple-100 dark:border-purple-900/30 border-t-purple-600 animate-spin"></div>
                    <Sparkles className="w-10 h-10 text-purple-600 animate-pulse" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                    Crafting Your Journey
                </h3>
                
                {/* Dynamic Loading Text */}
                <div className="h-8 mb-4 flex items-center justify-center">
                   <motion.p 
                     key={generationStep}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="text-purple-600 dark:text-purple-400 font-medium"
                   >
                     {["Analyzing preferences...", "Finding best routes...", "Selecting hotels...", "Finalizing itinerary..."][generationStep % 4]}
                   </motion.p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                   <motion.div 
                     className="h-full bg-purple-600 rounded-full"
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 4, ease: "linear" }}
                   />
                </div>
            </div>
          </div>
        ) : !showResult ? (
          
          /* VIEW B: Input Form (The Wizard) */
          <div className="max-w-3xl mx-auto animate-in zoom-in-95 duration-300">
            <PlannerForm onSubmit={handleGeneratePlan} isGenerating={isGenerating} />
          </div>

        ) : (

          /* VIEW C: Results (Itinerary) */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-8 duration-500">
            
            {/* Left Col: Itinerary Timeline */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
                <div className="flex justify-between items-end mb-8 border-b border-gray-100 dark:border-gray-700 pb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <CheckCircle2 className="w-5 h-5 text-green-500" />
                       <span className="text-sm font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">AI Plan Ready</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Custom Itinerary</h2>
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-3">
                      <span>🗓️ {planData?.duration} Days</span>
                      <span>👥 {planData?.travelers} Travelers</span>
                      <span>💰 {planData?.budget}</span>
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <Button size="sm" variant="outline" onClick={handleReset}>
                      <RefreshCw className="w-4 h-4 mr-2" /> New Plan
                    </Button>
                  </div>
                </div>
                
                {/* The Timeline Component */}
                <ItineraryTimeline itinerary={itinerary} />
                
              </div>
            </div>

            {/* Right Col: Summary & Actions (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* Action Card */}
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  
                  <h3 className="text-xl font-bold mb-2 relative z-10">Ready to go?</h3>
                  <p className="text-purple-100 text-sm mb-6 relative z-10">
                    Save this itinerary to your profile or share it with your travel buddies.
                  </p>
                  <div className="space-y-3 relative z-10">
                    <Button 
                      onClick={handleSaveTrip}
                      className="w-full bg-white text-purple-600 hover:bg-gray-100 border-none shadow-md"
                    >
                      <Save className="w-4 h-4 mr-2" /> Save Trip
                    </Button>
                    <Button 
                      onClick={() => toast.success("Share link copied!")}
                      variant="outline" 
                      className="w-full border-white/30 text-white hover:bg-white/10"
                    >
                      <Share2 className="w-4 h-4 mr-2" /> Share Plan
                    </Button>
                  </div>
                </div>

                {/* Mobile Regenerate Button */}
                <div className="sm:hidden">
                    <Button variant="outline" className="w-full" onClick={handleReset}>
                      <RefreshCw className="w-4 h-4 mr-2" /> Start Over
                    </Button>
                </div>

                {/* Helpful Tips Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Estimated Cost</h4>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                        LKR {(Number(planData?.duration || 1) * 15000).toLocaleString()} <span className="text-sm text-gray-400 font-normal">approx</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        *Includes accommodation, transport, and entry fees. Flights excluded.
                    </p>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

// --- HELPER: Mock Data Generator ---
const generateMockItinerary = (days: number, interests: string[]): DayPlan[] => {
  const plans: DayPlan[] = []
  
  const locations = [
    { name: "Negombo", theme: "Coastal Relaxation" },
    { name: "Sigiriya", theme: "Ancient History" },
    { name: "Kandy", theme: "Cultural Capital" },
    { name: "Ella", theme: "Mountain Views" },
    { name: "Yala", theme: "Wildlife Safari" },
    { name: "Mirissa", theme: "Beach Vibes" },
    { name: "Colombo", theme: "City Tour" },
  ]

  for (let i = 1; i <= days; i++) {
    const loc = locations[(i - 1) % locations.length]
    
    plans.push({
      day: i,
      theme: `${loc.name} - ${loc.theme}`,
      activities: [
        { 
          time: "08:00 AM", 
          activity: "Traditional Sri Lankan Breakfast", 
          description: "Enjoy hoppers, dhal curry, and coconut sambol.",
          icon: "food"
        },
        { 
          time: "10:30 AM", 
          activity: `Explore ${loc.name} Highlights`, 
          description: `Visit key landmarks and enjoy the local scenery of ${loc.name}.`,
          icon: "sightseeing"
        },
        { 
          time: "01:00 PM", 
          activity: "Lunch at Local Spice Garden", 
          description: "Authentic rice and curry experience.",
          icon: "food"
        },
        { 
          time: "04:00 PM", 
          activity: interests.length > 0 && i % 2 === 0 ? `${interests[0]} Experience` : "Sunset & Relaxation", 
          description: "Unwind and take in the beautiful evening atmosphere.",
          icon: "relax"
        }
      ]
    })
  }
  return plans
}

export default SmartPlanner