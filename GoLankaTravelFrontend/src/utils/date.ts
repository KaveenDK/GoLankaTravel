/**
 * Formats a date string or Date object into a readable standard format.
 * Example: "2023-11-25T10:00:00Z" -> "Nov 25, 2023"
 */
export const formatDate = (date: string | Date | undefined): string => {
  if (!date) return 'N/A'

  const d = new Date(date)
  
  // Check for invalid dates
  if (isNaN(d.getTime())) return 'Invalid Date'

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d)
}

/**
 * Formats a date to include the time.
 * Example: "Nov 25, 2023 at 10:30 AM"
 */
export const formatDateTime = (date: string | Date | undefined): string => {
  if (!date) return 'N/A'

  const d = new Date(date)
  
  if (isNaN(d.getTime())) return 'Invalid Date'

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(d)
}

/**
 * Returns a relative time string (e.g., "2 days ago", "just now").
 * Useful for comments or notifications.
 */
export const timeAgo = (date: string | Date): string => {
  const d = new Date(date)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  
  // If older than 30 days, return the actual date
  return formatDate(d)
}

/**
 * Adds days to a date and returns the new Date object.
 * Useful for calculating end dates of trips.
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Returns a standard formatted range string.
 * Example: "Nov 10 - Nov 15, 2023"
 */
export const formatDateRange = (startDate: string | Date, durationDays: number): string => {
  const start = new Date(startDate)
  const end = addDays(start, durationDays)
  
  const startStr = formatDate(start)
  const endStr = formatDate(end)
  
  // If same year, we might want to shorten it (optional logic)
  return `${startStr} - ${endStr}`
}