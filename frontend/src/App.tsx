
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import './App.css'

// 如意国风科技蓝 v2.0 — Ant Design 5 增强主题 Token
const ruyiTheme = {
  token: {
    // 主色
    colorPrimary: '#2563eb',
    colorInfo: '#2563eb',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',

    // 中国风辅助色
    colorLink: '#2563eb',

    // 文字
    colorTextBase: '#1e293b',
    colorTextSecondary: '#64748b',
    colorTextTertiary: '#94a3b8',

    // 圆角
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,

    // 字体
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    fontSize: 14,

    // 布局背景 (被 glass-bg-content 覆盖)
    colorBgLayout: '#f0f4f8',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',

    // 阴影
    boxShadow: '0 1px 3px hsla(221,35%,10%,0.06)',
    boxShadowSecondary: '0 4px 12px hsla(221,35%,10%,0.08)',

    // 线框
    lineWidth: 1,
    colorBorder: '#e2e8f0',
    colorBorderSecondary: '#f1f5f9',

    // 控制高度
    controlHeight: 36,
    controlHeightSM: 28,
    controlHeightLG: 44,
  },
  components: {
    Menu: {
      // 暗色菜单
      darkItemBg: 'transparent',
      darkItemColor: 'rgba(255,255,255,0.60)',
      darkItemHoverColor: '#ffffff',
      darkItemHoverBg: 'rgba(37,99,235,0.15)',
      darkItemSelectedBg: 'transparent',
      darkItemSelectedColor: '#ffffff',
      darkSubMenuItemBg: 'transparent',
      darkGroupTitleColor: 'rgba(255,255,255,0.30)',

      itemBorderRadius: 8,
      itemMarginInline: 8,
      itemHeight: 40,
      iconSize: 16,
      collapsedIconSize: 18,
    },
    Table: {
      headerBg: '#f8fafc',
      headerColor: '#64748b',
      headerSplitColor: 'transparent',
      rowHoverBg: 'transparent', // 改用 CSS class
      borderColor: '#f1f5f9',
      cellPaddingBlock: 12,
      cellPaddingInline: 20,
    },
    Card: {
      paddingLG: 20,
      borderRadiusLG: 12,
      colorBgContainer: 'transparent', // 让 glass class 生效
    },
    Tag: {
      borderRadiusSM: 4,
      defaultBg: '#f1f5f9',
      defaultColor: '#64748b',
    },
    Layout: {
      headerBg: 'transparent',
      siderBg: 'transparent',
      bodyBg: 'transparent',
      triggerBg: 'transparent',
    },
    Button: {
      borderRadius: 8,
      controlHeight: 36,
      fontWeight: 500,
    },
    Badge: {
      colorBgSpotlight: '#ef4444',
    },
    Skeleton: {
      colorFill: '#e2e8f0',
      colorFillContent: '#f1f5f9',
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
