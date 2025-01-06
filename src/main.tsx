import { createRoot } from 'react-dom/client'
import './styles/index.less'
import App from './App.tsx'
import { store, persistor } from '@/stores'
import { Provider } from 'react-redux'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'
/* 清除浏览器默认样式 */
import 'normalize.css'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      {/* PersistGate 确保在恢复状态后再渲染 UI */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ConfigProvider>
)
