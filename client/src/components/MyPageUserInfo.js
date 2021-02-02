import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';

function UserInfo() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <Form
        form={form}
        name='userinfo'
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
        }}
        scrollToFirstError
      >
        <Form.Item
          name='name'
          label={
            <span>
              name&nbsp;
              <Tooltip title='What do you want others to call you?'></Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
          colon={false}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='email'
          label='E-mail'
          colon={false}
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );
}

export default UserInfo;
