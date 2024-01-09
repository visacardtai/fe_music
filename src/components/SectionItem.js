import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import icons from "../ultis/icons";

const { GoPlay } = icons;

const SectionItem = ({
  link,
  thumbnailM,
  title,
  sortDescription,
  id,
  name,
}) => {
  const navigate = useNavigate();
  const [isHover, setisHover] = useState(false);
  const url = name + "/" + title + "/" + id;
  const handleEnter = () => {
    setisHover(true);
  };
  const handleLeave = () => {
    setisHover(false);
  };
  return (
    <div
      className="flex flex-col gap-2 cursor-pointer"
      onClick={() => {
        navigate(url);
      }}
    >
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative overflow-hidden rounded-md cursor-pointer min-h-[205px] min-w-[205px] max-h-[205px] max-w-[205px]"
      >
        <img
          src={thumbnailM}
          alt="avatar"
          // w-full h-auto
          className={`min-h-[205px] min-w-[205px] max-h-[205px] max-w-[205px] rounded-lg ${
            isHover ? "animate-scale-up-image" : "animate-scale-down-image"
          }`}
        />
        {isHover && (
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-overlay-30 rounded-md flex justify-center items-center">
            <span className="text-white">
              <GoPlay size={40} />
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-[14px] font-[sans-serif] text-text-Color">
          {title?.length > 24 ? `${title?.slice(0, 24)}...` : title}
        </span>
        <span className="text-[14px] font-[sans-serif] text-text-m69">
          {sortDescription?.length > 24
            ? `${sortDescription?.slice(0, 28)}...`
            : sortDescription}
        </span>
      </div>
    </div>
  );
};

export default memo(SectionItem);
