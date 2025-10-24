import { useRef, useState, useEffect, useCallback } from "react";
//components
import Header from "../components/header";
import { useLocalStorage } from "../components/functions/useLocalStorage";
import Description from "@/components/description";
import ImageSettings from "@/components/settings/imageSettings";
///animations and styles
import generalStyles from "@/components/styleExport";
import { motion } from "motion/react";
import "rc-slider/assets/index.css";

const { terminal, terminalLabel } = generalStyles;

export default function ImageConverter() {
  const [showImage, setShowImage] = useLocalStorage("showImage", false);
  const [asciiArt, setAsciiArt] = useState("");
  const [chars, setChars] = useState("@%#*+=-:. ");
  const [artSize, setArtSize] = useState(80);
  const [invert, setInvert] = useState(false);
  const [colored, setColored] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgSize = useRef({ width: 0, height: 0, x: 0, y: 0 });
  const refArt = useRef<HTMLPreElement>(null);

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

      const maxCanvasWidth = 250;
      const maxCanvasHeight = 205;
      canvas.width = maxCanvasWidth;
      canvas.height = maxCanvasHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate scale to fit an image while keeping aspect 'ratio'
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

      setAsciiArt(generateAscii(artSize, colored));
    };
  };

  // Generate ASCII art with canvas
  const generateAscii = useCallback(
    (asciiWidth: number, colored: boolean) => {
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

      // Convert brightness (0-255) to ASCII amount of character
      const getAsciiChar = (brightness: number) => {
        const index = Math.floor((brightness / 255) * (chars.length - 1));
        return chars[index];
      };

      // Aspect ratio correction: characters taller than wide
      const asciiHeight = Math.floor((imgHeight / imgWidth) * asciiWidth * 0.5);

      const xRatio = imgWidth / asciiWidth;
      const yRatio = imgHeight / asciiHeight;

      let asciiImage = "";

      // Loop through pixels with a step to prevent characters from overlapping
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
          const char = getAsciiChar(brightness);

          // asciiImage += getAsciiChar(brightness);
          if (colored) {
            asciiImage += `<span style="color: rgb(${r}, ${g}, ${b})">${char}</span>`;
          } else {
            asciiImage += char;
          }
        }
        asciiImage += "\n"; //new line after each row
      }

      return asciiImage;
    },
    [chars]
  );

  useEffect(() => {
    setAsciiArt(generateAscii(artSize, colored));
  }, [chars, artSize, colored, generateAscii]);

  return (
    <div>
      <Header />
      <div className={terminal}>
        <div className={terminalLabel}>
          <p> UW PICO 5.09 </p>
        </div>
        <div className="px-5">
          <Description showImage={showImage} setShowImage={setShowImage} />
          {/* if user is new we show the entire content after the text type animation */}
          {showImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ImageSettings
                canvasRef={canvasRef}
                uploadImage={uploadImage}
                artSize={artSize}
                setArtSize={setArtSize}
                chars={chars}
                setChars={setChars}
                invert={invert}
                setInvert={setInvert}
                colored={colored}
                setColored={setColored}
                asciiArt={asciiArt}
                refArt={refArt}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
//unload image and text component
