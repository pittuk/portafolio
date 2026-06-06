'use client'
import { useEffect, useLayoutEffect, useState } from 'react'

// On the server useLayoutEffect doesn't exist, so fall back to useEffect (no-op on server).
// On the client, useLayoutEffect runs synchronously after DOM mutations and BEFORE the
// browser paints, so the first visible frame already has the correct isMobile value.
// This prevents the "desktop flash" on mobile that caused Services column overflow
// and the Portfolio ScrollTrigger pin to activate on mobile.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}

export function useMobile(): boolean {
  return useMediaQuery('(max-width: 768px)')
}
