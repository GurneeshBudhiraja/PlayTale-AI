import React, { createContext, useContext, useState } from "react";

const GAME_SCREEN: GameScreenType = {
  gameScreenLoading: false,
  gameScreenNextButton: false,
  tale: {
    talePlot: "Testing tale plot",
    taleCharacters: [
      {
        name: "Whispering Maud",
        role: "supporting",
        description: "",
      },
      {
        name: "The Moving Tome",
        role: "supporting",
        description: "",
      },
    ],
    taleProtagonistCharacter: {
      name: "Testing user",
      description: "",
      role: "protagonist",
    },
    firstScene: true,
    taleName: "The testing tale",
  },
  characterDialogs: [
    {
      name: "Whispering Maud",
      message: "Eleanor... come closer...",
    },
    {
      name: "The Moving Tome",
      message: "Read us... before it's too late...",
    },
  ],
  previousScenes: [
    "The dim light flickered, casting eerie shadows across the forgotten basement. Eleanor Hart approached the last row of shelves, her breath shallow with each step. Suddenly, a whisper cut through the silence, sending chills down her spine. She stopped, heart pounding, and strained to hear more. The whispers grew louder, clearer, almost like a chorus of voices murmuring in ancient tongues. Eleanor's eyes widened as she saw the books on the shelves. Each page seemed to flutter, as if stirred by an unseen force. The air around her grew thick with an unsettling presence.",
  ],
};

const GameScreenContext = createContext<GameScreenContextType>({
  gameScreeen: GAME_SCREEN,
  setGameScreen: () => {},
});

function GameScreenContextWrapper({ children }: { children: React.ReactNode }) {
  const [gameScreeen, setGameScreen] = useState<GameScreenType>(GAME_SCREEN);
  return (
    <GameScreenContext.Provider value={{ gameScreeen, setGameScreen }}>
      {children}
    </GameScreenContext.Provider>
  );
}

// eslint-disable-next-line
export function useGameScreenContext() {
  const gameScreeenContext = useContext(GameScreenContext);
  if (!gameScreeenContext) {
    throw new Error(
      "useGameScreenContext must be used within a GameScreenContextWrapper"
    );
  }
  return gameScreeenContext;
}

export default GameScreenContextWrapper;
