//components
import Header from "../components/header";
import shark from "../assciText/shark.txt?raw";
import { useLocalStorage } from "../components/useLocalStorage";
//animations and styles
import DecryptedText from "../animation/DecryptedTextProps";
import { motion } from "motion/react";
import TextType from "../animation/TextType";
import generalStyles from "@/components/styleExport";

const { terminal, terminalLabel } = generalStyles;

export default function Home() {
  const [showShark, setShowShark] = useLocalStorage("shoShark", false);

  return (
    <div>
      <Header />
      <div className={terminal}>
        <div className={terminalLabel}>
          <p> UW PICO 5.09 </p>
        </div>
        {/* show textType animation once (when typeOf window === "undefined") and then use DecryptedText effect */}
        <div className="px-5">
          {showShark ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-5 text-sm">
                <DecryptedText text="About This Project " />
                <DecryptedText text="This website was created by an enthusiast who has always been fascinated by the beauty of ASCII art — the unique way of turning ordinary text, images, and videos into visual stories made entirely of characters." />
                <DecryptedText text="It was built out of pure passion, to let others experience the same joy and creativity that come from exploring this digital art form. Here, you can easily convert your own content into ASCII designs and see how technology and art come together in a simple yet mesmerizing way." />
                <DecryptedText text="Isn't it cool ?" />
              </div>

              <pre className="text-xs scale-70">{shark}</pre>
            </motion.div>
          ) : (
            //show animation only to new user
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
    </div>
  );
}
