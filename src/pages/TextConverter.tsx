import Header from "../components/header";
import { useState, useEffect } from "react";
import TextType from "../animation/TextType";
import DecryptedText from "../animation/DecryptedTextProps";
import figlet, { availableFonts } from "../components/asciiFonts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import { HexColorPicker } from "react-colorful";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useLocalStorage } from "../components/useLocalStorage";

const field =
  "w-50 h-[44px] border-1 border-green-400 focus:border-2 p-1.5 outline-none mr-5";
const fieldCont = "flex flex-col gap-2";

export default function TextConverter() {
  const [showed, setShowed] = useLocalStorage("showed", false);
  const [input, setInput] = useLocalStorage("input", "QWERTY");
  const [ascii, setAscii] = useState("");
  const [font, setFont] = useLocalStorage("font", "Standard");
  const [color, setColor] = useLocalStorage("color", "#00ff00");
  const [showColors, setShowColors] = useState(false);
  const sizes = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"];
  const [textSize, setTextSize] = useLocalStorage("textSize", "text-sm");

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
        className={`bg-black border-1 border-zinc-500 text-white w-[1300px] min-h-[600px] max-h-[700px]  font-mono flex flex-col my-10 mx-auto`}
      >
        <div className="flex items-center m-3 bg-white text-black pl-3">
          <p> UW PICO 5.09 </p>
        </div>
        <div className="px-5 pb-5">
          {showed ? (
            <div>
              <div className="flex flex-col gap-5 text-sm">
                <DecryptedText text="On this page, you can convert your text into ascii style with different types of fonts and setting options." />
                <DecryptedText text="Just try it yourself!" />
              </div>
              {/* fields and ascii */}
              <div className="whitespace-pre font-mono flex flex-col mt-15 items-start w-full ">
                {/* only filed */}
                <div className="flex flex-row gap-5">
                  <div className={fieldCont}>
                    <label>Type here:</label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="..."
                      className={field}
                    />
                  </div>
                  <div className={fieldCont}>
                    <label>Choose font:</label>
                    <Select value={font} onValueChange={setFont}>
                      <SelectTrigger
                        className={`w-[180px] min-h-[44px] rounded-none ${field}`}
                      >
                        <SelectValue
                          placeholder="Theme"
                          className="outline-none"
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-none bg-black text-white border-1 border-green-400">
                        {availableFonts.map((f) => (
                          <SelectItem
                            key={f}
                            value={f}
                            className="bg-black border-1 border-green-400 rounded-none"
                          >
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className={fieldCont}>
                    <label>Choose text size:</label>
                    <Select value={textSize} onValueChange={setTextSize}>
                      <SelectTrigger
                        className={`w-[180px] min-h-[44px] rounded-none ${field}`}
                      >
                        <SelectValue
                          placeholder="Theme"
                          className="outline-none"
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-none bg-black text-white border-1 border-green-400">
                        {sizes.map((s) => (
                          <SelectItem
                            key={s}
                            value={s}
                            className="bg-black border-1 border-green-400 rounded-none"
                          >
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className={fieldCont}>
                    <label>Choose Color:</label>
                    <div className="relative">
                      <div
                        className={`${field} w-54.5 flex items-center justify-center cursor-pointer`}
                        onClick={() => setShowColors((s) => !s)}
                        role="button"
                        aria-expanded={showColors}
                      >
                        {showColors ? (
                          <KeyboardArrowUpIcon className="scale-140" />
                        ) : (
                          <KeyboardArrowDownIcon className="scale-140" />
                        )}
                      </div>

                      {showColors && (
                        <div className="absolute left-0 top-full mt-1 z-50">
                          <div className="bg-black p-2 rounded-none border-1 border-green-400">
                            <HexColorPicker color={color} onChange={setColor} />
                          </div>
                        </div>
                      )}
                    </div>
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
                <div className="mt-5 w-full max-w-[1300px] h-[300px] flex items-center overflow-auto">
                  <pre
                    className={`${textSize} font-mono whitespace-pre`}
                    style={{ color }}
                  >
                    {ascii}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <TextType
                text={[
                  `On this page, you can convert your text into ascii style with different types of fonts and setting options\n\nJust try it yourself!`,
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
