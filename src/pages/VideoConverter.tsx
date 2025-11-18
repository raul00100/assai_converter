//components
import { useRef, useState, useCallback, useEffect } from "react";
import Header from "@/components/header";
import { useLocalStorage } from "@/components/functions/useLocalStorage";
import Description from "@/components/description";
import VideoSettings from "@/components/settings/videoSettings";
import useWarning from "@/components/warning";
//styles and animations
import generalStyles from "@/components/styleExport";
import { motion } from "framer-motion";

const { terminal, terminalLabel, innerContainer } = generalStyles;

export default function VideoConverter() {
  const [showVideo, setShowVideo] = useLocalStorage("showVideo", false);
  const [unsavedData, setUnsavedData] = useState(false);
  const [asciiArt, setAsciiArt] = useState("");
  const [chars, setChars] = useLocalStorage("charsVid", "classChars");
  const [artSize, setArtSize] = useLocalStorage("artSizeVid", 80);
  const [colored, setColored] = useState(false);
  const [invert, setInvert] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [ended, setEnded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSize = useRef({ width: 0, height: 0, x: 0, y: 0 });
  const refArt = useRef<HTMLPreElement>(null);

  const isPlaying = useRef(false);

  useWarning(unsavedData);

  const uploadVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) return;

    const url = URL.createObjectURL(file);

    const video = videoRef.current;
    if (!video) return;

    video.src = url;
    video.play();
    isPlaying.current = true;

    video.onloadedmetadata = () => {
      initVideoCanvas();
      renderVideoFrame();
    };
    video.onended = () => {
      isPlaying.current = false;
      setEnded(true);
    };

    setUnsavedData(true);
  };

  const initVideoCanvas = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxCanvasWidth = 240;
    const maxCanvasHeight = 205;

    canvas.width = maxCanvasWidth;
    canvas.height = maxCanvasHeight;

    const scale = Math.min(
      canvas.width / video.videoWidth,
      canvas.height / video.videoHeight
    );

    const scaledWidth = video.videoWidth * scale;
    const scaledHeight = video.videoHeight * scale;

    const x = (canvas.width - scaledWidth) / 2;
    const y = (canvas.height - scaledHeight) / 2;

    videoSize.current = { width: scaledWidth, height: scaledHeight, x, y };
  };

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
      } = videoSize.current;

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

        asciiImage += colored ? "<br/>" : "\n";
      }

      return asciiImage;
    },
    [chars]
  );

  const renderVideoFrame = useCallback(() => {
    if (!isPlaying.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height, x, y } = videoSize.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(video, x, y, width, height);

    setAsciiArt(generateAscii(artSize, colored));

    requestAnimationFrame(renderVideoFrame);
  }, [artSize, colored, generateAscii]);

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setEnded(false);
      setPlaying(true);
    }
  };

  useEffect(() => {
    setAsciiArt(generateAscii(artSize, colored));
  }, [chars, artSize, colored, generateAscii]);

  useEffect(() => {
    if (playing && !ended) {
      isPlaying.current = true;
      renderVideoFrame();
    } else {
      isPlaying.current = false;
    }
  }, [playing, ended, renderVideoFrame]);

  return (
    <div onClick={() => setShowVideo(true)}>
      <Header />
      <div className={terminal}>
        <div className={terminalLabel}>
          <p> UW PICO 5.09 </p>
        </div>
        <div className={innerContainer}>
          <Description showVideo={showVideo} setShowVideo={setShowVideo} />
          {/* if user is new we show the entire content after the text type animation */}
          {showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          )}
          {showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <VideoSettings
                canvasRef={canvasRef}
                uploadVideo={uploadVideo}
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
                videoRef={videoRef}
                playing={playing}
                setPlaying={setPlaying}
                handleReplay={handleReplay}
                ended={ended}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
