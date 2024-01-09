import React, { useState } from "react";
import icons from "../../ultis/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";
import * as apis from "../../apis";

const { AiOutlineCloseCircle, BiConversation, RiContactsLine } = icons;

const BGBlurEditArtist = ({ data }) => {
  const { admineditartist } = useSelector((state) => state.music);
  const [name, setName] = useState(data?.name);
  const [realName, setRealName] = useState(data?.real_name);
  const [national, setNational] = useState(data?.national);
  const [birthday, setBirthday] = useState(data?.birthday);
  const [biography, setBiography] = useState(data?.biography);
  const dispatch = useDispatch();

  const handleEdit = () => {
    const fetchEdit = async () => {
      const response = await apis.editArtist(
        data?.id_artists,
        name,
        realName,
        national,
        birthday,
        biography
      );
      if (response?.status === 200) {
        toast.success("Chỉnh sửa nghệ sĩ thành công !!!");
        dispatch(actions.checkAddArtist((prev) => !prev));
        dispatch(actions.admineditartist(false));
      } else {
        toast.error("Chỉnh sửa nghệ sĩ thất bại !!!");
      }
    };
    if (
      name !== "" &&
      realName !== "" &&
      national !== "" &&
      birthday !== "" &&
      biography !== ""
    ) {
      if (
        name !== data?.name ||
        realName !== data?.real_name ||
        national !== data?.national ||
        birthday !== data?.birthday ||
        biography !== data?.biography
      ) {
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
              if (admineditartist === true) {
                dispatch(actions.admineditartist(false));
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
              Chỉnh Sửa Thông Tin Nghệ Sĩ
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
                placeholder="Name"
                defaultValue={data?.name}
                onChange={(e) => setName(e.target.value)}
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
                placeholder="Real Name"
                defaultValue={data?.real_name}
                onChange={(e) => setRealName(e.target.value)}
                required
              />
            </div>
            <div className="flex w-[250px] gap-3">
              <span>
                <BiConversation size={25} />
              </span>
              <input
                className="w-[80%] h-[30px] bg-transparent border-b-2"
                type="text"
                placeholder="Biography"
                defaultValue={data?.biography}
                onChange={(e) => setBiography(e.target.value)}
                required
              />
            </div>
            <div className="flex w-[250px] gap-3">
              <span>
                <BiConversation size={25} />
              </span>
              <input
                className="w-[80%] h-[30px] bg-transparent border-b-2"
                type="text"
                placeholder="National"
                defaultValue={data?.national}
                onChange={(e) => setNational(e.target.value)}
                required
              />
            </div>
            <div className="flex w-[250px] gap-3">
              <span>
                <BiConversation size={25} />
              </span>
              <input
                className="w-[80%] h-[30px] bg-transparent border-b-2"
                type="date"
                placeholder="Birthday"
                defaultValue={data?.birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
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
    </div>
  );
};

export default BGBlurEditArtist;
