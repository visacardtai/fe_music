import React, { useState } from "react";
import poster12 from "../../assets/poster12.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, us } from "react-redux";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const InFor = ({ check }) => {
  const navigate = useNavigate();
  const { userLogin } = useSelector((state) => state.music);
  const currencies = [
    {
      value: "Nam",
      label: "Nam",
    },
    {
      value: "Nữ",
      label: "Nữ",
    },
  ];

  const dispatch = useDispatch();
  const { adminadd, checkAddSong } = useSelector((state) => state.music);
  if (check === false) {
    // Nếu vai trò của người dùng không phải là 'admin', hãy chuyển hướng hoặc hiển thị thông báo lỗi
    navigate("/");
  }
  const handAddSong = () => {
    dispatch(actions.adminadd(true));
  };
  const handUpdate = () => {
    dispatch(actions.checkUpdateInfo(true));
  };
  const handChange = () => {
    dispatch(actions.checkChangePW(true));
  };
  return (
    <div className="flex w-full h-full gap-30 px-[59px] pt-5">
      <div className="flex-none w-[27%] flex flex-col items-center">
        <div className="w-full mt-[30px] rounded-full">
          <img
            src={userLogin?.user?.avatar}
            alt=""
            className={`w-[200px] h-[200px] object-cover shadow-md rounded-full`}
          />
        </div>
        <h3 className="font-bold text-[20px] text-text-Color font-[sans-serif] mt-4 pr-[100px]">
          {userLogin?.idUser}
        </h3>
      </div>

      <div className="mt-[75px] flex flex-col w-auto">
        <h3 className="font-bold text-[24px] font-[sans-serif] text-text-Color mb-[30px] pl-[240px]">
          THÔNG TIN CÁ NHÂN
        </h3>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" },
          }}
          noValidate
          autoComplete="off"
          className="w-full"
        >
          <div className="">
            <div className="">
              {" "}
              <TextField
                disabled
                id="filled-disabled"
                value={userLogin?.id_user}
                color="secondary"
              />
              <TextField
                disabled
                id="filled-read-only-input"
                value={userLogin?.username}
                color="secondary"
                focused
              />
            </div>
            {/* <div>
              <TextField
                id="filled-password-input"
                type="password"
                defaultValue={userLogin?.password}
                value={userLogin?.password}
                autoComplete="current-password"
                color="secondary"
                focused
              />
              <TextField
                id="filled-confirm-password-input"
                label="Confirm-Password"
                type="password"
                defaultValue={userLogin?.password}
                value={userLogin?.password}
                autoComplete="current-password"
                color="secondary"
                focused
              />
            </div> */}
            <div className="">
              {" "}
              <TextField
                label="First Name"
                value={userLogin?.user?.first_name}
                color="secondary"
                focused
              />
              <TextField
                label="Last Name"
                value={userLogin?.user?.last_name}
                color="secondary"
                focused
              />
            </div>
            <div>
              <TextField
                id="outlined-select-currency"
                select
                label="Giới Tính"
                defaultValue={
                  userLogin?.user?.gender ? userLogin?.user?.gender : ""
                }
                value={userLogin?.user?.gender ? userLogin?.user?.gender : ""}
                color="secondary"
                focused
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="filled-search"
                label="Phone"
                type="text"
                defaultValue={userLogin?.user?.phone}
                value={userLogin?.user?.phone}
                color="secondary"
                focused
              />
            </div>
          </div>
        </Box>
        {/* <div className="w-full flex items-center justify-center mt-[20px]">
          {" "}
          <button
            type="button"
            className="py-1 px-4 w-[100px] rounded-l-full rounded-r-full border border-gray-400 bg-main-500"
          >
            Update
          </button>
        </div> */}
        <div className="w-full flex items-center justify-center mt-[20px] gap-4">
          <button
            type="button"
            className="py-1 px-4 w-[100px] rounded-l-full rounded-r-full border border-gray-400 bg-blue-500 hover:bg-blue-600"
            onClick={handAddSong}
          >
            Upload
          </button>
          <button
            type="button"
            className="py-1 px-4 w-[100px] rounded-l-full rounded-r-full border border-gray-400 bg-blue-500 hover:bg-blue-600"
            onClick={handUpdate}
          >
            Update
          </button>
          <button
            type="button"
            className="py-1 px-4 w-[100px] rounded-l-full rounded-r-full border border-gray-400 bg-blue-500 hover:bg-blue-600"
            onClick={handChange}
          >
            ChangePW
          </button>
        </div>
      </div>
    </div>
  );
};

export default InFor;
