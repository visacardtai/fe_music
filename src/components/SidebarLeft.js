import React from "react";
import logo from "../assets/logo.png";
import poster from "../assets/poster.jpg";
import poster12 from "../assets/poster12.png";
import { sidebarMenu } from "../ultis/menu";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import path from "../ultis/path";

const notActiveStyle =
  "py-2 px-[25px] text-[#32323D] text-[14px] font-bold flex gap-[12px] items-center ";
const activeStyle =
  "py-2 px-[25px] text-[#0F7070] text-[14px] font-bold flex gap-[12px] items-center ";

const SidebarLeft = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-main-200">
      <div
        onClick={() => navigate(path.HOME)}
        className="w-full h-[70px] mt-[20px] mb-[20px] flex justify-center items-center cursor-pointer"
      >
        <img src={logo} alt="logo" className="w-[90px] h-[90px]" />
        <span className="ml-1 text-green-500 font-bold font-sans">
          Chill Music
        </span>
      </div>
      <div className="flex flex-col">
        {sidebarMenu.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
          >
            {item.icons}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
      <div className="flex-none w-[90%] border-black rounded-md flex flex-col gap-5 mt-[36px] m-auto">
        <img
          src={poster}
          alt="poster"
          className="rounded-md object-contain flex flex-col items-center justify-center cursor-pointer"
          onClick={() => {
            navigate("playlist/Mùa%20Đông%20Năm%20Ấy/14");
          }}
        />
        <img
          src={poster12}
          alt="poster"
          className="rounded-md object-contain flex flex-col items-center justify-center cursor-pointer"
          onClick={() => {
            navigate("playlist/Playlist%20Chill%20Phết/27");
          }}
        />
      </div>
    </div>
  );
};

export default SidebarLeft;
