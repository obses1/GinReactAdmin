import { useState } from 'react'
import { Layout } from 'antd'
import { LAYOUT } from '../../config'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import type { SidebarProps } from './Sidebar'
import type { TopbarProps } from './Topbar'

const { Content } = Layout

export interface MainLayoutProps {
  children: React.ReactNode
  menuItems: SidebarProps['menuItems']
  selectedKeys?: string[]
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  topbar?: Partial<TopbarProps>
  sidebar?: Partial<Omit<SidebarProps, 'menuItems' | 'selectedKeys' | 'collapsed' | 'onCollapse'>>
}

export function MainLayout({
  children, menuItems, selectedKeys,
  collapsed: controlledCollapsed, onCollapsedChange,
  topbar, sidebar,
}: MainLayoutProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const isControlled = controlledCollapsed !== undefined
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed

  const handleCollapse = (val: boolean) => {
    if (!isControlled) setInternalCollapsed(val)
    onCollapsedChange?.(val)
  }

  return (
    <Layout style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <div className="floating-orbs">
        <div className="floating-orb floating-orb--blue-1" />
        <div className="floating-orb floating-orb--blue-2" />
        <div className="floating-orb floating-orb--gold" />
        <div className="floating-orb floating-orb--white" />
      </div>

      <Sidebar
        menuItems={menuItems}
        selectedKeys={selectedKeys || ['dashboard']}
        collapsed={collapsed}
        onCollapse={handleCollapse}
        {...sidebar}
      />

      <Layout style={{
        marginLeft: collapsed ? LAYOUT.sidebarCollapsedWidth : LAYOUT.sidebarWidth,
        transition: 'margin-left 0.2s var(--ease-out-expo)',
        height: '100vh', position: 'relative',
      }}>
        <Topbar
          collapsed={collapsed}
          onToggleCollapsed={() => handleCollapse(!collapsed)}
          {...topbar}
        />

        <Content
          className="content-entrance glass-bg-content"
          style={{
            padding: 24, overflowY: 'auto', overflowX: 'hidden',
            height: `calc(100vh - ${LAYOUT.headerHeight}px)`,
            position: 'relative',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
