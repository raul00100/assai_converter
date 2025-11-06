import TextType from "@/animation/TextType";
import DecryptedText from "@/animation/DecryptedTextProps";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import type { SetStateAction } from "react";
import type React from "react";

type DescriptionProp = {
  showHome?: boolean;
  setShowHome?: React.Dispatch<SetStateAction<boolean>>;
  showText?: boolean;
  setShowText?: React.Dispatch<SetStateAction<boolean>>;
  showImage?: boolean;
  setShowImage?: React.Dispatch<SetStateAction<boolean>>;
  showVideo?: boolean;
  setShowVideo?: React.Dispatch<SetStateAction<boolean>>;
};

export default function Description({
  showHome,
  setShowHome,
  showText,
  setShowText,
  showImage,
  setShowImage,
  showVideo,
  setShowVideo,
}: DescriptionProp) {
  const location = useLocation();

  return (
    <div>
      {/* show textType animation once (when typeOf window === "undefined") and then use DecryptedText effect */}
      {location.pathname === "/" && (
        <div>
          {showHome ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-5 text-sm">
                <DecryptedText text="About This Project " />
                <DecryptedText text="This website was created by an enthusiast who has been fascinated by the beauty of ASCII art — the unique way of turning ordinary text, images, and videos into visual stories made entirely of characters." />
                <DecryptedText text="It was built out of pure passion, to let others experience the same joy and creativity that come from exploring this digital art form. Here, you can easily convert your own content into ASCII designs and see how technology and art come together in a simple yet mesmerizing way." />
                <DecryptedText text="Isn't it cool ?" />
              </div>
            </motion.div>
          ) : (
            <TextType
              text={[
                `About This Project\n\nThis website was created by an enthusiast who has always been fascinated by the beauty of ASCII art — the unique way of turning ordinary text, images, and videos into visual stories made entirely of characters.\n\nIt was built out of pure passion, to let others experience the same joy and creativity that come from exploring this digital art form. Here, you can easily convert your own content into ASCII designs and see how technology and art come together in a simple yet mesmerizing way\n\nIsn't it cool ?`,
              ]}
              typingSpeed={15}
              showCursor={true}
              cursorCharacter="|"
              onComplete={() => setShowHome?.(true)}
              className="text-sm"
            />
          )}
        </div>
      )}
      {location.pathname === "/text" && (
        <div>
          {showText ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-5 text-sm">
                <DecryptedText text="On this page, you can convert your text into ascii style with different types of fonts and setting options!" />
              </div>
            </motion.div>
          ) : (
            <TextType
              text={[
                `On this page, you can convert your text into ascii style with different types of fonts and setting options!`,
              ]}
              typingSpeed={15}
              showCursor={true}
              cursorCharacter="|"
              onComplete={() => setShowText?.(true)}
              className="text-sm"
            />
          )}
        </div>
      )}

      {location.pathname === "/image" && (
        <div>
          {showImage ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-5 text-sm">
                <DecryptedText text="On this page, you can upload an image, convert it to ASCII format, and apply various filters!" />
              </div>
            </motion.div>
          ) : (
            <TextType
              text={[
                `On this page, you can upload an image, convert it to ASCII format, and apply various filters!`,
              ]}
              typingSpeed={15}
              showCursor={true}
              cursorCharacter="|"
              onComplete={() => setShowImage?.(true)}
              className="text-sm"
            />
          )}
        </div>
      )}
      {location.pathname === "/video" && (
        <div>
          {showVideo ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-5 text-sm">
                <DecryptedText text="On this page, you can upload a video, convert it to ASCII format, and apply various filters!" />
              </div>
            </motion.div>
          ) : (
            <TextType
              text={[
                `On this page, you can upload a video, convert it to ASCII format, and apply various filters!`,
              ]}
              typingSpeed={15}
              showCursor={true}
              cursorCharacter="|"
              onComplete={() => setShowVideo?.(true)}
              className="text-sm"
            />
          )}
        </div>
      )}
    </div>
  );
}
