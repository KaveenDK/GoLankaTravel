import type { Variants } from 'framer-motion'

// --- TRANSITION SETTINGS ---
export const transition = {
  spring: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },
  smooth: {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5,
  },
  quick: {
    type: "tween",
    ease: "easeOut",
    duration: 0.3,
  }
} as const

// --- VARIANTS ---

/**
 * Basic Fade In
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: transition.smooth 
  },
  exit: { 
    opacity: 0,
    transition: transition.quick 
  }
}

/**
 * Slide Up & Fade
 */
export const slideUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: transition.spring
  }
}

/**
 * Slide Down (e.g., for Dropdowns or Notifications)
 */
export const slideDown: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: transition.spring
  },
  exit: {
    y: -20,
    opacity: 0
  }
}

/**
 * Scale Up (Pop effect)
 */
export const scaleUp: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: transition.spring
  },
  exit: { 
    scale: 0.95, 
    opacity: 0 
  }
}

/**
 * Stagger Container
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
}

/**
 * Stagger Item
 */
export const staggerItem: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: transition.quick
  }
}

/**
 * Slide In From Left (Sidebar or Hero content)
 */
export const slideInLeft: Variants = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: transition.spring
  }
}

/**
 * Slide In From Right
 */
export const slideInRight: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: transition.spring
  }
}

export const tailwindAnimations = {
  fadeIn: "animate-in fade-in duration-500",
  slideUp: "animate-in slide-in-from-bottom-4 fade-in duration-500",
  zoomIn: "animate-in zoom-in-95 fade-in duration-300",
  pulse: "animate-pulse",
  spin: "animate-spin"
}