import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchSongs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 3000); // Thời gian chờ trước khi chuyển hướng (3 giây)

    return () => {
      clearTimeout(redirectTimeout); // Xóa timeout nếu component bị unmount trước khi chuyển hướng
    };
  }, []);
  return (
    <div className="text-red-600 flex items-center justify-center font-bold text-[18px]">
      Tài Khoản Không Có Quyền Truy Cập
    </div>
  );
};

export default SearchSongs;
