import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  SidebarLeft,
  SidebarRight,
  Player,
  Header,
  Loading,
  Login,
  BGBlur,
  ChangePW,
  UpdateInfo,
} from "../../components";
import { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

const Public = () => {
  const [isShowSidebarRight, setisShowSidebarRight] = useState(false);
  const { isLoading, newRelease } = useSelector((state) => state.app);
  const {
    isLogin,
    userLogin,
    login,
    adminadd,
    checkAddSong,
    checkUpdateInfo,
    checkChangePW,
  } = useSelector((state) => state.music);
  const [playListData, setPlayListData] = useState({});
  // useEffect(() => {
  //   const fetchDetailPlayList = async () => {
  //     const response = await apis.apiGetDetailPlayList("ZE7BW00W");
  //     if (response?.data?.err === 0) {
  //       setPlayListData(response?.data?.data?.song);
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   fetchDetailPlayList();
  //   console.log(playListData);
  //   // eslint-disable-next-line
  // }, [isShowSidebarRight]);

  return (
    <div className="relative w-full h-screen flex flex-col bg-main-300">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] flex-none opacity-90">
          <SidebarLeft />
        </div>

        <div className="relative flex-auto flex flex-col">
          {isLoading && (
            <div className="absolute top-0 right-0 left-0 bottom-0 z-40 bg-main-200 flex items-center justify-center">
              <Loading />
            </div>
          )}
          <div className="h-[70px] flex-none px-[59px] flex items-center bg-main-400 opacity-80">
            <Header />
          </div>
          <div className="flex-auto w-full">
            <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
              <Outlet />
            </Scrollbars>
          </div>
        </div>
        {isShowSidebarRight && (
          <div className="w-[329px] h-screen flex-none border border-black">
            <SidebarRight playListData={newRelease} />
          </div>
        )}
      </div>

      <div className="fixed z-50 bottom-0 left-0 right-0 h-[90px]">
        <Player setisShowSidebarRight={setisShowSidebarRight} />
      </div>
      {isLogin && !login && <Login />}
      {adminadd && <BGBlur />}
      {checkChangePW && <ChangePW />}
      {checkUpdateInfo && <UpdateInfo />}
    </div>
  );
};

export default Public;
