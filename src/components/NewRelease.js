import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SongItem from "./SongItem";

const NewRelease = ({ data }) => {
  const [isActived, setisActived] = useState(0);
  // const [songs, setSongs] = useState([]);
  // useEffect(() => {
  //   isActived
  //     ? setSongs(newRelease?.items?.others)
  //     : setSongs(newRelease?.items?.vPop);
  // }, [isActived, newRelease]);
  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-[sans-serif] text-text-Color font-bold">
          {}
        </h3>
        <span className="text-[12px] font-[sans-serif] text-text-m69">
          TẤT CẢ
        </span>
      </div>
      <div className="flex items-center gap-5 text-xs">
        <button
          type="button"
          // onClick={() => setisActived(0)}
          className={`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-main-500 text-white }`}
        >
          VIỆT NAM
        </button>
        <button
          type="button"
          // onClick={() => setisActived(1)}
          className={`hidden py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 ${
            isActived === 1 && "bg-main-500 text-white"
          }`}
        >
          QUỐC TẾ
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        {data?.data?.slice(0, 12)?.map((item) => (
          <div key={item?.id_song} className="w-[45%] min-[1024px]:w-[30%]">
            <SongItem
              thumbnail={item?.thumbnail}
              title={item?.title}
              artists={item?.artistsNames}
              releaseDate={item?.releaseDate}
              sid={item?.id_song}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
