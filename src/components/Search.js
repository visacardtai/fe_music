import React, { useState } from "react";
import * as apis from "../apis";
import path from "../ultis/path";
import * as actions from "../store/actions";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyWord, setkeyWord] = useState("");
  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      dispatch(actions.search(keyWord));
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          key: keyWord,
        }).toString(),
      });
    }
  };

  return (
    <div className="w-[80%]">
      <input
        type="text"
        className="w-full outline-none bg-[#DDE4E4] py-[5px] px-2 h-10 text-gray-700"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        value={keyWord}
        onChange={(e) => setkeyWord(e.target.value)}
        onKeyUp={handleSearch}
      />
    </div>
  );
};

export default Search;
