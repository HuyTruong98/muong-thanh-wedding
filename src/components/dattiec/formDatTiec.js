import React, { useEffect, useState } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Image, Descriptions, Badge,
  Skeleton, Spin, Card
} from "antd";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import * as act from '../../redux/actions/index';
import { useForm } from "antd/lib/form/Form";
import { openNotification } from '../../components/notification/notification';

const { Option } = Select;
function FormDatTiec({ visible, handleCloseDrawer, onSave, setCheckDatTiec, saveSuccess }) {
  const dataListRestaurant = useSelector((state) => state.restaurant);
  const dsSanhNhaHang = useSelector((state) => state.hallList);
  const itemSanh = useSelector((state) => state.hallEditing);
  const dataAccount = useSelector((state) => state.account);
  const listBooking = useSelector((state) => state.booking.bookingRestaurant);
  const allServices = useSelector((state) => state.service.listServices);
  const itemService = useSelector((state) => state.service.editService);

  const dispatch = useDispatch()
  const [form] = useForm();
  const [dataSanh, setDataSanh] = useState([]);
  const [thoiGianDatTiec, setThoiGianDatTiec] = useState();
  const [gioDatTiec, setGioDatTiec] = useState();
  const [soBan, setSoBan] = useState();

  let totalMoney = 0;
  if (itemSanh.price && itemService.price && itemSanh.quantity) {
    totalMoney = ((itemSanh.price * soBan) + itemService.price)
  }

  let totalPercent = 0;
  if (itemSanh.price && itemService.price && itemSanh.quantity) {
    totalPercent = totalMoney - (totalMoney * 0.9)
  }

  function changeSanhTheoCity(value) {
    dispatch(act.actGetRestaurantRequest(value));
    setDataSanh(dsSanhNhaHang.filter(item => item.idRestaurant === value));
  }

  const numberOgTableChange = (e) => {
    setSoBan(e.target.value);
  }

  const showDetailSanh = (value) => {
    dispatch(act.actGetSanhRequest(value));
    if (
      listBooking &&
      Array.isArray(listBooking) && listBooking.filter(
        (itemBK) =>
          itemBK.hallListId === value &&
          itemBK.dateBook === thoiGianDatTiec &&
          itemBK.timeBook === gioDatTiec
      ).length > 0
    ) {
      openNotification(
        "Th??ng b??o",
        "Khung gi??? n??y ???? c?? ng?????i ?????t, Mong qu?? kh??ch th??ng c???m!"
      );
      setCheckDatTiec(true);
    } else {
      setCheckDatTiec(false);
    }
  };

  const onChangeData = (value) => {
    setThoiGianDatTiec(moment(value).format("DD-MM-YYYY"));
  };

  const onChangeGioToChuc = (value) => {
    setGioDatTiec(value);
  }

  function onChangeService(value) {
    dispatch(act.actGetEditServicesRequest(value));
  }

  const renderTien = (value) => {
    return (
      <>
        {` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + "vn??"}
      </>
    )
  }

  useEffect(() => {
    form.resetFields();
  }, [saveSuccess])

  const dateFormat = 'DD/MM/YYYY';
  return (
    <>
      <div className="site-drawer-render-in-current-wrapper">
        <Drawer
          title={dataAccount.checkToken ? "M???i b???n ?????t ti???c t???i ????y" : "M???i b???n ????ng nh???p ????? ?????t ti???c"}
          placement="right"
          width="60%"
          onClose={handleCloseDrawer}
          visible={visible}
          getContainer={false}
          zIndex={1}
          footer={
            <div
              style={{
                textAlign: "right",
              }}
            >
              {dataAccount.checkToken ?
                <Button onClick={() => form.submit()} type="primary">
                  ?????t ti???c
                </Button> :
                "Ph???i ????ng k?? m???i ?????t ???????c nha!"
              }
              <Button
                onClick={handleCloseDrawer}
                type="danger"
                style={{ marginLeft: 10 }}
              >
                H???y
              </Button>
            </div>
          }
        >
          {dataAccount.checkToken
            ?
            <Form layout="vertical" form={form} onFinish={onSave}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="numberOfTable"
                    label="S??? l?????ng b??n"
                    rules={[{
                      required: true,
                    }]}
                  >
                    <Input
                      style={{ width: "100%" }}
                      placeholder="Nh???p s??? l?????ng b??n"
                      onChange={numberOgTableChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="idRestaurant"
                    label="?????a ??i???m nh?? h??ng"
                    rules={[
                      { required: true, message: "Vui l??ng ch???n nh?? h??ng!" },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Vui l??ng ch???n Th??nh Ph???!"
                      onChange={changeSanhTheoCity}
                    >
                      {dataListRestaurant.map((item, index) => (
                        <Option key={index + item.id} value={item.id} >
                          {item.city}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Ng??y t??? ch???c"
                    name="dateBook"
                    hasFeedback
                    validateStatus="success"
                    rules={[{ required: true, message: "Vui l??ng ch???n ng??y!" }]}

                  >
                    <DatePicker onChange={onChangeData} style={{ width: "100%" }} format={dateFormat} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="timeBook"
                    label="Gi??? t??? ch???c"
                    rules={[{ required: true, message: "Vui l??ng ch???n gi???!" }]}
                  >
                    <Select placeholder="Vui l??ng ch???n gi???" onChange={onChangeGioToChuc}>
                      <Option value="10:00 - 14:00">10:00 - 14:00</Option>
                      <Option value="16:00 - 20:00">16:00 - 20:00</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="idEmployee"
                    label="Nh??n vi??n"
                    rules={[{ required: true, message: "Vui l??ng ch???n nh??n vi??n!" }]}
                  >
                    <Select placeholder="Vui l??ng ch???n nh??n vi??n">
                      <Option value="13">
                        Nguy???n Tuy???t Nhi
                    </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="serviceId"
                    label="Ti???t m???c v??n ngh???"
                    rules={[{ required: true, message: "Vui l??ng ch???n ti???t m???c v??n ngh???!" }]}
                  >
                    <Select
                      placeholder="Vui l??ng ch???n ti???t m???c v??n ngh??"
                      onChange={onChangeService}
                    >
                      {
                        allServices.map((item, index) => (
                          <Option key={index} value={item.id} >
                            {item.title}
                          </Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="phoneCustomer"
                    label="S??? ??i???n tho???i"
                    rules={[{ required: true, message: "Vui l??ng nh???p s??? ??i???n tho???i!" }]}
                  >
                    <Input placeholder="Nh???p s??? ??i???n tho???i." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="hallListId"
                    label="S???nh"
                    rules={[{ required: true, message: "Vui l??ng ch???n s???nh!" }]}
                  >
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Ch???n S???nh v?? view t???i ????y"
                      onChange={showDetailSanh}
                    >
                      {
                        dataSanh.map((item, index) => (
                          <Option key={index} value={item.id} >
                            {item.hallName}
                          </Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Descriptions title="Th??ng tin v??? S???nh" bordered>
                    <Descriptions.Item label="T??n s???nh">{itemSanh.hallName && itemSanh.hallName}</Descriptions.Item>
                    <Descriptions.Item label="S???c ch???a">{itemSanh.quantity && itemSanh.quantity} ng?????i / s???nh</Descriptions.Item>
                    <Descriptions.Item label="Thu???c t???ng">{itemSanh.floor && itemSanh.floor}</Descriptions.Item>
                    <Descriptions.Item label="Gi?? / B??n">{itemSanh.price && renderTien(itemSanh.price)}</Descriptions.Item>
                    <Descriptions.Item label="View" span={3}>
                      <Badge status="processing" text="T??? Ch???c t???i:" style={{ paddingRight: "10px" }} />
                      {itemSanh.view && itemSanh.view}
                    </Descriptions.Item>

                    <Descriptions.Item style={{ textAlign: 'center' }} label="???nh gi???i thi???u">
                      <Badge status="processing" text="???nh d?????i thi???u v??? S???nh" />

                      <br />
                      {Array.isArray(itemSanh.img) && itemSanh.img.length > 0 && itemSanh.img.map((item, index) => {
                        if (item) {
                          return (
                            <Image key={index} src={item} style={{ width: '100%', height: '300px' }} />
                          )
                        }
                      })}
                      <br />

                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>

              {/* Thanh to??n */}
              <Row gutter={16} style={{ paddingTop: '40px', justifyContent: 'center' }}>
                <Col span={12}>
                  <Card
                    title="T???ng ti???n c???n ph???i thanh to??n:" type="inner"
                    actions={[
                      <p style={{ color: 'red', fontSize: '20px', height: '30px' }}>Thanh to??n tr?????c 10%
                      <div style={{ backgroundColor: '#e5efe799' }}>{renderTien(totalPercent)}</div>
                      </p>
                    ]}
                  >
                    <p>Ng?????i / S???nh : {soBan && soBan * 10} ng?????i</p>
                    <p>T???ng s??? b??n : {soBan} b??n</p>
                    <p>Gi?? / B??n :  {itemSanh.price && renderTien(itemSanh.price)}</p>
                    <p>Ti???n v??n ngh??? : {itemService.price && renderTien(itemService.price)}</p>
                    <p>T???ng ti???n : {renderTien(totalMoney)}</p>
                  </Card>
                </Col>
              </Row>
            </Form>
            :
            <Spin tip="Loading...">
              <Skeleton active />
            </Spin>
          }

        </Drawer>
      </div>
    </>
  );
}

export default FormDatTiec;
