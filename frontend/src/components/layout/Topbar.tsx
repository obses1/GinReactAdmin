import { Layout, Badge, Avatar, Dropdown } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { LAYOUT } from '../../config'

const { Header } = Layout

export interface TopbarProps {
  collapsed: boolean
  onToggleCollapsed: () => void
  breadcrumb?: React.ReactNode
  actions?: React.ReactNode
  notifications?: { count?: number }
  userMenuItems?: MenuProps['items']
  userName?: string
  avatar?: React.ReactNode
}

const defaultUserMenuItems: MenuProps['items'] = [
  { key: 'profile', icon: <UserOutlined />, label: '个人中心' },
  { key: 'settings', icon: <SettingOutlined />, label: '系统设置' },
  { type: 'divider' },
  { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', danger: true },
]

export function Topbar({
  collapsed, onToggleCollapsed,
  breadcrumb, actions,
  notifications = { count: 5 },
  userMenuItems = defaultUserMenuItems,
  userName = '管理员',
  avatar,
}: TopbarProps) {
  return (
    <Header
      className="topbar-entrance topbar-glass"
      style={{
        height: LAYOUT.headerHeight, padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 5,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span onClick={onToggleCollapsed} style={{ fontSize: 18, cursor: 'pointer', color: '#64748b', padding: '4px 6px', borderRadius: 4, transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(37,99,235,0.08)'; e.currentTarget.style.color = '#2563eb' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b' }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
        {breadcrumb || (
          <span style={{ fontSize: 14, color: '#64748b' }}>
            🏠 首页 › <span style={{ color: '#1e293b', fontWeight: 600 }}>控制台</span>
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {actions}
        <Badge count={notifications.count} size="small">
          <BellOutlined style={{ fontSize: 18, color: '#64748b', cursor: 'pointer' }} />
        </Badge>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            {avatar || <Avatar size={32} style={{ background: 'linear-gradient(135deg, #2563eb, #1e40af)' }}>管</Avatar>}
            <span style={{ fontSize: 14, color: '#1e293b' }}>{userName}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  )
}
