import React, { createContext, useContext, useState } from "react";

const GAME_SCREEN: GameScreenType = {
  gameScreenLoading: false,
  gameScreenNextButton: false,
  tale: {
    talePlot: "",
    taleCharacters: [],
    taleProtagonistCharacter: {
      name: "",
      description: "",
      role: "protagonist",
    },
    firstScene: true,
    taleName: "",
  },
  characterDialogs: [],
  previousScenes: [],
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
