import { useState, useEffect } from "react";
import TextType from "../animation/TextType";
import shark from "../assciText/shark.txt?raw";
import { motion } from "motion/react";
import DecryptedText from "../animation/DecryptedTextProps";

export default function Terminal() {
  const [showShark, setShowShark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("showShark") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (showShark && typeof window !== "undefined") {
      localStorage.setItem("showShark", "true");
    }
  }, [showShark]);

  return (
    <div
      className={`bg-black border-1 border-zinc-500 text-white w-[1300px] min-h-[100px] max-h-[830px] font-mono p-0.5`}
    >
      <div className="flex items-center m-3 bg-white text-black pl-3">
        <p> UW PICO 5.09 </p>
      </div>
      <div className="p-5">
        {showShark ? (
          <div>
            <div className="flex flex-col gap-5 text-sm">
              <DecryptedText text="About This Project " />
              <DecryptedText text="This website was created by an enthusiast who has always been fascinated by the beauty of ASCII art — the unique way of turning ordinary text, images, and videos into visual stories made entirely of characters." />
              <DecryptedText text="It was built out of pure passion, to let others experience the same joy and creativity that come from exploring this digital art form. Here, you can easily convert your own content into ASCII designs and see how technology and art come together in a simple yet mesmerizing way." />
              <DecryptedText text="Isn't it cool ?" />
            </div>

            <motion.pre
              className="scale-70 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              {shark}
            </motion.pre>
          </div>
        ) : (
          <div>
            <TextType
              text={[
                `About This Project\n\nThis website was created by an enthusiast who has always been fascinated by the beauty of ASCII art — the unique way of turning ordinary text, images, and videos into visual stories made entirely of characters.\n\nIt was built out of pure passion, to let others experience the same joy and creativity that come from exploring this digital art form. Here, you can easily convert your own content into ASCII designs and see how technology and art come together in a simple yet mesmerizing way\n\nIsn't it cool ?`,
              ]}
              typingSpeed={15}
              showCursor={true}
              cursorCharacter="|"
              onComplete={() => setShowShark(true)}
              className="text-sm"
            />
            {showShark && (
              <motion.pre
                className="scale-70 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                {shark}
              </motion.pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
