import React, { useState } from "react";
import icons from "../../ultis/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";
import * as apis from "../../apis";
import { useDropzone } from "react-dropzone";
import { storage } from "./firebase";

const { AiOutlineCloseCircle, BiConversation, RiContactsLine } = icons;

const FormAddGenre = () => {
  const { adminaddgenre } = useSelector((state) => state.music);
  const [title, settitle] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [file0, setFile0] = useState(null);
  const dispatch = useDispatch();

  const onDrop1 = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile0(acceptedFiles[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const {
    getRootProps: getRootProps1,
    getInputProps: getInputProps1,
    isDragActive: isDragActive1,
  } = useDropzone({
    accept: "image/*",
    onDrop: onDrop1,
  });

  const handleAdd = () => {
    try {
      if (title === "" || name === "") {
        toast.warn("Titel và Name không được để trống !!!");
      } else {
        if (file0) {
          const storageRef = storage.ref();
          const fileRef = storageRef.child(file0.name);
          fileRef.put(file0).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
              const fetchAdd = async () => {
                const response = await apis.addGenre(name, title, url);
                if (response?.status === 200) {
                  toast.success("Thêm thể loại thành công !!!");
                  dispatch(actions.checkAddGenre((prev) => !prev));
                  dispatch(actions.adminaddgenre(false));
                } else {
                  toast.error("Thêm thể loại thất bại !!!");
                }
              };
              if (title !== "" && name !== "") {
                fetchAdd();
              }
            });
          });
        } else {
          toast.warn("Vui lòng chọn hình ảnh cho thể loại !!!");
        }
      }
    } catch (error) {
      toast.error("Thêm thể loại thất bại !!!");
    }
  };
  return (
    <div className="fixed w-full h-screen bg-overlay-30 z-50 flex items-center justify-center">
      <div className="bg-main-300 flex flex-col w-[25%] h-[70%] rounded-md">
        <div className="w-full flex justify-end">
          <span
            onClick={() => {
              if (adminaddgenre === true) {
                dispatch(actions.adminaddgenre(false));
              }
            }}
            className="cursor-pointer w-[30px] hover:text-gray-400"
          >
            <AiOutlineCloseCircle size={30} />
          </span>
        </div>
        <div className="w-full h-full flex flex-col items-center gap-6">
          <div className="">
            <h4 className="font-bold font-[sans-serif] text-[18px]">
              Thêm Thể Loại
            </h4>
          </div>
          <div
            {...getRootProps1()}
            className="border border-blue-500 h-[150px] w-[150px] rounded-md"
          >
            <input {...getInputProps1()} />
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-[150px] h-[150px] rounded-md"
              />
            ) : (
              <p>Drag and drop an image here, or click to select one.</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex w-[250px] gap-3">
              <span>
                <BiConversation size={25} />
              </span>
              <input
                className="w-[80%] h-[30px] bg-transparent border-b-2"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex w-[250px] gap-3">
              <span>
                <RiContactsLine size={25} />
              </span>
              <input
                className="w-[80%] h-[30px] bg-transparent border-b-2"
                type="text"
                placeholder="Title"
                onChange={(e) => settitle(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mb-8">
          <button
            variant="info"
            className="bg-green-500 py-1 px-4 rounded-l-full rounded-r-full hover:bg-green-400"
            onClick={handleAdd}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAddGenre;
