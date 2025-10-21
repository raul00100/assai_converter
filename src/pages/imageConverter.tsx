import { useState, useRef } from "react";
//components
import Header from "../components/header";
import { useLocalStorage } from "../components/useLocalStorage";
// import linux from "../assciText/linux.txt?raw";
// import linuxImg from "../images/linuxImg.webp";
// import arrow2 from "../assciText/arrow2.txt?raw";
//animations and styles
import TextType from "../animation/TextType";
import DecryptedText from "../animation/DecryptedTextProps";
import generalStyles from "@/components/styleExport";
import { motion } from "motion/react";

const { terminal, terminalLabel } = generalStyles;

export default function ImageConverter() {
  const [showImage, setShowImage] = useLocalStorage("showImage", false);
  const [asciiArt, setAsciiArt] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const asciiChars = "@%#*+=-:. "; // ASCII characters from dark to light

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  // Convert brightness (0-255) to ASCII character (0-9)
  const getAsciiChar = (brightness: number) => {
    const index = Math.floor((brightness / 255) * (asciiChars.length - 1));
    return asciiChars[index];
  };

  // Generate ASCII art from the canvas
  const generateAscii = () => {
    const canvas = canvasRef.current;
    if (!canvas) return "";

    const context = canvas.getContext("2d");
    if (!context) return "";

    const { data, width, height } = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    let asciiImage = "";

    // Loop through pixels with step to prevent characters from overlapping
    for (let y = 0; y < height; y += 12) {
      // vertical step
      for (let x = 0; x < width; x += 8) {
        // horizontal step
        const index = (y * width + x) * 4; // each pixel has 4 values (R,G,B,A)
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];

        // Calculate brightness using human eye perception formula
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

        asciiImage += getAsciiChar(brightness);
      }
      asciiImage += "\n"; // new line after each row
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
                <DecryptedText text="On this page you can upload an image and convert it into ASCII" />
                {/* <DecryptedText text="Here is some examples:" /> */}
              </div>
            </motion.div>
          ) : (
            <div>
              <TextType
                text={[
                  `On this page you can upload an image and convert it into ASCII\n\n`,
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
              {/* <div className="flex flex-row items-center mt-5">
                <img
                  src={linuxImg}
                  alt="linux penguin"
                  className="h-80 p-2 w-65 bg-zinc-900 mr-10 "
                />
                <pre className="text-[5px]">{arrow2}</pre>
                <pre className="text-[5px] py-2">{linux}</pre>
              </div> */}
              <div className="flex flex-row mt-20 items-center">
                <div className="flex flex-col w-100 gap-2 mr-20">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={uploadImage}
                    className="border-1 border-green-400 w-100 h-10 flex items-center p-2 flex-col"
                  />
                  <canvas
                    ref={canvasRef}
                    width="600"
                    height="300"
                    className="border-1 border-green-400"
                  />
                  <button
                    onClick={() => setAsciiArt(generateAscii)}
                    className="border-1 hover:bg-green-400 border-green-400 h-11 w-25 hover:text-black"
                  >
                    Convert
                  </button>
                </div>

                <pre className="font-mono text-xs whitespace-pre">
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
