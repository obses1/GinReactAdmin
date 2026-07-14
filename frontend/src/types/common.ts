/** 通用类型定义 */

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export interface SelectOption {
  label: string
  value: string | number
}

export type ThemeMode = 'light' | 'dark' | 'guofeng'

export type SizeType = 'small' | 'middle' | 'large'
