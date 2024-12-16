// FormUi M
import React, { useMemo } from 'react'
import { Form, Row, Col, Input, Select, DatePicker, FormInstance } from 'antd'

type IFormProp = {
  formList: IFormList[]
  form: FormInstance
  colLayout: Partial<{ md: { span: number } | number; lg: { span: number } | number }> // 设置单个所占内容块（总24一行）、可以响应式md lg
  formLayout: Partial<IFormLayout> // 设置label和输入框占位比例
  colFormLayout?: Partial<IFormLayout> // 设置label和输入框占位比例
  colOffset?: any
}

type IFormLayout = {
  labelCol: { span?: number; offset?: number }
  wrapperCol: { span?: number; offset?: number }
  layout: 'horizontal' | 'vertical' | 'inline'
}
type IFormList = {
  type: string
  name: string
  label: string
  dictType?: string
  maxLength?: number
  dict?: any[]
  render?: any
  colformLayout?: Partial<IFormLayout>
  rules?: any
  initialValue?: any
  colLayout?: Partial<{ md: { span: number } | number; lg: { span: number } | number }> // 设置单个所占内容块（总24一行）、可以响应式md lg
}

const Option = Select.Option
const TextArea = Input.TextArea
const Item = Form.Item
const FormUi = (props: IFormProp) => {
  const renderItem = (formItem: any) => {
    switch (formItem.type) {
      case 'input':
        return <Input placeholder={formItem.label} allowClear maxLength={formItem.maxLength} {...formItem} />
      case 'select':
        return (
          <Select style={{ width: '100%' }} optionFilterProp='children' placeholder={formItem.label} {...formItem}>
            {useMemo(() => {
              formItem.dictType && formItem.dictType === 'obj'
                ? Object.entries(formItem.dict).map((ele: any) => (
                    <Option value={ele[0]} key={ele[0]}>
                      {ele[1]}
                    </Option>
                  ))
                : formItem.dict?.map((ele: any) => (
                    <Option value={ele.data} key={ele.data}>
                      {ele.label}
                    </Option>
                  ))
            }, [formItem.dict])}
          </Select>
        )
      case 'date':
        return <DatePicker placeholder={formItem.label} style={{ width: '100%' }} {...formItem} />
      case 'text':
        return <TextArea placeholder={formItem.label} maxLength={formItem.maxLength} {...formItem} />
      case 'slot':
        return formItem.render()
      default:
        throw new Error(`${formItem.label} 表单格式异常！！！`)
    }
  }

  const renderForm = (formList = []) => {
    return formList.map((ele: any, index) => {
      return (
        <Col
          {...(ele.colLayout || props.colLayout)}
          // span={ele.colSpan || props.colSpan || 8}
          offset={ele.colOffset}
          key={index}>
          <Item
            key={index}
            name={ele.name}
            label={ele.label}
            initialValue={ele.initialValue ?? null}
            {...((ele.colformLayout ? ele.colformLayout : props.formLayout) ?? {})}>
            {renderItem(ele)}
          </Item>
        </Col>
      )
    })
  }

  return (
    <Form form={props.form} {...props.formLayout}>
      <Row>{renderForm(props.formList as any)}</Row>
    </Form>
  )
}

export default React.memo(FormUi)
