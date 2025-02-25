import { useState } from "react";
import { useGameScreenContext } from "../../context/GameScreenContext";
import Button from "../Button";
import LoaderComponent from "../LoaderComponent";
import { motion } from "motion/react";

function LeftPanel() {
  const { gameScreeen } = useGameScreenContext();
  const [showCharacters, setShowCharacters] = useState<boolean>(false);
  return (
    <div className="w-1/3 border-r border-zinc-700/50 bg-gradient-to-br from-indigo-600 to-zinc-400 relative p-4 overflow-hidden h-full rounded-lg">
      {gameScreeen.gameScreenLoading ? (
        <>
          <LoaderComponent
            className="h-full flex justify-center items-center"
            height={64}
            width={64}
            loaderClassname="text-indigo-800"
          />
        </>
      ) : (
        <>
          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Tale title, plot and tale characters info */}
            <div className="p-4 rounded-lg bg-zinc-800/80 border border-zinc-700/30">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-indigo-500/20 flex items-center justify-center p-1">
                  <span className="text-indigo-400 text-lg">⚔</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-indigo-400 mb-1">
                    {gameScreeen.tale.taleName}
                  </h4>
                  <p className="text-zinc-300 text-sm">
                    {gameScreeen.tale.talePlot}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => {
                    setShowCharacters(!showCharacters);
                  }}
                  className="flex items-center gap-1 w-full"
                >
                  <h4 className="text-md font-semibold text-indigo-400 mb-2">
                    Tale Characters
                  </h4>
                  <span className="text-indigo-400 mb-1">
                    {showCharacters ? "▼" : "▶"}
                  </span>
                </Button>

                {showCharacters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {gameScreeen.tale.taleCharacters.map((character, index) => (
                      <div key={index} className="flex items-start gap-3 mt-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                          <span className="text-indigo-400 text-lg">👤</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-indigo-400 mb-0">
                            {character.name}
                          </h4>
                          <p className="text-xs text-zinc-300/45 leading-relaxed">
                            {character.role}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div
                      key={Date.now()}
                      className="flex items-start gap-3 mt-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <span className="text-indigo-400 text-lg">👤</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-indigo-400 ">
                          {gameScreeen.tale.taleProtagonistCharacter.name}
                        </h4>
                        <p className="text-xs text-zinc-300/45 leading-relaxed">
                          {gameScreeen.tale.taleProtagonistCharacter.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
          <div className="text-zinc-800 bg-white/80 p-4 rounded-lg backdrop-blur-sm flex flex-col gap-2 overflow-auto max-h-[40vh] shadow-md">
            <span className="text-sm font-semibold text-indigo-700 uppercase tracking-wide">
              Current Scene
            </span>
            <span className="text-lg leading-relaxed">
              {
                gameScreeen.previousScenes[
                  gameScreeen.previousScenes.length - 1
                ]
              }
            </span>
          </div>{" "}
        </>
      )}
    </div>
  );
}

export default LeftPanel;
