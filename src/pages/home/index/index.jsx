import './index.less'
import Children from './Children.jsx'
import { Form } from 'antd'

const Home = () => {
  const [zhList, setZhList] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    setTimeout(() => setZhList([
      { zhAdd: '11', zhdm: 'aa', id: 1 },
      { zhAdd: '22', zhdm: 'bb', id: 2 },
      { zhAdd: '33', zhdm: 'cc', id: 3 }
    ]), 2000)
  }, [])
  return <div className="subject">
    子路由
    <Children zhList={zhList} setZhList={setZhList} form={form} />
  </div>
}

export default Home


