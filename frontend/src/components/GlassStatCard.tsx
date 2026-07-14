
import { useRef, useEffect, useState } from 'react'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import type { StatCard } from '../mock/data'

// ---- 数字滚动动画 Hook ----
function useCountUp(target: number, duration = 1800, prefix = '', suffix = '') {
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

// ---- 3D 卡片悬浮 Hook ----
function useCard3D(intensity = 6) {
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

// 卡片变体 className
const statVariants = ['', 'glass-stat-card--gold', 'glass-stat-card--green', 'glass-stat-card--purple']

interface GlassStatCardProps {
  stat: StatCard
  index: number
}

export default function GlassStatCard({ stat, index }: GlassStatCardProps) {
  const { cardRef, handleMouseMove, handleMouseLeave } = useCard3D(6)
  const valDisplay = useCountUp(stat.value, 1800, stat.prefix || '', stat.suffix || '')

  return (
    <div
      ref={cardRef}
      className={`glass-stat-card glass-el-2 ${statVariants[index] || ''}`}
      style={{
        height: 130,
        transition: 'transform 0.1s ease-out, box-shadow 0.3s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 四色渐变顶部条 */}
      <div className="stat-accent-bar" />
      <div className="stat-accent-glow" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
            {stat.title}
          </div>
          <div style={{
            fontSize: 28, fontWeight: 700,
            background: 'linear-gradient(135deg, #0a1628, #1a3560)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {valDisplay}
          </div>
        </div>
        <div
          style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(37,99,235,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}
        >
          {stat.icon}
        </div>
      </div>
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
        {stat.changeType === 'up' ? (
          <ArrowUpOutlined style={{ color: '#10b981', fontSize: 12 }} />
        ) : (
          <ArrowDownOutlined style={{ color: '#ef4444', fontSize: 12 }} />
        )}
        <span style={{
          fontSize: 12, fontWeight: 500,
          color: stat.changeType === 'up' ? '#10b981' : '#ef4444',
        }}>
          {stat.change}%
        </span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>较昨日</span>
      </div>
    </div>
  )
}
