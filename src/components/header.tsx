import home from "../assciText/home.txt?raw";
import text from "../assciText/text.txt?raw";
import image from "../assciText/image.txt?raw";
import video from "../assciText/video.txt?raw";
import { useLocation } from "react-router-dom";
import arrow from "../assciText/arrow.txt?raw";
import { Link } from "react-router-dom";

const arrowStyle = "text-[7px] text-green-400 cursor-pointer";

export default function Header() {
  const location = useLocation();
  const headerText = [
    { path: "/", element: home },
    { path: "/text", element: text },
    { path: "/image", element: image },
    { path: "/video", element: video },
  ];

  const nextPageMap: Record<string, string> = {
    "/": "/text",
    "/text": "/image",
    "/image": "/video",
  };

  const previousPage: Record<string, string> = {
    "/video": "/image",
    "/image": "/text",
    "/text": "/",
  };

  return (
    <header
      className={`bg-black border-b-1 border-zinc-600 w-screen h-[120px] flex justify-between items-center px-5`}
    >
      {location.pathname !== "/" ? (
        <Link to={previousPage[location.pathname] ?? "/"}>
          <pre className={`${arrowStyle} rotate-180`}> {arrow} </pre>
        </Link>
      ) : (
        <div className="h-10 w-20" />
      )}
      {headerText.map(
        (item, idx) =>
          location.pathname === item.path && (
            <pre
              key={idx}
              className="whitespace-pre text-green-400 scale-70 mb-3"
            >
              {item.element}
            </pre>
          )
      )}
      {location.pathname !== "/video" ? (
        <Link to={nextPageMap[location.pathname] ?? "/"}>
          <pre className={`${arrowStyle}`}> {arrow} </pre>
        </Link>
      ) : (
        <div className="h-1- w-20" />
      )}
    </header>
  );
}
