import { createRoot } from 'react-dom/client'
import './styles/index.less'
import App from './App.tsx'
import { store } from './stores'
import { Provider } from 'react-redux'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'
/* 清除浏览器默认样式 */
import 'normalize.css'

createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
)
