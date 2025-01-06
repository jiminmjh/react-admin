import React, { useState } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import styles from './index.module.less'
import LayoutHeader from './components/LayoutHeader'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores'
import { deepTree } from '@/utils'

const { Header, Content, Footer, Sider } = Layout

const LayoutPage: React.FC = () => {
  const [menuList, setMenuList] = useState([])
  const [sideWidth, setSideWidth] = useState(254)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const { menus } = useSelector((state: RootState) => state.user)

  /*
  * 递归获取菜单 Menu类型 数组
  */
  const getMenuItem = (item) => {
    return item.map(e => {
      const { icon, name, children, id } = e
      if (name === '首页') return
      const obj: any = {
        key: id,
        icon: '',
        label: name,
        children: children && children.length ? getMenuItem(children) : undefined
      }
      return obj
    })
  }

  useEffect(() => {
    const list = deepTree(menus)
    console.log('getMenuItem(list)', getMenuItem(list))

    setMenuList(getMenuItem(list))
  }, [menus])

  return (
    <Layout className={`${styles.main} bg`}>
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
        <Menu className={styles.menu} theme="dark" mode="inline" defaultSelectedKeys={['4']} items={menuList} />
      </Sider>
      <Layout>
        <Header className={`${styles.header} theme-bg`}>
          <LayoutHeader sideWidth={sideWidth} setSideWidth={setSideWidth} />
        </Header>
        <Content className={`${styles.content} bg`}>
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
      </Layout>
    </Layout>
  )
}

export default (LayoutPage)
