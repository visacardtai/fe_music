import React, { useEffect, useState } from "react";
import { Section } from "../../components";
import { useSelector } from "react-redux";
import * as apis from "../../apis";

const AllAlbum = () => {
  const { Friday, hArtistTheme, hEditorTheme, h100, hAlbum } = useSelector(
    (state) => state.app
  );
  const [album, setAlbum] = useState(null);
  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await apis.getAllAlbum();
      if (response?.status === 200) {
        setAlbum(response?.data?.data);
      } else {
        setAlbum(null);
      }
    };
    fetchAlbum();
  }, []);
  return (
    <div className="overflow-y-auto w-full">
      <h1 className="px-[59px] mt-[20px] font-bold text-[30px] font-[sans-serif] text-text-Color">
        NHỮNG ALBUM TỔNG HỢP
      </h1>
      <Section data={album} title="ALBUM ĐƯỢC NGHE NHIỀU" />
      <Section data={hArtistTheme} title="NHẠC NGHE HÔM NAY" />
      <Section data={hEditorTheme} title="CÓ THỂ BẠN MUỐN NGHE" />
      <Section data={h100} title="ALBUM HOT" />
      <Section data={hAlbum} title="NHẠC CHILL" />
      <div className="w-full h-[120px]"></div>
    </div>
  );
};

export default AllAlbum;
