import axios from "../axios";

export const apiGetSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/songsources/songsource/",
        headers: { "content-type": "application/json" },
        method: "get",
        params: { id: sid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetDetailSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/songs/song/id",
        headers: { "content-type": "application/json" },
        method: "get",
        params: { id: sid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetDetailPlayList = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/playlists/playlist/",
        method: "get",
        params: { id: pid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetDetailAlbum = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/albums/album/",
        method: "get",
        params: { id: pid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiSearch = (keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/searchs/search",
        method: "get",
        params: { key: keyword },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const checkLogin = (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/accounts/login",
        headers: { "content-type": "application/json" },
        method: "post",
        data: { username: email, password: password },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const register = (firstname, lastname, email, password, phone, gender) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/accounts/register",
        headers: { "content-type": "application/json" },
        method: "post",
        data: {
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password,
          gender: gender,
          phone: phone,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// forget Password
export const forgetpassword = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/accounts/forgetpassword",
        headers: { "content-type": "application/json" },
        method: "post",
        data: {
          email: email,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const playlistUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/playlistusers/playlistuser",
        headers: { "content-type": "application/json" },
        method: "get",
        params: { id: id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getSongPlaylist = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/playlistusers//playlistuser/id/",
        headers: { "content-type": "application/json" },
        method: "get",
        params: { id: id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Thêm bài hát vào playlist cá nhân người dùng
export const saveSongPlaylist = (sid, item) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "playlistusers/playlistuser/id",
        headers: { "content-type": "application/json" },
        method: "post",
        data: { id_song: sid, id_playlist_user: item },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Xóa bài hát khỏi playlist cá nhân người dùng
export const deleteSongPlaylist = (sid, item) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "playlistusers/playlistuser/id",
        headers: { "content-type": "application/json" },
        method: "delete",
        data: { id_song: sid, id_playlist_user: item },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Tao playlist cá nhân người dùng
export const addPlaylist = (id, name, title) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/playlistusers/playlistuser",
        headers: { "content-type": "application/json" },
        method: "post",
        data: { id_user: id, name: name, title: title },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Get Comment
export const getAllComment = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/comments/comment/",
        headers: { "content-type": "application/json" },
        method: "get",
        params: { id: id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
// Add Comment
export const addComment = (id_user, id_song, content, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/comments/comment",
        headers: { "content-type": "application/json" },
        method: "post",
        data: { id_user, id_song, content, parentId: id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// API add Song for user
export const addSongBDUser = (title, artistsNames, urlIMG, urlMP3, duration) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "songs/song/source",
        headers: { "content-type": "application/json" },
        method: "post",
        data: {
          title: title,
          artistsNames: artistsNames,
          thumbnail: urlIMG,
          source_128: urlMP3,
          duration: duration,
          status: 0,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// API add Song for Admin
export const addSongBDAdmin = (
  title,
  artistsNames,
  urlIMG,
  urlMP3,
  duration,
  id_artists
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "songs/song/source",
        headers: { "content-type": "application/json" },
        method: "post",
        data: {
          title: title,
          artistsNames: artistsNames,
          thumbnail: urlIMG,
          source_128: urlMP3,
          duration: duration,
          status: 1,
          id_artists: id_artists,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const countTurnPlay = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "songs/song/count",
        headers: { "content-type": "application/json" },
        method: "get",
        params: { id: id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Xóa bài hát yêu thích
export const deleteFavorite = (curSongId, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "favorites/favorites",
        headers: { "content-type": "application/json" },
        method: "delete",
        data: { id_song: curSongId, id_user: id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// Thêm bài hát yêu thích
export const addFavorite = (curSongId, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "favorites/favorites",
        headers: { "content-type": "application/json" },
        method: "post",
        data: { id_song: curSongId, id_user: id },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// User Update Information
export const updateInfo = (firstName, lastName, gender, phone, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "users/user/id",
        headers: { "content-type": "application/json" },
        method: "post",
        data: {
          first_name: firstName,
          last_name: lastName,
          gender,
          phone,
          id_user: id,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// User change password
export const changePassword = (oldPassword, newPassword, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "users/user/password",
        headers: { "content-type": "application/json" },
        method: "post",
        data: {
          oldPassword,
          newPassword,
          id_account: id,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
