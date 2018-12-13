import React, { useEffect, useState, useRef } from 'react'

const toMediaQuery = query => `(min-width: ${query}em`

export const useMedia = query => {
  const [matches, setMatches] = useState(window.matchMedia(query))

  useEffect(
    () => {
      const media = window.matchMedia(query)
      const mediaListener = () => setMatches(media.matches)

      media.addListener(mediaListener)
      mediaListener()

      return () => media.removeListener(mediaListener)
    },
    [query]
  )

  return matches
}

const useFocusStyles = (ref, focusStyles = {}) => {
  const [isFocused, setFocused] = useState(false)

  useEffect(() => {
    const focusInListener = ref.current.addEventListener('focusin', () => {
      if (!isFocused) {
        setFocused(true)
      }
    })

    const focusOutListener = ref.current.addEventListener('focusout', () => {
      if (isFocused) {
        setFocused(false)
      }
    })

    return () => {
      ref.current.removeEventListener('focusin', focusInListener)
      ref.current.removeEventListener('focusout', focusOutListener)
    }
  })

  return isFocused ? focusStyles : {}
}

export const useHoverStyles = (ref, hoverStyles = {}) => {
  const [isHovering, setHovering] = useState(false)

  useEffect(
    () => {
      const mouseOverListener = ref.current.addEventListener(
        'mouseover',
        () => {
          if (!isHovering) {
            setHovering(true)
          }
        }
      )

      const mouseOutListener = ref.current.addEventListener('mouseout', () => {
        if (isHovering) {
          setHovering(false)
        }
      })

      return () => {
        ref.current.removeEventListener('mouseover', mouseOverListener)
        ref.current.removeEventListener('mouseout', mouseOutListener)
      }
    },
    [isHovering, hoverStyles]
  )

  return isHovering ? hoverStyles : {}
}

export const useStyles = (ref, styles, breakpoints = [36, 48, 54, 68]) => {
  const sm = useMedia(toMediaQuery(breakpoints[0]))
  const md = useMedia(toMediaQuery(breakpoints[1]))
  const lg = useMedia(toMediaQuery(breakpoints[2]))
  const xl = useMedia(toMediaQuery(breakpoints[3]))

  const hoverStyles = useHoverStyles(ref, styles.hover)
  const focusStyles = useFocusStyles(ref, styles.focus)

  const elementStyles = Object.entries(styles).reduce(
    (acc, [property, val]) => {
      if (!Array.isArray(val)) {
        acc[property] = val
        return acc
      }

      if (xl) {
        acc[property] = val[4] || null
      } else if (lg) {
        acc[property] = val[3] || null
      } else if (md) {
        acc[property] = val[2] || null
      } else if (sm) {
        acc[property] = val[1] || null
      } else {
        acc[property] = val[0]
      }

      return acc
    },
    {}
  )

  return Object.assign({}, elementStyles, hoverStyles, focusStyles)
}
