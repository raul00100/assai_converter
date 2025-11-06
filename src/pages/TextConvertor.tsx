import { useState, useEffect, useRef } from "react";
//components
import Header from "../components/header";
import { useLocalStorage } from "../components/functions/useLocalStorage";
import Description from "@/components/description";
import TextSettings from "@/components/settings/textSettings";
//animations and styles
import generalStyles from "@/components/styleExport";
import { motion } from "motion/react";
import figlet from "@/components/styleSelection/fontSettings";

const { terminal, terminalLabel, innerContainer } = generalStyles;

export default function TextConverter() {
  const [showText, setShowText] = useLocalStorage("showText", false);
  const [input, setInput] = useLocalStorage("input", "QWERTY");
  const [ascii, setAscii] = useLocalStorage("ascii", "");
  const [font, setFont] = useLocalStorage("font", "Standard");
  const [textColor, setTextColor] = useLocalStorage("textColor", "#00ff00");
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
  }, [input, font, setAscii]);

  return (
    <div onClick={() => setShowText(true)}>
      <Header />
      <div className={terminal}>
        <div className={terminalLabel}>
          <p> UW PICO 5.09 </p>
        </div>
        <div className={innerContainer}>
          <Description showText={showText} setShowText={setShowText} />
          {/* if user is new we show the entire content after the text type animation */}
          {showText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* fields and ascii */}
              <TextSettings
                input={input}
                setInput={setInput}
                ascii={ascii}
                font={font}
                setFont={setFont}
                textColor={textColor}
                setTextColor={setTextColor}
                showColors={showColors}
                setShowColors={setShowColors}
                textSize={textSize}
                setTextSize={setTextSize}
                inputRef={inputRef}
                refText={refText}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
