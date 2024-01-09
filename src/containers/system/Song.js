import React, { useEffect, useState } from "react";
import { BGBlur, BGBlurEdit, FormAddASong } from "./index";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import icons from "../../ultis/icons";
import { styled } from "@mui/material/styles";
import * as apis from "../../apis";
import { toast } from "react-toastify";

const { IoAddCircleOutline } = icons;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const Song = () => {
  const { adminadd, adminedit, adminReload, checkAddSong, adminaddasong } =
    useSelector((state) => state.music);
  const [allSong, setallSong] = useState(null);
  const [notActiveSong, setNotActiveSong] = useState(null);
  const [active, setActive] = useState(false);
  const [songEdit, setSongEdit] = useState(null);
  const dispatch = useDispatch();
  const handAddSong = () => {
    dispatch(actions.adminadd(true));
  };

  useEffect(() => {
    const fetchAllSong = async () => {
      const response = await apis.getNewRelease();
      const response2 = await apis.getNotActiveSong();
      if (response?.status === 200) {
        setallSong(response);
      } else {
        setallSong(null);
      }
      if (response2?.status === 200) {
        setNotActiveSong(response2);
      } else {
        setNotActiveSong(null);
      }
    };
    fetchAllSong();
  }, [checkAddSong, active, adminReload]);

  const handleActiveSong = (id_song) => {
    const fetchActiveSong = async () => {
      const response = await apis.activeSong(id_song);
      if (response?.status === 200) {
        toast.success("Set trạng thái bài hát thành công !!!");
        setActive((prev) => !prev);
      } else {
        toast.error("Set trạng thái bài hát thất bại !!!");
      }
    };
    fetchActiveSong();
  };

  const handleEditSong = (item) => {
    setSongEdit(item);
    dispatch(actions.adminedit(true));
  };

  const handleEditArtist = (item) => {
    setSongEdit(item);
    dispatch(actions.adminaddasong(true));
  };
  return (
    <div>
      {adminaddasong && <FormAddASong data={songEdit} />}
      {adminedit && <BGBlurEdit data={songEdit} />}
      {adminadd && <BGBlur />}
      <DrawerHeader />
      <Scrollbars autoHide style={{ width: "100%", height: "350px" }}>
        <table className="w-full">
          <thead className="border border-black w-full">
            <tr>
              <th className="border border-blue-500">Thumbnail</th>
              <th className="border border-blue-500">Id_Song</th>
              <th className="border border-blue-500">Artists_Name</th>
              <th className="border border-blue-500">Title</th>
              <th className="border border-blue-500">Duration</th>
              <th className="border border-blue-500">Status</th>
              <th className="border border-blue-500">Release Date</th>
              <th className="border border-blue-500">Action</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {allSong !== null &&
              allSong?.data?.data?.map((item) => (
                <tr className="w-full" key={item?.id_song}>
                  <td className="border border-blue-500">
                    <img
                      src={item?.thumbnail}
                      alt=""
                      className="w-[50px] h-[50px] rounded-md m-auto mt-[5px] mb-[5px]"
                    />
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.id_song}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.artistsNames}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.title}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.duration}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.status ? 1 : 0}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.releaseDate}
                    </span>
                  </td>
                  <td className="border border-blue-500 text-center">
                    <button
                      variant="info"
                      className="bg-green-500 py-1 px-4 rounded-l-full rounded-r-full hover:bg-green-400"
                      onClick={() => handleEditSong(item)}
                    >
                      Edit
                    </button>
                    <button
                      variant="info"
                      className="bg-blue-500 py-1 px-4 rounded-l-full rounded-r-full hover:bg-blue-300"
                      onClick={() => handleEditArtist(item)}
                    >
                      Artist
                    </button>
                  </td>
                </tr>
              ))}

            {/* {agents.map(agent => (
//     <tr key={agent.id}>
//       <td>name</td>
//       <td>email</td>
//       <td>location</td>
//       <td>date</td>
//       <td>
//         <Button variant="info" onClick={}>Edit</Button>
//         <Button variant="danger" onClick={}>Delete</Button>
//       </td>
//     </tr>
//   ))} */}
          </tbody>
        </table>
      </Scrollbars>
      <div className="mt-[20px]">
        <span>Danh sách bài hát người dùng upload</span>
      </div>
      <Scrollbars autoHide style={{ width: "100%", height: "200px" }}>
        <table className="w-full">
          <thead className="border border-black w-full">
            <tr>
              <th className="border border-blue-500">Thumbnail</th>
              <th className="border border-blue-500">Id_Song</th>
              <th className="border border-blue-500">Artists_Name</th>
              <th className="border border-blue-500">Title</th>
              <th className="border border-blue-500">Duration</th>
              <th className="border border-blue-500">Status</th>
              <th className="border border-blue-500">Release Date</th>
              <th className="border border-blue-500">Action</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {notActiveSong !== null &&
              notActiveSong?.data?.data?.map((item) => (
                <tr className="w-full">
                  <td className="border border-blue-500">
                    <img
                      src={item?.thumbnail}
                      alt=""
                      className="w-[50px] h-[50px] rounded-md m-auto mt-[5px] mb-[5px]"
                    />
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.id_song}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.artistsNames}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.title}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.duration}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.status ? 1 : 0}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.releaseDate}
                    </span>
                  </td>
                  <td className="border border-blue-500 text-center">
                    <button
                      variant="info"
                      className="bg-red-600 py-1 px-4 rounded-l-full rounded-r-full hover:bg-red-500"
                      onClick={() => handleActiveSong(item?.id_song)}
                    >
                      Active
                    </button>
                  </td>
                </tr>
              ))}

            {/* {agents.map(agent => (
//     <tr key={agent.id}>
//       <td>name</td>
//       <td>email</td>
//       <td>location</td>
//       <td>date</td>
//       <td>
//         <Button variant="info" onClick={}>Edit</Button>
//         <Button variant="danger" onClick={}>Delete</Button>
//       </td>
//     </tr>
//   ))} */}
          </tbody>
        </table>
      </Scrollbars>
      <span
        className="text-blue-400 fixed bottom-5 right-5 hover:text-blue-700 cursor-pointer"
        onClick={handAddSong}
      >
        <IoAddCircleOutline size={50} />
      </span>
    </div>
  );
};

export default Song;
