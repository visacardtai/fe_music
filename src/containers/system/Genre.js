import React, { useEffect, useState } from "react";
import { FormAddGenre, BGBlurEditGenre, FormAddSongGenre } from "./index";
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
const Genre = () => {
  const {
    checkAddGenre,
    adminaddgenre,
    admineditgenre,
    adminasonggenre,
    checkAddSongGenre,
  } = useSelector((state) => state.music);
  const [allGenre, setallGenre] = useState(null);
  const [genreEdit, setGenreEdit] = useState(null);
  const [songGenre, setSongGenre] = useState(null);
  const [idGenre, setIdGenre] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleAddGenre = () => {
    dispatch(actions.adminaddgenre(true));
  };

  useEffect(() => {
    const fetchAllGenre = async () => {
      const response = await apis.getAllGenre();
      if (response?.status === 200) {
        setallGenre(response);
      } else {
        setallGenre(null);
      }
    };
    fetchAllGenre();
  }, [checkAddGenre]);

  const handleEditGenre = (item) => {
    setGenreEdit(item);
    dispatch(actions.admineditgenre(true));
  };
  const handleShow = (id_genre) => {
    setIdGenre(id_genre);
    setShow((prev) => !prev);
  };

  useEffect(() => {
    const fetchShowSong = async () => {
      const response = await apis.getSongByIdGenre(idGenre);
      if (response?.status === 200) {
        setSongGenre(response);
      } else {
        setSongGenre(null);
      }
    };
    fetchShowSong();
  }, [show, checkAddSongGenre]);

  const handleASongGenre = (item) => {
    dispatch(actions.adminasonggenre(true));
    setIdGenre(item?.id_genre);
  };

  const handleRemoveSong = (id_song) => {
    if (idGenre !== null) {
      const fetchRemoveSong = async () => {
        const response = await apis.deleteSongGenre(idGenre, id_song);
        if (response?.status === 200) {
          toast.success("Xóa bài hát khỏi thể loại nhạc thành công !!!");
          const fetchShowSong = async () => {
            const response = await apis.getSongByIdGenre(idGenre);
            if (response?.status === 200) {
              setSongGenre(response);
            } else {
              setSongGenre(null);
            }
          };
          fetchShowSong();
        } else {
          toast.error("Xóa bài hát khỏi thể loại nhạc thất bại !!!");
        }
      };
      fetchRemoveSong();
    }
  };

  return (
    <div>
      {adminasonggenre && <FormAddSongGenre id_genre={idGenre} />}
      {admineditgenre && <BGBlurEditGenre data={genreEdit} />}
      {adminaddgenre && <FormAddGenre />}
      <DrawerHeader />
      <Scrollbars autoHide style={{ width: "100%", height: "350px" }}>
        <table className="w-full">
          <thead className="border border-black w-full">
            <tr>
              <th className="border border-blue-500">Thumbnail</th>
              <th className="border border-blue-500">Id_Genre</th>
              <th className="border border-blue-500">Name</th>
              <th className="border border-blue-500">Title</th>
              <th className="border border-blue-500">Action</th>
            </tr>
          </thead>

          <tbody className="w-full">
            {allGenre !== null &&
              allGenre?.data?.data?.map((item) => (
                <tr className="w-full" key={item?.id_genre}>
                  <td className="border border-blue-500">
                    <img
                      src={item?.thumbnail}
                      alt=""
                      className="w-[50px] h-[50px] rounded-md m-auto mt-[5px] mb-[5px]"
                    />
                  </td>
                  <td className="border border-blue-500">
                    <span className="flex justify-center items-center">
                      {item?.id_genre}
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
                  <td className="border border-blue-500 text-center">
                    <button
                      variant="info"
                      className="bg-green-500 py-1 px-4 rounded-l-full rounded-r-full hover:bg-green-400"
                      onClick={() => handleASongGenre(item)}
                    >
                      Add
                    </button>
                    <button
                      variant="info"
                      className="bg-blue-500 py-1 px-4 rounded-l-full rounded-r-full hover:bg-blue-300"
                      onClick={() => handleEditGenre(item)}
                    >
                      Edit
                    </button>
                    <button
                      variant="info"
                      className="bg-orange-500 py-1 px-4 rounded-l-full rounded-r-full hover:bg-orange-300"
                      onClick={() => handleShow(item?.id_genre)}
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
                <tr className="w-full" key={item?.id_genre}>
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
        onClick={handleAddGenre}
      >
        <IoAddCircleOutline size={50} />
      </span>
    </div>
  );
};

export default Genre;
