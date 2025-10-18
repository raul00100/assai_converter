import Header from "../components/header";
import { useState, useEffect } from "react";
import TextType from "../animation/TextType";
import DecryptedText from "../animation/DecryptedTextProps";

export default function ImageConverter() {
  const [showed, setShowed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("showed") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (showed && typeof window !== "undefined") {
      localStorage.setItem("showShark", "true");
    }
  }, [showed]);

  return (
    <div className="h-screen overflow-auto">
      <div className="w-screen flex flex-row">
        <Header />
      </div>
      <div
        className={`bg-black border-1 border-zinc-500 text-white w-[1300px] min-h-[100px] max-h-[830px] font-mono flex flex-col mt-10 mx-auto`}
      >
        <div className="flex items-center m-3 bg-white text-black pl-3">
          <p> UW PICO 5.09 </p>
        </div>
        <div className="px-5">
          {showed ? (
            <div className="flex flex-col gap-5 text-sm">
              <DecryptedText text="About This Project " />
              <DecryptedText text="This website was created by an enthusiast who has always been fascinated by the beauty of ASCII art — the unique way of turning ordinary text, images, and videos into visual stories made entirely of characters." />
            </div>
          ) : (
            <div>
              <TextType
                text={[
                  `About This Project\n\nThis website was created by an enthusiast who has always been fascinated by the beauty of ASCII art — the unique way of turning ordinary text, images, and videos into visual stories made entirely of characters.\n\nIt was built out of pure passion, to let others experience the same joy and creativity that come from exploring this digital art form. Here, you can easily convert your own content into ASCII designs and see how technology and art come together in a simple yet mesmerizing way\n\nIsn't it cool ?`,
                ]}
                typingSpeed={15}
                showCursor={true}
                cursorCharacter="|"
                onComplete={() => setShowed(true)}
                className="text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
