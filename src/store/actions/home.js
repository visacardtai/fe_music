import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const getHome = () => async (dispatch) => {
  try {
    const response = await apis.getHome();
    if (response?.status === 200) {
      dispatch({
        type: actionTypes.GET_HOME,
        homeData: response?.data?.data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_HOME,
        homeData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_HOME,
      homeData: null,
    });
  }
};

export const getNewRelease = () => async (dispatch) => {
  try {
    const response = await apis.getNewRelease();
    if (response?.status === 200) {
      dispatch({
        type: actionTypes.NEW_RELEASE,
        newrelease: response?.data,
      });
    } else {
      dispatch({
        type: actionTypes.NEW_RELEASE,
        newrelease: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.NEW_RELEASE,
      newrelease: null,
    });
  }
};

export const getGenre = () => async (dispatch) => {
  try {
    const response = await apis.getGenre();
    if (response?.status === 200) {
      dispatch({
        type: actionTypes.GENRE,
        genre: response?.data,
      });
    } else {
      dispatch({
        type: actionTypes.GENRE,
        genre: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GENRE,
      genre: null,
    });
  }
};

export const getNewSong = () => async (dispatch) => {
  try {
    const response = await apis.getNewSong();
    if (response?.status === 200) {
      dispatch({
        type: actionTypes.NEW_SONG,
        newsong: response?.data,
      });
    } else {
      dispatch({
        type: actionTypes.NEW_SONG,
        newsong: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.NEW_SONG,
      newsong: null,
    });
  }
};

export const getAllAlbum = () => async (dispatch) => {
  try {
    const response = await apis.getAllAlbum();
    if (response?.status === 200) {
      dispatch({
        type: actionTypes.ALBUM,
        album: response?.data?.data,
      });
    } else {
      dispatch({
        type: actionTypes.ALBUM,
        album: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ALBUM,
      album: null,
    });
  }
};
