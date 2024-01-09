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

const FormAddASong = ({ data }) => {
  const { adminaddasong } = useSelector((state) => state.music);
  const [title, settitle] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [file0, setFile0] = useState(null);
  const [artistSong, setArtistSong] = useState(null);
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
        const fetchAddArtistSong = async () => {
          const response = await apis.addASong(song?.id_artists, data?.id_song);
          if (response?.status === 200) {
            toast.success("Thay đổi nghệ sĩ thành công !!!");
            dispatch(actions.adminaddasong(false));
          } else {
            toast.error("Thay đổi nghệ sĩ thất bại !!!");
          }
        };
        fetchAddArtistSong();
      }
    } catch (error) {
      toast.error("Thay đổi nghệ sĩ thất bại !!!");
    }
  };

  useEffect(() => {
    const fetchArtistSong = async () => {
      const response = await apis.getAllArtist();
      if (response?.status === 200) {
        setArtistSong(response?.data?.data);
      } else {
        setArtistSong(null);
      }
    };
    fetchArtistSong();
  }, []);

  return (
    <div className="fixed w-full h-screen bg-overlay-30 z-50 flex items-center justify-center">
      <div className="bg-main-300 flex flex-col w-[25%] h-[70%] rounded-md">
        <div className="w-full flex justify-end">
          <span
            onClick={() => {
              if (adminaddasong === true) {
                dispatch(actions.adminaddasong(false));
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
              Chỉnh Sửa Nghệ Sĩ
            </h4>
          </div>
          <div className="w-[240px] h-[260px]">
            <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
              {artistSong &&
                artistSong?.map((item) => (
                  <div
                    key={item?.id_artists}
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
                      {item?.name}
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
            <span className="ml-2">{song?.name}</span>
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

export default FormAddASong;
