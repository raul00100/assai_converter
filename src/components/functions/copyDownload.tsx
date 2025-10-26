import generalStyles from "../styleExport";
import { useLocation } from "react-router-dom";

const { buttonStyle } = generalStyles;

type Props = {
  ascii?: string;
  asciiArt?: string;
  refText?: React.RefObject<HTMLPreElement | null>;
  refArt?: React.RefObject<HTMLPreElement | null>;
  invert?: boolean;
  colored?: boolean;
  textColor?: string;
  textSize?: string;
};

export default function CopyDownload({
  ascii,
  asciiArt,
  refText,
  refArt,
  invert,
  colored,
  textColor,
  textSize,
}: Props) {
  const location = useLocation();

  const handleCopy = async (text: string) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadTxt = (element: string) => {
    const blob = new Blob([element], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "ascii-art.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };
  const downloadHtml = (element: HTMLElement) => {
    // for a text page
    if (location.pathname === "/text") {
      const preText = `
<html>
  <head>
    <meta charset="UTF-8">
    <title>ASCII Art</title>
    <style>
      body {
        background-color: black;
        color: ${textColor || "#000000"};
      }
      pre {
        font-family: monospace;
        font-size: ${textSize};
        white-space: pre;
      }
    </style>
  </head>
  <body>
    <pre>${ascii || ""}</pre>
  </body>
</html>
`;
      const blob = new Blob([preText], { type: "text/html;charset=utf-8" });
      downloadBlob(blob);
    }
    // for an image page
    else {
      const preArt = `
<html>
  <head>
    <meta charset="UTF-8">
    <title>ASCII Art</title>
    <style>
      body {
        background-color: ${invert ? "white" : "black"};
        color: ${colored ? "inherit" : invert ? "black" : "white"};
      }
      pre {
        font-family: monospace;
        white-space: pre;
      }
    </style>
  </head>
  <body>
    <pre>${element.innerHTML}</pre>
  </body>
</html>
`;
      const blob = new Blob([preArt], { type: "text/html;charset=utf-8" });
      downloadBlob(blob);
    }
  };

  const downloadBlob = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ascii-art.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-row">
      <button
        onClick={() => {
          if (location.pathname === "/text" && ascii) {
            handleCopy(ascii);
          } else if (asciiArt) handleCopy(asciiArt);
        }}
        className={`${buttonStyle} lg:mr-[40px]`}
      >
        Copy
      </button>

      <button
        onClick={() => {
          if (location.pathname === "/text" && ascii) {
            downloadTxt(ascii);
          } else if (asciiArt) downloadTxt(asciiArt);
        }}
        className={`${buttonStyle} lg:mr-[40px]`}
      >
        Save .txt
      </button>

      <button
        onClick={() => {
          if (location.pathname === "/text" && refText?.current) {
            downloadHtml(refText.current);
          } else if (refArt?.current) {
            downloadHtml(refArt.current);
          }
        }}
        className={`${buttonStyle}`}
      >
        Save .html
      </button>
    </div>
  );
}
