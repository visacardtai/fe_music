import axios from "../axios";

export const addSongBD = (
  title,
  artistsNames,
  thumbnail,
  source128,
  duration
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "pmdv/db/song/add/song",
        headers: { "content-type": "application/json" },
        method: "post",
        data: {
          title: title,
          artistsNames: artistsNames,
          thumbnail: thumbnail,
          source128: source128,
          duration: duration,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getAllArtist = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "artists/artists",
        headers: { "content-type": "application/json" },
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const addArtist = (id, idartist) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "pmdv/db/song/add/artists/song",
        headers: { "content-type": "application/json" },
        method: "post",
        params: { idSong: id },
        data: idartist,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const setAddArtist = (
  name,
  realName,
  birthday,
  thumbnail,
  sortBiography,
  national
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "artists/artist/id",
        headers: { "content-type": "application/json" },
        method: "post",
        data: {
          name: name,
          real_name: realName,
          birthday: birthday,
          thumbnail: thumbnail,
          biography: sortBiography,
          national: national,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getNotActiveSong = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "songs/songs/notactive",
        headers: { "content-type": "application/json" },
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const activeSong = (id_song) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "songs/songs/notactive",
        headers: { "content-type": "application/json" },
        method: "post",
        data: { id_song },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const editSong = (id_song, title, artistName) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "songs/song/id",
        headers: { "content-type": "application/json" },
        method: "put",
        data: { id_song, title, artistsNames: artistName },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const editArtist = (
  id_artists,
  name,
  real_name,
  national,
  birthday,
  biography
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "artists/artist/id",
        headers: { "content-type": "application/json" },
        method: "put",
        data: { id_artists, name, real_name, national, birthday, biography },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getAllGenre = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "genres/genres",
        headers: { "content-type": "application/json" },
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const addGenre = (name, title, url) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "genres/genres",
        headers: { "content-type": "application/json" },
        method: "post",
        data: { name, title, thumbnail: url },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const updateGenre = (id_genre, name, title) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "genres/genres",
        headers: { "content-type": "application/json" },
        method: "put",
        data: { id_genre, name, title },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getSongByIdGenre = (id_genre) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "genres/genre/id",
        headers: { "content-type": "application/json" },
        method: "get",
        params: { id: id_genre },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getSongNAGenre = (id_genre) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "genres/genre/song_genre",
        headers: { "content-type": "application/json" },
        method: "get",
        params: { id: id_genre },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const addSongGenre = (id_genre, id_song) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "genres/genre/id",
        headers: { "content-type": "application/json" },
        method: "post",
        data: { id_genre, id_song },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const deleteSongGenre = (id_genre, id_song) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "genres/genre/id",
        headers: { "content-type": "application/json" },
        method: "delete",
        data: { id_genre, id_song },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// admin playlist
export const updatePlaylist = (id_playlist, name, title, date) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "playlists/playlists",
        headers: { "content-type": "application/json" },
        method: "put",
        data: { id_playlist, name, title, date_create: date },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getSongNAPlaylist = (id_playlist) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "playlists/playlist/song_playlist",
        headers: { "content-type": "application/json" },
        method: "get",
        params: { id: id_playlist },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const addSongPlaylist = (id_playlist, id_song) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "playlists/playlists/id",
        headers: { "content-type": "application/json" },
        method: "post",
        data: { id_playlist, id_song },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const deleteSPlaylist = (id_playlist, id_song) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "playlists/playlists/id",
        headers: { "content-type": "application/json" },
        method: "delete",
        data: { id_playlist, id_song },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const addAPlaylist = (name, title, url, date) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "playlists/playlists",
        headers: { "content-type": "application/json" },
        method: "post",
        data: { name, title, thumbnail: url, date_create: date },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const addASong = (id_artists, id_song) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "artists/artist/song/id",
        headers: { "content-type": "application/json" },
        method: "put",
        data: { id_artists, id_song },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getCount = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "songs/songs/counts",
        headers: { "content-type": "application/json" },
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// get favorite_song
export const getChartFavorite = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "favorites/favorites/chart",
        headers: { "content-type": "application/json" },
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
