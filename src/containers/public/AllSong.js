import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
import { List } from "../../components";

const AllSong = () => {
  const { newSong } = useSelector((state) => state.app);

  return (
    <div className="overflow-y-auto w-full">
      <h1 className="px-[59px] mt-[20px] font-bold text-[30px] font-[sans-serif] text-text-Color">
        NHỮNG BÀI HÁT NỔI BẬT
      </h1>
      <div className="flex flex-col ml-[20px] mr-[20px]">
        <div className="flex justify-between items-center text-text-m69 text-[12px] font-[sans-serif] p-[10px] font-bold">
          <span className="w-[50%]">BÀI HÁT</span>
          <span className="w-[40%]">ALBUM</span>
          <span className="w-[10%] flex justify-end">THỜI GIAN</span>
        </div>
        <div className="flex flex-col">
          {newSong?.data?.map((item) => (
            <List key={item.id_song} songData={item} />
          ))}
        </div>
      </div>
      {/* <Scrollbars autoHide style={{ width: "100%", height: "80%" }}>
        <div className="flex-auto pb-10">
          <div className="text-text-Color text-[15px] font-[sans-serif] mb-[10px]">
            <span>{`Lời tựa ${playListData?.sortDescription}`}</span>
          </div>
          <Lists totalDuration={playListData?.song?.totalDuration} />
        </div>
      </Scrollbars> */}
      <div className="w-full h-[120px]"></div>
    </div>
  );
};

export default AllSong;
