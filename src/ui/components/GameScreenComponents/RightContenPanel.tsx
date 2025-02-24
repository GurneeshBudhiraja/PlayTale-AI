import { motion } from "motion/react";
import { useState } from "react";
import Button from "../Button";
import { useGameScreenContext } from "../../context/GameScreenContext";
import { generateTaleConversaton } from "../../services/lmStudio.services";
import LoaderComponent from "../LoaderComponent";

function RightContenPanel() {
  const [userResponse, setUserResponse] = useState<string>("");
  const { gameScreeen, setGameScreen } = useGameScreenContext();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !userResponse.trim()) return;
    setLoading(true);
    try {
      const protagonistName = gameScreeen.tale.taleCharacters.filter(
        (c) => c.role === "protagonist"
      )[0].name;
      let updatedMessages = gameScreeen.tale.taleMessages.concat(
        `<Character Message Start> ${protagonistName} said: ${userResponse} </Character Message Start>`
      );
      // Gets the message from AI
      const taleConversationResponse = await generateTaleConversaton({
        messages: updatedMessages,
        characters: gameScreeen.tale.taleCharacters,
        talePlot: gameScreeen.tale.talePlot,
      });
      console.log(taleConversationResponse);
      if (!taleConversationResponse) {
        return;
      }
      // Reformats the response from AI
      updatedMessages += taleConversationResponse
        .map((conversation: { name: string; message: string }) => {
          if (conversation.name.trim() !== protagonistName.trim()) {
            // Do not append any message for the protagonist
            return `<Character Message Start> ${conversation.name} said: ${conversation.message} </Character Message Start> `;
          }
        })
        .join(" ");
      console.log("updatedMessages are:");
      console.log(updatedMessages);
      setGameScreen((prev) => ({
        ...prev,
        tale: {
          ...prev.tale,
          taleMessages: updatedMessages,
        },
      }));
      setUserResponse("");
    } catch (error) {
      console.log("Error in handleSubmit: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-2/3 flex flex-col p-6 space-y-6 overflow-y-auto">
      {/* Story Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <p className="text-zinc-300 leading-relaxed">
          The ancient gates creak open before you, revealing a path lit by
          flickering torchlight. A cold wind carries whispers from the darkness
          beyond...
        </p>

        {/* Character Dialog */}
        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/30">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <span className="text-indigo-400 text-lg">⚔</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-indigo-400 mb-1">
                {gameScreeen.tale.taleName}
              </h4>
              <p className="text-zinc-300 text-sm">
                {
                  gameScreeen.tale.taleCharacters.filter(
                    (c) => c.role === "protagonist"
                  )[0].name
                }
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Player Input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="sticky bottom-0 backdrop-blur-sm pt-4 h-full"
      >
        <p className="text-zinc-400 text-sm mt-4 italic">
          You are{" "}
          {
            gameScreeen.tale.taleCharacters.filter(
              (c) => c.role === "protagonist"
            )[0].name
          }
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
              {loading ? (
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
      </motion.div>
    </div>
  );
}

export default RightContenPanel;
