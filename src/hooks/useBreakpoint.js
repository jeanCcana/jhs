import { throttle } from 'lodash'
import { useState, useEffect } from 'react'

const getDeviceConfig = (width) => ({
  xs: width > 0,
  sm: width > 576,
  md: width > 768,
  lg: width > 992,
  xl: width > 1200,
  xxl: width > 1400,
})

export const useBreakpoint = () => {
  const [brkPnt, setBrkPnt] = useState(() => getDeviceConfig(window.innerWidth))

  useEffect(() => {
    const calcInnerWidth = throttle(() => {
      setBrkPnt(getDeviceConfig(window.innerWidth))
    }, 200)
    window.addEventListener('resize', calcInnerWidth)
    return () => window.removeEventListener('resize', calcInnerWidth)
  }, [])

  return brkPnt
}
