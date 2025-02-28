import React, { Dispatch, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Switch, Avatar, Popover, Flex, Tag } from 'antd'
import { menuMinWidth, menuMaxWidth } from '@/comom/readonly'
import { logout, setTags } from '@/stores/user.ts'
import { RootState, store } from '@/stores'
import styles from './index.module.less'
import { useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import _ from 'lodash'
import { List } from 'immutable'
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
  activeMenu: React.RefObject<number>
  historyList: React.RefObject<number[]>
  menuList: unknown
}

const LayoutHeader: React.FC<IHeaderProp> = (props) => {
  const { sideWidth, setSideWidth, activeMenu, historyList, menuList } = props
  const [hoveredTag, setHoveredTag] = useState<number>() //当前鼠标放在的标签id
  const [names, setNames] = useState<string[]>([]) // 当前菜单嵌套名
  const navigate = useNavigate()
  const root = document.getElementById('root')
  const { tags } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    /**
     * 推荐使用antd tab组件
     * 因为antd tab组件有内置的滚动事件，可以直接使用
     * 这里是自己实现的滚动事件，有点麻烦
     * 但是antd tab组件的滚动事件有点问题
     */
    const tabsContainer = document.querySelector('#tag')
    const tabsWrapper = document.querySelector('.ant-flex')

    tabsContainer.addEventListener('wheel', _.throttle(event => {
      event.preventDefault() // 禁用浏览器的默认滚轮事件
      const maxScrollLeft = (tabsWrapper.scrollWidth + 269) - tabsContainer.clientWidth
      // 判断是否滚动到边界
      if (event.deltaY > 0 && tabsWrapper.scrollLeft >= maxScrollLeft) {
        console.log('已经到最右边')
      } else if (event.deltaY < 0 && tabsWrapper.scrollLeft <= 0) {
        // console.log('已经到最左边', tabsWrapper.scrollLeft)
      } else {
        console.log('event.deltaY ', event.deltaY)
        tabsWrapper.scrollLeft += event.deltaY
      }
    }, 60), { passive: false })
  }, [])

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
    const obj = { id: 999, router: '/sys/person', name: '个人中心' }
    const arr = getClickMenuTags(tags, obj)
    historyList.current?.push(obj.id)
    navigate('/sys/person')
    store.dispatch(setTags(arr))
  }

  const renderPopover = (
    <div>
      <p onClick={handleUser}>个人中心</p>
      <p onClick={loginOut}>退出登陆</p>
    </div>
  )

  /*
  * tag便签切换
  *  - 点击 传item
  *  - 回退 传id
  * */
  const changeTag = (item?: IRouteObj, id?: number) => {
    if (!item && !id) return
    if (item) historyList.current?.push(item?.id)
    let ids = id ? id : item?.id
    let arr = cloneDeep(tags)
    // 改变 active 控制高亮项
    arr = arr.map(e => {
      e.active = e.id === ids
      return e
    })
    console.log('arr', arr)
    store.dispatch(setTags(arr))
    hoveredTag && setHoveredTag(undefined)
    const route = item ? item.router : tags.find(item => item.id === ids).router
    navigate(route);
    (activeMenu.current as any) = id ?? item.id
  }

  useEffect(() => {
    console.log('activeMenu', activeMenu)
  }, [activeMenu.current])

  /*
  *  导航标签回退
  */
  const back = () => {
    const arr = cloneDeep(historyList.current) ?? []
    const len = arr.length - 1
    if (len === -1) return
    const r = arr.splice(-1, 1)
    console.log('r', r);
    (historyList.current as any) = arr
    changeTag(undefined, len ? arr.findLast((e) => e) : r[0])
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
        // 删除当前元素历史纪录
        ;(historyList.current as any) = historyList.current.filter(e => e !== item.id)
        // let arr = cloneDeep(tags)
        let arr = List(tags).toJS()
        if (arr.length === 1) {
          store.dispatch(setTags([]))
          navigate('/')
          return
        }
        // 删除之后自动高亮下一个标签 - 如果是最后就高亮前一个
        const currentIndex = arr.findIndex(e => e.id === item.id)
        // 只有当前删除的是高亮元素，才执行。 否则会导致重复高亮
        if (arr[currentIndex].active) {
          const nextIndex = currentIndex + 1
          const prevIndex = currentIndex - 1
          const obj = arr.length === nextIndex ? arr[prevIndex] : arr[nextIndex]
          obj.active = true
          navigate(obj?.router)
        }
        arr = arr.filter(e => e.id !== item.id)
        store.dispatch(setTags(arr))
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

  const getMenuListNames = (data) => {
    setNames([])  // 清空 names 数组
    return data.find(e => {
      if (!e || !e.key) return false
      const flag = e.key === activeMenu.current
      if (flag) {
        setNames(prev => [e.label, ...prev])
        return true
      } else {
        // 递归调用，确保返回值正确
        if (e.children) {
          names.push(e.label)
          setNames(prev => [...prev, e.label])
          const result = getMenuListNames(e.children)
          if (result) {
            setNames(prev => [e.label, ...prev])
            return true
          }  // 如果递归找到，返回结果
        }
      }
      return false  // 如果没有找到匹配的项，返回 false
    })
  }

  useEffect(() => {
    getMenuListNames(menuList)
  }, [activeMenu.current])

  useEffect(() => {
    console.log('names', names)
  }, [names])

  return (
    <div className={`${styles.content} bg`}>
      {/*导航烂*/}
      <div className={`${styles.nav} theme-bg`}>
        <div className="flex-center">
          <MenuFoldOutlined onClick={() =>
            sideWidth === menuMaxWidth ? setSideWidth(menuMinWidth) : setSideWidth(menuMaxWidth)
          } />
          {
            names.map((e, i) => {
              return (
                <>
                  <span style={{ marginLeft: 10 }}>{e} </span>
                  {
                    i != names.length - 1 ? (<span style={{ marginLeft: 10 }}>
                    {'>'}
                    </span>) : ''
                  }
                </>

              )
            })
          }
        </div>
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
          <LeftOutlined onClick={back} />
          <RedoOutlined />
          <HomeOutlined onClick={() => navigate('/')} />
        </div>
        <div className={styles.tag} id="tag">
          <Flex gap="4px 0" wrap className={styles.flex}>
            {renderTag}
          </Flex>
        </div>
      </div>
    </div>
  )
}

export default React.memo(LayoutHeader)


