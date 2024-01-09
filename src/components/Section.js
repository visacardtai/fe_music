import React, { memo } from "react";
import SectionItem from "./SectionItem";

const Section = ({ data, title, pluser }) => {
  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-[sans-serif] text-text-Color font-bold">
          {title}
        </h3>
        <span className="text-[12px] font-[sans-serif] text-text-m69">
          TẤT CẢ
        </span>
      </div>
      <div className="flex items-center justify-between gap-[28px]">
        {data &&
          data?.length > 0 &&
          data
            ?.slice(0, 5)
            .map((item) => (
              <SectionItem
                link={item?.link}
                key={item?.id_playlist ? item?.id_playlist : item?.id_album}
                id={item?.id_playlist ? item?.id_playlist : item?.id_album}
                thumbnailM={item?.thumbnail}
                title={item?.title}
                name={item?.id_playlist ? "playlist" : "album"}
                artists={item?.artistsNames}
                sortDescription={
                  item?.sort_title ? item?.sort_title : item?.sortDescription
                }
              />
            ))}
      </div>
    </div>
  );
};

export default memo(Section);
