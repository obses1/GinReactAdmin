
import { useEffect, useState } from 'react'
import { Card, Col, Row, Table, Tag, Typography, Skeleton } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  fetchStats, fetchOrders, fetchChartData,
  type StatCard, type RecentOrder, type ChartData,
} from '../mock/data'
import GlassStatCard from '../components/GlassStatCard'

const { Title } = Typography

// 状态标签颜色映射
const statusConfig: Record<string, { color: string; label: string }> = {
  pending: { color: 'processing', label: '待处理' },
  processing: { color: 'blue', label: '处理中' },
  completed: { color: 'success', label: '已完成' },
  cancelled: { color: 'error', label: '已取消' },
}

// ---- 简易柱状图组件 ----
function SimpleBarChart({ data }: { data: ChartData[] }) {
  const maxVal = Math.max(...data.map((d) => d.value))

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 200, padding: '16px 0' }}>
      {data.map((item, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            height: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>
            {item.value.toLocaleString()}
          </span>
          <div
            style={{
              width: '100%',
              maxWidth: 40,
              height: `${(item.value / maxVal) * 140}px`,
              borderRadius: '6px 6px 2px 2px',
              background: 'linear-gradient(180deg, #4a90d9 0%, #2d6cc7 100%)',
              position: 'relative',
              transformOrigin: 'bottom center',
              animation: `barRise 0.8s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s both`,
              cursor: 'pointer',
              transition: 'filter 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.15)'
              e.currentTarget.style.boxShadow = '0 0 12px rgba(74,144,217,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <div
              style={{
                position: 'absolute', top: 0, left: 2, right: 2, height: '30%',
                borderRadius: '4px 4px 0 0',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.4), transparent)',
                opacity: 0, transition: 'opacity 0.3s',
              }}
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

export default function Dashboard() {
  const [stats, setStats] = useState<StatCard[]>([])
  const [orders, setOrders] = useState<RecentOrder[]>([])
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchStats(), fetchOrders(), fetchChartData()]).then(
      ([s, o, c]) => {
        setStats(s)
        setOrders(o)
        setChartData(c)
        setLoading(false)
      }
    )
  }, [])

  const columns: ColumnsType<RecentOrder> = [
    {
      title: '订单编号', dataIndex: 'orderNo', key: 'orderNo', width: 180,
      render: (text) => <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{text}</span>,
    },
    { title: '客户', dataIndex: 'customer', key: 'customer', width: 100 },
    {
      title: '金额', dataIndex: 'amount', key: 'amount', width: 120,
      sorter: (a, b) => a.amount - b.amount,
      render: (val) => (
        <span style={{ fontWeight: 600, color: '#1e293b' }}>¥{val.toLocaleString()}</span>
      ),
    },
    {
      title: '状态', dataIndex: 'status', key: 'status', width: 100,
      render: (status: string) => (
        <Tag color={statusConfig[status]?.color}>{statusConfig[status]?.label}</Tag>
      ),
    },
    {
      title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 160,
      render: (text) => <span style={{ color: '#94a3b8', fontSize: 13 }}>{text}</span>,
    },
  ]

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* ======== 统计卡片 ======== */}
      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Col xs={24} sm={12} lg={6} key={i}>
                <Card style={{ height: 130 }}>
                  <Skeleton active paragraph={{ rows: 1 }} />
                </Card>
              </Col>
            ))
          : stats.map((stat, i) => (
              <Col xs={24} sm={12} lg={6} key={stat.id} className="stagger-entrance">
                <GlassStatCard stat={stat} index={i} />
              </Col>
            ))}
      </Row>

      {/* ======== 图表 + 快捷操作 ======== */}
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
              {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
              ) : (
                <SimpleBarChart data={chartData} />
              )}
            </div>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <div className="glass-el-2" style={{ height: '100%' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="panel-title-decor">快捷操作</div>
            </div>
            <div style={{ padding: 20 }}>
              <Row gutter={[12, 12]}>
                {[
                  { icon: '\u{1F4E6}', label: '新建订单', color: '#2563eb' },
                  { icon: '\u{1F464}', label: '添加用户', color: '#10b981' },
                  { icon: '\u{1F4CA}', label: '生成报表', color: '#8b5cf6' },
                  { icon: '\u2699\uFE0F', label: '系统配置', color: '#f59e0b' },
                  { icon: '\u{1F4DD}', label: '发布公告', color: '#06b6d4' },
                  { icon: '\u{1F512}', label: '安全审计', color: '#ef4444' },
                ].map((item, i) => (
                  <Col span={8} key={i}>
                    <div
                      className="glass-el-1"
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        gap: 8, padding: '16px 8px', cursor: 'pointer',
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
                      <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: `${item.color}12`, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: 20,
                      }}>
                        {item.icon}
                      </div>
                      <span style={{ fontSize: 12, color: '#64748b' }}>{item.label}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* ======== 近期订单 ======== */}
      <div style={{ marginTop: 24 }} className="stagger-entrance">
        <div className="glass-el-2">
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div className="panel-title-decor">近期订单</div>
            <a style={{ fontSize: 13, color: '#2563eb' }}>查看全部 →</a>
          </div>
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 5, size: 'small', showTotal: (total) => `共 ${total} 条` }}
            style={{ margin: 0 }}
            rowClassName={() => 'dashboard-table-row'}
          />
        </div>
      </div>
    </div>
  )
}
