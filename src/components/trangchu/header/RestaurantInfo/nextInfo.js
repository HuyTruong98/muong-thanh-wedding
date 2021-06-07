import { Row, Col } from 'antd';
import React from 'react';

function NextInfo({ dataListRestaurant }) {
  return dataListRestaurant.map(item => {
    return (
      <>
        <Row>
          <Col span={4}>
            {item.restaurantName}
          </Col>
          <Col span={16}>
            {item.title}
          </Col>
          <Col span={4}>
            {item.gender}
          </Col>
        </Row>
      </>
    );
  })
}

export default NextInfo;