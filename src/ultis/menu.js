import icons from "./icons";

const { MdOutlineLibraryMusic, BiPhotoAlbum, CgMenuRound } = icons;

export const sidebarMenu = [
  {
    path: "mymusic",
    text: "Cá nhân",
    icons: <MdOutlineLibraryMusic size="24px" />,
  },
  {
    path: "",
    text: "Khám phá",
    end: true,
    icons: <CgMenuRound size="24px" />,
  },
  {
    path: "all-album",
    text: "Album/Playlist",
    icons: <BiPhotoAlbum size="24px" />,
  },
  {
    path: "bai-hat",
    text: "Bài hát",
    icons: <MdOutlineLibraryMusic size="24px" />,
  },
];
