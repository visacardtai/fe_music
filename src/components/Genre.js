import React, { memo } from "react";
import { handleNumber } from "../ultis/helpFn";
import icons from "../ultis/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { AiOutlineUserAdd } = icons;

const Genre = ({ id, image, name, title }) => {
  const navigate = useNavigate();
  const [isHover, setisHover] = useState(false);
  const url = "/the-loai" + "/" + id;
  return (
    <div className="w-[20%] flex flex-col gap-[15px] items-center justify-center">
      <div
        className="w-[200px] h-[200px] relative overflow-hidden rounded-full cursor-pointer"
        onMouseEnter={() => setisHover(true)}
        onMouseLeave={() => setisHover(false)}
        onClick={() => {
          navigate(url);
        }}
      >
        <img
          src={image}
          alt="singer"
          className={`w-[200px] h-[200px] object-cover rounded-full hover:cursor-pointer ${
            isHover ? "animate-scale-up-image" : "animate-scale-down-image"
          }`}
        />
        {isHover && (
          <div className="absolute top-0 right-0 left-0 bottom-0 rounded-full bg-overlay-30"></div>
        )}
      </div>
      <div className="flex flex-col items-center gap-1 justify-center">
        <span className="text-[14px] font-[sans-serif] text-text-Color">
          {name}
        </span>
      </div>
    </div>
  );
};

export default memo(Genre);
