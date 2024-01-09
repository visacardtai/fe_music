import React, { useState } from "react";
import icons from "../../ultis/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";
import * as apis from "../../apis";

const { AiOutlineCloseCircle, BiConversation, RiContactsLine } = icons;

const BGBlurEdit = ({ data }) => {
  const { adminedit } = useSelector((state) => state.music);
  const [title, settitle] = useState(data?.title);
  const [artistName, setArtistName] = useState(data?.artistsNames);
  const dispatch = useDispatch();

  const handleEdit = () => {
    const fetchEdit = async () => {
      const response = await apis.editSong(data?.id_song, title, artistName);
      if (response?.status === 200) {
        toast.success("Chỉnh sửa bài hát thành công !!!");
        dispatch(actions.adminReload((prev) => !prev));
        dispatch(actions.adminedit(false));
      } else {
        toast.error("Chỉnh sửa bài hát thất bại !!!");
      }
    };
    if (title !== "" && artistName !== "") {
      if (title !== data?.title || artistName !== data?.artistsNames) {
        fetchEdit();
      }
    }
  };
  return (
    <div className="fixed w-full h-screen bg-overlay-30 z-50 flex items-center justify-center">
      <div className="bg-main-300 flex flex-col w-[25%] h-[70%] rounded-md">
        <div className="w-full flex justify-end">
          <span
            onClick={() => {
              if (adminedit === true) {
                dispatch(actions.adminedit(false));
              }
            }}
            className="cursor-pointer w-[30px]"
          >
            <AiOutlineCloseCircle size={30} />
          </span>
        </div>
        <div className="w-full h-full flex flex-col items-center gap-6">
          <div className="">
            <h4 className="font-bold font-[sans-serif] text-[18px]">
              Chỉnh Sửa Thông Tin Bài Hát
            </h4>
          </div>
          <img
            className="w-[120px] h-[120px] rounded-lg"
            src={data?.thumbnail}
            alt="avatar"
          />
          <div className="flex flex-col gap-4">
            <div className="flex w-[250px] gap-3">
              <span>
                <BiConversation size={25} />
              </span>
              <input
                className="w-[80%] h-[30px] bg-transparent border-b-2"
                type="text"
                placeholder="Title"
                defaultValue={data?.title}
                onChange={(e) => settitle(e.target.value)}
                required
              />
            </div>
            <div className="flex w-[250px] gap-3">
              <span>
                <RiContactsLine size={25} />
              </span>
              <input
                className="w-[80%] h-[30px] bg-transparent border-b-2"
                type="text"
                placeholder="ArtistsNames"
                defaultValue={data?.artistsNames}
                onChange={(e) => setArtistName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mb-8">
          <button
            variant="info"
            className="bg-green-500 py-1 px-4 rounded-l-full rounded-r-full hover:bg-green-400"
            onClick={handleEdit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BGBlurEdit;
