import React from "react";
import { useSelector } from "react-redux";
import { handleNumber } from "../../ultis/helpFn";
import { Genre, List, SectionItem, Artist } from "../../components/index";

const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);
  return (
    <div className="flex flex-col w-full px-[59px] gap-[60px] mt-[30px]">
      {/* <div className="flex flex-col">
        <h3 className="text-lg font-bold pb-5 font-[sans-serif]">Nổi Bật</h3>
        <div className="flex gap-8">
          {searchData?.top && (
            <div className="p-[10px] cursor-pointer bg-main-200 rounded-md flex flex-1 gap-4 items-center">
              <img
                src={searchData?.top?.thumbnail}
                alt="avatar"
                className={`w-[84px] h-[84px] object-cover ${
                  searchData?.top?.objectType === "artist" && "rounded-full"
                }`}
              />
              <div className="flex flex-col">
                <span className="mb-[6px] text-[12px] font-[sans-serif] text-text-m69">
                  {searchData?.top?.objectType === "artist" ? "Nghệ sĩ" : ""}
                </span>
                <span className="text-[14px] font-[sans-serif] text-text-Color">
                  {searchData?.top?.title || searchData?.top?.name}
                </span>
                {searchData?.top?.objectType === "artist" && (
                  <span className="text-[12px] font-[sans-serif] text-text-m69">
                    {handleNumber(searchData?.artists[0]?.totalFollow) +
                      " quan tâm"}
                  </span>
                )}
              </div>
            </div>
          )}
          {searchData?.data?.songs
            ?.filter((item, index) =>
              [...Array(2).keys()].some((i) => i === index)
            )
            ?.map((item) => (
              <div key={item.id} className="flex-1">
                <SongItem
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  artists={item?.artistsNames}
                  sid={item?.id}
                  size="w-[84px] h-[84px]"
                  style="bg-main-200"
                />
              </div>
            ))}
        </div>
      </div> */}
      <div className="flex flex-col">
        <h3 className="text-lg font-bold pb-5 font-[sans-serif]">Bài Hát</h3>
        <div className="flex w-full justify-between flex-wrap">
          {searchData?.data?.[0]?.songs?.map((item, index) => (
            <div
              key={item?.id_song}
              className={`flex-auto w-[45%] ${
                index % 2 !== 0 ? "pl-4" : "pr-4"
              }`}
            >
              <List songData={item} isHideAlbum />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold pb-5 font-[sans-serif]">Nghệ Sĩ</h3>
        <div className="flex items-center gap-[28px]">
          {searchData?.data?.[2]?.artists?.slice(0, 5)?.map((item) => (
            <Artist
              key={item?.id_artists}
              image={item?.thumbnail}
              title={item?.name}
              follow={item?.totalFollow}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold pb-5 font-[sans-serif]">Thể Loại</h3>
        <div className="flex items-center justify-between gap-[28px]">
          {searchData?.data?.[1]?.genres?.slice(0, 5)?.map((item) => (
            <Genre
              key={item?.id_genre}
              id={item?.id_genre}
              image={item?.thumbnail}
              name={item?.name}
              title={item?.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAll;
