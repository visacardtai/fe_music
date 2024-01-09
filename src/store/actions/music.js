import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const setCurSongId = (sid) => ({
  type: actionTypes.SET_CUR_SONG_ID,
  sid,
});
export const addSongInfo = (songinfo) => ({
  type: actionTypes.SONGINFO,
  songinfo,
});

export const setUserLogin = (userLogin) => ({
  type: actionTypes.USER,
  userLogin,
});

export const getfavorite = (favorite) => ({
  type: actionTypes.FAVORITE,
  favorite,
});

export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
});

export const playAlbum = (flag) => ({
  type: actionTypes.SET_ALBUM,
  flag,
});

export const setPlaylist = (songs) => ({
  type: actionTypes.PLAYLIST,
  songs,
});

export const loading = (flag) => ({
  type: actionTypes.LOADING,
  flag,
});

export const isLogin = (flag) => ({
  type: actionTypes.ISLOGIN,
  flag,
});

export const isRegister = (flag) => ({
  type: actionTypes.ISREGISTER,
  flag,
});

export const checkLogin = (flag) => ({
  type: actionTypes.LOGIN,
  flag,
});

export const getIMG = (img) => ({
  type: actionTypes.IMG,
  img,
});

export const saveLogin = (email, password) => ({
  type: actionTypes.SAVE_LOGIN,
  email: email,
  password: password,
});

export const setPLUser = (pluser) => ({
  type: actionTypes.PLUSER,
  pluser,
});

export const checkDelete = (flag) => ({
  type: actionTypes.CHECK_DELELE,
  flag,
});

export const adminadd = (flag) => ({
  type: actionTypes.ADMIN_ADD,
  flag,
});
export const adminedit = (flag) => ({
  type: actionTypes.ADMIN_EDIT,
  flag,
});
export const adminReload = (flag) => ({
  type: actionTypes.ADMIN_EDIT_RELOAD,
  flag,
});
export const adminReloadArtist = (flag) => ({
  type: actionTypes.ADMIN_EDIT_RELOAD_ARTIST,
  flag,
});
export const admineditartist = (flag) => ({
  type: actionTypes.ADMIN_EDIT_ARTIST,
  flag,
});

export const adminaddartist = (flag) => ({
  type: actionTypes.ADMIN_ADD_ARTIST,
  flag,
});

export const adminaddasong = (flag) => ({
  type: actionTypes.ADMIN_ADD_ASONG,
  flag,
});

export const checkAddSong = (flag) => ({
  type: actionTypes.CHECK_ADD_SONG,
  flag,
});

export const checkAddArtist = (flag) => ({
  type: actionTypes.CHECK_ADD_ARTIST,
  flag,
});

// Admin Genre
export const adminaddgenre = (flag) => ({
  type: actionTypes.ADMIN_ADD_GENRE,
  flag,
});

export const admineditgenre = (flag) => ({
  type: actionTypes.ADMIN_EDIT_GENRE,
  flag,
});

export const adminasonggenre = (flag) => ({
  type: actionTypes.ADMIN_ASONG_GENRE,
  flag,
});

export const checkAddGenre = (flag) => ({
  type: actionTypes.CHECK_ADD_GENRE,
  flag,
});
export const checkAddSongGenre = (flag) => ({
  type: actionTypes.CHECK_ADD_SONG_GENRE,
  flag,
});

// Admin Playlist
export const adminaddplaylist = (flag) => ({
  type: actionTypes.ADMIN_ADD_PLAYLIST,
  flag,
});

export const admineditplaylist = (flag) => ({
  type: actionTypes.ADMIN_EDIT_PLAYLIST,
  flag,
});

export const adminasongplaylist = (flag) => ({
  type: actionTypes.ADMIN_ASONG_PLAYLIST,
  flag,
});

export const checkAddPlaylist = (flag) => ({
  type: actionTypes.CHECK_ADD_PLAYLIST,
  flag,
});
export const checkAddSongPlaylist = (flag) => ({
  type: actionTypes.CHECK_ADD_SONG_PLAYLIST,
  flag,
});

// comment
export const checkRepl = (flag) => ({
  type: actionTypes.CHECKREPL,
  flag,
});

export const isForgetPassword = (flag) => ({
  type: actionTypes.FORGET_PASSWORD,
  flag,
});

// information
export const checkUpdateInfo = (flag) => ({
  type: actionTypes.UPDATEINFO,
  flag,
});
export const checkChangePW = (flag) => ({
  type: actionTypes.CHANGE_PASSWORD,
  flag,
});

export const search = (keyWord) => async (dispatch) => {
  try {
    const response = await apis.apiSearch(keyWord);
    if (response?.status === 200) {
      dispatch({
        type: actionTypes.SEARCH,
        data: response?.data,
      });
    } else {
      dispatch({
        type: actionTypes.SEARCH,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.SEARCH,
      data: null,
    });
  }
};
