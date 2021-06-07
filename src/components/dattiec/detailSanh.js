import { Row, Rate, List, Image, Space, Col, Button, Skeleton, Spin, Card } from 'antd';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { renderTien } from '../notification/renderConvert';
import DrawerDatTiec from './drawerDatTiec';
import * as act from "../../redux/actions/index";
import { openNotification } from '../notification/notification';
import { ClockCircleFilled } from '@ant-design/icons';
import moment from 'moment';

function DetailSanh({ match, history }) {

  const { id } = match.params;

  const dispatch = useDispatch();
  const restaurantList = useSelector(state => state.itemEditing);
  const sanhTheoNh = useSelector((state) => state.sanhnhahang);
  const dataAccount = useSelector(state => state.account);
  const itemHall = useSelector((state) => state.hallEditing);
  const dataListService = useSelector(state => state.service.listServices);
  const listBooking = useSelector((state) => state.booking.bookingRestaurant);
  const [visible, setVisible] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [thoiGianDatTiec, setThoiGianDatTiec] = useState();
  const [gioDatTiec, setGioDatTiec] = useState();
  const [idCheck, setIdCheck] = useState();


  function comeBack() {
    history.goBack();
  }

  function showDrawer(id) {
    setVisible(true);
    dispatch(act.actGetSanhRequest(id));
    setIdCheck(id)
  };

  function onSave(value) {

    let titleService = 0;
    let priceService = 0;

    if (listBooking && Array.isArray(listBooking) && listBooking.filter(
      (itemBK) =>
        itemBK.itemHall.id === idCheck &&
        itemBK.dateBook === thoiGianDatTiec &&
        itemBK.timeBook === gioDatTiec
    ).length > 0
    ) {
      openNotification(
        "Thông báo",
        "Khung giờ này đã có người đặt, Mong quý khách thông cảm!"
      );
    } else {
      if (
        dataListService && Array.isArray(dataListService) &&
        dataListService.filter((itemService) => itemService.id === value.serviceId).length > 0
      ) {
        titleService = dataListService.filter((itemService) => itemService.id === value.serviceId)[0].title;
        priceService = dataListService.filter((itemService) => itemService.id === value.serviceId)[0].price;
      }
      value = {
        ...value,
        dateBook: moment(value.dateBook).format("DD-MM-YYYY"),
        itemHall: itemHall,
        titleService: titleService,
        priceService: priceService,
        dataAccount: dataAccount,
      };
      dispatch(act.actCreateDatBanRequest(value));
      setSaveSuccess(!saveSuccess);
    }

  }

  useEffect(() => {
    dispatch(act.actFetchSanhNhaHangRequest(id));
    dispatch(act.actGetRestaurantRequest(id));

  }, [])
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div style={{ background: '#f5f5f5', marginTop: 64 }}>
      {
        dataAccount.checkToken ?
          <>
            <Button style={{ marginTop: '20px', marginLeft: '20px', color: 'black' }} type="primary" onClick={() => comeBack()}>Quay lại</Button>
            <Row >
              <Col span={4}></Col>
              <Col span={10}>
                <iframe style={{ borderRadius: '7px' }} width="100%" height="315" src={restaurantList.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </Col>  &emsp;
              <Col span={7}>
                <div className="row ">
                  <div className="col-md-12 restaurant1">
                    <Image src={restaurantList.img} style={{ width: '100%', height: '160px', borderRadius: '7px' }} />
                  </div>
                  <div className="col-md-12 highlight-restaurant">
                    {Array.isArray(restaurantList.img1) && restaurantList.img1.length > 0 && restaurantList.img1.map((item, index) => {
                      if (item) {
                        return (
                          <Image key={index} src={item} style={{ width: '100%', height: '150px', borderRadius: '7px' }} />
                        )
                      }
                    })}
                  </div>
                </div>
              </Col>
              <Col span={4}></Col>
            </Row>
            <Row>
              <Col span={4}></Col>
              <Col span={10}>
                <Card style={{ marginBottom: '20px', borderRadius: '10px' }}>
                  <div>
                    <div style={{
                      color: 'white',
                      width: '120px',
                      textAlign: 'center',
                      background: '#dc3545',
                      height: '25px',
                      borderRadius: '5px'
                    }}> <i class="fa fa-microchip" aria-hidden="true"></i> MC miễn phí
                    </div>
                    <p style={{ fontSize: '20px', paddingTop: '20px' }}>{restaurantList.restaurantName} &ensp;  <Rate disabled value={restaurantList.rate} /></p>
                    <strong>{restaurantList.address}, {restaurantList.district}, {restaurantList.city} </strong> < br />
                    <strong >Số điện thoại:  {restaurantList.phoneNumber}</strong>
                  </div>
                </Card>
                <Card
                  style={{ borderRadius: '10px' }}
                >
                  <div style={{ display: 'flex', width: '100%', textAlign: 'center', color: 'green' }}>
                    <p style={{ width: '20%' }}><i style={{ color: 'green', fontSize: '18px' }} class="fa fa-beer" aria-hidden="true"></i> <br /> Bia cao cấp</p>
                    <p style={{ width: '20%' }}><i style={{ color: 'green', fontSize: '18px' }} class="fa fa-glass" aria-hidden="true"></i> <br /> Khu bar</p>
                    <p style={{ width: '20%' }}><i style={{ color: 'green', fontSize: '18px' }} class="fa fa-television" aria-hidden="true"></i> <br /> TV chiếu</p>
                    <p style={{ width: '20%' }}><i style={{ color: 'green', fontSize: '18px' }} class="fa fa-phone" aria-hidden="true"></i> <br /> Nhân viên chăm sóc khách hàng </p>
                    <p style={{ width: '20%' }}><i style={{ color: 'green', fontSize: '18px' }} class="fa fa-snowflake-o" aria-hidden="true"></i> <br /> Điều hòa </p>
                  </div>
                </Card>
              </Col> &emsp;
              <Col span={7}>
                <Card style={{ borderRadius: '10px' }}>
                  <p style={{ width: '100%' }}> <i style={{ color: 'green', fontSize: '18px' }} class="fa fa-car" aria-hidden="true"></i> &ensp; Đỗ xe  <span style={{ paddingLeft: '59%' }}>MIỄN PHÍ</span> </p>
                  <div style={{ width: '100%', height: '100%' }}>
                    <hr />
                    <iframe src={restaurantList.map} width="100%" height="222px" style={{ border: '0' }} allowfullscreen="" loading="lazy"></iframe>
                  </div>
                </Card>
              </Col>
              <Col span={3}></Col>
            </Row>
            <Row style={{ background: '#f5f5f5', marginLeft: '17%' }}>
              <Space style={{ width: '86%', background: '#fcced74a', marginTop: '55px' }} >
                <List
                  header={dataAccount.checkToken ? "Mời bạn đặt tiệc tại đây" : ""}
                  style={{ background: '#f5f5f5' }}
                  size="large"
                  bordered
                  dataSource={sanhTheoNh}
                  extra
                  renderItem={item =>
                    <>
                      <Card
                        style={{ background: '#ffc0cb7d', marginBottom: '40px', width: '100%' }}
                      >
                        <div style={{ fontFamily: 'sans-serif', fontSize: '15px' }} >
                          {item.title} <hr />
                        </div>
                        <div style={{ paddingBottom: '40px' }}>

                          <div style={{ color: 'white' }} className=" btn-lg btn-danger   infinite like disabled"
                          ><ClockCircleFilled style={{ paddingRight: '10px' }} /> Ưu đãi: {item.bookNice}
                          </div>
                        </div>
                        <Space>
                          <Row>
                            <Col span={8}>
                              <p>
                                {Array.isArray(item.img) && item.img.length > 0 && item.img.map((item, index) => {
                                  if (item) {
                                    return (
                                      <Image key={index} src={item} style={{ width: '100%', height: '200px' }} />
                                    )
                                  }
                                })}
                              </p>
                            </Col>
                            <Col span={1}>
                            </Col>
                            <Col span={6} style={{ paddingLeft: '20px' }}>
                              <p style={{ fontSize: '19px', fontFamily: 'sans-serif' }}><strong>Tên sảnh: {item.hallName}</strong></p>
                              <p style={{ fontSize: '18px' }}>Sức chứa : {item.quantity}</p>
                              <p style={{ fontSize: '18px' }}>Tầng : {item.floor}</p>
                              <p style={{ fontSize: '18px' }}>View : {item.view}</p>
                              <p style={{ fontSize: '18px' }}>Thuộc Thành Phố : {item.city}</p>
                              <p style={{ fontSize: '18px' }}>Giá / bàn : {renderTien(item.price)}</p>
                            </Col>
                            <Col span={1}>
                            </Col>
                            <Col span={6} style={{ paddingLeft: '20px' }}>
                              <p><strong style={{ fontSize: '20px', fontFamily: 'sans-serif' }}>Tên văn nghệ :</strong></p>
                              <p style={{ fontSize: '18px' }}>Nhảy sexy: Vũ điệu hawai sôi nổi</p>
                              <p style={{ fontSize: '18px' }}>Band nhạc trẻ: Những ca khúc hot</p>
                              <p style={{ fontSize: '18px' }}>Múa quạt: Động tác dẻo dai</p>
                              <p style={{ fontSize: '18px' }}>Múa cổ điển: Đi theo năm tháng</p>
                              <p style={{ fontSize: '18px' }}>Múa nước: Sẽ đẹp hơn khi tại biển</p>
                            </Col>
                            <Col span={2} >
                            </Col>
                          </Row>
                        </Space>
                        <div style={{ textAlign: 'right' }}>
                          <Space>
                            Vui lòng đặt bàn tại Sảnh để được báo giá!
                            <Button
                              type="danger"
                              onClick={() => showDrawer(item.id)}
                            >
                              Đặt bàn
                              </Button>
                          </Space>
                        </div>
                      </Card>
                    </>
                  }
                />
              </Space>
            </Row>
            <DrawerDatTiec
              saveSuccess={saveSuccess}
              visible={visible}
              onClose={onClose}
              onSave={onSave}
              setThoiGianDatTiec={setThoiGianDatTiec}
              setGioDatTiec={setGioDatTiec}
            />
          </>
          :
          <Card title="Mời bạn đăng nhập để đặt tiệc" extra={<Button type="link" onClick={() => comeBack()}><i style={{ fontSize: '40px', color: "#db8080" }} class="fa fa-hand-o-left" aria-hidden="true"></i></Button>}>
            <Skeleton active />
          </Card>
      }
    </div >
  );
}

export default DetailSanh;