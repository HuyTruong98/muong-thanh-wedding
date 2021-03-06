import React, { useEffect, useState } from 'react';
import { Drawer, Button, Descriptions, Form, Row, Col, Input, Badge, Card, Select, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/lib/form/Form';
import { renderTien } from "../notification/renderConvert";
import * as act from "../../redux/actions/index";
import moment from 'moment';
const { Option } = Select;


function DrawerDatTiec({ visible, onClose, onSave, saveSuccess, setThoiGianDatTiec, setGioDatTiec }) {
  const dispatch = useDispatch();
  const datTheoSanh = useSelector(state => state.hallEditing);
  const allServices = useSelector(state => state.service.listServices);
  const itemService = useSelector(state => state.service.editService);
  const account_current = useSelector((state) => state.account);
  const [form] = useForm();
  const [thoiGian, setThoiGian] = useState();
  const [soBan, setSoBan] = useState();

  let totalMoney = 0;
  if (datTheoSanh.price && itemService.price) {
    totalMoney = ((datTheoSanh.price * soBan) + itemService.price)
  }

  let totalPercent = 0;
  if (datTheoSanh.price && itemService.price) {
    totalPercent = totalMoney - (totalMoney * 0.9)
  }

  function onChangeService(value) {
    dispatch(act.actGetEditServicesRequest(value));
  }

  const onChangeGioToChuc = (value) => {
    setGioDatTiec(value);
    setThoiGian(value)
  }

  const onChangeData = (value) => {
    setThoiGianDatTiec(moment(value).format("DD-MM-YYYY"));
    // let dataDate = moment(value).format("DD-MM-YYYY")
    // if (listBooking && Array.isArray(listBooking) && listBooking.filter(
    //   (itemBk) =>
    //     itemBk.dateBook === dataDate &&
    //     itemBk.timeBook === thoiGian
    // ).length > 0
    // ) {
    //   console.log(thoiGian);
    //   console.log("qua day");
    // }
  };

  const numberOgTableChange = (e) => {
    setSoBan(e.target.value);
    console.log(e.target.value);
  }

  useEffect(() => {
    dispatch(act.actFetchServiceRequest());
  }, [])

  useEffect(() => {
    form.resetFields();
  }, [saveSuccess])


  const dateFormat = 'DD/MM/YYYY';
  return (
    <>
      <Drawer
        title="C???m ??n v?? ???? ch???n ch??ng t??i"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={900}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button type="primary" onClick={() => form.submit()}>
              ?????t ti???c
            </Button>
            <Button
              onClick={onClose}
              style={{ marginLeft: 10 }}
            >
              H???y
            </Button>
          </div>
        }
      >
        <Form layout="vertical" form={form} onFinish={onSave}>
          <Row gutter={16} style={{ paddingBottom: '20px' }}>
            <Col span={24}>
              <Descriptions title="Th??ng tin v??? S???nh" bordered>
                <Descriptions.Item label="T??n s???nh">{datTheoSanh.hallName && datTheoSanh.hallName}</Descriptions.Item>
                <Descriptions.Item label="S???c ch???a">{datTheoSanh.quantity && datTheoSanh.quantity} ng?????i / s???nh</Descriptions.Item>
                <Descriptions.Item label="Thu???c t???ng">{datTheoSanh.floor && datTheoSanh.floor}</Descriptions.Item>
                <Descriptions.Item label="Gi?? / B??n">{datTheoSanh.price && renderTien(datTheoSanh.price)}</Descriptions.Item>
                <Descriptions.Item label="View" span={3}>
                  <Badge status="processing" style={{ paddingRight: "10px" }} />
                  {datTheoSanh.view && datTheoSanh.view}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
          <Descriptions title="Theo nhu c???u">
            <Row gutter={16}>
              <Col span={11}>
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
              <Col span={2}></Col>
              <Col span={11}>
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
          </Descriptions>
          <Descriptions>
            <Row gutter={16}>
              <Col span={11}>
                <Form.Item
                  name="numberOfTable"
                  label="S??? l?????ng b??n"
                  rules={[{
                    required: true, message: "Vui l??ng nh???p s??? l?????ng b??n!"
                  }]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Nh???p s??? l?????ng b??n"
                    onChange={numberOgTableChange}
                  />
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={11}>
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
          </Descriptions>
          <Descriptions title="Th??ng tin li??n l???c">
            <Row gutter={16}>
              <Col span={11}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{
                    required: true,
                    message: "Vui l??ng nh???p email!",
                    type: 'email'
                  }]}

                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder={account_current.email}
                  />
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={11}>
                <Form.Item
                  name="phoneCustomer"
                  label="S??? ??i???n tho???i"
                  rules={[{
                    required: true,
                    message: "Vui l??ng nh???p s??? ??i???n tho???i!"
                  }]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Nh???p s??? s??? ??i???n tho???i..."
                  />
                </Form.Item>
              </Col>
            </Row>
          </Descriptions>
          <Row gutter={24}>
            <Col span={24}>
              <Card title="T???ng ti???n c???n ph???i thanh to??n v?? s??? li???u ti??u chu???n :" type="inner">
                <p><strong>Ng?????i / S???nh :</strong> {soBan && soBan * 10} ng?????i</p>
                <p><strong>S??? b??n :</strong> {soBan && soBan} b??n</p>
                <p><strong>Gi?? b??n :</strong> {datTheoSanh.price && renderTien(datTheoSanh.price)}</p>
                <p><strong>Ti???n v??n ngh??? :</strong> {itemService.price && renderTien(itemService.price)}</p>
                <strong>T???ng ti???n : {renderTien(totalMoney)}</strong>
              </Card>
              <p style={{ color: 'red', fontSize: '20px', height: '30px', textAlign: 'center' }}>Thanh to??n tr?????c 10% <br />
                <div style={{ color: 'black', width: '50%', border: '1px solid red' }} className=" btn btn-lg   infinite like disabled">{renderTien(totalPercent)}</div>
              </p>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}

export default DrawerDatTiec;