import type { ReactNode } from 'React'
import 'axios'

global {
  /* 工具类：鼠标悬浮提示（将多层不显示子类类型展开） */
  type Prettify<T> = {
    [P in keyof T]: T[P]
  }
  type IRoute = {
    path: string
    element: any
    children?: IRoute[]
  }
  // /* 表单校验错误信息 */
  // type IFormError = {
  //   values: {
  //     username: null | string
  //     passwpd: null | string
  //     captcha: null | string
  //   }
  //   errorFields: {
  //     name: string
  //     errors: string
  //     warnings: string
  //   }[]
  //   outOfDate: boolean
  // }
}

/**
 * 给axios添加新的类型
 */
declare module 'axios' {
  interface AxiosRequestConfig {
    toast?: boolean
  }
}

export {}
