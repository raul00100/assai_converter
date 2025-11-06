//components
import Header from "../components/header";
import shark from "../assciText/shark.txt?raw";
import { useLocalStorage } from "@/components/functions/useLocalStorage";
//animations and styles
import { motion } from "motion/react";
import generalStyles from "@/components/styleExport";
import Description from "@/components/description";

const { terminal, terminalLabel, innerContainer } = generalStyles;

export default function Home() {
  const [showHome, setShowHome] = useLocalStorage("shoShark", false);
  return (
    <div onClick={() => setShowHome(true)}>
      <Header />
      <div className={terminal}>
        <div className={terminalLabel}>
          <p> UW PICO 5.09 </p>
        </div>
        <div className={innerContainer}>
          <Description showHome={showHome} setShowHome={setShowHome} />

          {showHome && (
            <motion.pre
              className="lg:scale-70 lg:text-xs text-[4.5px] lg:mt-0 mt-15 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              {shark}
            </motion.pre>
          )}
        </div>
      </div>
    </div>
  );
}
