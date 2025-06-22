'use client'

import React, { ReactNode } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface AnimatedFallInProps {
  children: ReactNode
  delay?: number
}

export default function AnimatedFallIn({ children, delay = 0 }: AnimatedFallInProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.15 })
  
  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.7, delay } })
    } else {
      controls.start({ opacity: 0, y: 60 })
    }
  }, [controls, inView, delay])
  
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