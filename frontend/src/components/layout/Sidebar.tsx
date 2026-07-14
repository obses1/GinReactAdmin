import { Layout, Menu, Avatar } from 'antd'
import type { MenuProps } from 'antd'
import { LAYOUT } from '../../config'

const { Sider } = Layout

export interface SidebarProps {
  menuItems: MenuProps['items']
  selectedKeys: string[]
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
  logo?: React.ReactNode
  logoText?: string
  logoSubtitle?: string
  userName?: string
  userRole?: string
  avatar?: React.ReactNode
}

export function Sidebar({
  menuItems, selectedKeys = ['dashboard'], collapsed, onCollapse,
  logo, logoText = '如意管理', logoSubtitle = 'RUYI ADMIN',
  userName = '管理员', userRole = '超级管理员', avatar,
}: SidebarProps) {

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={LAYOUT.sidebarWidth}
      className="sidebar-entrance sidebar-glass"
      style={{
        overflow: 'hidden', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 10,
        background: `
          radial-gradient(ellipse 30% 20% at 85% 12%, rgba(201,164,75,0.08) 0%, transparent 70%),
          radial-gradient(ellipse 55% 40% at 15% 85%, hsl(255,35%,12%) 0%, transparent 65%),
          radial-gradient(ellipse 40% 30% at 65% 25%, hsl(185,25%,10%) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 10% 10%, hsla(221,60%,35%,0.25) 0%, transparent 70%),
          linear-gradient(165deg, hsl(221,40%,11%) 0%, hsl(221,45%,8%) 30%, hsl(221,50%,6%) 65%, hsl(221,65%,4%) 100%)
        `,
        borderRight: 'none',
      }}
    >
      {/* Logo */}
      <div style={{
        height: LAYOUT.headerHeight, display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        padding: collapsed ? 0 : '0 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)', gap: 12, position: 'relative',
      }}>
        {logo || (
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #c9a44b 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 18, fontWeight: 700, flexShrink: 0,
            boxShadow: '0 0 12px rgba(201,164,75,0.2)',
          }}>如</div>
        )}
        {!collapsed && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1,
              background: 'linear-gradient(135deg, #e2e8f0 0%, #93c5fd 50%, #e2c97e 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '20px' }}>
              {logoText}
            </div>
            <div style={{ fontSize: 10, color: '#94a3b8', letterSpacing: 2, opacity: 0.6 }}>{logoSubtitle}</div>
          </div>
        )}
      </div>

      {/* 菜单 */}
      <Menu
        theme="dark" mode="inline"
        selectedKeys={selectedKeys}
        defaultSelectedKeys={['dashboard']}
        onClick={({ key }) => onCollapse(collapsed)}
        items={menuItems}
        style={{ background: 'transparent', borderRight: 0, marginTop: 8, padding: '0 4px' }}
      />

      {/* 底部用户信息 */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: collapsed ? '12px 0' : '12px 16px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'linear-gradient(180deg, hsla(221,35%,8%,0.4) 0%, hsla(221,45%,5%,0.6) 100%)',
        display: 'flex', alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start', gap: 10,
      }}>
        {avatar || <Avatar size={34} style={{ background: 'linear-gradient(135deg, #2563eb, #1e40af)', flexShrink: 0 }}>管</Avatar>}
        {!collapsed && (
          <div>
            <div style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500, lineHeight: '18px' }}>{userName}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', opacity: 0.7 }}>{userRole}</div>
          </div>
        )}
      </div>
    </Sider>
  )
}
