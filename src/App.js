import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Home,
  Login,
  Public,
  Personal,
  Album,
  Search,
  SearchSongs,
  SearchAll,
  AllAlbum,
  AllSong,
  InFor,
  InfoSong,
  GenreSong,
} from "./containers/public/index";
import {
  Song,
  Artist,
  Genre,
  Playlist,
  ChartBar,
  ChartFavorite,
} from "./containers/system/index";
import { Routes, Route } from "react-router-dom";
import path from "./ultis/path";
import * as actions from "./store/actions";
import * as apis from "./apis";

function App() {
  const dispatch = useDispatch();
  const { userLogin, email, password, login } = useSelector(
    (state) => state.music
  );
  const [role, setRole] = useState(undefined);
  useEffect(() => {
    dispatch(actions.getHome());
    dispatch(actions.getGenre());
    dispatch(actions.getNewRelease());
    dispatch(actions.getNewSong());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (email !== "" && password !== "") {
      const fetchLogin = async () => {
        const response = await apis.checkLogin(email, password);
        if (response?.status === 200) {
          setRole(response?.data?.data?.permission);
        }
      };
      fetchLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="App">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.INFORMATION} element={<InFor check={login} />} />
            <Route path={path.MY_MUSIC} element={<Personal />} />
            <Route path={path.ALL_ALBUM} element={<AllAlbum />} />
            <Route path={path.ALL_SONG} element={<AllSong />} />
            <Route path={path.THE_LOAI} element={<GenreSong />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
            <Route path={path.MYMUSIC__ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.ALBUM__TITLE__PID__ALL} element={<Album />} />
            <Route path={path.INFORSONG} element={<InfoSong />} />
            <Route path={path.SEARCH} element={<Search />}>
              <Route path={path.ALL} element={<SearchAll />} />
              <Route path={path.SONG} element={<SearchSongs />} />
            </Route>

            <Route path={path.START} element={<Home />} />
          </Route>
          <Route path={path.ADMIN} element={<Login role={role} />}>
            <Route path={path.ADSONG} element={<Song />} />
            <Route path={path.ADARTIST} element={<Artist />} />
            <Route path={path.GENRE} element={<Genre />} />
            <Route path={path.ADMINPLAYLIST} element={<Playlist />} />
            <Route path={path.CHART} element={<ChartBar />} />
            <Route path={path.CHARTFAVORITE} element={<ChartFavorite />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
