import React from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';

const SignUpWrap = styled.div`
  box-sizing: content-box;
  float: left;
  width: 360px;
  max-width: 500px;
  padding-left: 90px;

  p:nth-child(1) {
    margin-bottom: 10px;
  }

  p:nth-child(2) {
    font-size: 13px;
    margin-bottom: 45px;
  }

  button {
    width: 100%;
    height: 39px;
    background: #000;
    color: #fff;
    font-size: 12px;
  }

  @media (max-width: 1024px) {
    float: none !important;
    width: 100%;
    margin: 0 auto;
    padding: 0;
  }
`;

function SignUp() {
  const { url } = useRouteMatch();

  return (
    <SignUpWrap>
      <p>회원가입</p>
      <p>
        회원가입을 하시면, 주문 조회와 개인정보 관리 및 위시리스트 확인 등
        다양한 혜택을 누리실 수 있습니다.
      </p>

      <Link to={`${url}/signup`}>
        <button>신규가입</button>
      </Link>
    </SignUpWrap>
  );
}

export default SignUp;
