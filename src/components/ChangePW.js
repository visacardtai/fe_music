import React, { useState } from "react";
import icons from "../ultis/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { toast } from "react-toastify";
import * as apis from "../apis";

const { BsKey, AiOutlineCloseCircle, RiShieldKeyholeFill } = icons;

const ChangePW = () => {
  const { checkChangePW, userLogin } = useSelector((state) => state.music);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleEdit = () => {
    const fetchEdit = async () => {
      const response = await apis.changePassword(
        oldPassword,
        newPassword,
        userLogin?.id_account
      );
      if (response?.status === 200) {
        toast.success("Thay đổi mật khẩu thành công !!!");
        dispatch(actions.checkChangePW(false));
      } else {
        toast.error("Vui lòng kiểm tra lại mật khẩu !!!");
      }
    };
    if (oldPassword !== "" && newPassword !== "" && confirmPassword !== "") {
      if (newPassword === confirmPassword) {
        fetchEdit();
      } else {
        toast.warn("Mật khẩu xác nhận không trùng khớp !!!");
      }
    } else {
      toast.warn("Không được để trống!!!");
    }
  };
  return (
    <div className="fixed w-full h-screen bg-overlay-30 z-50 flex items-center justify-center">
      <div className="bg-main-300 flex flex-col w-[25%] h-[70%] rounded-md">
        <div className="w-full flex justify-end">
          <span
            onClick={() => {
              if (checkChangePW === true) {
                dispatch(actions.checkChangePW(false));
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
              Thay Đổi Mật Khẩu
            </h4>
          </div>
          <img
            className="w-[120px] h-[120px] rounded-lg"
            src={userLogin?.user?.avatar}
            alt="avatar"
          />
          <div className="flex flex-col gap-4">
            <div className="flex w-[250px] gap-3">
              <span>
                <BsKey size={25} />
              </span>
              <input
                className="w-[80%] h-[30px] bg-transparent border-b-2"
                type="password"
                placeholder="Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex w-[250px] gap-3">
              <span>
                <BsKey size={25} />
              </span>
              <input
                className="w-[80%] h-[30px] bg-transparent border-b-2"
                type="password"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex w-[250px] gap-3">
              <span>
                <RiShieldKeyholeFill size={25} />
              </span>
              <input
                className="w-[80%] h-[30px] bg-transparent border-b-2"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ChangePW;
