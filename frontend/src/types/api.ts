/** API 通用类型 */

export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

export interface ApiError {
  code: number
  message: string
  details?: unknown
}
