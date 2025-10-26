import home from "../assciText/home.txt?raw";
import text from "../assciText/text.txt?raw";
import image from "../assciText/image.txt?raw";
import { useLocation } from "react-router-dom";
import arrow from "../assciText/arrow.txt?raw";
import { Link } from "react-router-dom";

const arrowStyle = "lg:text-[7px] text-[4px] text-green-400 cursor-pointer";

export default function Header() {
  const location = useLocation();
  const headerText = [
    { path: "/", element: home },
    { path: "/text", element: text },
    { path: "/image", element: image },
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
      className={`bg-black border-b-1 border-zinc-600 w-screen lg:h-[120px] h-[90px] flex justify-between items-center lg:px-5 px-2`}
    >
      {location.pathname !== "/" ? (
        <Link to={previousPage[location.pathname] ?? "/"}>
          <pre className={`${arrowStyle} rotate-180`}> {arrow} </pre>
        </Link>
      ) : (
        <div className="h-10 lg:w-20 w-5" />
      )}
      {headerText.map(
        (item, idx) =>
          location.pathname === item.path && (
            <pre
              key={idx}
              className="whitespace-pre text-green-400 mb-3 lg:text-xs text-[7px]"
            >
              {item.element}
            </pre>
          )
      )}
      {location.pathname !== "/image" ? (
        <Link to={nextPageMap[location.pathname] ?? "/"}>
          <pre className={`${arrowStyle}`}> {arrow} </pre>
        </Link>
      ) : (
        <div className="h-1 lg:w-20 w-5" />
      )}
    </header>
  );
}
