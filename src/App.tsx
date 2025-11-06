import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import TextConverter from "./pages/TextConvertor";
import ImageConverter from "./pages/imageConverter";
import NotFound from "./pages/notFound";
import VideoConverter from "./pages/VideoConverter";

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
      path: "*",
      element: <NotFound />,
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
