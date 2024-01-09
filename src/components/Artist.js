import React, { memo } from "react";
import { handleNumber } from "../ultis/helpFn";
import icons from "../ultis/icons";
import { useState } from "react";

const { AiOutlineUserAdd } = icons;

const Artist = ({ image, title, follow }) => {
  const [isHover, setisHover] = useState(false);
  return (
    <div className="w-[20%] flex flex-col gap-[15px] items-center justify-center">
      <div
        className="w-[200px] h-[200px] relative overflow-hidden rounded-full cursor-pointer"
        onMouseEnter={() => setisHover(true)}
        onMouseLeave={() => setisHover(false)}
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
          {title}
        </span>
        {/* <span className="text-[12px] font-[sans-serif] text-text-m69">{`${handleNumber(
          follow
        )} quan tâm`}</span> */}
        <button
          type="button"
          className="bg-main-500 px-4 py-1 text-[12px] font-[sans-serif] text-white rounded-l-full rounded-r-full flex items-center justify-center gap-1"
        >
          <span>
            <AiOutlineUserAdd />
          </span>
          <span>QUAN TÂM</span>
        </button>
      </div>
    </div>
  );
};

export default memo(Artist);
