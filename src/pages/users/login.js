import React, { useEffect, useState } from "react";
import { Drawer, Form, Button, Tabs, Card } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import FormLog from "../../components/Header/login/FormLog";
import FormReg from "../../components/Header/login/FormReg";
// import actions vào
import * as act from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { Redirect } from "react-router";

function Login(props) {
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
    <div style={{ background: 'red' }}>
      <Card title={titleTab} >
        <Tabs onChange={callback} type="card" >
          <TabPane tab="Đăng Nhập" key="1">
            <FormLog data={dataUser} login={login} form={form} />
          </TabPane>
          <TabPane tab="Đăng Ký" key="2">
            <FormReg />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default Login;
