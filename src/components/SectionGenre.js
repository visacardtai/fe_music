import React, { memo } from "react";
import Genre from "./Genre";

const SectionGenre = ({ data, title }) => {
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
          data?.data
            ?.slice(0, 5)
            ?.map((item) => (
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
  );
};

export default memo(SectionGenre);
