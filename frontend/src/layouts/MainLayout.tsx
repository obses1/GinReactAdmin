import { useState } from 'react'
import { Layout, Menu, Avatar, Dropdown, Badge, theme } from 'antd'
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  BarChartOutlined,
  FileTextOutlined,
  TeamOutlined,
  SafetyOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

const { Header, Sider, Content } = Layout

const menuItems: MenuProps['items'] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: '控制台',
  },
  {
    key: 'orders',
    icon: <ShoppingCartOutlined />,
    label: '订单管理',
  },
  {
    key: 'products',
    icon: <ShopOutlined />,
    label: '商品管理',
  },
  {
    key: 'users',
    icon: <TeamOutlined />,
    label: '用户管理',
  },
  {
    key: 'analytics',
    icon: <BarChartOutlined />,
    label: '数据分析',
  },
  {
    key: 'content',
    icon: <FileTextOutlined />,
    label: '内容管理',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: '系统设置',
  },
  {
    key: 'security',
    icon: <SafetyOutlined />,
    label: '安全中心',
  },
]

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [currentMenu, setCurrentMenu] = useState('dashboard')
  const { token: themeToken } = theme.useToken()

  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', icon: <UserOutlined />, label: '个人中心' },
    { key: 'settings', icon: <SettingOutlined />, label: '系统设置' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', danger: true },
  ]

  return (
    <Layout style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* ======== 侧边栏 ======== */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        style={{
          overflow: 'hidden',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
          background: `
            radial-gradient(ellipse 30% 20% at 85% 12%, rgba(201,164,75,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 55% 40% at 15% 85%, hsl(255,35%,12%) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 65% 25%, hsl(185,25%,10%) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 10% 10%, hsla(221,60%,35%,0.25) 0%, transparent 70%),
            linear-gradient(165deg,
              hsl(221,40%,11%) 0%,
              hsl(221,45%,8%) 30%,
              hsl(221,50%,6%) 65%,
              hsl(221,65%,4%) 100%
            )
          `,
          boxShadow: '2px 0 12px rgba(0,0,0,0.3)',
          borderRight: 'none',
        }}
      >
        {/* Logo */}
        <div
          style={{
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? 0 : '0 20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            gap: 12,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #c9a44b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 18,
              fontWeight: 700,
              flexShrink: 0,
              boxShadow: '0 0 12px rgba(201,164,75,0.2)',
            }}
          >
            如
          </div>
          {!collapsed && (
            <div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 1,
                  background: 'linear-gradient(135deg, #e2e8f0 0%, #93c5fd 50%, #e2c97e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: '20px',
                }}
              >
                如意管理
              </div>
              <div style={{ fontSize: 10, color: '#94a3b8', letterSpacing: 2, opacity: 0.6 }}>
                RUYI ADMIN
              </div>
            </div>
          )}
        </div>

        {/* 菜单 */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentMenu]}
          defaultSelectedKeys={['dashboard']}
          onClick={({ key }) => setCurrentMenu(key)}
          items={menuItems}
          style={{
            background: 'transparent',
            borderRight: 0,
            marginTop: 8,
            padding: '0 4px',
          }}
        />

        {/* 底部用户信息 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: collapsed ? '12px 0' : '12px 16px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: 'linear-gradient(180deg, hsla(221,35%,8%,0.4) 0%, hsla(221,45%,5%,0.6) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: 10,
          }}
        >
          <Avatar
            size={34}
            style={{
              background: 'linear-gradient(135deg, #2563eb, #1e40af)',
              flexShrink: 0,
            }}
          >
            管
          </Avatar>
          {!collapsed && (
            <div>
              <div style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500, lineHeight: '18px' }}>
                管理员
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', opacity: 0.7 }}>
                超级管理员
              </div>
            </div>
          )}
        </div>
      </Sider>

      {/* ======== 右侧区域 ======== */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 220,
          transition: 'margin-left 0.2s',
          height: '100vh',
        }}
      >
        {/* 顶部导航 */}
        <Header
          style={{
            height: 60,
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px hsla(221,30%,15%,0.08)',
            borderBottom: '1px solid hsl(220,15%,88%)',
            position: 'sticky',
            top: 0,
            zIndex: 5,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* 折叠按钮 */}
            <span
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: 18,
                cursor: 'pointer',
                color: '#64748b',
                padding: '4px 6px',
                borderRadius: 4,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f1f5f9'
                e.currentTarget.style.color = '#2563eb'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#64748b'
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
            <span style={{ fontSize: 14, color: '#64748b' }}>
              🏠 首页 › <span style={{ color: '#1e293b', fontWeight: 600 }}>控制台</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Badge count={5} size="small">
              <BellOutlined style={{ fontSize: 18, color: '#64748b', cursor: 'pointer' }} />
            </Badge>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <Avatar size={32} style={{ background: 'linear-gradient(135deg, #2563eb, #1e40af)' }}>
                  管
                </Avatar>
                <span style={{ fontSize: 14, color: '#1e293b' }}>管理员</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* 内容区 */}
        <Content
          style={{
            padding: 24,
            overflowY: 'auto',
            overflowX: 'hidden',
            height: 'calc(100vh - 60px)',
            background: `
              radial-gradient(ellipse 80% 80% at 85% 85%, hsla(221,30%,4%,0.06) 0%, transparent 70%),
              radial-gradient(ellipse 70% 70% at 15% 15%, hsla(221,50%,70%,0.04) 0%, transparent 60%),
              #f0f4f8
            `,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}