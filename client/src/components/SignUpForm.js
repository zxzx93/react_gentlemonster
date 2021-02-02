import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { SIGN_UP_REQUEST } from '../store/modules/user';
// import styled from 'styled-components';
// import useInput from '../../../hooks/useInput';

function SignUpForm() {
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  useEffect(() => {
    if (signUpDone.success) {
      alert(signUpDone.text);
      history.replace('/login');
      history.go(0);
    }
  }, [history, signUpDone]);

  return (
    <>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('이름은 필수사항 입니다.'),
          email: Yup.string()
            .email('이메일 형태로 다시 지정해주세요.')
            .required('이메일은 필수사항 입니다'),
          password: Yup.string()
            .min(8, '비밀번호를 최소 8자 이상으로 지정해주세요.')
            .required('비밀번호는 필수사항 입니다'),
        })}
        onSubmit={async (values) => {
          try {
            await new Promise(() =>
              setTimeout(() => {
                let dataToSubmit = {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                };

                return dispatch({ type: SIGN_UP_REQUEST, data: dataToSubmit });
              }, 500),
            );
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            // dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            // handleReset,
          } = props;

          return (
            <Form onFinish={handleSubmit}>
              <Form.Item label='Name' colon={false} required>
                <Input
                  id='name'
                  placeholder='Enter your name'
                  type='text'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className='input-feedback'>{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item label='E-mail' colon={false} required>
                <Input
                  id='email'
                  placeholder='Enter your email'
                  type='text'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className='input-feedback'>{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label='Password'
                colon={false}
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? 'error' : 'success'
                }
              >
                <Input
                  id='password'
                  placeholder='Enter your password'
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className='input-feedback'>{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item>
                <Button
                  onClick={handleSubmit}
                  htmlType='submit'
                  type='primary'
                  //disabled={isSubmitting} //작업을 사용할 수없는 경우.
                  loading={signUpLoading} //로딩 스피너
                >
                  가입하기
                </Button>
              </Form.Item>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default SignUpForm;
