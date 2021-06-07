import { Row, Col, Divider, List, Descriptions, Button, Image, Space, Rate, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment"
import * as act from "../../redux/actions/index";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

function PageDatTiec2() {
  const dispatch = useDispatch();
  const listLocations = useSelector((state) => state.location.listLocation);
  const restaurantList = useSelector((state) => state.restaurant);
  const [dataNhaHang, setDataNhaHang] = useState();
  const [searchKey, setSearchKey] = useState('');

  const filterRestaurant = restaurantList.filter((item) => {
    return item.restaurantName.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1;
  });


  const handleOnChangeTheoNH = (id) => {
    dispatch(act.actGetRestaurantRequest(id));
    setDataNhaHang(restaurantList.filter(itemNH => itemNH.locationId === id));
  }

  const onShowNhaHang = (id) => {
    dispatch(act.actGetRestaurantRequest(id));
  }

  // const onShowSanhTheoNhaHang = (id) => {
  //   setVisibleNhaHang(true);
  //   dispatch(act.actFetchSanhNhaHangRequest(id));
  // }

  const renderDate = () => {
    return <>{moment().format("DD/MM/YYYY")}</>;
  }


  useEffect(() => {
    dispatch(act.actFetchLocationRequest());
    dispatch(act.actFetchRestaurantRequest());
    dispatch(act.actFetchTatCaSanhRequest());
  }, [])
  return (
    <>
      {/* {visibleNhaHang ?
        (
          <DetailSanh setVisibleNhaHang={setVisibleNhaHang} />
        ) :
        ( */}
      <div style={{ marginTop: 54, background: '#f5f5f5' }}>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ fontSize: '25px', width: '25%', paddingTop: '20px' }}>Mời bạn đặt tiệc:</div>

          <div style={{ width: '40%', paddingTop: '24px' }}>
            <Input.Search placeholder="Tìm nhà hàng..."
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
        </div>
        <div className="restaurant-list-container">

          <Row gutter={16}>
            <Col span={5} style={{ height: '1600px', background: '#f5f5f5' }}>
              <Divider orientation="left">Địa điểm:</Divider>
              <List
                style={{ background: '#ffc0cb7d' }}
                bordered
                dataSource={[
                  ...listLocations
                ]}
                renderItem={item =>
                  <List.Item
                    style={{ justifyContent: 'center', border: '2px solid #b29797', cursor: 'pointer' }}
                    onClick={() => handleOnChangeTheoNH(item.id)}
                  >
                    {item.city}
                  </List.Item>
                }
              />
            </Col>
            <Col span={19}>
              <Divider orientation="left">Danh sách nhà hàng theo địa điểm:</Divider>
              <List
                style={{ background: '#e7dbde85' }}
                size="large"
                bordered
                dataSource={dataNhaHang && dataNhaHang.length > 0 ? dataNhaHang : filterRestaurant}
                renderItem={item =>
                  <>
                    <Descriptions
                      style={{ background: '#ffc0cb7d', marginBottom: '40px' }}
                      bordered
                    >
                      <Space>
                        <Row>
                          <Col span={10}>
                            <Image src={item.img} style={{ width: '100%', height: '100%' }} />
                          </Col>
                          <Col span={1}>
                          </Col>
                          <Col span={11}>
                            <p style={{ fontSize: '20px', fontFamily: 'sans-serif' }}>{item.restaurantName}</p>
                            <p>Tiêu chuẩn nhà hàng :  &ensp;<Rate disabled defaultValue={5} /></p>
                            <p>Số điện thoại : {item.phoneNumber}</p>
                            <p>Địa chỉ : {item.address} - {item.district}</p>
                            <p>Thành phố: {item.city}</p>
                            <p>Ngày thành lập: {renderDate(item.date)}</p>
                          </Col>
                          <Col span={2}>
                            {/* {renderDetail()} */}
                            <NavLink className="btn btn-danger"
                              style={{
                                textDecoration: 'none',
                                color: 'white',
                                background: '#dc3545',
                                borderRadius: '5px',
                              }}
                              to={{
                                pathname: `/booking/${item.id}`,
                                id: item.id
                              }}
                            >
                              Chi tiết
                              </NavLink>
                          </Col>
                        </Row>
                      </Space>
                    </Descriptions>
                  </>
                }
              />
            </Col>
          </Row>
        </div>
      </div>
      {/* )
      } */}

    </>
  );
}

export default PageDatTiec2;