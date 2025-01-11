import React, { Dispatch, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Switch, Avatar, Popover, Flex, Tag } from 'antd'
import { menuMinWidth, menuMaxWidth } from '@/comom/readonly'
import { logout } from '@/stores/user.ts'
import { store } from '@/stores'
import styles from './index.module.less'
import {
  MenuFoldOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
  LeftOutlined,
  RedoOutlined,
  HomeOutlined,
  CloseOutlined
} from '@ant-design/icons'
import { IRouteObj } from '@/types/user'

type IHeaderProp = {
  sideWidth: number
  openPage: Partial<IRouteObj>[]
  setOpenPage: Dispatch<SetStateAction<Partial<IRouteObj>[]>>
  setSideWidth: Dispatch<SetStateAction<number>>
  activeMenu: React.RefObject<number>
}

const LayoutHeader: React.FC<IHeaderProp> = (props) => {
  const { sideWidth, setSideWidth, openPage, setOpenPage, activeMenu } = props
  const [hoveredTag, setHoveredTag] = useState<number>()
  const navigate = useNavigate()
  const root = document.getElementById('root')

  const loginOut = () => {
    store.dispatch(logout())
  }

  const popoverContent = (
    <div>
      <p onClick={() => navigate('/sys/person')}>个人中心</p>
      <p onClick={loginOut}>退出登陆</p>
    </div>
  )

  /*
  * 暗黑模式转换
  */
  const changeSwitch = async (e) => {
    if (e) {
      // 设置主色
      root.style.setProperty('--ant-primary-color', '#2c3142')
      // 设置容器背景
      root.style.setProperty('--ant-bg-color-container', '#2c3142')
      root.style.setProperty('--bg-color', '#2c3142')
    } else {
      root.style.setProperty('--ant-primary-color', '#1677ff')
      root.style.setProperty('--ant-bg-color-container', '#ffffff')
      root.style.setProperty('--bg-color', '#f7f7f7')
    }
  }

  const changeTag = (id: number) => {
    setOpenPage(prev => prev.map(e => {
        e.active = e.id === id
        return e
      })
    )
  }

  return (
    <div className={`${styles.content} bg`}>
      {/*导航烂*/}
      <div className={`${styles.nav} theme-bg`}>
        <MenuFoldOutlined onClick={() =>
          sideWidth === menuMaxWidth ? setSideWidth(menuMinWidth) : setSideWidth(menuMaxWidth)
        } />
        <i className="iconfont icon-dark"></i>
        <div className={styles['header-personal']}>
          <Switch
            className="switch"
            style={{ marginRight: 20 }}
            checkedChildren={<MoonOutlined style={{ fontSize: '8px' }} />}
            unCheckedChildren={<SunOutlined style={{ fontSize: '8px', transform: 'scale(0.8)' }} />}
            onChange={changeSwitch}
          />
          <div>
            <Popover content={popoverContent} trigger="click">
              <span>管理员</span>
              <Avatar style={{ marginLeft: 10 }} shape="square" icon={<UserOutlined />} />
            </Popover>
          </div>
        </div>
      </div>
      {/*历史纪录操作栏*/}
      <div className={`theme-bg ${styles.history}`}>
        <div className={`flex-around ${styles.operate}`}>
          <LeftOutlined />
          <RedoOutlined />
          <HomeOutlined onClick={() => navigate('/')} />
        </div>
        <div className={styles.tag}>
          <Flex gap="4px 0" wrap onMouseLeave={() => setHoveredTag(null)}>
            {
              openPage.map((item: IRouteObj) =>
                <Tag
                  bordered={false}
                  key={item.id}
                  color={(openPage.find(e => e.active) ? item.active : activeMenu?.current === item.id) && '#4165d7'}
                  style={{ width: (item.active || hoveredTag === item.id || activeMenu?.current === item.id) ? 90 : 72 }}
                  onMouseEnter={() => setHoveredTag(item.id)}
                  onClick={() => changeTag(item.id)}>
                  {item.name}
                  {(item.active || hoveredTag) && (
                    <CloseOutlined
                      className="close-icon"
                      onClick={() => setOpenPage(arr => arr.filter(e => e.id !== item.id))}
                    />)}
                </Tag>
              )
            }
          </Flex>
        </div>
      </div>
    </div>
  )
}

export default React.memo(LayoutHeader)


