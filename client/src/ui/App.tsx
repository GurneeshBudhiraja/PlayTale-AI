import { motion } from "motion/react";
import { BrowserRouter, Route, Routes } from "react-router";
import StartPage from "./pages/StartPage";
import UserInfoContextWrapper from "./context/UserInfoContext";
import BotPage from "./pages/BotPage";
import JobProfileContextWrapper from "./context/JobProfileContext";

function App() {
  return (
    <BrowserRouter>
      <UserInfoContextWrapper>
        <JobProfileContextWrapper>
          <motion.div
            className="h-full w-full bg-neutral-950 rounded-lg border border-indigo-500/25 p-8  relative"
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
              <Route path="/linkedin-bot" element={<BotPage />} />
            </Routes>
          </motion.div>
        </JobProfileContextWrapper>
      </UserInfoContextWrapper>
    </BrowserRouter>
  );
}

export default App;
