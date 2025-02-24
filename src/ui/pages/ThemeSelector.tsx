import { motion } from "framer-motion";
import Header from "../components/Header";
import Button from "../components/Button";
import { Joystick, Skull, Sun, Sword } from "lucide-react";
import { useGamePreferencesContext } from "../context/GamePreferencesContext";
import React from "react";
import { useNavigate } from "react-router";

function ThemeSelector() {
  const { gamePreferences, setGamePreferences } = useGamePreferencesContext();
  const buttonClickSoundRef = React.useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();
  const themes = [
    {
      id: "fun",
      name: "Arcade Realm",
      icon: <Joystick className="w-8 h-8" />,
      className: "from-indigo-500/80 to-purple-600/80",
      border: "border-indigo-400/30",
    },
    {
      id: "horror",
      name: "Shadow Keep",
      icon: <Skull className="w-8 h-8" />,
      className: "from-zinc-800 to-rose-900/80",
      border: "border-rose-400/30",
    },
    {
      id: "happy",
      name: "Sunhaven",
      icon: <Sun className="w-8 h-8" />,
      className: "from-amber-500/80 to-amber-600/80",
      border: "border-amber-400/30",
    },
  ];

  return (
    <div className="overflow-auto h-full">
      <Header />
      <div className="max-w-4xl mx-auto px-4 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-col justify-center items-center gap-4">
            <Sword
              width={40}
              height={40}
              className="text-indigo-400 animate-pulse"
            />
            <div className="text-4xl font-black">Choose Your Path</div>
          </div>
          {/* Theme options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <motion.div
                key={theme.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  onClick={() =>
                    setGamePreferences({
                      ...gamePreferences,
                      selectedTheme: theme.id as "fun" | "horror" | "happy",
                    })
                  }
                  className={`
                    bg-gradient-to-r ${theme.className}
                    ${
                      gamePreferences.selectedTheme === theme.id
                        ? "ring-2 ring-indigo-400"
                        : ""
                    }
                    w-full h-48
                    rounded-xl
                    shadow-lg
                    transition-all
                    flex flex-col items-center justify-center
                    text-zinc-100 font-semibold
                    border-2 ${theme.border}
                    relative overflow-hidden
                    hover:shadow-indigo-500/20
                    group
                  `}
                >
                  <div className="mb-3 [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.5))]">
                    {theme.icon}
                  </div>
                  <span className="text-xl mb-1">{theme.name}</span>
                  <span className="text-sm font-normal text-zinc-300/80">
                    {theme.id === "fun" && "Casual Journey"}
                    {theme.id === "horror" && "Dark Quest"}
                    {theme.id === "happy" && "Bright Expedition"}
                  </span>
                  {gamePreferences.selectedTheme === theme.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center border-2 border-stone-50">
                      <div className="w-2 h-2 rounded-full bg-stone-50" />
                    </div>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Or indicator */}
          <div className="text-center flex justify-evenly items-center gap-4 text-gray-300/75">
            <div className="border border-gray-500/30 h-px w-full" />
            <div>or</div>
            <div className="border border-gray-500/30 h-0.5 w-full" />
          </div>

          {/* Custom theme input */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-300 flex items-center gap-2"
              htmlFor="customTheme"
            >
              <span className="text-indigo-400">✦</span>Custom Quest Sigil
            </label>
            <input
              type="text"
              placeholder="Enter arcane sequence..."
              id="customTheme"
              value={gamePreferences.customTheme}
              onChange={(e) => {
                setGamePreferences({
                  ...gamePreferences,
                  customTheme: e.target.value,
                });
              }}
              className="w-full px-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                    text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                    transition-all font-mono tracking-wide"
            />
          </div>

          {/* Age range selector */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                <span className="text-indigo-400">⌖</span>Hero's Age:{" "}
                {gamePreferences.age}
              </label>
            </div>
            <input
              type="range"
              min="12"
              max="100"
              value={gamePreferences.age}
              onChange={(e) => {
                setGamePreferences({
                  ...gamePreferences,
                  age: parseInt(e.target.value),
                });
              }}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer 
                    [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                    [&::-webkit-slider-thumb]:bg-indigo-400 [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-zinc-900
                    [&::-webkit-slider-thumb]:shadow-lg"
            />
          </div>
        </motion.div>
        {/* Begin Adventure button */}
        <div className="flex justify-center mt-3">
          <Button
            onClick={() => {
              console.log(gamePreferences);
              buttonClickSoundRef.current?.play();
              setTimeout(() => navigate("/game"), 500);
            }}
            className="w-full md:w-64 bg-indigo-500/90 hover:bg-indigo-400/90 text-zinc-100 
        font-bold py-3 px-8 rounded-xl transition-all duration-200
        border-2 border-indigo-400/50 hover:border-indigo-300/50
        text-lg flex items-center justify-center gap-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 shadow-[5px_3px_0px_white] active:shadow-none active:translate-1"
          >
            <span className="animate-pulse">▶</span>
            Begin Adventure
            <audio
              src="/button-click-sound.mp3"
              ref={buttonClickSoundRef}
              hidden={true}
            />
          </Button>
        </div>{" "}
      </div>
    </div>
  );
}

export default ThemeSelector;
