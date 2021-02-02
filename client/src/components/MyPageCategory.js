import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Select, Button } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

const MyPageWrap = styled.div`
  max-width: 900px;
  margin: 175px auto 0;

  h3 {
    font-size: 14px;
    font-weight: 800;
    margin-bottom: 30px;
  }
  @media (max-width: 1024px) {
    position: static;
    width: 60%;
    margin: 90px auto 0;
    padding: 0;
    min-width: 768px;
  }
`;

function MyPageCategory(props) {
  const [category, setcategory] = useState('');

  function onChange(category) {
    setcategory(category);
  }
  console.log(category);

  return (
    <MyPageWrap>
      <h3>내 계정</h3>

      <Select
        className='select'
        defaultValue='회원정보'
        showSearch={false}
        onChange={onChange}
        style={{ width: '100%' }}
      >
        <Option value='주문조회'>
          <Link to=''>주문조회</Link>
        </Option>
        <Option value='회원정보'>
          <Link to=''>회원정보</Link>
        </Option>
        <Option value='로그아웃'>
          <Link to=''>로그아웃</Link>
        </Option>
      </Select>
    </MyPageWrap>
  );
}

export default MyPageCategory;
