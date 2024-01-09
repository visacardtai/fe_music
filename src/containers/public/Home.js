import React, { useEffect } from "react";
import { Slider, Section, NewRelease, SectionGenre } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../../apis";
import * as actions from "../../store/actions";

const Home = () => {
  const dispatch = useDispatch();
  const {
    Friday,
    hArtistTheme,
    hEditorTheme,
    h100,
    hAlbum,
    newRelease,
    genre,
  } = useSelector((state) => state.app);
  const { isLogin, login, userLogin } = useSelector((state) => state.music);
  // useEffect(() => {
  //   const fetchPlaylistUser = async () => {
  //     const response = await apis.playlistUser(userLogin?.id_user);

  //     if (response?.status === 200) {
  //       dispatch(actions.setPLUser(response?.data?.data));
  //     } else {
  //       dispatch(actions.setPLUser(null));
  //     }
  //   };
  //   fetchPlaylistUser();
  // }, [isLogin]);
  return (
    <div className="overflow-y-auto w-full">
      <Slider />
      <Section data={Friday} title="GỢI Ý CHO BẠN" />
      <Section data={hArtistTheme} title="NHẠC NGHE HÔM NAY" />
      <NewRelease data={newRelease} />
      <Section data={hEditorTheme} title="CÓ THỂ BẠN MUỐN NGHE" />
      <Section data={h100} title="ALBUM HOT" />
      <SectionGenre data={genre} title="THỂ LOẠI NHẠC" />
      <div className="w-full h-[120px]"></div>
    </div>
  );
};

export default Home;
