'use client'

import { useState, useEffect } from 'react'

const TimeAgo = ({ timestamp }: { timestamp: string }) => {
  const [timeAgo, setTimeAgo] = useState('')

  useEffect(() => {
    // This effect runs only on the client, after hydration
    const calculateTimeAgo = () => {
      const diffMs = Date.now() - new Date(timestamp).getTime()
      const diffSec = Math.floor(diffMs / 1000)
      const diffMin = Math.floor(diffSec / 60)
      const diffHr = Math.floor(diffMin / 60)
      const diffDay = Math.floor(diffHr / 24)

      if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`
      if (diffHr > 0) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`
      if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`
      return 'just now'
    }
    setTimeAgo(calculateTimeAgo())
  }, [timestamp])

  return <span>{timeAgo}</span>
}

export default TimeAgo 