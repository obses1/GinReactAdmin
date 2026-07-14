// ============================================================
// Mock API 数据 —— 后续替换为真实后端接口
// ============================================================

export interface StatCard {
  id: string
  title: string
  value: number
  prefix?: string
  suffix?: string
  change: number
  changeType: 'up' | 'down'
  icon: string
  color: 'blue' | 'gold' | 'green' | 'purple'
}

export interface RecentOrder {
  id: string
  orderNo: string
  customer: string
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  createdAt: string
}

export interface ChartData {
  date: string
  value: number
  type: string
}

// 模拟延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// ---- Mock 统计数据 ----
export const mockStats: StatCard[] = [
  {
    id: '1',
    title: '总用户数',
    value: 12846,
    suffix: '人',
    change: 12.5,
    changeType: 'up',
    icon: '👤',
    color: 'blue',
  },
  {
    id: '2',
    title: '今日订单',
    value: 3421,
    suffix: '笔',
    change: 8.2,
    changeType: 'up',
    icon: '📦',
    color: 'gold',
  },
  {
    id: '3',
    title: '本月营收',
    value: 896500,
    prefix: '¥',
    change: 23.1,
    changeType: 'up',
    icon: '💰',
    color: 'green',
  },
  {
    id: '4',
    title: '转化率',
    value: 3.24,
    suffix: '%',
    change: 0.5,
    changeType: 'down',
    icon: '📈',
    color: 'purple',
  },
]

// ---- Mock 近期订单 ----
export const mockOrders: RecentOrder[] = [
  { id: '1', orderNo: 'ORD-20240714-001', customer: '张三', amount: 1299.00, status: 'completed', createdAt: '2024-07-14 14:30' },
  { id: '2', orderNo: 'ORD-20240714-002', customer: '李四', amount: 2598.00, status: 'processing', createdAt: '2024-07-14 13:15' },
  { id: '3', orderNo: 'ORD-20240714-003', customer: '王五', amount: 499.00, status: 'pending', createdAt: '2024-07-14 12:00' },
  { id: '4', orderNo: 'ORD-20240714-004', customer: '赵六', amount: 3899.00, status: 'completed', createdAt: '2024-07-14 11:20' },
  { id: '5', orderNo: 'ORD-20240714-005', customer: '钱七', amount: 1580.00, status: 'processing', createdAt: '2024-07-14 10:45' },
  { id: '6', orderNo: 'ORD-20240714-006', customer: '孙八', amount: 699.00, status: 'cancelled', createdAt: '2024-07-14 09:30' },
  { id: '7', orderNo: 'ORD-20240714-007', customer: '周九', amount: 2150.00, status: 'completed', createdAt: '2024-07-14 08:15' },
  { id: '8', orderNo: 'ORD-20240714-008', customer: '吴十', amount: 899.00, status: 'pending', createdAt: '2024-07-13 17:00' },
]

// ---- Mock 图表数据（近7天趋势） ----
export const mockChartData: ChartData[] = [
  { date: '07-08', value: 3200, type: '订单量' },
  { date: '07-09', value: 2800, type: '订单量' },
  { date: '07-10', value: 3600, type: '订单量' },
  { date: '07-11', value: 4100, type: '订单量' },
  { date: '07-12', value: 3800, type: '订单量' },
  { date: '07-13', value: 4500, type: '订单量' },
  { date: '07-14', value: 5100, type: '订单量' },
]

// ---- Mock API 函数 ----
export async function fetchStats(): Promise<StatCard[]> {
  await delay(300)
  return mockStats
}

export async function fetchOrders(): Promise<RecentOrder[]> {
  await delay(400)
  return mockOrders
}

export async function fetchChartData(): Promise<ChartData[]> {
  await delay(350)
  return mockChartData
}