import { useRef } from 'react'

/**
 * 卡片 3D 悬浮 Hook
 * @param intensity 旋转强度 (默认 6, 建议 4~8)
 */
export function useCard3D(intensity = 6) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateY = ((x - centerX) / centerX) * intensity
    const rotateX = -((y - centerY) / centerY) * intensity

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    card.style.boxShadow = `
      ${rotateY * -1.5}px ${rotateX * 1.5}px 20px hsla(221,35%,10%,0.08),
      ${rotateY * -0.8}px ${rotateX * 0.8}px 40px hsla(221,35%,10%,0.04),
      0 0 0 1px rgba(201,164,75,${Math.abs(rotateX + rotateY) / 80})
    `
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    card.style.boxShadow = ''
  }

  return { cardRef, handleMouseMove, handleMouseLeave }
}
