import { useRef, useState, useEffect } from "react";
//components
import Header from "../components/header";
import { useLocalStorage } from "../components/functions/useLocalStorage";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Slider from "rc-slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import { charOptions } from "../components/symbols/charOptions";
import CopyDownload from "@/components/functions/copyDownload";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
//animations and styles
import TextType from "../animation/TextType";
import DecryptedText from "../animation/DecryptedTextProps";
import generalStyles from "@/components/styleExport";
import { motion } from "motion/react";
import "rc-slider/assets/index.css";

const {
  terminal,
  terminalLabel,
  field,
  fieldCont,
  selectItemStyle,
  selectTriggerStyle,
  selectContentStyle,
} = generalStyles;
const settingRow =
  "flex flex-row gap-15 border-b-1 border-green-400 pb-5 w-124";

export default function ImageConverter() {
  const [showImage, setShowImage] = useLocalStorage("showImage", false);
  const [asciiArt, setAsciiArt] = useState("");
  const [chars, setChars] = useState("@%#*+=-:. ");
  const [artSize, setaArtSize] = useState(80);
  const [invert, setInvert] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgSize = useRef({ width: 0, height: 0, x: 0, y: 0 });
  const refArt = useRef<HTMLPreElement>(null);

  useEffect(() => {
    setAsciiArt(generateAscii(artSize));
  }, [chars, artSize]);

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const maxCanvasWidth = 230;
      const maxCanvasHeight = 190;
      canvas.width = maxCanvasWidth;
      canvas.height = maxCanvasHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate scale to fit image while keeping aspect ratio
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      // Center image
      const x = (canvas.width - scaledWidth) / 2;
      const y = (canvas.height - scaledHeight) / 2;

      imgSize.current = { width: scaledWidth, height: scaledHeight, x, y };

      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      setAsciiArt(generateAscii(artSize));
    };
  };

  // Convert brightness (0-255) to ASCII number of character
  const getAsciiChar = (brightness: number) => {
    const index = Math.floor((brightness / 255) * (chars.length - 1));
    return chars[index];
  };

  // Generate ASCII art with canvas
  const generateAscii = (asciiWidth: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return "";

    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const { data, width: canvasWidth } = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const {
      width: imgWidth,
      height: imgHeight,
      x: xOffset,
      y: yOffset,
    } = imgSize.current;

    // Aspect ratio correction: characters taller than wide
    const asciiHeight = Math.floor((imgHeight / imgWidth) * asciiWidth * 0.5);

    const xRatio = imgWidth / asciiWidth;
    const yRatio = imgHeight / asciiHeight;

    let asciiImage = "";

    // Loop through pixels with step to prevent characters from overlapping
    for (let y = 0; y < asciiHeight; y++) {
      for (let x = 0; x < asciiWidth; x++) {
        const px = Math.floor(xOffset + x * xRatio);
        const py = Math.floor(yOffset + y * yRatio);
        const index = (py * canvasWidth + px) * 4;

        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];

        // Calculate brightness using human eye perception formula
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

        asciiImage += getAsciiChar(brightness);
      }
      asciiImage += "\n"; //new line after each row
    }

    return asciiImage;
  };

  return (
    <div>
      <Header />
      <div className={terminal}>
        <div className={terminalLabel}>
          <p> UW PICO 5.09 </p>
        </div>
        {/* show textType animation once (when typeOf window === "undefined") and then use DecryptedText effect */}
        <div className="px-5">
          {showImage ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-5 text-sm">
                <DecryptedText text="On this page you can upload an image and convert it into ASCII using different character sets." />
              </div>
            </motion.div>
          ) : (
            <div>
              <TextType
                text={[
                  `On this page you can upload an image and convert it into ASCII using different character sets`,
                ]}
                typingSpeed={15}
                showCursor={true}
                cursorCharacter="|"
                onComplete={() => setShowImage(true)}
                className="text-sm"
              />
            </div>
          )}
          {/* if user is new we show the entire content after the textype animation */}
          {showImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col mt-20 items-center overflow-x-auto w-[1260px]">
                {/* panel with image upload and other settings */}
                <div className="flex flex-row">
                  {/* image upload input */}
                  <div className="flex flex-col w-[250px] h-[250px] border-1 border-green-400 gap-1.5 mr-20 items-center p-1.5">
                    <div className="w-59 h-100 border-1 border-green-400 border-dashed items-center flex justify-center">
                      <canvas ref={canvasRef} />
                    </div>

                    <label className="border border-green-400 w-[238px] h-10 flex items-center justify-center p-2 cursor-pointer gap-2 text-sm hover:bg-green-400 hover:text-black">
                      Upload an image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={uploadImage}
                        className="hidden"
                      />
                      <FileUploadIcon />
                    </label>
                  </div>
                  {/* settings */}
                  <div className={`flex flex-col gap-7`}>
                    {/* 1 row */}
                    <div className={settingRow}>
                      <div>
                        <label>Characters:</label>
                        <div className="flex flex-row items-center gap-1.5 w-[218px] mt-1.5">
                          <Slider
                            min={30}
                            max={170}
                            value={artSize}
                            onChange={(value) => {
                              if (typeof value === "number") setaArtSize(value);
                            }}
                            // active line
                            trackStyle={{
                              backgroundColor: "#4ade80",
                              height: 6, //
                            }}
                            // slider 🟢
                            handleStyle={{
                              borderColor: "#4ade80",
                              height: 15,
                              width: 15,
                              marginTop: -5,
                              backgroundColor: "#000000",
                            }}
                            // inactive line
                            railStyle={{
                              backgroundColor: "#333",
                              height: 6,
                            }}
                            className={`min-w-50`}
                          />
                          <p>{artSize}</p>
                        </div>
                      </div>

                      <div className={fieldCont}>
                        <label>Choose style:</label>
                        <Select value={chars} onValueChange={setChars}>
                          <SelectTrigger
                            className={`${selectTriggerStyle} ${field} w-[218px]`}
                          >
                            <SelectValue
                              placeholder="ASCII Style"
                              className="outline-none"
                            />
                          </SelectTrigger>
                          <SelectContent className={`${selectContentStyle}`}>
                            {charOptions.map((char, idx) => (
                              <SelectItem
                                key={idx}
                                value={char.elements}
                                className={selectItemStyle}
                              >
                                {char.name} - {char.elements}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className={settingRow}>
                      <FormControlLabel
                        control={
                          <Switch
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#4ade80", //🟢
                              },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                {
                                  backgroundColor: "#4ade80", //checked track
                                },
                              "& .MuiSwitch-track": {
                                backgroundColor: "#9ca3af", // unchecked track
                              },
                            }}
                            value={invert}
                            onChange={() => setInvert((s) => !s)}
                          />
                        }
                        label="Invert colors"
                      />
                    </div>

                    {/* allow to copy and save when asciiArt is not empty */}
                    {asciiArt && (
                      <CopyDownload asciiArt={asciiArt} refArt={refArt} />
                    )}
                  </div>
                </div>
                <pre
                  className={`font-mono text-xs whitespace-pre mt-10 ${
                    invert && "bg-zinc-200 text-black"
                  }`}
                  ref={refArt}
                >
                  {asciiArt}
                </pre>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

//show colors
//add more styles ✅
//invert colors ✅
//download all styles in html
