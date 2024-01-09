import React, { useState, useEffect } from "react";
import icons from "../../ultis/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import * as apis from "../../apis";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { storage } from "./firebase";
import { Scrollbars } from "react-custom-scrollbars-2";

const { BiConversation, RiContactsLine } = icons;
const FormAdd = () => {
  const [title, settitle] = useState("");
  const [artistsNames, setartistsNames] = useState("");
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [file0, setFile0] = useState(null);
  const [file1, setFile1] = useState(null);
  const [duration, setduration] = useState(0);
  const [urlIMG, seturlIMG] = useState(null);
  const [urlMP3, seturlMP3] = useState(null);
  const [a, seta] = useState(0);
  const [b, setb] = useState(0);
  const [allArtist, setallArtist] = useState(null);
  const [listArtist, setlistArtist] = useState([]);
  const [imgArtist, setimgArtist] = useState([]);
  const [idSong, setidSong] = useState(null);

  const [reload, setReload] = useState(false);
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

  const onDrop2 = (acceptedFiles) => {
    setFile1(acceptedFiles[0]);
  };

  const {
    getRootProps: getRootProps2,
    getInputProps: getInputProps2,
    isDragActive: isDragActive2,
  } = useDropzone({ accept: "audio/mp3", onDrop: onDrop2 });

  const handleSubmit = () => {
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
    if (file1) {
      const storageRef1 = storage.ref();
      const fileRef1 = storageRef1.child(file1.name);
      fileRef1.put(file1).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          seturlMP3(url);
          const audio = new Audio(url);
          audio.addEventListener("loadedmetadata", () => {
            setduration(Math.round(audio.duration));
            setb((prev) => prev + 1);
          });
          toast.success("Thêm bài hát thành công !!!");
          setReload((prev) => !prev);
        });
      });
    }
  };

  const handleAdd = () => {
    // const fetchAddArtist = async () => {
    //   try {
    //     const data = JSON.stringify(listArtist);
    //     const response = await apis.addArtist(idSong, data);
    //     if (response?.status === 200) {
    //       toast.success("Thêm Artist thành công!!!");
    //       dispatch(actions.checkAddSong((prev) => !prev));
    //     } else {
    //       toast.warn("Thêm Artist thất bại!!!");
    //     }
    //   } catch (error) {
    //     toast.warn("Thêm Artist thất bại!!!");
    //   }
    // };
    // fetchAddArtist();
    if (title === "" || artistsNames === "") {
      toast.warn("Title và ArtistNames không được để trống !!!");
    } else {
      if (b === a && a !== 0 && b !== 0 && duration !== 0) {
        const fetchAddSong = async () => {
          try {
            const response = await apis.addSongBDAdmin(
              title,
              artistsNames,
              urlIMG,
              urlMP3,
              duration,
              listArtist[0]
            );
            if (response?.status === 200) {
              toast.success("Thêm bài hát thành công");
              seta(0);
              setb(0);
              setFile0(null);
              setFile1(null);
              dispatch(actions.checkAddSong((prev) => !prev));
            } else {
              toast.error("Thêm bài hát thất bại");
              seta(0);
              setb(0);
              setFile0(null);
              setFile1(null);
            }
          } catch (error) {
            toast.error("Thêm bài hát thất bại");
            seta(0);
            setb(0);
            setFile0(null);
            setFile1(null);
          }
        };
        fetchAddSong();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  // useEffect(() => {

  // }, [b]);

  useEffect(() => {
    const fetchAddSong = async () => {
      try {
        const response = await apis.getAllArtist();
        if (response?.status === 200) {
          setallArtist(response?.data?.data);
        } else {
          setallArtist(null);
          toast.error("Call Artist thất bại !!!");
        }
      } catch (error) {
        toast.error("Call Artist thất bại !!!");
      }
    };
    fetchAddSong();
  }, []);

  return (
    <form className="flex flex-col h-[100%] w-[100%]">
      <h2 className="text-[25px] font-[sans-serif] text-text-Color flex items-center justify-center mb-[60px] mt-[40px]">
        Thêm Bài Hát
      </h2>
      <div className="flex-none flex">
        <div className="mt-[30px]">
          <div className="flex ml-[100px] mb-[30px] w-[300px] gap-3">
            <span>
              <BiConversation size={25} />
            </span>
            <input
              className="w-[80%] h-[30px] bg-transparent border-b-2"
              type="text"
              placeholder="Title"
              onChange={(e) => settitle(e.target.value)}
              required
            />
          </div>
          <div className="flex ml-[100px] mb-[30px] w-[300px] gap-3">
            <span>
              <RiContactsLine size={25} />
            </span>
            <input
              className="w-[80%] h-[30px] bg-transparent border-b-2"
              type="text"
              placeholder="Artist Name"
              onChange={(e) => setartistsNames(e.target.value)}
              required
            />
          </div>
        </div>
        <div
          {...getRootProps1()}
          className="border border-blue-500 h-[150px] w-[150px] ml-[50px] rounded-md"
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
        <div
          {...getRootProps2()}
          className="border border-blue-500 h-[150px] w-[150px] ml-[50px] rounded-md"
        >
          <input {...getInputProps2()} />
          {isDragActive2 ? (
            <p>Drop the MP3 file here ...</p>
          ) : (
            <p>
              Drag 'n' drop an MP3 file here, or click to select an MP3 file
            </p>
          )}
          {file1 && <p>Đã có bài hát</p>}
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex justify-center items-center">
          <div className="ml-[100px]">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-[100px] bg-main-500 py-2 text-[16px] font-[sans-serif] text-white rounded-l-full rounded-r-full flex items-center justify-center gap-1"
            >
              Upload
            </button>
          </div>
          <div className="ml-[18px]">
            <button
              type="button"
              onClick={handleAdd}
              className="w-[100px] bg-main-500 py-2 text-[16px] font-[sans-serif] text-white rounded-l-full rounded-r-full flex items-center justify-center gap-1"
            >
              Hoàn tất
            </button>
          </div>
        </div>
        <div className="w-[400px] min-h-[120px] flex">
          <div className="w-1/2 h-full flex flex-wrap mr-[6px]">
            {imgArtist &&
              imgArtist?.map((item, index) => (
                <div
                  key={index}
                  className="flex w-[30%] h-[40px] justify-between items-center p-[10px] gap-[10px] rounded-full cursor-pointer hover:bg-blue-400"
                  onClick={() => {
                    const newarr = imgArtist.filter((ite, i) => i !== index);
                    setimgArtist(newarr);
                    const newarr1 = listArtist.filter((ite, i) => i !== index);
                    setlistArtist(newarr1);
                  }}
                >
                  <img
                    src={item}
                    alt="img"
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>
              ))}
          </div>
          <div className="w-1/2 h-full">
            <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
              {allArtist &&
                allArtist?.map((item) => (
                  <div
                    key={item?.id_artists}
                    className="w-full h-[40px] flex gap-2 mb-[6px] rounded-md cursor-pointer hover:bg-blue-400"
                    onClick={() => {
                      if (!imgArtist.includes(item?.thumbnail)) {
                        setimgArtist((prev) => [...prev, item?.thumbnail]);
                      }
                      if (!listArtist.includes(item?.id_artists)) {
                        setlistArtist((prev) => [...prev, item?.id_artists]);
                      }
                    }}
                  >
                    <img
                      src={item?.thumbnail}
                      alt="img"
                      className="w-[40px] h-[40px] rounded-full"
                    />
                    <span className="flex items-center text-[14px] font-[sans-serif] text-text-Color">
                      {item?.name}
                    </span>
                  </div>
                ))}
            </Scrollbars>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormAdd;
