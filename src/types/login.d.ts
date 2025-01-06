export type IRef = {
  submit: () => void
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
