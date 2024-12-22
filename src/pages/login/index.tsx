import { Form, Button, message } from 'antd'
import './login.scss'
import LoginForm from './components/LoginForm'
import { login } from '@/stores/user'
import logo from '@/static/logo.png'
import { store } from '@/stores'
import { IRef } from '@/types/login'

function Login() {
  const formRef = useRef<IRef>(null)
  const [form] = Form.useForm()

  const { validateFields } = form
  const submit = async () => {
    try {
      const values = await validateFields()
      const res = await store.dispatch(login({ ...values, captchaId: formRef?.current?.captchaId }))
      if (res.payload) message.success('登录成功')
    } catch (e: any) {
      message.error(e?.errorFields?.[0].errors[0])
    } finally {
      formRef?.current?.refresh()
    }
  }
  return (
    <div className='main'>
      <div className='left-login'></div>

      <div className='right-login'>
        <div className='right-form'>
          <img src={logo} alt='' />
          <LoginForm form={form} ref={formRef} />
          <Button className='submit' type='primary' onClick={submit}>
            登陆
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Login
