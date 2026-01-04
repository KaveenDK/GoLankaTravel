import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, DollarSign, Heart, ArrowRight, ArrowLeft, Sparkles, Check } from 'lucide-react'
import Button from '../ui/Button'
import { cn } from '../../utils/cn'

export interface PlannerFormData {
  duration: number
  travelers: number
  budget: 'Budget' | 'Standard' | 'Luxury'
  interests: string[]
}

interface PlannerFormProps {
  onSubmit: (data: PlannerFormData) => void
  isGenerating: boolean
}

const INTERESTS_LIST = [
  "Beaches", "Wildlife", "History", "Hiking", 
  "Food", "Culture", "Surfing", "Yoga", "Photography"
]

const PlannerForm = ({ onSubmit, isGenerating }: PlannerFormProps) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<PlannerFormData>({
    duration: 5,
    travelers: 2,
    budget: 'Standard',
    interests: []
  })

  const totalSteps = 3

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
      
      {/* 1. Progress Bar */}
      <div className="bg-gray-50 dark:bg-gray-900/50 px-8 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Step {step} of {totalSteps}</span>
        <div className="flex gap-1">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={cn(
                "h-2 w-8 rounded-full transition-all duration-300",
                s <= step ? "bg-purple-600" : "bg-gray-200 dark:bg-gray-700"
              )}
            />
          ))}
        </div>
      </div>

      <div className="p-8 min-h-[400px] flex flex-col">
        
        {/* 2. Step Content */}
        <div className="flex-grow">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trip Basics</h2>
              
              {/* Duration Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  How many days? <span className="font-bold text-purple-600 text-lg ml-2">{formData.duration} Days</span>
                </label>
                <input 
                  type="range" min="1" max="21" 
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>1 Day</span>
                  <span>3 Weeks</span>
                </div>
              </div>

              {/* Travelers Counter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Who is traveling?
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                    <button 
                      onClick={() => setFormData(prev => ({...prev, travelers: Math.max(1, prev.travelers - 1)}))}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    > - </button>
                    <span className="px-4 font-bold text-gray-900 dark:text-white w-12 text-center">{formData.travelers}</span>
                    <button 
                      onClick={() => setFormData(prev => ({...prev, travelers: prev.travelers + 1}))}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    > + </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select Interests</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Pick at least 3 things you love.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INTERESTS_LIST.map((interest) => {
                  const isSelected = formData.interests.includes(interest)
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={cn(
                        "p-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-between",
                        isSelected 
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 ring-1 ring-purple-500" 
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-purple-300"
                      )}
                    >
                      {interest}
                      {isSelected && <Check className="w-4 h-4 text-purple-600" />}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Budget Preference</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(['Budget', 'Standard', 'Luxury'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setFormData({...formData, budget: level})}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-center transition-all duration-200 hover:scale-105",
                      formData.budget === level
                        ? "border-purple-500 bg-white dark:bg-gray-800 shadow-xl shadow-purple-200/50 dark:shadow-none"
                        : "border-transparent bg-gray-50 dark:bg-gray-700/50 text-gray-500 grayscale hover:grayscale-0"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 text-2xl",
                      level === 'Budget' ? "bg-green-100 text-green-600" :
                      level === 'Standard' ? "bg-blue-100 text-blue-600" :
                      "bg-yellow-100 text-yellow-600"
                    )}>
                      {level === 'Budget' ? '$' : level === 'Standard' ? '$$' : '$$$'}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{level}</h3>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* 3. Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={step === 1}
            className={step === 1 ? "invisible" : ""}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          {step < totalSteps ? (
            <Button onClick={handleNext} className="px-8">
              Next Step <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={() => onSubmit(formData)} 
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none px-8 shadow-lg shadow-purple-500/30"
            >
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" /> 
              {isGenerating ? "Generating..." : "Generate My Trip"}
            </Button>
          )}
        </div>

      </div>
    </div>
  )
}

export default PlannerForm