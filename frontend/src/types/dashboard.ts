/** 控制台页面类型 */

export interface StatCardData {
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

export interface ChartDataPoint {
  date: string
  value: number
  type: string
}

export interface QuickAction {
  icon: string
  label: string
  color: string
  onClick?: () => void
}

export type OrderStatus = RecentOrder['status']

export const ORDER_STATUS_MAP: Record<OrderStatus, { color: string; label: string }> = {
  pending: { color: 'processing', label: '待处理' },
  processing: { color: 'blue', label: '处理中' },
  completed: { color: 'success', label: '已完成' },
  cancelled: { color: 'error', label: '已取消' },
}
