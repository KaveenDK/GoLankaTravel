import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

export const useTheme = () => {
  // 1. Initialize state based on LocalStorage or System Preference
  const [theme, setTheme] = useState<Theme>(() => {
    // Check local storage first
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as Theme
    }
    // Fallback to system preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  // 2. Apply the theme to the HTML document
  useEffect(() => {
    const root = window.document.documentElement

    // Remove previous class
    root.classList.remove('light', 'dark')
    // Add new class
    root.classList.add(theme)
    
    // Save to local storage
    localStorage.setItem('theme', theme)
  }, [theme])

  // 3. Toggle Function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}

export default useTheme