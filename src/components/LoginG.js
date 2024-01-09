import React, { useState } from "react";
import icons from "../ultis/icons";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import * as apis from "../apis";
import { toast } from "react-toastify";

const { AiOutlineMail, BsKey } = icons;

const LoginG = () => {
  const [keyEmail, setkeyEmail] = useState("");
  const [keyPassword, setkeyPassword] = useState("");
  const dispatch = useDispatch();
  const handleRegister = () => {
    dispatch(actions.isRegister(true));
  };
  const handleSubmit = () => {
    const fetchLogin = async () => {
      try {
        const response = await apis.checkLogin(keyEmail, keyPassword);
        if (response?.status === 200 && response?.data.data !== null) {
          dispatch(actions.setUserLogin(response?.data?.data));
          dispatch(actions.saveLogin(keyEmail, keyPassword));
          dispatch(actions.checkLogin(true));
          dispatch(actions.isLogin(false));
          toast.success("Đăng nhập thành công");

          const fetchFavorite = async () => {
            const response3 = await apis.getFavorite(
              response?.data?.data?.id_user
            );

            if (response3?.status === 200) {
              dispatch(actions.getfavorite(response3?.data?.data));
            } else {
              dispatch(actions.getfavorite(null));
            }
          };
          fetchFavorite();
        } else {
          dispatch(actions.setUserLogin({}));
          toast.error("Tài khoản, mật khẩu không chính xác");
        }
      } catch (error) {
        toast.error("Tài khoản, mật khẩu không chính xác");
      }
    };
    fetchLogin();
  };

  const handleForget = () => {
    dispatch(actions.isForgetPassword(true));
  };
  return (
    <form className="flex flex-col h-[80%] w-[80%]">
      <h2 className="text-[25px] font-[sans-serif] text-text-Color flex items-center justify-center mb-[60px] mt-[40px]">
        LOGIN
      </h2>
      <div className="flex items-center justify-center mb-[30px] w-full gap-3">
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
      <div className="flex items-center justify-center mb-[30px] w-full gap-3">
        <span>
          <BsKey size={25} />
        </span>
        <input
          className="w-[80%] h-[30px]  bg-transparent border-b-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setkeyPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-between mr-[10px] ml-[10px]">
        <label htmlFor="">
          <input type="checkbox" />
          Remember Me
        </label>

        <span
          className="text-main-500 cursor-pointer hover:text-blue-700 hover:underline"
          onClick={handleForget}
        >
          Forget Password
        </span>
      </div>
      <div className="flex items-center justify-center mt-[40px]">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-main-500 py-2 text-[16px] font-[sans-serif] text-white rounded-l-full rounded-r-full flex items-center justify-center gap-1"
        >
          Login
        </button>
      </div>
      <div className="flex items-center justify-center mt-[15px]">
        <p>
          Don't have a account{" "}
          <a onClick={handleRegister} className="text-main-500 cursor-pointer">
            Register
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginG;
