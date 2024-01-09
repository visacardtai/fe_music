import React, { useEffect, useState } from "react";
import Comment from "../../components/Comment";
import * as apis from "../../apis";
import { toast } from "react-toastify";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const InfoSong = () => {
  const { curSongId, userLogin, songinfo, checkRepl } = useSelector(
    (state) => state.music
  );
  const [comment, setComment] = useState(null);
  const [content, setContent] = useState("");
  const [button, setButton] = useState(false);
  const [rootComments, setRootComments] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComment = async () => {
      const response = await apis.getAllComment(curSongId);
      if (response?.status === 200) {
        setComment(response?.data?.data);
        setRootComments(
          response?.data?.data?.filter((item) => item?.parentId === null)
        );
      } else {
        setComment(null);
      }
    };

    fetchComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkRepl]);

  const handelSubmit = () => {
    const fetchAddComment = async () => {
      try {
        if (content !== "") {
          const id = null;
          const response = await apis.addComment(
            userLogin?.id_user,
            curSongId,
            content,
            id
          );
          if (response?.status === 200) {
            toast.success("Thêm bình luận thành công !!!");
            setContent("");
            dispatch(actions.checkRepl((prev) => !prev));
          } else {
            toast.error("Thêm bình luận thất bại !!!");
          }
        }
      } catch (error) {
        toast.warn("Thêm bình luận thất bại !!!");
      }
    };
    if (userLogin !== null) {
      fetchAddComment();
    } else {
      toast.error("Bạn cần phải đăng nhập !!!");
    }
  };

  const getReplies = (id_comment) => {
    return comment
      .filter((item) => item?.parentId === id_comment)
      .sort((a, b) => a?.date_create - b?.date_create);
  };

  return (
    <div>
      <div className="w-full h-full flex flex-col gap-8">
        <div className="flex w-full mt-12">
          <div className="w-[50%] flex justify-end">
            <div className="w-[250px] h-[250px] mr-[100px]">
              <img
                alt="avatar"
                className="rounded-[30px] w-[250px] h-[250px]"
                src={songinfo?.thumbnail_m}
              />
            </div>
          </div>
          <div className="flex items-center w-[50%]">
            <div className="flex flex-col gap-2 items-center justify-center">
              <span className="text-[24px] font-bold">{songinfo?.title}</span>
              <span className="text-[16px] font-bold">
                {songinfo?.artistsNames}
              </span>
              <span className="text-[14px] font-[sans-serif]">
                Ngày phát hành: {moment(songinfo?.releaseDate * 1000).fromNow()}
              </span>
              <span className="text-[14px] font-[sans-serif]">
                Thời gian bài hát:{" "}
                {moment.utc(songinfo?.duration * 1000).format("mm:ss")}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 ml-[100px] mr-[100px]">
          <div className="flex justify-between ml-5 mr-5 mt-5">
            <h5>Bình luận</h5>
            <span>Sắp xếp</span>
          </div>
          <div className="mt-5">
            <div className="flex gap-5">
              <img
                alt="avatar"
                className="w-[50px] h-[50px] ml-4 rounded-[10px]"
                src={userLogin?.user?.avatar}
              />
              <input
                type="text"
                value={content}
                placeholder="Nội dung bình luận"
                className="w-full mr-8 border border-black focus:outline-none p-3 rounded-lg"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="flex justify-end mr-10 mt-3">
              <button
                type="button"
                className="py-1 px-4 rounded-[10px] border bg-blue-400 hover:bg-blue-600"
                onClick={handelSubmit}
              >
                Đăng
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            {rootComments?.map((item) => (
              <Comment
                key={item?.id_comment}
                data={item}
                replies={getReplies(item?.id_comment)}
              />
            ))}
          </div>
          <div className="h-[120px]"></div>
        </div>
      </div>
    </div>
  );
};

export default InfoSong;
