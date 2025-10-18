import Header from "../components/header";
import Terminal from "../components/terminal";

export default function Home() {
  return (
    <div className="h-screen overflow-auto">
      <div className="w-screen flex flex-row">
        <Header />
      </div>
      <div className="flex justify-center mt-10 pb-20">
        <Terminal />
      </div>
    </div>
  );
}
