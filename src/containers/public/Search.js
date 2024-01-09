import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../store/actions";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyWord = searchParams.get("key");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.search(keyWord));
  }, []);
  return (
    <div className="w-full">
      <div className="flex h-[50px] p-7 items-center border-b border-gray-400 pd-1 pl-[59px]">
        <span className="text-[24px] font-[sans-serif] text-text-Color font-bold pr-6">
          Kết Quả Tìm Kiếm
        </span>
        <div className="flex items-center hidden">
          <span className="text-[15px] font-[sans-serif] text-text-Color px-4 hover:text-main-500 cursor-pointer">
            TẤT CẢ
          </span>
          <span className="text-[15px] font-[sans-serif] text-text-Color px-4 hover:text-main-500 cursor-pointer">
            BÀI HÁT
          </span>
          <span className="text-[15px] font-[sans-serif] text-text-Color px-4 hover:text-main-500 cursor-pointer">
            PLAYLSIT/ALBUM
          </span>
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
      <div className="w-full h-[110px]"></div>
    </div>
  );
};

export default Search;
