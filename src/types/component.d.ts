/* FormUi组件 */

export type IFormProp = {
  formList: IFormList[]
  form: FormInstance
  colLayout: Partial<{ md: { span: number } | number; lg: { span: number } | number }> // 设置单个所占内容块（总24一行）、可以响应式md lg
  formLayout: Partial<IFormLayout> // 设置label和输入框占位比例
  colFormLayout?: Partial<IFormLayout> // 设置label和输入框占位比例
  colOffset?: any
}

export type IFormLayout = {
  labelCol: { span?: number; offset?: number }
  wrapperCol: { span?: number; offset?: number }
  layout: 'horizontal' | 'vertical' | 'inline'
}
export type IFormList = {
  type: string
  name: string
  label: string
  dictType?: string
  maxLength?: number
  dict?: any[]
  render?: JSX.Element
  colformLayout?: Partial<IFormLayout>
  rules?: any
  initialValue?: any
  colLayout?: Partial<{ md: { span: number } | number; lg: { span: number } | number }> // 设置单个所占内容块（总24一行）、可以响应式md lg
}
