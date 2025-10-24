import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import TextConverter from "./pages/textConverter";
import ImageConverter from "./pages/imageConverter";
import VideoConverter from "./pages/videoConverter";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/text",
      element: <TextConverter />,
    },
    {
      path: "/image",
      element: <ImageConverter />,
    },
    {
      path: "/video",
      element: <VideoConverter />,
    },
  ]);

  return (
    <div className="bg-[#0d1116ff] w-screen h-screen overflow-auto">
      <RouterProvider router={router} />
    </div>
  );
}
