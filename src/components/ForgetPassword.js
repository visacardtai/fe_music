import React, { useState } from "react";
import icons from "../ultis/icons";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import * as apis from "../apis";
import { toast } from "react-toastify";

const { AiOutlineMail } = icons;
const ForgetPassword = () => {
  const [keyEmail, setkeyEmail] = useState("");
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  const handleSumbit = () => {
    const fetchForget = async () => {
      try {
        const response = await apis.forgetpassword(keyEmail);
        if (response?.status === 200) {
          dispatch(actions.isForgetPassword(false));
          toast.success("Reset mật khẩu thành công !!!");
        } else {
          toast.error("Tài khoản không chính xác !!!");
        }
      } catch (error) {
        toast.error("Tài khoản không chính xác !!!");
      }
    };
    fetchForget();
    setCheck(true);
  };
  const handleClick = () => {
    dispatch(actions.isForgetPassword(false));
  };
  return (
    <form className="flex flex-col h-[80%] w-[80%]">
      <h2 className="text-[25px] font-[sans-serif] text-text-Color flex items-center justify-center mb-[60px] mt-[40px]">
        FORGET PASSWORD
      </h2>
      <div className="flex items-center justify-center mb-[30px] w-full gap-3 mt-3">
        <span>
          <AiOutlineMail size={25} />
        </span>
        <input
          className="w-[80%] h-[30px] bg-transparent border-b-2"
          type="email"
          placeholder="Email"
          onChange={(e) => setkeyEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-center mb-[30px] w-full gap-3 mt-3">
        <span className={check ? "" : "hidden"}>
          Vui lòng truy cập mail để nhận mật khẩu mới !!!
        </span>
      </div>
      <div className="flex items-center justify-center mt-[20px]">
        <button
          type="button"
          onClick={handleSumbit}
          className="w-full bg-main-500 py-2 text-[16px] font-[sans-serif] text-white rounded-l-full rounded-r-full flex items-center justify-center gap-1"
        >
          Send
        </button>
      </div>
      <div className="flex items-center justify-center mt-[15px]">
        <p>
          I have a Account{" "}
          <a
            className="text-main-500 cursor-pointer hover:text-blue-700 hover:underline"
            onClick={handleClick}
          >
            Login
          </a>
        </p>
      </div>
    </form>
  );
};

export default ForgetPassword;
