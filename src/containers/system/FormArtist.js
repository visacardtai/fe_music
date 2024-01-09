import React, { useState, useEffect } from "react";
import icons from "../../ultis/icons";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import * as apis from "../../apis";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { storage } from "./firebase";
import moment from "moment";

const {
  RiContactsLine,
  IoEarth,
  SiNamecheap,
  BsCalendarDay,
  BsFillPersonVcardFill,
} = icons;
const FormArtist = () => {
  const [name, setName] = useState("");
  const [realName, setRealName] = useState("");
  const [sortbio, setSortbio] = useState("");
  const [datef, setDatef] = useState(null);
  const [national, setNational] = useState("");
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [file0, setFile0] = useState(null);
  const [urlIMG, seturlIMG] = useState(null);
  const [a, seta] = useState(0);
  const [idSong, setidSong] = useState(null);

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

  const handleSubmit = () => {
    setDatef(moment(datef, "YYYY-MM-DD").format("YYYY/MM/DD"));
    if (file0) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file0.name);
      fileRef.put(file0).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          seturlIMG(url);
          seta((prev) => prev + 1);
        });
      });
    }
  };
  useEffect(() => {
    if (a !== 0) {
      const fetchAddSong = async () => {
        try {
          const response = await apis.setAddArtist(
            name,
            realName,
            datef,
            urlIMG,
            sortbio,
            national
          );
          if (response?.status === 200) {
            toast.success("Thêm nghệ sĩ thành công !!!");
            setidSong(response?.data?.data?.idSong);
            dispatch(actions.adminaddartist(false));
            dispatch(actions.checkAddArtist((prev) => !prev));
            seta(0);
            setFile0(null);
          } else {
            toast.error("Thêm nghệ sĩ thất bại !!!");
            seta(0);
            setFile0(null);
          }
        } catch (error) {
          toast.error("Thêm nghệ sĩ thất bại !!!");
          seta(0);
          setFile0(null);
        }
      };
      if (name === "") {
        toast.warn("Name không được để trống !!!");
      } else if (realName === "") {
        toast.warn("RealName không được để trống !!!");
      } else if (sortbio === "") {
        toast.warn("Sortbiography không được để trống !!!");
      } else if (datef === null) {
        toast.warn("Date không được để trống !!!");
      } else if (national === "") {
        toast.warn("National không được để trống !!!");
      } else {
        fetchAddSong();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a]);

  return (
    <form className="flex flex-col h-[100%] w-[100%]">
      <h2 className="text-[25px] font-[sans-serif] text-text-Color flex items-center justify-center mb-[60px] mt-[40px]">
        Thêm Nghệ Sĩ
      </h2>
      <div className="flex-none flex">
        <div className="mt-[15px]">
          <div className="flex ml-[100px] mb-[30px] w-[300px] gap-3">
            <span>
              <RiContactsLine size={25} />
            </span>
            <input
              className="w-[80%] h-[30px] bg-transparent border-b-2"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex ml-[100px] mb-[30px] w-[300px] gap-3">
            <span>
              <BsFillPersonVcardFill size={25} />
            </span>
            <input
              className="w-[80%] h-[30px] bg-transparent border-b-2"
              type="text"
              placeholder="Real Name"
              onChange={(e) => setRealName(e.target.value)}
              required
            />
          </div>
          <div className="flex ml-[100px] mb-[30px] w-[300px] gap-3">
            <span>
              <BsCalendarDay size={25} />
            </span>
            <input
              className="w-[80%] h-[30px] bg-transparent border-b-2"
              type="date"
              onChange={(e) => setDatef(e.target.value)}
              required
            />
          </div>
          <div className="flex ml-[100px] mb-[30px] w-[300px] gap-3">
            <span>
              <SiNamecheap size={25} />
            </span>
            <input
              className="w-[80%] h-[30px] bg-transparent border-b-2"
              type="text"
              placeholder="Sort Biography"
              onChange={(e) => setSortbio(e.target.value)}
              required
            />
          </div>
          <div className="flex ml-[100px] mb-[30px] w-[300px] gap-3">
            <span>
              <IoEarth size={25} />
            </span>
            <input
              className="w-[80%] h-[30px] bg-transparent border-b-2"
              type="text"
              placeholder="National"
              onChange={(e) => setNational(e.target.value)}
              required
            />
          </div>
        </div>
        <div
          {...getRootProps1()}
          className="border border-blue-500 h-[200px] w-[200px] ml-[150px] mt-[50px] rounded-md"
        >
          <input {...getInputProps1()} />
          {image ? (
            <img
              src={image}
              alt="Preview"
              className="w-[200px] h-[200px] rounded-md"
            />
          ) : (
            <p>Drag and drop an image here, or click to select one.</p>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex justify-center items-center">
          <div className="ml-[400px]">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-[100px] bg-main-500 py-2 text-[16px] font-[sans-serif] text-white rounded-l-full rounded-r-full flex items-center justify-center gap-1"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormArtist;
