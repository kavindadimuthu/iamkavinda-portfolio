import { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(options: UseScrollAnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<T>(null)

  const { threshold = 0.1, rootMargin = '0px 0px -10% 0px', once = true } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // If animation should only happen once and has already animated, skip
    if (once && hasAnimated) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setHasAnimated(true)
          
          // If it's a one-time animation, disconnect observer
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, once, hasAnimated])

  return { elementRef, isVisible }
}

// Hook for staggered animations
export function useStaggeredAnimation<T extends HTMLElement = HTMLDivElement>(itemCount: number, delay: number = 100) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const containerRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation of items
          Array.from({ length: itemCount }, (_, index) => index).forEach((index) => {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]))
            }, index * delay)
          })
          
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [itemCount, delay])

  return { containerRef, visibleItems }
}