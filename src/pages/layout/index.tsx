import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import styles from './index.module.less'
import LayoutHeader from './components/LayoutHeader'
import { menuMaxWidth } from '@/comom/readonly'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores'
import { deepTree } from '@/utils'
import { DropboxOutlined } from '@ant-design/icons'
import { IRouteObj } from '@/types/user'
const { Header, Content, Footer, Sider } = Layout

const LayoutPage: React.FC = () => {
  const navigator = useNavigate()
  const [menuList, setMenuList] = useState([])
  const [openPage, setOpenPage] = useState<Partial<IRouteObj>[]>([]) // 打开页面合集
  const [sideWidth, setSideWidth] = useState(menuMaxWidth)
  const activeMenu = useRef<number>(0)

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const { menus } = useSelector((state: RootState) => state.user)

  /*
  * 递归获取菜单 Menu类型 数组
  */
  const getMenuItem = (item) => {
    return item.map(e => {
      const { icon, name, router, children, id } = e
      if (name === '首页' || !e) return
      const obj: any = {
        key: id,
        icon: <DropboxOutlined />,
        label: name,
        router,
        children: children && children.length ? getMenuItem(children) : undefined
      }
      return obj
    })
  }

  const changeMenu = (e) => {
    let obj: any = menus.find(item => e.key == item.id)
    navigator(obj?.router)
    activeMenu.current = obj?.id
    // 是否增加历史纪录标签
    setOpenPage(prev => {
      let arr: Partial<IRouteObj>[] = [...prev]
      const flag = prev.find(e => e.id === obj.id)
      if (flag) {
        arr = arr.map(e => {
          e.active = e.id === flag.id
          return e
        })
      } else {
        arr = arr.map(e => ({ ...e, active: false }));
        (obj = { ...obj, active: true }) && arr.push(obj)
      }
      return arr
    })
  }

  useEffect(() => {
    const menuList = menus.filter(e => e.type != 2)
    const list = deepTree(menuList)
    console.log('menus', getMenuItem(list))
    setMenuList(getMenuItem(list))
    return () => activeMenu.current = null
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
          {sideWidth === menuMaxWidth && <div className={styles.text}>MY-ADMIN</div>}
        </div>
        <Menu className={styles.menu} theme="dark" mode="inline" defaultSelectedKeys={['']} items={menuList}
              expandIcon={sideWidth === menuMaxWidth} // 隐藏下拉箭头
              onClick={changeMenu} />
      </Sider>
      <Layout>
        <Header className={`${styles.header} theme-bg`}>
          <LayoutHeader sideWidth={sideWidth} setSideWidth={setSideWidth} openPage={openPage} setOpenPage={setOpenPage}
                        activeMenu={activeMenu} />
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

export default React.memo(LayoutPage)
