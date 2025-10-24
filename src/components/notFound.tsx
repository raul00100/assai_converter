import { Link } from "react-router-dom";
import error from "@/assciText/error.txt?raw";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className="bg-green-400 text-black p-5 flex flex-col items-center">
        <pre className="text-xs font-semibold">{error}</pre>
        <p className="font-mono text-4xl mt-10">
          Return
          <Link
            to="/"
            className="font-semibold cursor-pointer hover:underline ml-3"
          >
            HOME
          </Link>
        </p>
      </div>
    </div>
  );
}
