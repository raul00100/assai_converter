//components
import Header from "../components/header";
import { useLocalStorage } from "../components/useLocalStorage";
import linux from "../assciText/linux.txt?raw";
import linuxImg from "../images/linuxImg.webp";
import arrow2 from "../assciText/arrow2.txt?raw";
//animations and styles
import TextType from "../animation/TextType";
import DecryptedText from "../animation/DecryptedTextProps";
import generalStyles from "@/components/styleExport";
import { motion } from "motion/react";

const { terminal, terminalLabel } = generalStyles;

export default function ImageConverter() {
  const [showImage, setShowImage] = useLocalStorage("showImage", false);
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
                <DecryptedText text="Here is some examples:" />
              </div>
            </motion.div>
          ) : (
            <div>
              <TextType
                text={[
                  `On this page you can upload an image and convert it into ASCII\n\nHere is some examples:`,
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
              <div className="flex flex-col gap-5 text-sm">
                <DecryptedText text="On this page you can upload an image and convert it into ASCII" />
                <DecryptedText text="Here is some examples:" />
              </div>

              <div className="flex flex-row items-center mt-5">
                <img
                  src={linuxImg}
                  alt="linux penguin"
                  className="h-80 p-2 w-65 bg-zinc-900 mr-10 "
                />
                <pre className="text-[5px]">{arrow2}</pre>
                <pre className="text-[5px] py-2">{linux}</pre>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
