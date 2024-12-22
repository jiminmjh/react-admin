import FormUi from '@/components/FormUi'
import { Input, FormInstance } from 'antd'
import request from '@/utils/request'
import { ICaptcha } from '@/types/login'
import { IFormLayout } from '@/types/component'
import { IRef } from '@/types/login'

const formLayout: Partial<IFormLayout> = {
  labelCol: { span: 24 }, // 标签占据8个网格
  wrapperCol: { span: 22 },
  layout: 'vertical'
}

const LoginForm = forwardRef<
  IRef,
  {
    form: FormInstance<{
      username: string
      passwpd: string
    }>
  }
>(({ form }, ref) => {
  const [captchaId, setCaptchaId] = useState<string>('')
  const [html, setHtml] = useState('')
  const refresh = async () => {
    const result: ICaptcha = await request.get<{ captchaId: string; data: string }>('/admin/base/open/captcha', {
      width: 150,
      height: 44,
      color: '#2c3142'
    })
    setHtml(result.data)
    setCaptchaId(result.captchaId)
  }

  useImperativeHandle(ref, () => ({
    refresh,
    captchaId
  }))

  const formList = [
    {
      type: 'input',
      label: '用户名',
      name: 'username',
      placeholder: '请输入用户名'
    },
    {
      type: 'input',
      label: '密码',
      name: 'password',
      placeholder: '请输入密码'
    },
    {
      type: 'slot',
      label: '验证码',
      name: 'verifyCode',
      placeholder: '请输入验证码',
      render: () => (
        <div className='captcha-div'>
          <div className='captcha-input'>
            <Input placeholder='请输入验证码' />
          </div>
          <div className='captcha' onClick={refresh} dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      )
    }
  ].map(e => ({
    ...e,
    required: false,
    validateStatus: '',
    help: '' /* 自定义提示 */,
    rules: [{ required: true, message: e.placeholder }]
  }))

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className='login-form'>
      <FormUi form={form} formList={formList} formLayout={formLayout} colLayout={{ md: 24, lg: 24 }} />
    </div>
  )
})
export default LoginForm
