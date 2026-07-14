import { useRef, useEffect, useState } from 'react'

/**
 * 数字缓出计数动画 Hook
 */
export function useCountUp(target: number, duration = 1800, prefix = '', suffix = '') {
  const [display, setDisplay] = useState('0')
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const start = 0
    const startTime = performance.now()
    // 用局部变量替代 ref，避免 StrictMode 双挂载问题
    let done = false

    const update = (now: number) => {
      if (done) return
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
        done = true
      }
    }

    frameRef.current = requestAnimationFrame(update)
    return () => {
      done = true
      cancelAnimationFrame(frameRef.current)
    }
  }, [target, duration, prefix, suffix])

  return display
}
