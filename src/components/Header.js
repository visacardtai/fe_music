import React, { useState, useEffect } from "react";
import icons from "../ultis/icons";
import { Search } from "./";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import * as apis from "../apis";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";

const { BsArrowLeft, BsArrowRight, IoSearchOutline } = icons;

const Header = () => {
  const { login, userLogin, email, password, isLogin } = useSelector(
    (state) => state.music
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (email !== "" && password !== "") {
      const fetchLogin = async () => {
        const response = await apis.checkLogin(email, password);
        if (response?.status === 200) {
          dispatch(actions.setUserLogin(response?.data?.data));
          dispatch(actions.checkLogin(true));
          // dispatch(actions.isLogin(false));

          const fetchPlaylistUser = async () => {
            const response2 = await apis.playlistUser(
              response?.data?.data?.id_user
            );

            if (response2?.status === 200) {
              dispatch(actions.setPLUser(response2?.data?.data));
            } else {
              dispatch(actions.setPLUser(null));
            }
          };
          const fetchFavorite = async () => {
            const response3 = await apis.getFavorite(
              response?.data?.data?.id_user
            );

            if (response3?.status === 200) {
              dispatch(actions.getfavorite(response3?.data?.data));
            } else {
              dispatch(actions.getfavorite(null));
            }
          };
          fetchPlaylistUser();
          fetchFavorite();
        } else {
          dispatch(actions.setUserLogin({}));
        }
      };
      fetchLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickIcon = (e) => {
    dispatch(actions.isLogin(true));
    setAnchorEl(e.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-6 w-full">
        <div className="flex gap-6 text-gray-400">
          <span>
            <BsArrowLeft size={24} />
          </span>
          <span>
            <BsArrowRight size={24} />
          </span>
        </div>
        <div className="w-[60%] flex items-center rounded-[20px] bg-[#e4dde2]">
          <span className="text-gray-400 pl-4">
            <IoSearchOutline size={24} />
          </span>
          <div className="w-full rounded-r-[20px]">
            <Search />
          </div>
        </div>
      </div>
      <div>
        <div className="w-[50px] h-[50px] cursor-pointer hover:bg-main-500 rounded-full">
          {login ? (
            <img
              src={userLogin?.user?.avatar}
              alt="login"
              className="w-[50px] h-[50px] object-cover rounded-full"
              onClick={handleClickIcon}
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
              alt="login"
              onClick={handleClickIcon}
            />
          )}
          <div>
            {login && isLogin && (
              <div>
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
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("mymusic");
                    }}
                  >
                    <img
                      src={userLogin?.user?.avatar}
                      alt="login"
                      className="w-[40px] h-[40px] object-cover rounded-full mr-[10px]"
                    />{" "}
                    Cá nhân
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("information");
                    }}
                  >
                    <img
                      src={userLogin?.user?.avatar}
                      alt="login"
                      className="w-[40px] h-[40px] object-cover rounded-full mr-[10px]"
                    />{" "}
                    Tài khoản của bạn
                  </MenuItem>
                  <Divider />
                  {/* <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem> */}
                  {/* <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem> */}
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      dispatch(actions.saveLogin("", ""));
                      dispatch(actions.checkLogin(false));
                      dispatch(actions.isLogin(false));
                      dispatch(actions.setPLUser(null));
                      dispatch(actions.setUserLogin(null));
                      dispatch(actions.getfavorite(null));
                      // navigate("/");
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Đăng xuất
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
