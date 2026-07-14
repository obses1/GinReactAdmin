import { useState } from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { Outlet } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { defaultTheme } from './config'
import {
  DashboardOutlined, ShoppingCartOutlined, UserOutlined,
  ShopOutlined, BarChartOutlined, FileTextOutlined,
  SettingOutlined, TeamOutlined, SafetyOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

import './styles/reset.css'
import './styles/tokens.css'
import './styles/glassmorphism.css'
import './styles/animations.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/antd-overrides.css'

const menuItems: MenuProps['items'] = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: '控制台' },
  { key: 'orders', icon: <ShoppingCartOutlined />, label: '订单管理' },
  { key: 'products', icon: <ShopOutlined />, label: '商品管理' },
  { key: 'users', icon: <TeamOutlined />, label: '用户管理' },
  { key: 'analytics', icon: <BarChartOutlined />, label: '数据分析' },
  { key: 'content', icon: <FileTextOutlined />, label: '内容管理' },
  { key: 'settings', icon: <SettingOutlined />, label: '系统设置' },
  { key: 'security', icon: <SafetyOutlined />, label: '安全中心' },
]

export default function App() {
  const [selectedKeys] = useState<string[]>(['dashboard'])

  return (
    <ConfigProvider theme={defaultTheme} locale={zhCN}>
      <MainLayout menuItems={menuItems} selectedKeys={selectedKeys}>
        <Outlet />
      </MainLayout>
    </ConfigProvider>
  )
}
