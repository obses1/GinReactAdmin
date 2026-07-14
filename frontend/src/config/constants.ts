/** 应用常量 */

export const APP_NAME = import.meta.env.VITE_APP_TITLE || '如意后台管理系统'

export const LAYOUT = {
  sidebarWidth: 220,
  sidebarCollapsedWidth: 80,
  headerHeight: 60,
} as const

export const PAGINATION = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
} as const

export const STORAGE_KEYS = {
  theme: 'ruyi-theme',
  sidebarCollapsed: 'ruyi-sidebar-collapsed',
  token: 'ruyi-token',
} as const

export const API = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  useMock: import.meta.env.VITE_USE_MOCK === 'true',
} as const
