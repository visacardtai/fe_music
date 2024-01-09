import React, { useState } from "react";
import icons from "../ultis/icons";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import * as apis from "../apis";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const {
  AiOutlineMail,
  BsKey,
  RiShieldKeyholeFill,
  IoPersonAddSharp,
  BsFillTelephoneFill,
} = icons;

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [keyEmail, setkeyEmail] = useState("");
  const [keyPassword, setkeyPassword] = useState("");
  const [keyConfirmPassword, setkeyConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  const handleClick = () => {
    dispatch(actions.isRegister(false));
  };
  const handleSumbit = () => {
    if (firstName === "" || lastName === "" || phone === "") {
      toast.warn("Họ tên và số điện thoại không được để trống !!!");
    } else if (
      keyEmail === "" ||
      keyPassword === "" ||
      keyConfirmPassword === ""
    ) {
      toast.warn("Tài khoản, mật khẩu không được để trống !!!");
    } else if (keyPassword !== keyConfirmPassword) {
      toast.warn("Mật khẩu xác nhận không trùng khớp");
    } else if (gender === "") {
      toast.warn("Giới tính không được để trống !!!");
    } else {
      const fetchRegister = async () => {
        try {
          const response = await apis.register(
            firstName,
            lastName,
            keyEmail,
            keyPassword,
            phone,
            gender
          );
          if (response?.status === 200) {
            toast.success("Đăng ký thành công");
            dispatch(actions.isRegister(false));
          } else {
            toast.warn("Đăng ký thất bại, vui lòng kiểm tra lại !!!");
          }
        } catch (error) {
          toast.warn("Đăng ký thất bại, vui lòng kiểm tra lại !!!");
        }
      };
      fetchRegister();
    }
  };
  return (
    <form className="flex flex-col h-[80%] w-[80%]">
      <h2 className="text-[25px] font-[sans-serif] text-text-Color flex items-center justify-center mb-[60px]">
        REGISTER
      </h2>
      <div className="flex items-center justify-center mb-[20px] w-full gap-3">
        <span>
          <IoPersonAddSharp size={25} />
        </span>
        <input
          className="w-[80%] h-[30px] bg-transparent border-b-2"
          type="text"
          placeholder="First_name"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          className="w-[80%] h-[30px] bg-transparent border-b-2"
          type="text"
          placeholder="Last_name"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center  mb-[20px] w-full gap-3">
        <span>
          <AiOutlineMail size={25} />
        </span>
        <input
          className="w-full h-[30px] bg-transparent border-b-2"
          type="email"
          placeholder="Email"
          onChange={(e) => setkeyEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center  mb-[20px] w-full gap-3">
        <span>
          <BsKey size={25} />
        </span>
        <input
          className="w-full h-[30px]  bg-transparent border-b-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setkeyPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center mb-[20px] w-full gap-3">
        <span>
          <RiShieldKeyholeFill size={25} />
        </span>
        <input
          className="w-full h-[30px]  bg-transparent border-b-2"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setkeyConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-center mb-[20px] w-full gap-3">
        <span>
          <BsFillTelephoneFill size={25} />
        </span>
        <input
          className="w-[80%] h-[30px] bg-transparent border-b-2"
          type="text"
          placeholder="Phone number"
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Giới Tính</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            // value={age}
            label="Giới Tính"
            onChange={handleChange}
          >
            <MenuItem value={"Nam"}>Nam</MenuItem>
            <MenuItem value={"Nữ"}>Nữ</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="flex items-center justify-center mt-[20px]">
        <button
          type="button"
          onClick={handleSumbit}
          className="w-full bg-main-500 py-2 text-[16px] font-[sans-serif] text-white rounded-l-full rounded-r-full flex items-center justify-center gap-1"
        >
          Register
        </button>
      </div>
      <div className="flex items-center justify-center mt-[15px]">
        <p>
          I have a Account{" "}
          <a className="text-main-500 cursor-pointer" onClick={handleClick}>
            Login
          </a>
        </p>
      </div>
    </form>
  );
};

export default Register;
