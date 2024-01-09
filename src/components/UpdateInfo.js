import React, { useState } from "react";
import icons from "../ultis/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { toast } from "react-toastify";
import * as apis from "../apis";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const {
  AiOutlineCloseCircle,
  BiConversation,
  RiContactsLine,
  BsFillTelephoneFill,
  BsGenderAmbiguous,
} = icons;

const UpdateInfo = () => {
  const { checkUpdateInfo, userLogin } = useSelector((state) => state.music);
  const [firstName, setFirstName] = useState(userLogin?.user?.first_name);
  const [lastName, setLastName] = useState(userLogin?.user?.last_name);
  const [phone, setPhone] = useState(userLogin?.user?.phone);
  const [gender, setGender] = useState(userLogin?.user?.gender);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleEdit = () => {
    const fetchEdit = async () => {
      const response = await apis.updateInfo(
        firstName,
        lastName,
        gender,
        phone,
        userLogin?.id_user
      );
      if (response?.status === 200) {
        toast.success("Chỉnh sửa thông tin thành công !!!");
        dispatch(actions.checkUpdateInfo(false));
      } else {
        toast.error("Chỉnh sửa thông tin thất bại !!!");
      }
    };
    if (firstName !== "" && lastName !== "" && phone !== "") {
      if (
        firstName !== userLogin?.user?.first_name ||
        lastName !== userLogin?.user?.last_name ||
        phone !== userLogin?.user?.phone ||
        gender !== userLogin?.user?.gender
      ) {
        fetchEdit();
      }
    } else {
      toast.warn("Không được để trống thông tin!!!");
    }
  };
  return (
    <div className="fixed w-full h-screen bg-overlay-30 z-50 flex items-center justify-center">
      <div className="bg-main-300 flex flex-col w-[25%] h-[70%] rounded-md">
        <div className="w-full flex justify-end">
          <span
            onClick={() => {
              if (checkUpdateInfo === true) {
                dispatch(actions.checkUpdateInfo(false));
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
              Chỉnh Sửa Thông Tin
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
                <BiConversation size={25} />
              </span>
              <input
                className="w-[80%] h-[30px] bg-transparent border-b-2"
                type="text"
                placeholder="First Name"
                defaultValue={userLogin?.user?.first_name}
                onChange={(e) => setFirstName(e.target.value)}
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
                placeholder="Last Name"
                defaultValue={userLogin?.user?.last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="flex w-[250px] gap-3">
              <span>
                <BsFillTelephoneFill size={25} />
              </span>
              <input
                className="w-[80%] h-[30px] bg-transparent border-b-2"
                type="phone"
                placeholder="Phone"
                defaultValue={userLogin?.user?.phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="flex w-[250px] gap-3 items-center">
              <span>
                <BsGenderAmbiguous size={25} />
              </span>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Giới Tính</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  // value={age}
                  label="Giới Tính"
                  onChange={handleChange}
                  defaultValue={userLogin?.user?.gender}
                >
                  <MenuItem value={"Nam"}>Nam</MenuItem>
                  <MenuItem value={"Nữ"}>Nữ</MenuItem>
                </Select>
              </FormControl>
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

export default UpdateInfo;
