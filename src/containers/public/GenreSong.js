import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import { Lists, AudioLoading } from "../../components";
import icons from "../../ultis/icons";
import { Scrollbars } from "react-custom-scrollbars-2";

const { BsPlayCircle } = icons;

const GenreSong = () => {
  const { isPlaying, checkDelete } = useSelector((state) => state.music);
  const { id } = useParams();
  const [allSongGenre, setAllSongGenre] = useState(null);

  useEffect(() => {
    const fetchAllGenre = async () => {
      const response = await apis.getSongByIdGenre(id);
      if (response?.status === 200) {
        setAllSongGenre(response);
      } else {
        setAllSongGenre(null);
      }
    };
    fetchAllGenre();
  }, []);

  return (
    <div className="flex relative w-full h-full gap-8 px-[59px] pt-5">
      <div className="flex-none w-[27%] flex flex-col items-center">
        <div className="w-full relative overflow-hiddenf">
          <img
            src={allSongGenre?.data?.data?.thumbnail}
            alt="avatar"
            className={`w-[300px] h-[300px] object-cover shadow-md ${
              isPlaying
                ? "rounded-full animate-rotate-center"
                : "rounded-md animate-rotate-center-pause"
            }`}
          />
          <div
            className={`absolute top-0 right-0 left-0 bottom-0 hover:bg-overlay-30
         text-white flex items-center justify-center ${
           isPlaying && "rounded-full"
         }`}
          >
            {isPlaying ? (
              <span className="h-[50px] w-[50px] p-3 border border-white rounded-full flex items-center justify-center">
                <AudioLoading />
              </span>
            ) : (
              <BsPlayCircle size={45} />
            )}
          </div>
        </div>
        <h3 className="font-bold text-[20px] text-text-Color font-[sans-serif] mt-2">
          {allSongGenre?.data?.data?.name?.length > 22
            ? `${allSongGenre?.data?.data?.name.slice(0, 22)}...`
            : allSongGenre?.data?.data?.name}
        </h3>
        <div className="flex gap-1 items-center text-text-m69 text-[12px] font-[sans-serif]">
          <span>{allSongGenre?.data?.data?.title}</span>
        </div>
      </div>
      <Scrollbars autoHide style={{ width: "100%", height: "80%" }}>
        <div className="flex-auto pb-10">
          <div className="text-text-Color text-[15px] font-[sans-serif] mb-[10px]">
            <span>Lời tựa Nhạc chill cho mùa hè</span>
          </div>
          <Lists data={allSongGenre?.data?.data?.songs} />
        </div>
      </Scrollbars>
    </div>
  );
};

export default GenreSong;
