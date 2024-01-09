import React, { useEffect, useState } from "react";
import {
  FormAddPlaylist,
  BGBlurEditPlaylist,
  FormAddSongPlaylist,
} from "./index";
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

const Playlist = () => {
  const {
    checkAddPlaylist,
    adminaddplaylist,
    admineditplaylist,
    adminasongplaylist,
    checkAddSongPlaylist,
  } = useSelector((state) => state.music);
  const [allPlaylist, setallPlaylist] = useState(null);
  const [playlistEdit, setPlaylistEdit] = useState(null);
  const [songGenre, setSongPlaylist] = useState(null);
  const [idPlaylist, setIdPlaylist] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(actions.adminaddplaylist(true));
  };

  useEffect(() => {
    const fetchallPlaylist = async () => {
      const response = await apis.getHome();
      if (response?.status === 200) {
        setallPlaylist(response);
      } else {
        setallPlaylist(null);
      }
    };
    fetchallPlaylist();
  }, [checkAddPlaylist]);

  const handleEdit = (item) => {
    setPlaylistEdit(item);
    dispatch(actions.admineditplaylist(true));
  };
  const handleShow = (id_playlist) => {
    setIdPlaylist(id_playlist);
    setShow((prev) => !prev);
  };

  useEffect(() => {
    const fetchShowSong = async () => {
      const response = await apis.apiGetDetailPlayList(idPlaylist);
      if (response?.status === 200) {
        setSongPlaylist(response);
      } else {
        setSongPlaylist(null);
      }
    };
    fetchShowSong();
  }, [show, checkAddSongPlaylist]);

  const handleASongPlaylist = (item) => {
    dispatch(actions.adminasongplaylist(true));
    setIdPlaylist(item?.id_playlist);
  };

  const handleRemoveSong = (id_song) => {
    if (idPlaylist !== null) {
      const fetchRemoveSong = async () => {
        const response = await apis.deleteSPlaylist(idPlaylist, id_song);
        if (response?.status === 200) {
          toast.success("Xóa bài hát khỏi playlist thành công !!!");
          const fetchShowSong = async () => {
            const response = await apis.apiGetDetailPlayList(idPlaylist);
            if (response?.status === 200) {
              setSongPlaylist(response);
            } else {
              setSongPlaylist(null);
            }
          };
          fetchShowSong();
        } else {
          toast.error("Xóa bài hát khỏi playlist thất bại !!!");
        }
      };
      fetchRemoveSong();
    }
  };

  return (
    <div>
      {adminasongplaylist && <FormAddSongPlaylist id_playlist={idPlaylist} />}
      {admineditplaylist && <BGBlurEditPlaylist data={playlistEdit} />}
      {adminaddplaylist && <FormAddPlaylist />}
      <DrawerHeader />
      <Scrollbars autoHide style={{ width: "100%", height: "350px" }}>
        <table className="w-full">
          <thead className="border border-black w-full">
            <tr>
              <th className="border border-blue-500">Thumbnail</th>
              <th className="border border-blue-500">Id_Playlist</th>
              <th className="border border-blue-500">Name</th>
              <th className="border border-blue-500">Title</th>
              <th className="border border-blue-500">Date Create</th>
              <th className="border border-blue-500">Action</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {allPlaylist !== null &&
              allPlaylist?.data?.data?.map((item) => (
                <tr className="w-full" key={item?.id_playlist}>
                  <td className="border border-blue-500">
                    <img
                      src={item?.thumbnail}
                      alt=""
                      className="w-[50px] h-[50px] rounded-md m-auto mt-[5px] mb-[5px]"
                    />
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.id_playlist}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.name}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.title}
                    </span>
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.date_create}
                    </span>
                  </td>
                  <td className="border border-blue-500 text-center">
                    <button
                      variant="info"
                      className="bg-green-500 py-1 px-4 rounded-l-full rounded-r-full hover:bg-green-400"
                      onClick={() => handleASongPlaylist(item)}
                    >
                      Add
                    </button>
                    <button
                      variant="info"
                      className="bg-blue-500 py-1 px-4 rounded-l-full rounded-r-full hover:bg-blue-300"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      variant="info"
                      className="bg-orange-500 py-1 px-4 rounded-l-full rounded-r-full hover:bg-orange-300"
                      onClick={() => handleShow(item?.id_playlist)}
                    >
                      Show
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Scrollbars>
      <div className="mt-[20px] mb-4">
        <span>
          Danh sách bài hát của thể loại{" "}
          <span className="font-bold">{songGenre?.data?.data?.name}</span>
        </span>
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
            {songGenre !== null &&
              songGenre?.data?.data?.songs?.map((item) => (
                <tr className="w-full" key={item?.id_playlist}>
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
                      onClick={() => handleRemoveSong(item?.id_song)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Scrollbars>
      <span
        className="text-blue-400 fixed bottom-5 right-5 hover:text-blue-700 cursor-pointer"
        onClick={handleAdd}
      >
        <IoAddCircleOutline size={50} />
      </span>
    </div>
  );
};

export default Playlist;
