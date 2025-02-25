import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { useGameScreenContext } from "../../context/GameScreenContext";
import LoaderComponent from "../LoaderComponent";
import MessageComponent from "./MessageComponent";
import { generateTaleConversaton } from "../../services/lmStudio.services";
import { useGamePreferencesContext } from "../../context/GamePreferencesContext";
import { useNavigate } from "react-router";
import { ReceiptEuroIcon } from "lucide-react";

function RightContenPanel() {
  const [userResponse, setUserResponse] = useState<string>("");
  const { gameScreeen, setGameScreen } = useGameScreenContext();
  const { gamePreferences } = useGamePreferencesContext();
  const [showCharacters, setShowCharacters] = useState<boolean>(false);
  // const [messages, setMessages] = useState<
  //   { name: string; role: "supporting" | "protagonist"; message: string }[]
  // >([]);
  const [messages, setMessages] = useState<
    { name: string; role: "supporting" | "protagonist"; message: string }[]
  >(gameScreeen.characterDialogs);
  const navigate = useNavigate();
  const endRef = useRef<HTMLDivElement | null>(null);

  // Runs on component mount
  useEffect(() => {
    // Generates the very first scene
    async function firstSceneGenerator() {
      try {
        console.log("I am in firstSceneGenerator");
        const response = (await generateTaleConversaton({
          characters: gameScreeen.tale.taleCharacters,
          messages: gameScreeen.characterDialogs,
          talePlot: gameScreeen.tale.talePlot,
          taleTheme:
            gamePreferences.selectedTheme ?? gamePreferences.customTheme,
          taleName: gameScreeen.tale.taleName,
          protagonistName: gameScreeen.tale.taleProtagonistCharacter.name,
          previousScenes: [],
        })) as {
          characterDialog: { name: string; message: string }[];
          newScene: string;
        };
        console.log(response);
        const { characterDialog, newScene } = response;
        setGameScreen((prev) => ({
          ...prev,
          characterDialogs: [...prev.characterDialogs, ...characterDialog],
          previousScenes: [...prev.previousScenes, newScene],
          gameScreenLoading: false,
          tale: {
            ...prev.tale,
            firstScene: false,
          },
        }));
        setMessages(() => {
          const modifiedArray = characterDialog.map((dialog) => ({
            ...dialog,
            role: "supporting" as "supporting" | "protagonist",
          }));
          return modifiedArray;
        });
      } catch (error) {
        console.log("Error:", error);
        // navigate("/theme");
      } finally {
        setGameScreen((prev) => ({
          ...prev,
          gameScreenLoading: false,
        }));
      }
    }
    // firstSceneGenerator();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessages([
      ...messages,
      {
        name: gameScreeen.tale.taleProtagonistCharacter.name,
        role: "protagonist",
        message: userResponse,
      },
    ]);
    setUserResponse("");
    endRef.current?.scrollIntoView({ behavior: "smooth" });
    setGameScreen((prev) => ({
      ...prev,
      gameScreenLoading: true,
    }));
    console.log("GENERATING NEW SCENE");
    try {
      const scene = (await generateTaleConversaton({
        characters: gameScreeen.tale.taleCharacters,
        messages: [
          ...gameScreeen.characterDialogs,
          {
            message: userResponse,
            name: gameScreeen.tale.taleProtagonistCharacter.name,
          },
        ],
        previousScenes: gameScreeen.previousScenes,
        protagonistName: gameScreeen.tale.taleProtagonistCharacter.name,
        taleName: gameScreeen.tale.taleName,
        talePlot: gameScreeen.tale.talePlot,
        taleTheme: gamePreferences.selectedTheme ?? gamePreferences.customTheme,
      })) as {
        newScene: string;
        characterDialog: {
          name: string;
          message: string;
        }[];
      };
      const { characterDialog, newScene } = scene;
      setGameScreen((prev) => ({
        ...prev,
        characterDialogs: [...prev.characterDialogs, ...characterDialog],
        previousScenes: [...prev.previousScenes, newScene],
      }));
      const formatCharacterDialog = characterDialog.map((character) => ({
        ...character,
        role: "supporting",
      }));
      // @ts-expect-error Types issue
      setMessages(formatCharacterDialog);
    } catch (error) {
      console.log("Error in handleSubmit: ", error);
    } finally {
      setGameScreen((prev) => ({
        ...prev,
        gameScreenLoading: false,
      }));
    }
  }

  return (
    <div className="w-2/3 flex flex-col px-6 space-y-6 overflow-y-auto justify-between">
      {/* Story Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {/* Tale title, plot and tale characters info */}
        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/30">
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
                <div key={Date.now()} className="flex items-start gap-3 mt-2">
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

      {/* Player Input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="backdrop-blur-sm pt-4 h-full flex flex-col justify-between"
      >
        <div className="flex-1">
          {messages.map((message, index) => (
            <>
              <MessageComponent
                key={index}
                characterName={message.name}
                role={message.role}
                message={message.message}
              />
              {index === messages.length - 1 && <div ref={endRef} />}
            </>
          ))}
        </div>
        <div className="py-10">
          <p className="text-zinc-400 text-sm mt-4 italic">
            You are {gameScreeen.tale.taleProtagonistCharacter.name}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type your response to continue the story..."
                className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                  text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 
                  focus:ring-indigo-500/50 transition-all"
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
              />

              <Button
                className={`px-6 bg-indigo-500/90 hover:bg-indigo-400/90 text-zinc-100 
                font-medium rounded-lg transition-colors duration-200 flex items-center gap-2`}
                buttonProps={{
                  type: "submit",
                }}
              >
                {gameScreeen.gameScreenLoading ? (
                  <>
                    <LoaderComponent
                      width={16}
                      height={16}
                      className=""
                      loaderClassname="text-indigo-100"
                    />
                  </>
                ) : (
                  <>
                    <span>Send</span>
                    <span className="text-lg -mt-1">→</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default RightContenPanel;
