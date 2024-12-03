// FormUi M
import React from "react";
import { Form, Row, Col, Input, Select, DatePicker } from "antd";

/**
 * prop
      const form = {};
      const formLayout = {};
      const colFormLayout = {};
      const colSpan = {};
      const colOffset = {};
      const name = '';
      const label = '';
      const type = '';
      const maxLength = '';
      const dict = {};
      const render = () => {};
 */

type IFormProp = {
  formList: {
    type: string;
    name: string;
    label: string;
    maxLength?: number;
    dict?: any[];
    render?: any;
  }[];
  form: any;
  formLayout: {
    labelCol: { span?: number; offset?: number };
    wrapperCol: { span?: number; offset?: number };
  };
  colFormLayout?: any;
  colSpan?: any;
  colOffset?: any;
};

const Option = Select.Option;
const TextArea = Input.TextArea;
const Item = Form.Item;
const FormUi = (props: IFormProp) => {
  const renderItem = (formItem: any) => {
    switch (formItem.type) {
      case "input":
        return (
          <Input
            placeholder={formItem.label}
            allowClear
            maxLength={formItem.maxLength}
            {...formItem}
          />
        );
      case "select":
        return (
          <Select
            style={{ width: "100%" }}
            optionFilterProp="children"
            placeholder={formItem.label}
            {...formItem}
          >
            {formItem.dict.map((ele: any) => {
              return (
                <Option value={ele.data} key={ele.data}>
                  {ele.label}
                </Option>
              );
            })}
          </Select>
        );
      case "date":
        return (
          <DatePicker
            placeholder={formItem.label}
            style={{ width: "100%" }}
            {...formItem}
          />
        );
      case "text":
        return (
          <TextArea
            placeholder={formItem.label}
            maxLength={formItem.maxLength}
            {...formItem}
          />
        );
      case "slot":
        return formItem.render();
      default:
        throw new Error(`${formItem.label} 表单格式异常！！！`);
    }
  };

  const renderForm = (formList = []) => {
    return formList.map((ele: any, index) => {
      return (
        <Col
          span={ele.colSpan}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          offset={ele.colOffset}
          key={index}
        >
          <Item
            key={index}
            name={ele.name}
            label={ele.label}
            {...ele.colFormLayout}
            {...props.formLayout}
          >
            {renderItem(ele)}
          </Item>
        </Col>
      );
    });
  };

  return (
    <Form form={props.form} {...props.formLayout}>
      <Row>{renderForm(props.formList as any)}</Row>
    </Form>
  );
};

export default React.memo(FormUi);
