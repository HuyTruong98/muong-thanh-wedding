import React, { useEffect, useState } from "react";
import { Tabs, Row, Col } from "antd";
import FormLog from "../../components/login/FormLog";
import FormReg from "../../components/login/FormReg";
// import actions vào
import * as act from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/lib/form/Form";

export default function Pagelogin() {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.user_list);

  const [titleTab, setTitleTab] = useState("Mời bạn đăng nhập để sử dụng");

  const [form] = useForm();

  const { TabPane } = Tabs;

  function callback(key) {
    if (key == 1) {
      setTitleTab("Mời bạn đăng nhập để sử dụng");
    } else if (key == 2) {
      setTitleTab("Mời bạn đăng ký tài khoản");
    }
  }
  //tạo function login
  function login(value) {
    dataUser.map((item, index) => {
      if (value.email === item.email && value.password === item.password) {
        localStorage.setItem("userInfo", JSON.stringify(item.id));
        dispatch(act.applicationId(item.id));
      }
    });
  }

  return (
    <>
      <div className="form-v2">
        <div className="page-content" >
          <div className="form-v2-content">
            <div className="form-left">
              <img src="https://images.pexels.com/photos/2403568/pexels-photo-2403568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="form" width="100%" height="100%" />
              <div className="text-1">
                <p>Mường Thanh Restaurant<span>Xin chào!</span></p>
              </div>

            </div>
            <div className="form-detail" action="#" method="post" id="myform">
              <Tabs onChange={callback}>
                <TabPane tab="Đăng Nhập" key="1" >
                  <FormLog data={dataUser} login={login} form={form} />
                </TabPane>
                <TabPane tab="Đăng Ký" key="2">
                  <FormReg />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="d-lg-flex half">
        <div className="bg order-1 order-md-2" style={{ backgroundImage: 'url("https://images.pexels.com/photos/2403568/pexels-photo-2403568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")', height: '100%' }} ></div>
        <div class="contents order-2 order-md-1">

          <div class="row align-items-center login12">
            <div class="col-md-12" style={{ marginLeft: '100px', marginTop: '20px' }}>
              <Tabs onChange={callback} style={{ width: '80%' }}>
                <TabPane tab="Đăng Nhập" key="1" >
                  <FormLog data={dataUser} login={login} form={form} />
                </TabPane>
                <TabPane tab="Đăng Ký" key="2">
                  <FormReg />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>


      </div> */}
    </>
  );
}
