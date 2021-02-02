import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'antd';
import 'antd/dist/antd.css';

const { Meta } = Card;

function Product({ product }) {
  console.log(product);
  return (
    <>
      <Link to={`/product/${product._id}`}>
        <Card
          bordered={false}
          hoverable={false}
          style={{ width: '100%' }}
          cover={
            <img
              alt={product.name}
              src={product.image}
              style={{ width: '100%', height: '300px' }}
            />
          }
        >
          <Meta title={product.name} description={<p>{product.price} 원</p>} />
        </Card>
      </Link>
    </>
  );
}

export default Product;
