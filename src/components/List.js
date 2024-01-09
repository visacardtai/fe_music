import React, { memo, useState } from "react";
import icons from "../ultis/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import * as apis from "../apis";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AnimationOutlinedIcon from "@mui/icons-material/AnimationOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const { CiMusicNote1, HiOutlineDotsVertical } = icons;

const List = ({ songData, isHideAlbum, more }) => {
  const dispatch = useDispatch();
  const { plUser, curSongId } = useSelector((state) => state.music);
  const [anchorEl, setAnchorEl] = useState(null);
  const { album, title, pid } = useParams();
  const [isHover, setisHover] = useState(false);
  const handleClickIcon = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClickIcon1 = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    const fetchDelete = async () => {
      try {
        const response = await apis.deleteSongPlaylist(songData?.id_song, pid);
        if (response?.status === 200) {
          toast.success("Đã xóa bài hát thành công !!!");
        } else {
          toast.success("Đã xóa bài hát thành công !!!");
        }
      } catch (error) {
        toast.error("Xóa bài hát thất bại !!!");
      }
    };
    fetchDelete();
    dispatch(actions.checkDelete(true));
  };

  const [anchorEl1, setAnchorEl1] = useState(null);

  const open1 = Boolean(anchorEl1);
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleAddSong = (item) => {
    const fetchSaveSong = async () => {
      try {
        const response = await apis.saveSongPlaylist(songData?.id_song, item);
        if (response?.status === 200) {
          toast.success("Thêm vào playlist thành công !!!");
        } else {
          toast.error("Thêm vào playlist thất bại !!!");
        }
      } catch (error) {
        toast.warn("Bài hát đã có trong playlist !!!");
      }
    };
    fetchSaveSong();
  };

  const handleEnter = () => {
    setisHover(true);
  };
  const handleLeave = () => {
    setisHover(false);
  };

  const count = (id) => {
    const fetchCount = async () => {
      const response = await apis.countTurnPlay(id);
    };
    fetchCount();
  };

  return (
    <div
      className="flex items-center p-[10px] border-t border-b border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] hover:rounded-md cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="flex items-center w-full"
        onClick={() => {
          if (songData?.id_song !== curSongId) {
            count(songData?.id_song);
            dispatch(actions.setCurSongId(songData?.id_song));
            dispatch(actions.play(true));
            dispatch(actions.playAlbum(true));
          }
        }}
      >
        <div className={`flex items-center gap-2 ${!isHideAlbum && "w-[50%]"}`}>
          {!isHideAlbum && <CiMusicNote1 />}
          <img
            className="rounded-[4px] w-10 h-10 object-cover"
            src={songData?.thumbnail}
            alt="thumbnail"
          />
          <div className="flex flex-col w-full">
            <span className="text-[14px] font-[sans-serif] text-text-Color">
              {isHideAlbum
                ? songData?.title
                : songData?.title?.length > 30
                ? `${songData?.title?.slice(0, 30)}...`
                : songData?.title}
            </span>
            <span className="text-[12px] font-[sans-serif] text-text-m69">
              {songData?.artistsNames}
            </span>
          </div>
        </div>
        {!isHideAlbum && (
          <div className="w-[40%] justify-center items-center text-[12px] font-[sans-serif] text-text-m69">
            {songData?.artistsNames?.length > 30
              ? `${songData?.artistsNames?.slice(0, 30)}...`
              : songData?.artistsNames}
          </div>
        )}
        <div className="flex flex-1 justify-end text-[12px] font-[sans-serif] text-text-m69">
          {moment.utc(songData?.duration * 1000).format("mm:ss")}
        </div>
      </div>
      {/* {more === "more" ? (
        <div
          className="flex flex-1 justify-end text-[12px] font-[sans-serif] text-text-m69 ml-2"
          onClick={handleClickIcon}
        >
          <HiOutlineDotsVertical size={20} />
        </div>
      ) : (
        {}
      )} */}
      <div className="w-[3%]">
        <div>
          {isHover && (
            <HiOutlineDotsVertical onClick={handleClickIcon1} size={20} />
          )}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {more === "more" ? (
              <MenuItem
                onClick={(e) => {
                  handleClose();
                  handleDelete();
                }}
              >
                <ListItemIcon>
                  <RemoveCircleIcon fontSize="small" />
                </ListItemIcon>
                Xóa khỏi Playlist
              </MenuItem>
            ) : (
              <MenuItem
                onClick={(e) => {
                  // handleClose();
                  setAnchorEl1(e.currentTarget);
                }}
              >
                <ListItemIcon>
                  <AddCircleOutlineIcon fontSize="small" />
                </ListItemIcon>
                Thêm vào playlist
              </MenuItem>
            )}

            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              <ListItemIcon>
                <AnimationOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Thông tin bài hát
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                handleClose();
              }}
            >
              <ListItemIcon>
                <ShareOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Chia sẽ
            </MenuItem>
          </Menu>
        </div>
        <div>
          <Menu
            anchorEl={anchorEl1}
            id="account-menu"
            open={open1}
            onClose={handleClose1}
            onClick={handleClose1}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 10,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {plUser !== null ? (
              <div className="h-[200px] overflow-x-scroll">
                {plUser?.map((item) => (
                  <MenuItem
                    key={item?.id_playlist_user}
                    onClick={(e) => {
                      handleClose1();
                      handleAddSong(item?.id_playlist_user);
                    }}
                  >
                    <ListItemIcon>
                      <img
                        src={item?.thumbnail}
                        alt="login"
                        className="w-[40px] h-[40px] object-cover rounded-full mr-[8px]"
                        onClick={handleClickIcon}
                      />
                    </ListItemIcon>
                    {item?.name}
                  </MenuItem>
                ))}
              </div>
            ) : (
              ""
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default memo(List);
