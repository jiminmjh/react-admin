import React, { useState } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import styles from './index.module.less'
import LayoutHeader from './components/LayoutHeader'

const { Header, Content, Footer, Sider } = Layout

let items: any = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`
  })
)


const LayoutPage: React.FC = () => {
  const [sideWidth, setSideWidth] = useState(254)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()


  return (
    <Layout className={styles.main}>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        className={styles.sider}
        width={sideWidth}
        onBreakpoint={(broken) => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <div className={styles.logo}>
          <img src="https://show.cool-admin.com/logo.png" alt="" />
          {sideWidth === 254 && <div className={styles.text}>MY-ADMIN</div>}
        </div>
        <Menu className={styles.menu} theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout>
        <Header className={`${styles.header} theme-bg`}>
          <LayoutHeader sideWidth={sideWidth} setSideWidth={setSideWidth} />
        </Header>
        <Content className="theme-bg" style={{
          margin: '10px 10px 0',
          overflowY: 'auto'
        }}>
          <div
            style={{
              minHeight: 36,
              borderRadius: borderRadiusLG
            }}
            className="theme-bg"
          >
            <Outlet /> {/* 子路由渲染位置 */}
          </div>
        </Content>
        {/*<Footer style={{ textAlign: 'center' }}>*/}
        {/*</Footer>*/}
      </Layout>
    </Layout>
  )
}

export default LayoutPage
