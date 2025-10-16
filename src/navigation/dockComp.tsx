import Dock from "./dock";
import { ALargeSmall, Image, Video, House } from "lucide-react";
const iconStyle = "text-white";

export default function DockComp() {
  const items = [
    {
      icon: <House size={18} className={iconStyle} />,
      label: "Home page",
      path: "/",
      //   onClick: () => alert("Home Page!"),
    },
    {
      icon: <ALargeSmall size={18} className={iconStyle} />,
      label: "Text converter",
      path: "/text",
      //   onClick: () => alert("Text Converter!"),
    },
    {
      icon: <Image size={18} className={iconStyle} />,
      label: "Archive converter",
      path: "/image",
      //   onClick: () => alert("Image Converter!"),
    },
    {
      icon: <Video size={18} className={iconStyle} />,
      label: "Video converter",
      path: "/video",
      //   onClick: () => alert("Video Converter!"),
    },
  ];
  return (
    <Dock items={items} panelHeight={68} baseItemSize={50} magnification={70} />
  );
}
