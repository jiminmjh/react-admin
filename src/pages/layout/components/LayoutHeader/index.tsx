import React, { Dispatch, SetStateAction } from 'react'
import styles from './index.module.less'
import { MenuFoldOutlined } from '@ant-design/icons'
import { Switch } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'

type IHeaderProp = {
  sideWidth: number
  setSideWidth: Dispatch<SetStateAction<number>>
}

const LayoutHeader: React.FC<IHeaderProp> = (props) => {
  const { sideWidth, setSideWidth } = props

  const changeSwitch = (e) => {
    const root = document.getElementById('root')
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
  return (
    <div className={`${styles.content} bg`}>
      {/*导航烂*/}
      <div className={`${styles.nav} theme-bg`}>
        <MenuFoldOutlined onClick={() =>
          sideWidth === 254 ? setSideWidth(48) : setSideWidth(254)
        } />
        <i className="iconfont icon-dark"></i>
        <div className={styles['header-personal']}>
          <Switch
            checkedChildren={<MoonOutlined style={{ fontSize: '8px' }} />}
            unCheckedChildren={<SunOutlined style={{ fontSize: '8px', transform: 'scale(0.8)' }} />}
            onChange={changeSwitch}
          />
        </div>

      </div>
      {/*历史纪录操作栏*/}
      <div className={`theme-bg ${styles.history}`}>历史记录</div>
    </div>
  )
}

export default React.memo(LayoutHeader)


