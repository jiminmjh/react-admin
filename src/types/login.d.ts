import LoginForm from '@/pages/login/components/LoginForm'
export type IRef = {
  refresh: () => void
  captchaId: string
}

export type ICaptcha = {
  captchaId: string
  data: string
}

export type ILoginParams = {
  captchaId: string
  password: string
  username: string
  verifyCode: string
}
