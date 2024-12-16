import FormUi from '@/components/FormUi'
import { FormInstance } from 'antd'

type IFormProp = {
  form: FormInstance<{
    username: string
    passwpd: string
  }>
}

const formLayout: any = {
  labelCol: { span: 10 }, // 标签占据8个网格
  wrapperCol: { span: 14 },
  layout: 'vertical'
}

const LoginForm: React.FC<IFormProp> = ({ form }) => {
  const refresh = () => {}

  const formList = [
    { type: 'input', label: '用户名', name: 'username' },
    { type: 'input', label: '密码', name: 'passwpd' },
    {
      type: 'slot',
      label: '验证码',
      name: 'captcha',
      render: () => <div className='captcha' onClick={refresh} v-html='html'></div>
    }
  ]
  return (
    <div className='main'>
      <FormUi form={form} formList={formList} formLayout={formLayout} colLayout={{ md: 24, lg: 24 }} />
    </div>
  )
}
export default LoginForm
