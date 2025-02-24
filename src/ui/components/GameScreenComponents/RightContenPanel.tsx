import { motion } from "motion/react";
import { useState } from "react";
import Button from "../Button";

function RightContenPanel() {
  const [userResponse, setUserResponse] = useState<string>("");
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
                Guardian Spirit
              </h4>
              <p className="text-zinc-300 text-sm">
                "What brings you to these forgotten halls, traveler? Speak your
                purpose clearly..."
              </p>
            </div>
          </div>
        </div>

        <p className="text-zinc-400 text-sm mt-4 italic">
          The air grows heavy as you consider your response...
        </p>
      </motion.div>

      {/* Player Input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="sticky bottom-0 backdrop-blur-sm pt-4"
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Speak your purpose..."
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                  text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 
                  focus:ring-indigo-500/50 transition-all"
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
            />
            <Button
              className="px-6 bg-indigo-500/90 hover:bg-indigo-400/90 text-zinc-100 
                font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
              buttonProps={{
                type: "submit",
              }}
            >
              <span>Send</span>
              <span className="text-lg -mt-1">→</span>
            </Button>
          </div>
        </form>
        <p className="text-zinc-500 text-sm mt-2">
          Type your response to continue the story...
        </p>
      </motion.div>
    </div>
  );
}

export default RightContenPanel;
