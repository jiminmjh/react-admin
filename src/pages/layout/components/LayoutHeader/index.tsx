import React, { Dispatch, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Switch, Avatar, Popover, Flex, Tag } from 'antd'
import { menuMinWidth, menuMaxWidth } from '@/comom/readonly'
import { logout, setTags } from '@/stores/user.ts'
import { RootState, store } from '@/stores'
import styles from './index.module.less'
import { useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
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
import { getClickMenuTags } from '@/utils'

type IHeaderProp = {
  sideWidth: number
  setSideWidth: Dispatch<SetStateAction<number>>
  activeMenu: any//保存上一次点击菜单标签
}

const LayoutHeader: React.FC<IHeaderProp> = (props) => {
  const { sideWidth, setSideWidth, activeMenu } = props
  const [hoveredTag, setHoveredTag] = useState<number>() //当前鼠标放在的标签id
  const navigate = useNavigate()
  const root = document.getElementById('root')
  const { tags } = useSelector((state: RootState) => state.user)

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

  const loginOut = () => store.dispatch(logout())

  const handleUser = () => {
    navigate('/sys/person')
    const obj = { id: 999, router: '/sys/person', name: '个人中心' }
    const arr = getClickMenuTags(tags, obj)
    store.dispatch(setTags(arr))
  }

  const renderPopover = (
    <div>
      <p onClick={handleUser}>个人中心</p>
      <p onClick={loginOut}>退出登陆</p>
    </div>
  )

  const changeTag = (item: IRouteObj) => {
    activeMenu.current = null
    let arr = cloneDeep(tags)
    arr = arr.map(e => {
      e.active = e.id === item.id
      return e
    })
    store.dispatch(setTags(arr))
    hoveredTag && setHoveredTag(undefined)
    navigate(item.router)
  }

  const renderTag = useMemo(() => {
    return tags.map((item: IRouteObj) => {
      const isActive = activeMenu?.current === item.id || item.active
      const isHovered = hoveredTag === item.id

      // 提取动态样式
      const tagStyle = {
        width: isActive || isHovered ? 100 : 72,
        color: item.active ? '#fff' : '#67696d'
      }

      // 提取颜色判断逻辑
      const tagColor = (tags.find(e => e.active) ? item.active : activeMenu?.current === item.id)
        ? '#4165d7'
        : undefined

      // 事件处理函数
      const handleMouseEnter = () => item.id !== hoveredTag && setHoveredTag(item.id)

      // 点击标签
      const handleTagClick = () => changeTag(item)

      // 删除标签
      const handleCloseClick = (e: React.MouseEvent) => {
        e.stopPropagation() // 阻止冒泡，避免触发父级 onClick
        store.dispatch(setTags(tags.filter(e => e.id !== item.id)))
      }

      return (
        <Tag
          bordered={false}
          key={item.id}
          color={tagColor}
          style={tagStyle}
          onMouseEnter={handleMouseEnter}
          onClick={handleTagClick}
        >
          {item.name}
          {(isHovered || isActive) ? (
            <CloseOutlined
              className="close-icon"
              onClick={handleCloseClick}
            />
          ) : null}
        </Tag>
      )
    })
  }, [hoveredTag, activeMenu.current, tags])

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
            <Popover content={renderPopover} trigger="click">
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
          <Flex gap="4px 0" wrap>
            {renderTag}
          </Flex>
        </div>
      </div>
    </div>
  )
}

export default React.memo(LayoutHeader)


