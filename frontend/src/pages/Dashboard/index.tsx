import { useEffect, useState } from 'react'
import { Col, Row, Table, Tag, Skeleton, Card } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { fetchStats, fetchOrders, fetchChartData } from '../../services'
import { StatCard } from '../../components/ui/StatCard'
import { SimpleBarChart } from '../../components/business/SimpleBarChart'
import { QuickActions } from '../../components/business/QuickActions'
import { ORDER_STATUS_MAP } from '../../types'
import type { StatCardData, RecentOrder, ChartDataPoint, QuickAction } from '../../types'

const statVariants = ['', 'gold', 'green', 'purple'] as const

const quickActionItems: QuickAction[] = [
  { icon: '📦', label: '新建订单', color: '#2563eb' },
  { icon: '👤', label: '添加用户', color: '#10b981' },
  { icon: '📊', label: '生成报表', color: '#8b5cf6' },
  { icon: '⚙️', label: '系统配置', color: '#f59e0b' },
  { icon: '📝', label: '发布公告', color: '#06b6d4' },
  { icon: '🔒', label: '安全审计', color: '#ef4444' },
]

export default function Dashboard() {
  const [stats, setStats] = useState<StatCardData[]>([])
  const [orders, setOrders] = useState<RecentOrder[]>([])
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchStats(), fetchOrders(), fetchChartData()]).then(([s, o, c]) => {
      setStats(s); setOrders(o); setChartData(c); setLoading(false)
    })
  }, [])

  const columns: ColumnsType<RecentOrder> = [
    { title: '订单编号', dataIndex: 'orderNo', key: 'orderNo', width: 180,
      render: (text) => <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{text}</span> },
    { title: '客户', dataIndex: 'customer', key: 'customer', width: 100 },
    { title: '金额', dataIndex: 'amount', key: 'amount', width: 120, sorter: (a, b) => a.amount - b.amount,
      render: (val) => <span style={{ fontWeight: 600, color: '#1e293b' }}>¥{val.toLocaleString()}</span> },
    { title: '状态', dataIndex: 'status', key: 'status', width: 100,
      render: (status: string) => <Tag color={ORDER_STATUS_MAP[status as keyof typeof ORDER_STATUS_MAP]?.color}>{ORDER_STATUS_MAP[status as keyof typeof ORDER_STATUS_MAP]?.label}</Tag> },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 160,
      render: (text) => <span style={{ color: '#94a3b8', fontSize: 13 }}>{text}</span> },
  ]

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Col xs={24} sm={12} lg={6} key={i}>
                <Card style={{ height: 130 }}><Skeleton active paragraph={{ rows: 1 }} /></Card>
              </Col>))
          : stats.map((stat, i) => (
              <Col xs={24} sm={12} lg={6} key={stat.id} className="stagger-entrance">
                <StatCard
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  change={stat.change}
                  changeType={stat.changeType}
                  icon={stat.icon}
                  variant={statVariants[i]}
                />
              </Col>))}
      </Row>

      <Row gutter={[20, 20]}>
        <Col xs={24} lg={16}>
          <div className="glass-border-gradient glass-el-2">
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="panel-title-decor">
                近 7 日订单趋势
                <Tag color="blue" style={{ marginLeft: 'auto' }}>日订单量</Tag>
              </div>
            </div>
            <div style={{ padding: 20 }}>
              {loading ? <Skeleton active paragraph={{ rows: 4 }} /> : <SimpleBarChart data={chartData} />}
            </div>
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <div className="glass-el-2" style={{ height: '100%' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="panel-title-decor">快捷操作</div>
            </div>
            <div style={{ padding: 20 }}><QuickActions items={quickActionItems} /></div>
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: 24 }} className="stagger-entrance">
        <div className="glass-el-2">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="panel-title-decor">近期订单</div>
            <a style={{ fontSize: 13, color: '#2563eb' }}>查看全部 →</a>
          </div>
          <Table
            columns={columns} dataSource={orders} rowKey="id" loading={loading}
            pagination={{ pageSize: 5, size: 'small', showTotal: (total) => `共 ${total} 条` }}
            style={{ margin: 0 }} rowClassName={() => 'dashboard-table-row'}
          />
        </div>
      </div>
    </div>
  )
}
