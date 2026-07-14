import { useEffect, useState, useRef } from 'react'
import { Card, Col, Row, Table, Tag, Typography, Space, Skeleton } from 'antd'
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { fetchStats, fetchOrders, fetchChartData, type StatCard, type RecentOrder, type ChartData } from '../mock/data'

const { Title, Text } = Typography

// 状态标签颜色映射
const statusConfig: Record<string, { color: string; label: string }> = {
  pending: { color: 'processing', label: '待处理' },
  processing: { color: 'blue', label: '处理中' },
  completed: { color: 'success', label: '已完成' },
  cancelled: { color: 'error', label: '已取消' },
}

// 统计卡片的顶部颜色条
const statColorBar: Record<string, string> = {
  blue: 'linear-gradient(90deg, #2563eb, #3b82f6)',
  gold: 'linear-gradient(90deg, #c9a44b, #e2c97e)',
  green: 'linear-gradient(90deg, #10b981, #34d399)',
  purple: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
}

// ---- 数字滚动动画 Hook ----
function useCountUp(target: number, duration = 1500, prefix = '', suffix = '') {
  const [display, setDisplay] = useState('0')
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const start = 0
    const startTime = performance.now()

    const update = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(2, -10 * progress) // ease-out expo
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
            {/* 顶部光泽 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 2,
                right: 2,
                height: '30%',
                borderRadius: '4px 4px 0 0',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.35), transparent)',
                opacity: 0,
                transition: 'opacity 0.3s',
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
      title: '订单编号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 180,
      render: (text) => <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{text}</span>,
    },
    { title: '客户', dataIndex: 'customer', key: 'customer', width: 100 },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      sorter: (a, b) => a.amount - b.amount,
      render: (val) => (
        <span style={{ fontWeight: 600, color: '#1e293b' }}>
          ¥{val.toLocaleString()}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={statusConfig[status]?.color}>{statusConfig[status]?.label}</Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (text) => <span style={{ color: '#94a3b8', fontSize: 13 }}>{text}</span>,
    },
  ]

  return (
    <div>
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
          : stats.map((stat) => (
              <Col xs={24} sm={12} lg={6} key={stat.id}>
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 12,
                    padding: '20px 24px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                    boxShadow: '1px 3px 10px hsla(221,35%,10%,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '2px 8px 24px hsla(221,35%,10%,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = ''
                    e.currentTarget.style.boxShadow = '1px 3px 10px hsla(221,35%,10%,0.06)'
                  }}
                >
                  {/* 顶部颜色条 */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: statColorBar[stat.color],
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '12%',
                      width: 60,
                      height: 3,
                      background: 'hsl(221,85%,62%)',
                      filter: 'blur(2px)',
                      opacity: 0.65,
                    }}
                  />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
                          {stat.title}
                        </div>
                        <StatValue
                          target={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                        />
                      </div>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: `${statColorBar[stat.color].split(',')[0].replace('linear-gradient(90deg,', '')}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 22,
                        }}
                      >
                        {stat.icon}
                      </div>
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                      {stat.changeType === 'up' ? (
                        <ArrowUpOutlined style={{ color: '#10b981', fontSize: 12 }} />
                      ) : (
                        <ArrowDownOutlined style={{ color: '#ef4444', fontSize: 12 }} />
                      )}
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: stat.changeType === 'up' ? '#10b981' : '#ef4444',
                        }}
                      >
                        {stat.change}%
                      </span>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>较昨日</span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
      </Row>

      {/* ======== 图表 + 订单 ======== */}
      <Row gutter={[20, 20]}>
        {/* 趋势图 */}
        <Col xs={24} lg={16}>
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              boxShadow: '1px 3px 10px hsla(221,35%,10%,0.06)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Title level={5} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 3,
                    height: 16,
                    borderRadius: 2,
                    background: 'linear-gradient(180deg, #2563eb, #c9a44b)',
                    boxShadow: '0 0 6px rgba(201,164,75,0.3)',
                  }}
                />
                近 7 日订单趋势
              </Title>
              <Space>
                <Tag color="blue">日订单量</Tag>
              </Space>
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

        {/* 快捷入口 */}
        <Col xs={24} lg={8}>
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              boxShadow: '1px 3px 10px hsla(221,35%,10%,0.06)',
              overflow: 'hidden',
              height: '100%',
            }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              <Title level={5} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 3,
                    height: 16,
                    borderRadius: 2,
                    background: 'linear-gradient(180deg, #2563eb, #c9a44b)',
                    boxShadow: '0 0 6px rgba(201,164,75,0.3)',
                  }}
                />
                快捷操作
              </Title>
            </div>
            <div style={{ padding: 20 }}>
              <Row gutter={[12, 12]}>
                {[
                  { icon: '📦', label: '新建订单', color: '#2563eb' },
                  { icon: '👤', label: '添加用户', color: '#10b981' },
                  { icon: '📊', label: '生成报表', color: '#8b5cf6' },
                  { icon: '⚙️', label: '系统配置', color: '#f59e0b' },
                  { icon: '📝', label: '发布公告', color: '#06b6d4' },
                  { icon: '🔒', label: '安全审计', color: '#ef4444' },
                ].map((item, i) => (
                  <Col span={8} key={i}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                        padding: '16px 8px',
                        borderRadius: 10,
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                        border: '1px solid transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${item.color}08`
                        e.currentTarget.style.borderColor = `${item.color}30`
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = ''
                        e.currentTarget.style.borderColor = 'transparent'
                        e.currentTarget.style.transform = ''
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: `${item.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 20,
                        }}
                      >
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

      {/* ======== 近期订单表格 ======== */}
      <div style={{ marginTop: 24 }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '1px 3px 10px hsla(221,35%,10%,0.06)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Title level={5} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  display: 'inline-block',
                  width: 3,
                  height: 16,
                  borderRadius: 2,
                  background: 'linear-gradient(180deg, #2563eb, #c9a44b)',
                  boxShadow: '0 0 6px rgba(201,164,75,0.3)',
                }}
              />
              近期订单
            </Title>
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

// ---- 统计数值组件 ----
function StatValue({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const display = useCountUp(target, 1500, prefix, suffix)

  return (
    <div
      style={{
        fontSize: 28,
        fontWeight: 700,
        color: '#1e293b',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {display}
    </div>
  )
}