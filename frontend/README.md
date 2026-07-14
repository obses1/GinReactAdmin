# 如意后台管理系统 (GinReactAdmin)

React 18 + Ant Design 5 + TypeScript + Vite 通用后台管理系统模板。

## 技术栈

- **框架**: React 18 + TypeScript
- **UI 库**: Ant Design 5
- **构建**: Vite 6
- **路由**: React Router 6
- **主题**: 如意国风科技蓝 (玻璃拟态 + 3D 动效 + 渐变边框)

## 快速开始

```bash
cd frontend
npm install
npm run dev        # 开发模式 (http://localhost:3000)
npm run build      # 生产构建
npm run preview    # 预览构建结果
npm run type-check # TypeScript 类型检查
npm run lint       # ESLint 检查
npm run format     # Prettier 格式化
```

## 项目结构

```
src/
├── config/           # 配置 (主题/常量)
│   ├── theme.ts      # Ant Design 主题 Token
│   └── constants.ts  # 布局/分页/API 常量
├── types/            # TypeScript 类型
│   ├── common.ts     # 通用类型
│   ├── api.ts        # API 类型
│   └── dashboard.ts  # 页面类型
├── styles/           # 样式 (按层级拆分)
│   ├── reset.css     # 全局重置 + 滚动条
│   ├── tokens.css    # CSS 自定义属性
│   ├── glassmorphism.css  # 玻璃拟态海拔系统
│   ├── animations.css     # 入场/柱状图/光晕
│   ├── layout.css    # 侧边栏/顶栏
│   ├── components.css # 卡片/表格/按钮
│   └── antd-overrides.css # Ant Design 覆盖
├── hooks/            # 自定义 Hooks
│   ├── useCountUp.ts # 数字缓出计数
│   └── useCard3D.ts  # 卡片 3D 悬浮
├── services/         # API 服务层
│   ├── http.ts       # HTTP 封装
│   ├── dashboard.ts  # 控制台 API
│   └── mock/data.ts  # Mock 数据
├── components/       # 组件 (三层)
│   ├── ui/           # 通用 UI (StatCard)
│   ├── layout/       # 布局 (Sidebar/Topbar/MainLayout)
│   └── business/     # 业务 (SimpleBarChart/QuickActions)
├── pages/            # 页面
│   └── Dashboard/    # 控制台首页
├── router/           # 路由配置
├── utils/            # 工具函数
├── App.tsx           # 根组件
└── main.tsx          # 入口
```

## 添加新页面 (3 步)

### 1. 创建页面组件

```tsx
// src/pages/Orders/index.tsx
export default function Orders() {
  return <div>订单管理</div>
}
```

### 2. 添加路由

```tsx
// src/router/index.tsx
{
  path: 'orders',
  lazy: () => import('../pages/Orders'),
}
```

### 3. 添加菜单项

```tsx
// src/App.tsx 的 menuItems 数组中
{ key: 'orders', icon: <ShoppingCartOutlined />, label: '订单管理' }
```

## Mock → 真实 API 切换

项目默认使用 Mock 数据。切换到真实 API：

```bash
# .env.development
VITE_USE_MOCK=false
VITE_API_BASE_URL=http://localhost:8080/api
```

所有 API 调用通过 `services/dashboard.ts` 统一管理：
- `VITE_USE_MOCK=true` → 使用 `services/mock/data.ts` 的 Mock 数据
- `VITE_USE_MOCK=false` → 调用真实后端接口

## 主题自定义

编辑 `src/config/theme.ts`，修改 Ant Design Token：

```ts
export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#你的主色',
    // ...
  },
}
```

## 布局常量

```ts
// src/config/constants.ts
LAYOUT = {
  sidebarWidth: 220,
  headerHeight: 60,
}
```
