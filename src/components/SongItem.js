import React, { memo, useState } from "react";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import icons from "../ultis/icons";
import * as apis from "../apis";
import { toast } from "react-toastify";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AnimationOutlinedIcon from "@mui/icons-material/AnimationOutlined";

const { HiOutlineDotsVertical } = icons;

const SongItem = ({
  thumbnail,
  title,
  artists,
  releaseDate,
  sid,
  size,
  style,
}) => {
  const dispatch = useDispatch();
  const { plUser, curSongId } = useSelector((state) => state.music);
  const [isHover, setisHover] = useState(false);
  const handleEnter = () => {
    setisHover(true);
  };
  const handleLeave = () => {
    setisHover(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickIcon = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl1, setAnchorEl1] = useState(null);

  const open1 = Boolean(anchorEl1);
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleAddSong = (item) => {
    const fetchSaveSong = async () => {
      try {
        const response = await apis.saveSongPlaylist(sid, item);
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

  const count = (id) => {
    const fetchCount = async () => {
      const response = await apis.countTurnPlay(id);
    };
    fetchCount();
  };

  return (
    <div
      className={`w-full flex justify-between items-center p-[10px] gap-[10px] hover:bg-main-200 cursor-pointer rounded-md ${
        style || "text-black hover:bg-main-200"
      }`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="flex gap-4 w-[90%]"
        onClick={() => {
          if (sid !== curSongId) {
            dispatch(actions.setCurSongId(sid));
            dispatch(actions.play(true));
            count(sid);
          }
        }}
      >
        <img
          src={thumbnail}
          alt=""
          className={`${size || "w-[60px] h-[60px]"} object-cover rounded-md`}
        />
        <div className="flex flex-col">
          <span className="text-[14px] font-[sans-serif] text-text-Color">
            {title?.length > 24 ? `${title?.slice(0, 24)}...` : title}
          </span>
          <span className="text-[12px] font-[sans-serif] text-text-m69">
            {artists?.length > 28 ? `${artists?.slice(0, 28)}...` : artists}
          </span>
          {releaseDate && (
            <span className="text-[12px] font-[sans-serif] text-text-m69">
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      <div className="w-[10%]">
        {isHover && (
          <HiOutlineDotsVertical onClick={handleClickIcon} size={20} />
        )}
        <div>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            // onClick={handleClose}
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

export default memo(SongItem);
