import axios from "../axios";

// export const getHome = () =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await axios({
//         url: "/home",
//         method: "get",
//       });
//       console.log(response);
//       resolve(response);
//     } catch (error) {
//       reject(error);
//     }
//   });

export const getHome = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/playlists/playlists",
        // headers: { "content-type": "application/json" },
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getNewRelease = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/songs/songs",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getGenre = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/genres/genres",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getNewSong = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/songs/songs",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getAllAlbum = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/albums/albums",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getFavorite = (id_user) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/favorites/favorites",
        method: "get",
        params: { id: id_user },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
