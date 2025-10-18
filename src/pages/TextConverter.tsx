import Header from "../components/header";
import { useState, useEffect } from "react";
import TextType from "../animation/TextType";
import DecryptedText from "../animation/DecryptedTextProps";
import figlet, { availableFonts } from "../components/asciiFonts";

const field =
  "w-50 h-11.5 border-1 border-green-400 focus:border-2 px-1.5 outline-none mr-5";

export default function TextConverter() {
  const [showed, setShowed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("showed") === "true";
    }
    return false;
  });
  const [input, setInput] = useState("");
  const [ascii, setAscii] = useState("");
  const [font, setFont] = useState("Standard");

  useEffect(() => {
    if (showed && typeof window !== "undefined") {
      localStorage.setItem("showed", "true");
    }
  }, [showed]);

  useEffect(() => {
    figlet.text(input, { font }, (err, data) => {
      if (!err && data) setAscii(data);
    });
  }, [input, font]);

  const handleCopy = async () => {
    try {
      navigator.clipboard.writeText(ascii);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen overflow-auto">
      <div className="w-screen flex flex-row">
        <Header />
      </div>
      <div
        className={`bg-black border-1 border-zinc-500 text-white w-[1300px] h-[510px]  font-mono flex flex-col mt-10 mx-auto`}
      >
        <div className="flex items-center m-3 bg-white text-black pl-3">
          <p> UW PICO 5.09 </p>
        </div>
        <div className="px-5 pb-5">
          {showed ? (
            <div>
              <div className="flex flex-col gap-5 text-sm">
                <DecryptedText text="On this page, you can convert your text into ascii style with different types of fonts." />
                <DecryptedText text="You might get something like this, try it yourself!" />
              </div>
              <div className="whitespace-pre font-mono flex flex-col mt-10 truncate">
                <div className="flex flex-row gap-5">
                  <div className="flex flex-col gap-2">
                    <label>Type here:</label>
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="..."
                      className={field}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Choose font:</label>
                    <select
                      value={font}
                      onChange={(e) => setFont(e.target.value)}
                      className={field}
                    >
                      {availableFonts.map((f) => (
                        <option
                          key={f}
                          value={f}
                          className="bg-black border-1 border-green-400"
                        >
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  {input !== "" && (
                    <button
                      onClick={handleCopy}
                      className="w-30 h-11 border-1 border-green-400 hover:bg-green-400 hover:text-black tex-white cursor-pointer active:scale-90 mt-8 "
                    >
                      Copy
                    </button>
                  )}
                </div>
              </div>
              <pre className="text-white text-base mt-8">{ascii}</pre>
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
