import actionTypes from "../actions/actionTypes";

const initState = {
  userLogin: null,
  login: false,
  curSongId: "1",
  isPlaying: false,
  songinfo: {},
  favorite: null,
  email: "",
  password: "",
  atAlbum: false,
  songs: null,
  isLogin: false,
  isRegister: false,
  searchData: {},
  img: "",
  plUser: null,
  checkDelete: false,
  adminadd: false,
  adminedit: false,
  adminReload: false,
  adminReloadArtist: false,
  admineditartist: false,
  adminaddartist: false,
  adminaddasong: false,

  adminaddgenre: false,
  checkAddGenre: false,
  checkAddSongGenre: false,

  checkAddSong: false,
  checkAddArtist: false,
  admineditgenre: false,
  adminasonggenre: false,

  // Admin playlist
  adminaddplaylist: false,
  admineditplaylist: false,
  adminasongplaylist: false,
  checkAddPlaylist: false,
  checkAddSongPlaylist: false,

  //comment
  checkRepl: false,
  forgetPassword: false,

  // information
  checkUpdateInfo: false,
  checkChangePW: false,
};

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid || null,
      };
    case actionTypes.USER:
      return {
        ...state,
        userLogin: action.userLogin || null,
      };
    case actionTypes.FAVORITE:
      return {
        ...state,
        favorite: action.favorite || null,
      };
    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case actionTypes.SET_ALBUM:
      return {
        ...state,
        atAlbum: action.flag,
      };
    case actionTypes.PLAYLIST:
      return {
        ...state,
        songs: action.songs || null,
      };
    case actionTypes.SONGINFO:
      return {
        ...state,
        songinfo: action.songinfo || null,
      };
    case actionTypes.SEARCH:
      return {
        ...state,
        searchData: action?.data || {},
      };
    case actionTypes.ISLOGIN:
      return {
        ...state,
        isLogin: action.flag,
      };
    case actionTypes.ISREGISTER:
      return {
        ...state,
        isRegister: action.flag,
      };
    case actionTypes.LOGIN:
      return {
        ...state,
        login: action.flag,
      };
    case actionTypes.SAVE_LOGIN:
      return {
        ...state,
        email: action.email,
        password: action.password,
      };
    case actionTypes.IMG:
      return {
        ...state,
        img: action.img,
      };
    case actionTypes.PLUSER:
      return {
        ...state,
        plUser: action.pluser || null,
      };
    case actionTypes.CHECK_DELELE:
      return {
        ...state,
        checkDelete: action.flag || false,
      };
    case actionTypes.ADMIN_ADD:
      return {
        ...state,
        adminadd: action.flag || false,
      };
    case actionTypes.ADMIN_EDIT:
      return {
        ...state,
        adminedit: action.flag || false,
      };
    case actionTypes.ADMIN_EDIT_RELOAD:
      return {
        ...state,
        adminReload: action.flag || false,
      };
    case actionTypes.ADMIN_EDIT_RELOAD_ARTIST:
      return {
        ...state,
        adminReloadArtist: action.flag || false,
      };
    case actionTypes.ADMIN_EDIT_ARTIST:
      return {
        ...state,
        admineditartist: action.flag || false,
      };
    case actionTypes.ADMIN_ADD_ARTIST:
      return {
        ...state,
        adminaddartist: action.flag || false,
      };
    case actionTypes.CHECK_ADD_SONG:
      return {
        ...state,
        checkAddSong: action.flag,
      };
    case actionTypes.CHECK_ADD_ARTIST:
      return {
        ...state,
        checkAddArtist: action.flag,
      };
    case actionTypes.ADMIN_ADD_ASONG:
      return {
        ...state,
        adminaddasong: action.flag,
      };

    // Admin Genre
    case actionTypes.ADMIN_ADD_GENRE:
      return {
        ...state,
        adminaddgenre: action.flag,
      };
    case actionTypes.ADMIN_EDIT_GENRE:
      return {
        ...state,
        admineditgenre: action.flag,
      };
    case actionTypes.ADMIN_ASONG_GENRE:
      return {
        ...state,
        adminasonggenre: action.flag,
      };
    case actionTypes.CHECK_ADD_GENRE:
      return {
        ...state,
        checkAddGenre: action.flag,
      };
    case actionTypes.CHECK_ADD_SONG_GENRE:
      return {
        ...state,
        checkAddSongGenre: action.flag,
      };

    // Admin Playlist
    // Admin Genre
    case actionTypes.ADMIN_ADD_PLAYLIST:
      return {
        ...state,
        adminaddplaylist: action.flag,
      };
    case actionTypes.ADMIN_EDIT_PLAYLIST:
      return {
        ...state,
        admineditplaylist: action.flag,
      };
    case actionTypes.ADMIN_ASONG_PLAYLIST:
      return {
        ...state,
        adminasongplaylist: action.flag,
      };
    case actionTypes.CHECK_ADD_PLAYLIST:
      return {
        ...state,
        checkAddPlaylist: action.flag,
      };
    case actionTypes.CHECK_ADD_SONG_PLAYLIST:
      return {
        ...state,
        checkAddSongPlaylist: action.flag,
      };

    // comment
    case actionTypes.CHECKREPL:
      return {
        ...state,
        checkRepl: action.flag,
      };
    case actionTypes.FORGET_PASSWORD:
      return {
        ...state,
        forgetPassword: action.flag,
      };

    // information
    case actionTypes.UPDATEINFO:
      return {
        ...state,
        checkUpdateInfo: action.flag,
      };
    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        checkChangePW: action.flag,
      };
    default:
      return state;
  }
};

export default musicReducer;
