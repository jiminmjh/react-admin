import { Form, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { login, fetchUserInfo } from '@/stores/user'
import logo from '@/static/logo.png'
import { store } from '@/stores'
import { IRef } from '@/types/login'
import './login.less'

function Login() {
  const [form] = Form.useForm()
  const formRef = useRef<IRef>(null)
  const navigate = useNavigate() // 获取导航函数

  const { validateFields } = form
  const submit = async () => {
    try {
      const values = await validateFields()
      const res = await store.dispatch(login({ ...values, captchaId: formRef?.current?.captchaId }))
      if (res.payload) message.success('登录成功')
      // 登陆成功获取用户信息
      await store.dispatch(fetchUserInfo())
      navigate('/')
    } catch (e: any) {
      message.error(e?.errorFields?.[0].errors[0])
    } finally {
      formRef?.current?.refresh()
    }
  }
  return (
    <div className="main">
      <div className="left-login"></div>

      <div className="right-login">
        <div className="right-form">
          <img src={logo} alt="" />
          <LoginForm form={form} ref={formRef} />
          <Button className="submit" type="primary" onClick={submit}>
            登陆
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
