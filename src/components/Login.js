import React from "react";
import icons from "../ultis/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import LoginG from "./LoginG";
import Register from "./Register";
import ForgetPassword from "./ForgetPassword";

const { AiOutlineCloseCircle } = icons;

const Login = () => {
  const dispatch = useDispatch();
  const { isRegister, forgetPassword } = useSelector((state) => state.music);
  return (
    <div className="fixed w-full h-screen bg-overlay-30 z-50 flex items-center justify-center">
      <div className="bg-main-300 flex w-[60%] h-[80%] rounded-md gap-8">
        <div className="w-[50%] h-[100%] flex items-center justify-center">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="h-full object-contain"
            alt="thumbnail"
          />
        </div>
        <div className="w-[50%] flex items-center justify-center">
          {isRegister ? (
            <Register />
          ) : forgetPassword ? (
            <ForgetPassword />
          ) : (
            <LoginG />
          )}
        </div>
        <span
          onClick={() => {
            dispatch(actions.isLogin(false));
            dispatch(actions.isRegister(false));
            dispatch(actions.isForgetPassword(false));
          }}
          className="cursor-pointer flex flex-1 justify-end"
        >
          <AiOutlineCloseCircle size={30} />
        </span>
      </div>
    </div>
  );
};

export default Login;
