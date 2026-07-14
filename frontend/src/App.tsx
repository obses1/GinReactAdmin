import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import './App.css'

// 如意国风科技蓝 —— Ant Design 5 主题 Token
const ruyiTheme = {
  token: {
    // 主色
    colorPrimary: '#2563eb',
    colorInfo: '#2563eb',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',

    // 文字
    colorTextBase: '#1e293b',
    colorTextSecondary: '#64748b',

    // 圆角
    borderRadius: 8,
    borderRadiusLG: 12,

    // 字体
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',

    // 布局背景
    colorBgLayout: '#f0f4f8',
    colorBgContainer: '#ffffff',

    // 阴影
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    boxShadowSecondary: '0 4px 6px rgba(0,0,0,0.07)',

    // 侧边栏菜单暗色主题覆盖
    colorBgElevated: '#0f1f3d',
  },
  components: {
    Menu: {
      // 暗色菜单
      darkItemBg: 'transparent',
      darkItemColor: 'rgba(255,255,255,0.65)',
      darkItemHoverColor: '#ffffff',
      darkItemHoverBg: 'rgba(37,99,235,0.15)',
      darkItemSelectedBg: 'linear-gradient(135deg, hsla(221,65%,35%,0.55), hsla(221,40%,18%,0.55))',
      darkItemSelectedColor: '#ffffff',
      darkSubMenuItemBg: 'transparent',

      // 激活指示条通过 CSS 实现（见 App.css）
      itemBorderRadius: 8,
      itemMarginInline: 8,
      itemHeight: 40,
    },
    Table: {
      headerBg: '#f8fafc',
      headerColor: '#64748b',
      rowHoverBg: '#f8fafc',
      borderColor: '#f1f5f9',
    },
    Card: {
      paddingLG: 20,
      borderRadiusLG: 12,
    },
    Tag: {
      borderRadiusSM: 4,
    },
    Layout: {
      headerBg: '#ffffff',
      siderBg: '#0a1628',
    },
  },
}

export default function App() {
  return (
    <ConfigProvider theme={ruyiTheme} locale={zhCN}>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </ConfigProvider>
  )
}