import React, { memo, useState, useEffect } from "react";
import { List } from "../components";
import icons from "../ultis/icons";
import moment from "moment";
import { useSelector } from "react-redux";

const Lists = ({ data, totalDuration, more }) => {
  const { BsDot } = icons;
  const { songs } = useSelector((state) => state.music);
  const [editSong, seteditSong] = useState(null);
  const check = songs?.data?.playlistOn || null;
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center text-text-m69 text-[12px] font-[sans-serif] p-[10px] font-bold">
        <span className="w-[50%]">BÀI HÁT</span>
        <span className="w-[40%]">ALBUM</span>
        <span className="w-[10%] flex justify-end">THỜI GIAN</span>
      </div>
      <div className="flex flex-col">
        {data
          ? data?.map((item) => (
              <List key={item?.id_song} songData={item} more={more} />
            ))
          : songs?.map((item) => (
              <List key={item?.id_song} songData={item} more={more} />
            ))}
      </div>
      <div className="flex gap-[2px] items-center text-text-m69 text-[13px] font-[sans-serif] pt-4">
        <span>{`${data ? data?.length : songs?.length} bài hát`}</span>
        <span>
          <BsDot size={24} />
        </span>
        {totalDuration ? (
          <span>{`${moment.utc(totalDuration * 1000).format("HH")} giờ ${moment
            .utc(totalDuration * 1000)
            .format("mm")} phút`}</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default memo(Lists);
