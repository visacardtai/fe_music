import React, { useEffect, useState } from "react";
import icons from "../../ultis/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";
import * as apis from "../../apis";
import { useDropzone } from "react-dropzone";
import { storage } from "./firebase";
import { Scrollbars } from "react-custom-scrollbars-2";

const { AiOutlineCloseCircle, BiConversation, RiContactsLine } = icons;

const FormAddSongPlaylist = ({ id_playlist }) => {
  const { adminasongplaylist } = useSelector((state) => state.music);
  const [title, settitle] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [file0, setFile0] = useState(null);
  const [songGenre, setSongGenre] = useState(null);
  const [song, setSong] = useState(null);
  const dispatch = useDispatch();

  const onDrop1 = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile0(acceptedFiles[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const {
    getRootProps: getRootProps1,
    getInputProps: getInputProps1,
    isDragActive: isDragActive1,
  } = useDropzone({
    accept: "image/*",
    onDrop: onDrop1,
  });

  const handleAdd = () => {
    try {
      if (song !== null) {
        const fetchAddSong = async () => {
          const response = await apis.addSongPlaylist(
            id_playlist,
            song?.id_song
          );
          if (response?.status === 200) {
            toast.success("Thêm bài hát vào playlist thành công !!!");
            dispatch(actions.checkAddSongPlaylist((prev) => !prev));
            dispatch(actions.adminasongplaylist(false));
          } else {
            toast.error("Thêm bài hát vào playlist thất bại !!!");
          }
        };
        fetchAddSong();
      }
    } catch (error) {
      toast.error("Thêm bài hát vào playlist thất bại !!!");
    }
  };

  useEffect(() => {
    const fetchSongGenre = async () => {
      const response = await apis.getSongNAPlaylist(id_playlist);
      if (response?.status === 200) {
        setSongGenre(response?.data?.data);
      } else {
        setSongGenre(null);
      }
    };
    fetchSongGenre();
  }, []);

  return (
    <div className="fixed w-full h-screen bg-overlay-30 z-50 flex items-center justify-center">
      <div className="bg-main-300 flex flex-col w-[25%] h-[70%] rounded-md">
        <div className="w-full flex justify-end">
          <span
            onClick={() => {
              if (adminasongplaylist === true) {
                dispatch(actions.adminasongplaylist(false));
              }
            }}
            className="cursor-pointer w-[30px] hover:text-gray-400"
          >
            <AiOutlineCloseCircle size={30} />
          </span>
        </div>
        <div className="w-full h-full flex flex-col items-center gap-6">
          <div className="">
            <h4 className="font-bold font-[sans-serif] text-[18px]">
              Thêm Bài Hát Vào Thể Loại
            </h4>
          </div>
          <div className="w-[240px] h-[260px]">
            <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
              {songGenre &&
                songGenre?.map((item) => (
                  <div
                    key={item?.id_song}
                    className="w-full h-[40px] flex gap-2 mb-[6px] rounded-md cursor-pointer hover:bg-blue-400"
                    onClick={() => {
                      setSong(item);
                    }}
                  >
                    <img
                      src={item?.thumbnail}
                      alt="img"
                      className="w-[40px] h-[40px] rounded-full"
                    />
                    <span className="flex items-center text-[14px] font-[sans-serif] text-text-Color">
                      {item?.title}
                    </span>
                  </div>
                ))}
            </Scrollbars>
          </div>
          <div className="flex mt-6 items-center justify-center">
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={song?.thumbnail}
              alt="avatar"
            />
            <span className="ml-2">{song?.title}</span>
          </div>
        </div>
        <div className="flex items-center justify-center mb-8">
          <button
            variant="info"
            className="bg-green-500 py-1 px-4 rounded-l-full rounded-r-full hover:bg-green-400"
            onClick={handleAdd}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAddSongPlaylist;
