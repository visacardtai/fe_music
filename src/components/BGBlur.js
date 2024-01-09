import React from "react";
import icons from "../ultis/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import FormAdd from "./FormAdd";
import FormArtist from "../containers/system/FormArtist";

const { AiOutlineCloseCircle } = icons;

const BGBlur = () => {
  const { adminaddartist, adminadd } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  return (
    <div className="fixed w-full h-screen bg-overlay-30 z-50 flex items-center justify-center">
      <div className="bg-main-300 flex w-[60%] h-[80%] rounded-md">
        <div className="w-[90%] h-full">
          {" "}
          {adminadd === true ? (
            <FormAdd />
          ) : adminaddartist === true ? (
            <FormArtist />
          ) : (
            ""
          )}
        </div>
        <span
          onClick={() => {
            if (adminadd === true) {
              dispatch(actions.adminadd(false));
            }
            if (adminaddartist === true) {
              dispatch(actions.adminaddartist(false));
            }
          }}
          className="cursor-pointer flex-1 flex justify-end w-[30px]"
        >
          <AiOutlineCloseCircle size={30} />
        </span>
      </div>
    </div>
  );
};

export default BGBlur;
