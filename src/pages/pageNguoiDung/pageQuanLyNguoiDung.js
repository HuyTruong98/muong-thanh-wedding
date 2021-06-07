import React from 'react';
import { Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import TableUsers from "../../components/management_restaurant/quanlynguoidung/table";

function PageQuanLyNguoiDung({ match }) {
  const dataUsers = useSelector(state => state.user_list);
  const dispatch = useDispatch();

  return (
    <>
      < div className="container-fluid" >
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h5 className=" mb-0 text-gray-800">Quản lý tất cả sảnh</h5>
          {/* <Button
            type="primary"
            style={{ color: 'black' }}
          >
            Thêm mới
          </Button> */}
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold ">Danh sách tất cả người dùng</h6>
              </div>
              <TableUsers
                data={dataUsers} match={match}
              />
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default PageQuanLyNguoiDung;