import React, { useEffect, useState } from "react";
import { BGBlur, BGBlurEditArtist } from "./index";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import icons from "../../ultis/icons";
import { styled } from "@mui/material/styles";
import * as apis from "../../apis";

const { IoAddCircleOutline } = icons;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const Artist = () => {
  const { adminaddartist, checkAddArtist, admineditartist } = useSelector(
    (state) => state.music
  );
  const [allArtist, setallArtist] = useState(null);
  const [artistEdit, setArtistEdit] = useState(null);
  const dispatch = useDispatch();
  const handleAddArtist = () => {
    dispatch(actions.adminaddartist(true));
  };

  useEffect(() => {
    const fetchAllArtist = async () => {
      const response = await apis.getAllArtist();
      if (response?.status === 200) {
        setallArtist(response);
      } else {
        setallArtist(null);
      }
    };
    fetchAllArtist();
  }, [checkAddArtist]);

  const handleEditArtits = (item) => {
    setArtistEdit(item);
    dispatch(actions.admineditartist(true));
  };
  return (
    <div>
      {admineditartist && <BGBlurEditArtist data={artistEdit} />}
      {adminaddartist && <BGBlur />}
      <DrawerHeader />
      <Scrollbars autoHide style={{ width: "100%", height: "500px" }}>
        <table className="w-full">
          <thead className="border border-black w-full">
            <tr>
              <th className="border border-blue-500">Thumbnail</th>
              <th className="border border-blue-500">Id_Artist</th>
              <th className="border border-blue-500">Name</th>
              <th className="border border-blue-500">Real Name</th>
              <th className="border border-blue-500">National</th>
              <th className="border border-blue-500">Biography</th>
              <th className="border border-blue-500">Birthday</th>
              <th className="border border-blue-500">Action</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {allArtist !== null &&
              allArtist?.data?.data?.map((item) => (
                <tr className="w-full" key={item?.id_artists}>
                  <td className="border border-blue-500">
                    <img
                      src={item?.thumbnail}
                      alt=""
                      className="w-[50px] h-[50px] rounded-md m-auto mt-[5px] mb-[5px]"
                    />
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.id_artists}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.name}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.real_name}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.national}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.biography}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.birthday.slice(0, 10)}
                    </span>
                  </td>
                  <td className="border border-blue-500 text-center">
                    <button
                      variant="info"
                      className="bg-green-500 py-1 px-4 rounded-l-full rounded-r-full hover:bg-green-400"
                      onClick={() => handleEditArtits(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Scrollbars>
      <span
        className="text-blue-400 fixed bottom-10 right-10 hover:text-blue-700 cursor-pointer"
        onClick={handleAddArtist}
      >
        <IoAddCircleOutline size={50} />
      </span>
    </div>
  );
};

export default Artist;
