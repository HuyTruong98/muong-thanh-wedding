import './App.css';
import Page from './pages/HomePage/Page';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TrangChu from './pages/HomePage/TrangChu';
import { Redirect } from 'react-router';
import { parseJSON } from 'jquery';
import * as act from './redux/actions/index';

function App() {
  // Nếu mà login thành công thì checkToken = true ;
  const dataAccount = useSelector((state) => state.account);
  const applicationId = useSelector((state) => state.application);
  const checkLogin = parseJSON(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(act.getUserInfoRequest())
    dispatch(act.applicationId(checkLogin))
  }, [])

  useEffect(() => {
    if (checkLogin) {
      dispatch(act.getUserById(checkLogin))
    }
  }, [applicationId])

  return (
    <div className="App m-0">
      {/* Đúng thÌ chẠY vÔ cÁi Ở trÊn sai thÌ chẠY cÁI Ở dƯỚI */}
      { dataAccount?.checkToken && dataAccount?.role !== "USER" && dataAccount !== null ?
        (<Page />)
        :
        (<TrangChu />)
      }
    </div>
  );
}

export default App;
