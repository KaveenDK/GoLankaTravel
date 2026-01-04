import React, { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {/* Optional Label */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {label}
          </label>
        )}
        
        <div className="relative">
          {/* Optional Icon (Left Side) */}
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              "w-full rounded-xl border bg-white dark:bg-gray-900 px-4 py-2.5 text-sm transition-colors outline-none focus:ring-2 focus:ring-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50",
              // Base Styles
              "border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400",
              // Icon Padding adjustment (if icon exists)
              icon ? "pl-10" : "",
              // Error State Styling
              error 
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" 
                : "focus:border-purple-500",
              className
            )}
            {...props}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-1 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input