//components
import Header from "../components/header";
import shark from "../assciText/shark.txt?raw";
import { useLocalStorage } from "@/components/functions/useLocalStorage";
//animations and styles
import { motion } from "motion/react";
import generalStyles from "@/components/styleExport";
import Description from "@/components/description";

const { terminal, terminalLabel } = generalStyles;

export default function Home() {
  const [showHome, setShowHome] = useLocalStorage("shoShark", false);
  return (
    <div>
      <Header />
      <div className={terminal}>
        <div className={terminalLabel}>
          <p> UW PICO 5.09 </p>
        </div>
        <div className="px-5">
          <Description showHome={showHome} setShowHome={setShowHome} />

          {showHome && (
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
      </div>
    </div>
  );
}
