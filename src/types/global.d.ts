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
