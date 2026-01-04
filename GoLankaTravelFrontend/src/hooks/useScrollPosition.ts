import { useState, useEffect } from 'react'

/**
 * A hook that returns the current vertical scroll position of the window.
 * Useful for changing Navbar styles on scroll or showing "Back to Top" buttons.
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY)
    }

    // Add event listener
    window.addEventListener('scroll', updatePosition)

    // Call once on mount to set initial value
    updatePosition()

    // Cleanup listener on unmount
    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}

export default useScrollPosition