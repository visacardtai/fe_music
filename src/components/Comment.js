import React, { useState } from "react";
import moment from "moment";
import CommentForm from "./CommentForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Comment = ({ data, replies }) => {
  const { userLogin } = useSelector((state) => state.music);
  const [repl, setRepl] = useState(false);

  const handleValueChange = (value) => {
    setRepl(value);
  };

  const handClick = () => {
    if (userLogin !== null) {
      setRepl((prev) => !prev);
    } else {
      toast.error("Bạn cần phải đăng nhập !!!");
    }
  };
  return (
    <div className="mt-5">
      <div className="flex gap-5">
        <img
          alt="avatar"
          className="w-[50px] h-[50px] ml-4 rounded-[10px]"
          src={data?.user?.avatar}
        />
        <div>
          <h5 className="text-blue-700">
            {data?.user?.first_name + " " + data?.user?.last_name}
          </h5>
          <span>{data?.content}</span>
          <div className="flex gap-3 text-[12px] font-[sans-serif] ">
            <span className="text-blue-500 cursor-pointer hover:underline">
              Thích
            </span>
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={handClick}
            >
              Phản hồi
            </span>
            <span className="text-text-m69">
              {moment(data?.date_create * 1000).fromNow()}
            </span>
          </div>
        </div>
      </div>
      {repl && (
        <div className="ml-[70px]">
          <CommentForm
            id={data?.parentId ? data?.parentId : data?.id_comment}
            childCancel={handleValueChange}
          />
        </div>
      )}
      {replies?.length > 0 && (
        <div className="ml-[70px]">
          {replies?.map((item) => (
            <Comment key={item?.id_comment} data={item} replies={[]} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
