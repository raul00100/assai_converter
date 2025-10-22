import generalStyles from "../styleExport";
import { useLocation } from "react-router-dom";

const { buttonStyle } = generalStyles;

type Props = {
  ascii?: string;
  asciiArt?: string;
  refText?: React.RefObject<HTMLPreElement | null>;
  refArt?: React.RefObject<HTMLPreElement | null>;
};

export default function CopyDownload({
  ascii,
  asciiArt,
  refText,
  refArt,
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
    const htmlContent = `
  <html>
    <head>
      <meta charset="UTF-8">
      <title>ASCII Art</title>
    </head>
    <body>
      <pre>${element.innerHTML}</pre>
    </body>
  </html>
  `;
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
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
    <div>
      <button
        onClick={() => {
          if (location.pathname === "/text" && ascii) {
            handleCopy(ascii);
          } else if (asciiArt) handleCopy(asciiArt);
        }}
        className={`${buttonStyle} mr-[40px]`}
      >
        Copy
      </button>

      <button
        onClick={() => {
          if (location.pathname === "/text" && ascii) {
            downloadTxt(ascii);
          } else if (asciiArt) downloadTxt(asciiArt);
        }}
        className={`${buttonStyle} mr-[40px]`}
      >
        Save in .txt
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
        Save in .html
      </button>
    </div>
  );
}
