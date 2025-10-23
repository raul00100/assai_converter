import { useState, useEffect, useRef } from "react";
//components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import Header from "../components/header";
import CopyDownload from "@/components/functions/copyDownload";
import { sizes } from "@/components/symbols/fontSettings";
import { useLocalStorage } from "../components/functions/useLocalStorage";
//animations and styles
import TextType from "../animation/TextType";
import DecryptedText from "../animation/DecryptedTextProps";
import generalStyles from "@/components/styleExport";
import { motion } from "motion/react";
//libraries for customization
import figlet, { availableFonts } from "../components/symbols/fontSettings";
import { HexColorPicker } from "react-colorful";
//icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const {
  terminal,
  terminalLabel,
  field,
  fieldCont,
  selectItemStyle,
  selectTriggerStyle,
  selectContentStyle,
} = generalStyles;

export default function TextConverter() {
  const [showText, setShowText] = useLocalStorage("showText", false);
  const [input, setInput] = useLocalStorage("input", "QWERTY");
  const [ascii, setAscii] = useState("");
  const [font, setFont] = useLocalStorage("font", "Standard");
  const [textColor, setTextColor] = useLocalStorage("color", "#00ff00");
  const [showColors, setShowColors] = useState(false);
  const [textSize, setTextSize] = useLocalStorage("textSize", "16px");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const refText = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  //figlet library which we use for converting our text to ascii
  useEffect(() => {
    figlet.text(input, { font }, (err, data) => {
      if (!err && data) setAscii(data);
    });
  }, [input, font]);

  return (
    <div>
      <Header />
      <div className={terminal}>
        <div className={terminalLabel}>
          <p> UW PICO 5.09 </p>
        </div>
        {/* show textType animation once (when typeOf window === "undefined") and then use DecryptedText effect */}
        <div className="px-5 pb-5">
          {showText ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-5 text-sm">
                <DecryptedText text="On this page, you can convert your text into ascii style with different types of fonts and setting options!" />
              </div>
            </motion.div>
          ) : (
            <div>
              <TextType
                text={[
                  `On this page, you can convert your text into ascii style with different types of fonts and setting options!`,
                ]}
                typingSpeed={15}
                showCursor={true}
                cursorCharacter="|"
                onComplete={() => setShowText(true)}
                className="text-sm"
              />
            </div>
          )}
          {/* if user is new we show the entire content after the textype animation */}
          {showText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* fields and ascii */}
              <div className="whitespace-pre font-mono flex flex-col mt-15 items-start w-full ">
                {/* settings and save options */}
                <div>
                  {/* setting options */}
                  <div className="flex flex-row gap-5">
                    <div className={fieldCont}>
                      <label>Type here:</label>
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="..."
                        className={`${field} w-[218px]`}
                      />
                    </div>

                    <div className={fieldCont}>
                      <label>Choose font:</label>
                      <Select value={font} onValueChange={setFont}>
                        <SelectTrigger
                          className={`${selectTriggerStyle} ${field}`}
                        >
                          <SelectValue
                            placeholder="Theme"
                            className="outline-none"
                          />
                        </SelectTrigger>
                        <SelectContent className={selectContentStyle}>
                          {availableFonts.map((f) => (
                            <SelectItem
                              key={f}
                              value={f}
                              className={selectItemStyle}
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
                          className={`${selectTriggerStyle} ${field}`}
                        >
                          <SelectValue className="outline-none" />
                        </SelectTrigger>
                        <SelectContent className={selectContentStyle}>
                          {sizes.map((s) => (
                            <SelectItem
                              key={s.name}
                              value={s.size}
                              className={selectItemStyle}
                            >
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className={fieldCont}>
                      <label>Choose Color:</label>
                      <div className="relative">
                        <div
                          className={`${field} w-[218px] flex items-center justify-center cursor-pointer`}
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
                            <div className="p-2 rounded-none border-1 border-green-400 bg-black">
                              <HexColorPicker
                                color={textColor}
                                onChange={setTextColor}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* copy and save  */}
                  {/* allow copy when input is not empty  */}
                  {input !== "" ? (
                    <div className="h-[80px] flex items-center">
                      <CopyDownload
                        ascii={ascii}
                        refText={refText}
                        textColor={textColor}
                        textSize={textSize}
                      />
                    </div>
                  ) : (
                    <div className="h-[80px] w-20" />
                  )}
                </div>

                {/* limit width parameter to make ascii scrollable */}
                <div className="mt-5 w-full max-w-[1300px] h-[300px] flex items-center overflow-auto">
                  <pre
                    className={`font-mono whitespace-pre`}
                    style={{ color: textColor, fontSize: textSize }}
                    ref={refText}
                  >
                    {ascii}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
