import home from "../assciText/home.txt?raw";
import text from "../assciText/text.txt?raw";
import image from "../assciText/image.txt?raw";
import video from "../assciText/video.txt?raw";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const headerText = [
    { path: "/", element: home },
    { path: "/text", element: text },
    { path: "/image", element: image },
    { path: "/video", element: video },
  ];

  return (
    <header className="bg-black border-b-1 border-zinc-600 w-screen h-[120px] flex items-center justify-center">
      <ul>
        {headerText.map((item, idx) => (
          <li key={idx}>
            {location.pathname === item.path && (
              <pre className="whitespace-pre text-green-400 scale-70 mb-3">
                {item.element}
              </pre>
            )}
          </li>
        ))}
      </ul>
    </header>
  );
}
