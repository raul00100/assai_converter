import Header from "../components/header";
import Terminal from "../components/terminal";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex justify-center mt-20">
        <Terminal />
      </div>
    </div>
  );
}
