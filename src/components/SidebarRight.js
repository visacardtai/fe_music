import React from "react";
import icons from "../ultis/icons";
import { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import SongItem from "./SongItem";
const { ImBin } = icons;

const SidebarRight = ({ playListData }) => {
  const [isRecent, setisRecent] = useState(false);
  return (
    <div className="flex flex-col text-xs w-full h-full">
      <div className="h-[70px] w-full flex-none py-[14px] px-2 gap-8 flex justify-between items-center">
        <div className="flex flex-auto justify-between bg-main-200 cursor-auto px-[6px] py-[6px] rounded-l-full rounded-r-full">
          <span
            className={`cursor-pointer flex flex-1 justify-center py-[5px] items-center rounded-l-full rounded-r-full ${
              !isRecent && "bg-main-100"
            }`}
            onClick={() => setisRecent((prev) => !prev)}
          >
            Danh sách phát
          </span>
          <span
            className={`cursor-pointer flex flex-1 justify-center py-[5px] items-center rounded-l-full rounded-r-full ${
              isRecent && "bg-main-100"
            }`}
            onClick={() => setisRecent((prev) => !prev)}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="cursor-pointer p-2 rounded-full hover:bg-main-100">
          <ImBin size={14} />
        </span>
      </div>
      <div className="flex flex-col flex-auto px-2 w-full">
        <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
          <div className="flex flex-coll text-back">
            <span className="text-sm font-bold">Bài hát của bạn</span>
          </div>
          <div className="flex flex-col">
            {playListData?.data?.map((item) => (
              <SongItem
                key={item?.id_song}
                thumbnail={item?.thumbnail}
                title={item?.title}
                sid={item?.id_song}
                size="w-[40px] h-[40px]"
                artists={item?.artistsNames}
              />
            ))}
          </div>
        </Scrollbars>
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default SidebarRight;
