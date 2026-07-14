import { useRef, useEffect, useState } from 'react'

/**
 * 数字缓出计数动画 Hook
 * @param target 目标数值
 * @param duration 动画时长(ms)
 * @param prefix 前缀 (如 "¥")
 * @param suffix 后缀 (如 "人")
 */
export function useCountUp(target: number, duration = 1800, prefix = '', suffix = '') {
  const [display, setDisplay] = useState('0')
  const frameRef = useRef<number>(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const start = 0
    const startTime = performance.now()

    const update = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(2, -10 * progress)
      const current = start + (target - start) * eased

      const formatted = Number.isInteger(target)
        ? Math.floor(current).toLocaleString()
        : current.toFixed(2)

      setDisplay(`${prefix}${formatted}${suffix}`)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(update)
      } else {
        setDisplay(`${prefix}${target.toLocaleString()}${suffix}`)
      }
    }

    frameRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frameRef.current)
  }, [target, duration, prefix, suffix])

  return display
}
