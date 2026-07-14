import type { ChartDataPoint } from '../../types'

export interface SimpleBarChartProps {
  data: ChartDataPoint[]
  height?: number
  barColor?: string
}

export function SimpleBarChart({ data, height = 200, barColor = 'linear-gradient(180deg, #4a90d9 0%, #2d6cc7 100%)' }: SimpleBarChartProps) {
  const maxVal = Math.max(...data.map((d) => d.value))

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height, padding: '16px 0' }}>
      {data.map((item, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>{item.value.toLocaleString()}</span>
          <div
            style={{
              width: '100%', maxWidth: 40,
              height: `${(item.value / maxVal) * (height - 60)}px`,
              borderRadius: '6px 6px 2px 2px', background: barColor,
              position: 'relative', transformOrigin: 'bottom center',
              animation: `barRise 0.8s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s both`,
              cursor: 'pointer', transition: 'filter 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.15)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(74,144,217,0.3)' }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = ''; e.currentTarget.style.boxShadow = '' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 2, right: 2, height: '30%', borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg, rgba(255,255,255,0.4), transparent)', opacity: 0, transition: 'opacity 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0' }}
            />
          </div>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>{item.date}</span>
        </div>
      ))}
    </div>
  )
}
