'use client'

import React, { ReactNode, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface AnimatedFallInProps {
  children: ReactNode
  delay?: number
}

export default function AnimatedFallIn({ children, delay = 0 }: AnimatedFallInProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.15 })
  const [hasAnimated, setHasAnimated] = useState(false)
  
  React.useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.7, delay } })
      setHasAnimated(true)
    }
    // Do not reset animation if out of view
  }, [controls, inView, delay, hasAnimated])
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={controls}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
} 