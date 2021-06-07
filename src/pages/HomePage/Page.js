import React from "react";
import { useSelector } from "react-redux";
import MenuLeft from "./MenuLeft";
import Nav from "./Nav";
import TrangChu from "./TrangChu";

function Page(props) {
  const dataAccount = useSelector((state) => state.account);
  return (
    <>
      {dataAccount.role !== "USER" ? (
        <div id="page-top">
          <div id="wrapper">
            <MenuLeft />
            {/* nội dung */}
            <Nav />
          </div>
        </div>
      ) : (
        <TrangChu />
      )}
    </>
  );
}

export default Page;
