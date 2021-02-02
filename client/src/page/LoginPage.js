import React from 'react';
import styled from 'styled-components';

import LoginForm from '../components/LoginForm';
import SignUp from '../components/SignUp';

const LoginSignUpWrap = styled.div`
  color: #000;
  max-width: 900px;
  margin: 175px auto 0;

  @media (max-width: 1024px) {
    margin-top: 60px;
  }
`;

function LoginPage() {
  return (
    <LoginSignUpWrap>
      <LoginForm />
      <SignUp />
    </LoginSignUpWrap>
  );
}

export default LoginPage;
