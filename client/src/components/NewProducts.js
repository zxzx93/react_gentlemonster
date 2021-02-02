import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import Product from './Product';
import products from '../products';

const NewProductWrap = styled.div`
  margin: 0 3%;
  // position: absolute;

  h2 {
    font-size: 17px;
    font-weight: 700;
  }

  .ant-card-body {
    padding: 24px 15px 24px;
  }
`;

function NewProducts() {
  return (
    <>
      <NewProductWrap>
        <h2>NEW SUNGLASS</h2>

        <Row gutter={[4, 40]} justify='start'>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={8} lg={6} xl={6}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </NewProductWrap>
    </>
  );
}

export default NewProducts;
