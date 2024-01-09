import React, { useState, useEffect } from "react";
import { Section, SectionItem } from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { SongItem } from "../../components/index";
import * as apis from "../../apis";
import * as actions from "../../store/actions";
import icons from "../../ultis/icons";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

const { IoAddCircleOutline } = icons;

const Personal = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const { Friday } = useSelector((state) => state.app);
  const { isLogin, login, plUser, userLogin } = useSelector(
    (state) => state.music
  );
  const [songs, setSongs] = useState([]);
  const [playlist, setplaylist] = useState(null);
  const [button, setbutton] = useState(false);
  useEffect(() => {
    if (login) {
      const fetchPlaylistUser = async () => {
        const response = await apis.playlistUser(userLogin?.id_user);
        if (response?.status === 200) {
          setplaylist(response?.data?.data);
        } else {
          setplaylist(null);
        }
      };
      fetchPlaylistUser();
    } else {
      dispatch(actions.isLogin(true));
    }
  }, [login, button]);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickIcon = (e) => {
    dispatch(actions.isLogin(true));
    setAnchorEl(e.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = () => {
    const fetchAddSong = async () => {
      try {
        if (name !== "" && title !== "") {
          const response = await apis.addPlaylist(
            userLogin?.id_user,
            name,
            title
          );
          if (response?.status === 200) {
            toast.success("Tạo playlist thành công !!!");
            setName("");
            setTitle("");
            setbutton((prev) => !prev);
            const fetchPlaylistUser = async () => {
              const response2 = await apis.playlistUser(userLogin?.id_user);

              if (response2?.status === 200) {
                dispatch(actions.setPLUser(response2?.data?.data));
              } else {
                dispatch(actions.setPLUser(null));
              }
            };
            fetchPlaylistUser();
          } else {
            toast.error("Tạo playlist thất bại !!!");
          }
        } else {
          toast.error("Tạo playlist thất bại !!!");
        }
      } catch (error) {
        toast.warn("Tạo playlist thất bại !!!");
      }
    };
    fetchAddSong();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        {" "}
        <h2 className="mt-12 px-[59px] font-bold text-[42px] font-[sans-serif] text-text-Color">
          Cá nhân
        </h2>
        {login && (
          <span
            className="mt-12 px-[59px] cursor-pointer"
            onClick={handleClickIcon}
          >
            <IoAddCircleOutline size={40} />
          </span>
        )}
      </div>
      <div>
        <Section data={Friday} title="GỢI Ý CHO BẠN" />
      </div>
      <div className="mt-12 px-[59px] flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[20px] font-[sans-serif] text-text-Color font-bold"></h3>
          <span className="text-[12px] font-[sans-serif] text-text-m69">
            TẤT CẢ
          </span>
        </div>
        <div className="flex items-center gap-5 text-xs">
          <button
            type="button"
            className="py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-main-500"
          >
            NHẠC CỦA BẠN
          </button>
          <button
            type="button"
            className="py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-main-500"
          >
            YÊU THÍCH
          </button>
          <button
            type="button"
            className="py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-main-500"
          >
            ĐÃ NGHE
          </button>
        </div>
      </div>
      <div>
        {login && (
          <div className="mt-12 px-[59px] flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-[sans-serif] text-text-Color font-bold">
                PLAYLIST CỦA BẠN
              </h3>
              <span className="text-[12px] font-[sans-serif] text-text-m69">
                TẤT CẢ
              </span>
            </div>
            <div
              className={`flex items-center gap-[28px] ${
                playlist?.length > 5 ? "overflow-x-auto" : ""
              }`}
            >
              {playlist &&
                playlist?.length > 0 &&
                playlist?.map((item) => (
                  <SectionItem
                    link={item?.link}
                    key={item?.id_playlist_user}
                    id={item?.id_playlist_user}
                    thumbnailM={item?.thumbnail_m}
                    title={item?.name}
                    artists={item?.artistsNames}
                    sortDescription={item?.title}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
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
          <MenuItem>
            <input
              className="w-full h-[30px] bg-transparent border-b-2"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </MenuItem>
          <MenuItem>
            <input
              className="w-full h-[30px] bg-transparent border-b-2"
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleClose();
              handleSubmit();
            }}
          >
            <div className="m-auto">
              <Button variant="contained" color="success">
                Success
              </Button>
            </div>
          </MenuItem>
        </Menu>
      </div>
      <div className="h-[300px]"></div>
    </div>
  );
};

export default Personal;
