import { Bot, Power } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

function BotStatus() {
  const [botStatus, setBotStatus] = useState<"IDLE" | "BUSY">("IDLE");

  const toggleStatus = () => {
    setBotStatus(botStatus === "IDLE" ? "BUSY" : "IDLE");
  };

  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-zinc-800 ">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div
              className={`w-3 h-3 rounded-full ${
                botStatus === "IDLE" ? "bg-green-400" : "bg-red-400"
              }`}
            />
            <div className="absolute hidden group-hover:block bg-zinc-900 text-white text-xs px-2 py-1 rounded -top-8 whitespace-nowrap">
              Status: {botStatus}
            </div>
          </div>
          <Bot className="w-7 h-7 text-indigo-300 " />
          <div className="text-zinc-300">
            <div className="text-sm font-medium">JobPilot</div>
            <div className="text-xs text-zinc-400">Status: {botStatus}</div>
          </div>
          <div className="flex flex-col text-xs text-zinc-400 border-l border-zinc-700 pl-4">
            <span>Jobs applied: 125</span>
          </div>
        </div>
      </div>
      <motion.div
        className="cursor-pointer"
        onClick={toggleStatus}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Power
          className={`w-6 h-6 transition-colors ${
            botStatus === "IDLE" ? "text-green-400" : "text-red-400"
          }`}
        />
      </motion.div>
    </div>
  );
}

export default BotStatus;
