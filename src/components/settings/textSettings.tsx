//components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import CopyDownload from "@/components/functions/copyDownload";
import { sizes } from "@/components/styleSelection/fontSettings";
//animations and styles
import generalStyles from "@/components/styleExport";
//libraries for customization
import { availableFonts } from "../styleSelection/fontSettings";
import { HexColorPicker } from "react-colorful";
//icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type TextSettingsProp = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  ascii: string;
  font: string;
  setFont: React.Dispatch<React.SetStateAction<string>>;
  textColor: string;
  setTextColor: React.Dispatch<React.SetStateAction<string>>;
  showColors: boolean;
  setShowColors: React.Dispatch<React.SetStateAction<boolean>>;
  textSize: string;
  setTextSize: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  refText: React.RefObject<HTMLPreElement | null>;
};

const {
  field,
  fieldCont,
  selectItemStyle,
  selectTriggerStyle,
  selectContentStyle,
} = generalStyles;

export default function TextSettings({
  input,
  setInput,
  ascii,
  font,
  setFont,
  textColor,
  setTextColor,
  showColors,
  setShowColors,
  textSize,
  setTextSize,
  inputRef,
  refText,
}: TextSettingsProp) {
  return (
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
              <SelectTrigger className={`${selectTriggerStyle} ${field}`}>
                <SelectValue placeholder="Theme" className="outline-none" />
              </SelectTrigger>
              <SelectContent className={selectContentStyle}>
                {availableFonts.map((f) => (
                  <SelectItem key={f} value={f} className={selectItemStyle}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className={fieldCont}>
            <label>Choose text size:</label>
            <Select value={textSize} onValueChange={setTextSize}>
              <SelectTrigger className={`${selectTriggerStyle} ${field}`}>
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
                    <HexColorPicker color={textColor} onChange={setTextColor} />
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
  );
}
