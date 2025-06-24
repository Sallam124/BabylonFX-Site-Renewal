import React from 'react'

/**
 * Formats a timestamp into a human-readable "time ago" string
 * @param timestamp - ISO string timestamp
 * @returns Formatted time ago string
 */
export const formatTimeAgo = (timestamp: string): string => {
  const diffMs = Date.now() - new Date(timestamp).getTime()
  const diffMin = Math.floor(diffMs / (1000 * 60))
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)

  if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`
  if (diffHr > 0) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`
  if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`
  return 'just now'
}

/**
 * Formats a timestamp into a human-readable "time ago" string with auto-update
 * @param timestamp - ISO string timestamp
 * @param updateInterval - Update interval in milliseconds (default: 60000)
 * @returns Formatted time ago string that updates automatically
 */
export const useTimeAgo = (timestamp: string, updateInterval: number = 60000): string => {
  const [timeAgo, setTimeAgo] = React.useState(() => formatTimeAgo(timestamp))

  React.useEffect(() => {
    const updateTime = () => setTimeAgo(formatTimeAgo(timestamp))
    
    // Update immediately
    updateTime()
    
    // Set up interval for updates
    const interval = setInterval(updateTime, updateInterval)
    
    return () => clearInterval(interval)
  }, [timestamp, updateInterval])

  return timeAgo
} 