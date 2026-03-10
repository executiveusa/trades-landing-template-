'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

/**
 * Steve Krug Principle: Don't Make Me Think
 * Smooth, intuitive animations that guide the eye and provide feedback
 */

// Fade-in animation for content entrance
export function FadeInView({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {children}
    </motion.div>
  )
}

// Slide-up animation for content entrance
export function SlideUpView({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {children}
    </motion.div>
  )
}

// Scale animation for hover effects
export function ScaleOnHover({ children, scale = 1.02 }: { children: ReactNode; scale?: number }) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Parallax scroll effect
export function ParallaxView({ children, offset = 20 }: { children: ReactNode; offset?: number }) {
  return (
    <motion.div
      style={{
        y: 0,
      }}
      whileInView={{
        y: offset,
      }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>
  )
}

// Stagger children animations
export function StaggerContainer({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      {children}
    </motion.div>
  )
}

// Smooth number counter animation
export function CounterAnimation({ value, duration = 2 }: { value: number; duration?: number }) {
  return (
    <motion.span>
      {value}
    </motion.span>
  )
}

// Image reveal animation for before/after style galleries
export function ImageReveal({
  children,
  direction = 'left',
}: {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
}) {
  const initialVariant = {
    left: { opacity: 0, x: -50 },
    right: { opacity: 0, x: 50 },
    up: { opacity: 0, y: -50 },
    down: { opacity: 0, y: 50 },
  }[direction]

  return (
    <motion.div
      initial={initialVariant}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {children}
    </motion.div>
  )
}

// Smooth scroll-triggered text animation
export function TextReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ')

  return (
    <span>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + index * 0.05 }}
          viewport={{ once: true }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// Animated button feedback
export function AnimatedButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
