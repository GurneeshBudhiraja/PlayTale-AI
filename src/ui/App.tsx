import { motion } from "motion/react";
import { BrowserRouter, Route, Routes } from "react-router";
import StartPage from "./pages/StartPage";
import ThemeSelector from "./pages/ThemeSelector";
import GamePreferencesContextWrapper from "./context/GamePreferencesContext";
import GameScreen from "./pages/GameScreen";
import GameScreenContextWrapper from "./context/GameScreenContext";

function App() {
  return (
    <GamePreferencesContextWrapper>
      <GameScreenContextWrapper>
        <BrowserRouter>
          <motion.div
            className="h-full w-full bg-neutral-950 rounded-lg border border-indigo-500/25 p-8  relative "
            animate={{
              boxShadow: [
                "0px 0px 9px 5px oklch(0.68 0.16 277 / 0.15)",
                "0px 0px 12px 7px oklch(0.68 0.16 277 / 0.19)",
                "0px 0px 9px 5px oklch(0.68 0.16 277 / 0.15)",
              ],
            }}
            transition={{
              duration: 5,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/theme" element={<ThemeSelector />} />
              <Route path="/game" element={<GameScreen />} />
            </Routes>
          </motion.div>
        </BrowserRouter>
      </GameScreenContextWrapper>
    </GamePreferencesContextWrapper>
  );
}

export default App;
