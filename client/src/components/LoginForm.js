import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { loginRequestAction } from '../store/modules/user';

const LoginWrap = styled.div`
  box-sizing: content-box;
  float: left;
  width: 359px;
  max-width: 500px;
  padding-right: 90px;
  border-right: 1px solid #c9c5c5;

  p:nth-child(1) {
    margin-bottom: 10px;
  }

  p:nth-child(2) {
    font-size: 13px;
    margin-bottom: 45px;
  }

  label {
    font-size: 13px;
    margin-bottom: 4px;
  }

  /* antd css */
  .ant-input-affix-wrapper {
    border: 1px solid #000;
    border-radius: 0;
    padding: 5px 15px;
  }
  .ant-form-item {
    margin-bottom: 15px;
  }
  .ant-form-item-control {
    width: 100%;
  }

  .login-form-button {
    width: 100%;
    height: 39px;
    font-size: 12px;
    background: #000;
    border: #000;
    border-radius: 0;
    margin-bottom: 10px;

    &:nth-last-child(1) {
      color: #000;
      background: #f7e14c;
    }
  }

  @media (max-width: 1024px) {
    float: none !important;
    max-width: 500px;
    width: 100%;
    margin: 0px auto 45px;
    padding: 0px 0px 45px;
    border-right: 0px;
    border-bottom: 1px solid #c9c5c5;
  }
`;

function LoginForm() {
  const { me, logInLoading, logInError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log('me, logInLoading, logInError', me, logInLoading, logInError);
  const onFinish = ({ email, password, remember }) => {
    console.log('Received values of form: ', email, password, remember);
    // dispatch({ type: LOG_IN_REQUEST, data: values });
    dispatch(loginRequestAction({ email, password }));
  };

  useEffect(() => {
    setTimeout(() => {
      if (me) {
        if (!alert('로그인이 되었습니다.')) {
          history.push('/');
        }
      }
    }, 1000);
  }, [me, history]);

  return (
    <LoginWrap>
      <p>로그인</p>
      <p>기존 고객님일 경우 아래 로그인을 이용해주세요.</p>

      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item label='Email' colon={false}>
          <Form.Item
            style={{ width: '100%' }}
            name='email'
            rules={[
              {
                required: true,
                message: '이메일을 적어주세요.!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} />
          </Form.Item>
        </Form.Item>

        <Form.Item label='Password' colon={false}>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: '비밀번호를 적어주세요.!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
            />
          </Form.Item>
        </Form.Item>

        <Form.Item name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            className='login-form-button'
            type='primary'
            htmlType='submit'
          >
            로그인
          </Button>

          <Button
            className='login-form-button'
            type='primary'
            htmlType='submit'
          >
            카카오계정 로그인
          </Button>
        </Form.Item>
      </Form>
    </LoginWrap>
  );
}

export default LoginForm;
