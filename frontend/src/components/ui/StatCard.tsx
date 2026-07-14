import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { useCountUp, useCard3D } from '../../hooks'

export interface StatCardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  change: number
  changeType: 'up' | 'down'
  icon?: string
  variant?: '' | 'gold' | 'green' | 'purple'
  index?: number
}

const variantClass: Record<string, string> = {
  '': '', gold: 'glass-stat-card--gold', green: 'glass-stat-card--green', purple: 'glass-stat-card--purple',
}

export function StatCard({ title, value, prefix = '', suffix = '', change, changeType, icon = '📊', variant = '', index = 0 }: StatCardProps) {
  const { cardRef, handleMouseMove, handleMouseLeave } = useCard3D(6)
  const display = useCountUp(value, 1800, prefix, suffix)

  return (
    <div
      ref={cardRef}
      className={`glass-stat-card glass-el-2 ${variantClass[variant]}`}
      style={{ height: 130, transition: 'transform 0.1s ease-out, box-shadow 0.3s ease' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="stat-accent-bar" />
      <div className="stat-accent-glow" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>{title}</div>
          <div style={{
            fontSize: 28, fontWeight: 700,
            background: 'linear-gradient(135deg, #0a1628, #1a3560)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', lineHeight: 1, fontVariantNumeric: 'tabular-nums',
          }}>
            {display}
          </div>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(37,99,235,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
          {icon}
        </div>
      </div>
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
        {changeType === 'up'
          ? <ArrowUpOutlined style={{ color: '#10b981', fontSize: 12 }} />
          : <ArrowDownOutlined style={{ color: '#ef4444', fontSize: 12 }} />
        }
        <span style={{ fontSize: 12, fontWeight: 500, color: changeType === 'up' ? '#10b981' : '#ef4444' }}>{change}%</span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>较昨日</span>
      </div>
    </div>
  )
}
