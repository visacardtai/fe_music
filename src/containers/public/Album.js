import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import { Lists, AudioLoading } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../ultis/icons";

const { BsPlayCircle } = icons;

const Album = () => {
  const { isPlaying, checkDelete } = useSelector((state) => state.music);
  const { name, title, pid } = useParams();
  const [playListData, setPlayListData] = useState({});
  const dispatch = useDispatch();
  const [img, setimg] = useState("");
  const [titleImg, setTitleImg] = useState("");
  const [sort, setSort] = useState("");
  const [more, setMore] = useState("more");
  const [date, setDate] = useState("");
  useEffect(() => {
    if (name !== "undefined") {
      const fetchDetailPlayList = async () => {
        dispatch(actions.loading(true));
        dispatch(actions.checkDelete(false));
        var response;
        if (name === "playlist") {
          response = await apis.apiGetDetailPlayList(pid);
        } else {
          response = await apis.apiGetDetailAlbum(pid);
        }
        dispatch(actions.loading(false));
        if (response?.status === 200) {
          setPlayListData(response?.data);
          dispatch(actions.setPlaylist(response?.data?.data?.songs));
          setimg(response?.data?.data?.thumbnail_m);
          setTitleImg(response?.data?.data?.title);
          setSort(response?.data?.data?.sort_title);
          setMore("");

          const date = new Date(response?.data?.data?.date_create);
          setDate(
            date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear()
          );
        }
      };
      fetchDetailPlayList();
    } else {
      const fetchDetailPlayList1 = async () => {
        dispatch(actions.loading(true));
        dispatch(actions.checkDelete(false));
        const response = await apis.getSongPlaylist(pid);
        dispatch(actions.loading(false));
        if (response?.status === 200) {
          setPlayListData(response?.data?.data?.songs);
          dispatch(actions.setPlaylist(response?.data?.data?.songs));
          setimg(response?.data?.data?.thumbnail_m);
          setTitleImg("Playlist của bạn");
          setSort("Đã được download");
        }
      };
      fetchDetailPlayList1();
      setMore("more");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid, checkDelete]);

  return (
    <div className="flex relative w-full h-full gap-8 px-[59px] pt-5">
      <div className="flex-none w-[27%] flex flex-col items-center">
        <div className="w-full relative overflow-hiddenf">
          <img
            src={img}
            alt=""
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
          {titleImg?.length > 22 ? `${titleImg.slice(0, 22)}...` : titleImg}
        </h3>
        <div className="flex gap-1 items-center text-text-m69 text-[12px] font-[sans-serif]">
          <span>Cập nhật: </span>
          <span>
            {/* {moment.unix(playListData?.contentLastUpdate).format("DD/MM/YYYY")} */}
            {date}
          </span>
        </div>
        <div className="flex gap-1 items-center text-text-m69 text-[12px] font-[sans-serif]">
          <span>{playListData?.data?.sort_title}</span>
        </div>
        <div className="flex gap-1 items-center text-text-m69 text-[12px] font-[sans-serif]">
          {/* <span>{`${Math.round(
            playListData?.like / 1000
          )}K người yêu thích`}</span> */}
          <span>Người yêu thích</span>
        </div>
      </div>
      <Scrollbars autoHide style={{ width: "100%", height: "80%" }}>
        <div className="flex-auto pb-10">
          <div className="text-text-Color text-[15px] font-[sans-serif] mb-[10px]">
            <span>{`Lời tựa ${
              playListData?.data?.sortDescription
                ? playListData?.data?.sortDescription
                : "Nhạc chill cho mùa hè"
            }`}</span>
          </div>
          <Lists
            totalDuration={playListData?.data?.totalDuration}
            more={more}
          />
        </div>
      </Scrollbars>
    </div>
  );
};

export default Album;
