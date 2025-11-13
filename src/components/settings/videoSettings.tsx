//components
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Slider from "rc-slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { charOptions } from "../styleSelection/charOptions";
// import CopyDownload from "@/components/functions/copyDownload";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
///animations and styles
import generalStyles from "../styleExport";
import "rc-slider/assets/index.css";
import type React from "react";
//icons
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";

type VideoSettingsProp = {
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
  uploadVideo?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  artSize?: number;
  setArtSize?: React.Dispatch<React.SetStateAction<number>>;
  chars?: string;
  setChars?: React.Dispatch<React.SetStateAction<string>>;
  invert?: boolean;
  setInvert?: React.Dispatch<React.SetStateAction<boolean>>;
  colored?: boolean;
  setColored?: React.Dispatch<React.SetStateAction<boolean>>;
  asciiArt?: string;
  refArt?: React.RefObject<HTMLPreElement | null>;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  playing?: boolean;
  setPlaying?: React.Dispatch<React.SetStateAction<boolean>>;
  handleReplay?: () => void;
  ended?: boolean;
};
const {
  field,
  fieldCont,
  selectItemStyle,
  selectTriggerStyle,
  selectContentStyle,
  settingsContainer,
  canvasContainer,
} = generalStyles;
const settingRow =
  "flex lg:flex-row flex-col lg:gap-15 gap-7 border-b-1 border-green-400 pb-6 lg:w-124.5 w-[300px] mx-auto lf:mx-0";
const icons = "scale-130 hover:scale-150 active:scale-100 transition-all";

export default function VideoSettings({
  canvasRef,
  uploadVideo,
  artSize,
  setArtSize,
  chars,
  setChars,
  invert,
  setInvert,
  colored,
  setColored,
  asciiArt,
  refArt,
  videoRef,
  playing,
  setPlaying,
  handleReplay,
  ended,
}: VideoSettingsProp) {
  return (
    <div className={settingsContainer}>
      {/* panel with video upload and other settings */}
      <div className="flex lg:flex-row flex-col">
        {/* video upload input */}
        <div className="flex flex-col w-[265px] h-[265px] border-1 border-green-400 gap-1.5 lg:mr-20 items-center p-1.5 mx-auto">
          <div
            className={`relative w-full h-100 border-1 border-green-400 border-dashed items-center flex justify-center ${asciiArt ? "cursor-pointer" : "cursor-not-allowed"}`}
            onClick={() => {
              if (ended && handleReplay) {
                handleReplay();
              } else if (playing && videoRef && setPlaying) {
                videoRef.current?.pause();
                setPlaying(false);
              } else if (videoRef && setPlaying) {
                videoRef.current?.play();
                setPlaying(true);
              }
            }}
          >
            <canvas ref={canvasRef} />
            <video ref={videoRef} style={{ display: "none" }} />
            <div className="absolute flex items-center justify-center">
              {asciiArt ? (
                ended ? (
                  <ReplayIcon className={icons} />
                ) : playing ? (
                  <PauseIcon className={icons} />
                ) : (
                  <PlayArrowIcon className={icons} />
                )
              ) : null}
            </div>
          </div>

          <label className="border border-green-400 w-full h-10 flex items-center justify-center p-2 cursor-pointer gap-2 text-sm hover:bg-green-400 hover:text-black">
            Upload a video
            <input
              type="file"
              accept="video/*"
              onChange={uploadVideo}
              className="hidden"
              data-testid="input-vid"
            />
            <FileUploadIcon />
          </label>
        </div>
        {/* settings */}
        <div className="flex flex-col gap-7 lg:mt-0 mt-10">
          {/* 1 row */}
          <div className={settingRow}>
            <div>
              <label>Characters:</label>
              <div className="flex flex-row items-center gap-3 w-[218px] mt-1.5">
                <div data-testid="video-slider">
                  <Slider
                    min={30}
                    max={170}
                    value={artSize}
                    onChange={(value) => {
                      if (typeof value === "number" && setArtSize)
                        setArtSize(value);
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
                </div>
                <p>{artSize}</p>
              </div>
            </div>

            <div className={fieldCont}>
              <label>Style:</label>
              <Select value={chars} onValueChange={setChars}>
                <SelectTrigger
                  className={`${selectTriggerStyle} ${field} w-[218px]`}
                  data-testid="char-selector-vid"
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
                      value={char.name}
                      className={selectItemStyle}
                    >
                      {char.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 2 row  */}
          <div className={settingRow}>
            <FormControlLabel
              control={
                <Switch
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#4ade80", //🟢
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#4ade80", //checked track
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "#9ca3af", // unchecked track
                    },
                  }}
                  value={invert}
                  onChange={() => {
                    if (setInvert) setInvert((s) => !s);
                  }}
                  data-testid="invert-vid"
                />
              }
              label="Invert colors"
            />
            <FormControlLabel
              control={
                <Switch
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#4ade80", //🟢
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#4ade80", //checked track
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "#9ca3af", // unchecked track
                    },
                  }}
                  value={colored}
                  onChange={() => {
                    if (setColored) setColored((s) => !s);
                  }}
                  data-testid="colored-vid"
                />
              }
              label="Use original colors"
            />
          </div>
        </div>
      </div>
      {/* dangerouslySetInnerHTML is safe here because the data is generated by your own code, not entered by the user */}
      <div className={canvasContainer}>
        <pre
          className={`mt-10 whitespace-pre ${invert ? "bg-zinc-300 text-black" : "bg-black text-white"} text-sm `}
          ref={refArt}
          dangerouslySetInnerHTML={{ __html: asciiArt || "" }}
        />
      </div>
    </div>
  );
}
