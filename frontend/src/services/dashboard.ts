/** 控制台 API 服务 */

import { API } from '../config'
import type { StatCardData, RecentOrder, ChartDataPoint } from '../types/dashboard'
import { mockFetchStats, mockFetchOrders, mockFetchChartData } from './mock/data'

export async function fetchStats(): Promise<StatCardData[]> {
  if (API.useMock) return mockFetchStats()
  // TODO: 替换为真实 API
  // return http.get<ApiResponse<StatCardData[]>>('/dashboard/stats').then(r => r.data)
  throw new Error('Real API not implemented. Set VITE_USE_MOCK=true in .env')
}

export async function fetchOrders(): Promise<RecentOrder[]> {
  if (API.useMock) return mockFetchOrders()
  throw new Error('Real API not implemented.')
}

export async function fetchChartData(): Promise<ChartDataPoint[]> {
  if (API.useMock) return mockFetchChartData()
  throw new Error('Real API not implemented.')
}
