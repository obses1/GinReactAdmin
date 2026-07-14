import { Row, Col } from 'antd'
import type { QuickAction } from '../../types'

export interface QuickActionsProps {
  items: QuickAction[]
  columns?: number
}

export function QuickActions({ items, columns = 3 }: QuickActionsProps) {
  return (
    <Row gutter={[12, 12]}>
      {items.map((item, i) => (
        <Col span={24 / columns} key={i}>
          <div
            className="glass-el-1"
            onClick={item.onClick}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              padding: '16px 8px', cursor: 'pointer',
              transition: 'transform 0.3s var(--ease-out-expo), border-color 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.borderColor = `${item.color}40`
              e.currentTarget.style.boxShadow = `0 0 16px ${item.color}18`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.borderColor = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${item.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              {item.icon}
            </div>
            <span style={{ fontSize: 12, color: '#64748b' }}>{item.label}</span>
          </div>
        </Col>
      ))}
    </Row>
  )
}
