import React, { useEffect, useState } from "react";
import * as apis from "../apis";
import { toast } from "react-toastify";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const CommentForm = ({ id, childCancel }) => {
  const dispatch = useDispatch();
  const { curSongId, userLogin, songinfo } = useSelector(
    (state) => state.music
  );
  const [content, setContent] = useState("");
  const [button, setButton] = useState(false);

  const handelSubmit = () => {
    const fetchAddComment = async () => {
      try {
        if (content !== "") {
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
            childCancel(false);
          } else {
            toast.error("Thêm bình luận thất bại !!!");
          }
        }
      } catch (error) {
        toast.warn("Thêm bình luận lỗi !!!");
      }
    };
    fetchAddComment();
  };

  const handeCancel = () => {
    childCancel(false);
  };
  return (
    <div className="mt-3">
      <div className="flex gap-5 justify-center items-center">
        <img
          alt="avatar"
          className="w-[40px] h-[40px] ml-4 rounded-[10px]"
          src={userLogin?.user?.avatar}
        />
        <input
          type="text"
          value={content}
          placeholder="Nội dung bình luận"
          className="w-full h-[60%] mr-8 border border-black focus:outline-none p-2 rounded-lg"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex justify-end mr-10 mt-3 gap-2">
        <button
          type="button"
          className="py-[3px] px-[5px] rounded-[5px] border bg-gray-300 hover:bg-gray-500"
          onClick={handeCancel}
        >
          Hủy
        </button>
        <button
          type="button"
          className="py-[3px] px-[5px] rounded-[5px] border bg-blue-400 hover:bg-blue-600"
          onClick={handelSubmit}
        >
          Đăng
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
