import React, { useEffect, useState, useRef, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";
import { LoadingSong } from "./";
import { useNavigate } from "react-router-dom";

const {
  AiFillHeart,
  AiOutlineHeart,
  IoIosMore,
  IoRepeatOutline,
  IoShuffle,
  MdSkipNext,
  MdSkipPrevious,
  BsPlayCircle,
  BsPauseCircle,
  RiRepeatOneLine,
  RiPlayListLine,
  FiVolume1,
  FiVolume2,
  FiVolumeX,
} = icons;

var intervalId;

const Player = ({ setisShowSidebarRight }) => {
  const { curSongId, isPlaying, favorite, userLogin } = useSelector(
    (state) => state.music
  );
  const { newRelease } = useSelector((state) => state.app);
  const songs = newRelease?.data;
  const [songInfo, setSongInfo] = useState(null);
  // const [source, setSource] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const [isShuffle, setisShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [curSeconds, setcurSeconds] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isLoadSource, setisLoadSource] = useState(true);
  const [heart, setheart] = useState(true);
  const dispatch = useDispatch();
  const thumRef = useRef();
  const trackRef = useRef();
  const prevRef = useRef();

  const handleHeart = () => {
    const fetchFavorite = async () => {
      const response = await apis.deleteFavorite(curSongId, userLogin?.id_user);

      if (response?.status === 200) {
        const fetchFavorite = async () => {
          const response3 = await apis.getFavorite(userLogin?.id_user);

          if (response3?.status === 200) {
            dispatch(actions.getfavorite(response3?.data?.data));
          } else {
            dispatch(actions.getfavorite(null));
          }
        };
        fetchFavorite();
        setheart((prev) => !prev);
        toast.success("Thay đổi bài hát yêu thích thành công!!!");
      }
    };
    const fetchAddFavorite = async () => {
      const responseadd = await apis.addFavorite(curSongId, userLogin?.id_user);
      if (responseadd?.status === 200) {
        const fetchFavorite = async () => {
          const response3 = await apis.getFavorite(userLogin?.id_user);
          if (response3?.status === 200) {
            dispatch(actions.getfavorite(response3?.data?.data));
          } else {
            dispatch(actions.getfavorite(null));
          }
        };
        fetchFavorite();
        setheart(true);
        toast.success("Thêm bài hát yêu thích thành công!!!");
      } else {
        toast.error("Thêm bài hát yêu thích thất bại!!!");
      }
    };

    if (heart && favorite?.some((item) => item.id_song === curSongId)) {
      fetchFavorite();
    } else {
      fetchAddFavorite();
    }
  };

  useEffect(() => {
    const fetchDetailSong = async () => {
      setisLoadSource(false);
      const [response, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]); //curSongId
      setisLoadSource(true);
      if (response?.status === 200) {
        setSongInfo(response?.data?.data);
        dispatch(actions.addSongInfo(response?.data?.data));
      }
      if (res2?.status === 200) {
        audio.pause();
        const uri = res2?.data?.data?.source_128;
        setAudio(new Audio(uri));
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        toast.warn(res2?.data?.msg);
        setcurSeconds(0);
        thumRef.current.style.cssText = `right: 100%`;
      }
    };
    fetchDetailSong();
    setheart(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.load();
    if (isPlaying) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
        thumRef.current.style.cssText = `right: ${100 - percent}%`;
        setcurSeconds(Math.round(audio.currentTime));
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    if (isPlaying) {
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
        thumRef.current.style.cssText = `right: ${100 - percent}%`;
        setcurSeconds(Math.round(audio.currentTime));
      }, 100);
    }
    // eslint-disable-next-line
  }, [isPlaying]);

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : handleNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };

    // off web, delete memolist
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio, isShuffle, repeatMode]);

  useEffect(() => {
    audio.volume = volume / 100;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };

  const handleClickProgressBar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo?.duration) / 100;
    setcurSeconds(Math.round((percent * songInfo?.duration) / 100));
  };

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex = null;
      songs?.forEach((item, index) => {
        if (item?.id_song === curSongId) {
          if (index === songs?.length - 1) {
            currentSongIndex = -1;
          } else {
            currentSongIndex = index;
          }
        }
      });
      if (currentSongIndex !== null) {
        dispatch(actions.setCurSongId(songs[currentSongIndex + 1]?.id_song));
        dispatch(actions.play(true));
      } else {
        dispatch(actions.setCurSongId(songs[0]?.id));
        dispatch(actions.play(true));
      }
    }
  };

  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex = null;
      songs?.forEach((item, index) => {
        if (item?.id_song === curSongId) {
          if (index === 0) {
            currentSongIndex = songs?.length;
          } else {
            currentSongIndex = index;
          }
        }
      });
      if (currentSongIndex !== null) {
        dispatch(actions.setCurSongId(songs[currentSongIndex - 1]?.id_song));
        dispatch(actions.play(true));
      } else {
        dispatch(actions.setCurSongId(songs[0]?.id_song));
        dispatch(actions.play(true));
      }
    }
  };

  const handleShuffle = () => {
    let randomSong = Math.round(Math.random() * songs?.length) - 1;
    if (songs[randomSong]?.id_song === curSongId) {
      randomSong += 1;
    }
    dispatch(actions.setCurSongId(songs[randomSong]?.id_song));
    dispatch(actions.play(true));
  };

  const handleRepeatOne = () => {
    audio.play();
  };
  const navigate = useNavigate();
  const url = "thong-tin-bai-hat";
  const handleClick = () => {
    navigate(url);
  };

  return (
    <div className="bg-main-400 px-5 h-full flex py-2 cursor-pointer">
      <div className="w-[30%] flex-auto flex items-center gap-3">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md"
          onClick={handleClick}
        />
        <div className="flex flex-col">
          <span className="text-text-Color text-sm font-semibold">
            {songInfo?.title}
          </span>
          <span className="text-text-m69 text-xs">
            {songInfo?.artistsNames}
          </span>
        </div>

        <div className="flex gap-4 pl-4">
          <span onClick={handleHeart}>
            {/* {heart ? (
              <AiFillHeart size="16px" />
            ) : (
              <AiOutlineHeart size="16px" />
            )} */}
            {favorite?.some((item) => item.id_song === curSongId) && heart ? (
              <AiFillHeart size="16px" />
            ) : (
              <AiOutlineHeart size="16px" />
            )}
          </span>
          <span>
            <IoIosMore size="16px" />
          </span>
        </div>
      </div>

      <div className="w-[40%] flex-auto flex items-center justify-center flex-col gap-4">
        <div className="flex gap-7 items-center justify-center">
          <span
            className={`${isShuffle && "text-purple-800"}`}
            title="Bật phát ngẫu nhiên"
            onClick={() => setisShuffle((prev) => !prev)}
          >
            <IoShuffle size="22px" />
          </span>
          <span
            ref={prevRef}
            onClick={handlePrevSong}
            className={`${
              !songs ? "text-gray-500 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <MdSkipPrevious size="24px" />
          </span>
          <div
            className="hover:text-main-500 cursor-pointe"
            onClick={handleTogglePlayMusic}
          >
            {!isLoadSource ? (
              <LoadingSong />
            ) : isPlaying ? (
              <BsPauseCircle size={35} />
            ) : (
              <BsPlayCircle size={35} />
            )}
          </div>

          <span
            onClick={handleNextSong}
            className={`${
              !songs ? "text-gray-500 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <MdSkipNext size="24px" />
          </span>
          <span
            title="Bật phát lại tất cả"
            className={`${repeatMode && "text-purple-800"}`}
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
          >
            {repeatMode === 1 ? (
              <RiRepeatOneLine size="22px" />
            ) : (
              <IoRepeatOutline size="22px" />
            )}
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-2 text-[12px] font-[sans-serif] text-text-Color">
          <span className="font-light">
            {moment.utc(curSeconds * 1000).format("mm:ss")}
          </span>
          <div
            className="w-3/4 h-[3px] hover:h-[6px] rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)]"
            onClick={handleClickProgressBar}
            ref={trackRef}
          >
            <div
              ref={thumRef}
              className="absolute top-0 left-0 bottom-0 hover:h-[6px] rounded-l-full rounded-r-full bg-[#0e8080]"
            ></div>
          </div>
          <span className="font-bold">
            {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
          </span>
        </div>
      </div>

      <div className="w-[30%] flex-auto flex items-center justify-end gap-2">
        <div className="flex gap-2 items-center">
          <span onClick={() => setVolume((prev) => (+prev === 0 ? 70 : 0))}>
            {+volume === 0 ? (
              <FiVolumeX />
            ) : +volume >= 50 ? (
              <FiVolume2 />
            ) : (
              <FiVolume1 />
            )}
          </span>
          <input
            className=""
            type="range"
            step={1}
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
        <span
          onClick={() => setisShowSidebarRight((prev) => !prev)}
          className="rounded-sm bg-main-500 opacity-90 cursor-pointer p-1 hover:opacity-100"
        >
          <RiPlayListLine size={15} />
        </span>
      </div>
    </div>
  );
};

export default memo(Player);
