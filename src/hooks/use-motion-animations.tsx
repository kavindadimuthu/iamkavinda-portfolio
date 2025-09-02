import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface UseMotionAnimationOptions {
  threshold?: number
  once?: boolean
  rootMargin?: string
}

export function useMotionAnimation(options: UseMotionAnimationOptions = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: options.once !== false
  })
  
  return { ref, isInView }
}

// Simple animation variants without transition overrides
export const animationVariants = {
  // Fade in + Slide up for text content
  slideUp: {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0
    }
  },

  // Fade in + Zoom in for images and cards
  zoomIn: {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1
    }
  },

  // Slide from left
  slideLeft: {
    hidden: {
      opacity: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0
    }
  },

  // Slide from right
  slideRight: {
    hidden: {
      opacity: 0,
      x: 50
    },
    visible: {
      opacity: 1,
      x: 0
    }
  },

  // Container for staggered animations
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  },

  // Individual staggered items
  staggerItem: {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0
    }
  },

  // Page load animation variants
  pageSection: {
    hidden: {
      opacity: 0,
      y: 60
    },
    visible: {
      opacity: 1,
      y: 0
    }
  },

  // Navigation entrance
  navSlideDown: {
    hidden: {
      opacity: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  },

  // Footer slide up
  footerSlideUp: {
    hidden: {
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0
    }
  }
}

// Reusable transition configs
export const transitions = {
  smooth: {
    duration: 0.6
  },
  fast: {
    duration: 0.3
  },
  slow: {
    duration: 0.8
  },
  elegant: {
    duration: 0.7,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
  },
  heroTitle: {
    duration: 0.8,
    delay: 0.2,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
  },
  heroSubtitle: {
    duration: 0.6,
    delay: 0.5,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
  },
  heroButtons: {
    duration: 0.6,
    delay: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
  },
  // Section-specific transitions with delays
  navigation: {
    duration: 0.6,
    delay: 0.1
  },
  section: {
    duration: 0.7,
    delay: 0.2,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
  },
  footer: {
    duration: 0.6,
    delay: 0.3
  }
}