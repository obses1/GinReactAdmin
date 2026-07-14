import type { ThemeConfig } from 'antd'

/** 如意国风科技蓝 — 浅色主题（默认） */
export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#2563eb',
    colorInfo: '#2563eb',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorLink: '#2563eb',
    colorTextBase: '#1e293b',
    colorTextSecondary: '#64748b',
    colorTextTertiary: '#94a3b8',
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
    fontSize: 14,
    colorBgLayout: '#f0f4f8',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    boxShadow: '0 1px 3px hsla(221,35%,10%,0.06)',
    boxShadowSecondary: '0 4px 12px hsla(221,35%,10%,0.08)',
    lineWidth: 1,
    colorBorder: '#e2e8f0',
    colorBorderSecondary: '#f1f5f9',
    controlHeight: 36,
    controlHeightSM: 28,
    controlHeightLG: 44,
  },
  components: {
    Menu: {
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
      rowHoverBg: 'transparent',
      borderColor: '#f1f5f9',
      cellPaddingBlock: 12,
      cellPaddingInline: 20,
    },
    Card: { paddingLG: 20, borderRadiusLG: 12, colorBgContainer: 'transparent' },
    Tag: { borderRadiusSM: 4, defaultBg: '#f1f5f9', defaultColor: '#64748b' },
    Layout: { headerBg: 'transparent', siderBg: 'transparent', bodyBg: 'transparent', triggerBg: 'transparent' },
    Button: { borderRadius: 8, controlHeight: 36, fontWeight: 500 },
    Badge: { colorBgSpotlight: '#ef4444' },
    Skeleton: { colorFill: '#e2e8f0', colorFillContent: '#f1f5f9' },
  },
}

/** 暗色主题 */
export const darkTheme: ThemeConfig = {
  ...lightTheme,
  token: {
    ...lightTheme.token,
    colorBgLayout: '#0f172a',
    colorBgContainer: '#1e293b',
    colorBgElevated: '#1e293b',
    colorTextBase: '#e2e8f0',
    colorTextSecondary: '#94a3b8',
    colorBorder: '#334155',
    colorBorderSecondary: '#1e293b',
  },
}

/** 导出默认主题 */
export const defaultTheme = lightTheme
