import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import './index.less'

export default function Loading() {
  return (
    <div className="loading flex-center">
      <div className="text">
        <div className="logo">COOL-ADMIN</div>
        <div className="circle flex-center">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
        <div className="porceed">正在加载资源...</div>
      </div>
    </div>
  )
}
