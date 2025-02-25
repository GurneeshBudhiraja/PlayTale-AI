import React, { createContext, useContext, useState } from "react";

const GAME_SCREEN: GameScreenType = {
  gameScreenLoading: false,
  gameScreenNextButton: false,
  tale: {
    talePlot:
      "In the dim light of an abandoned Victorian pub, you and your friends set up your equipment amidst whispers that seem to come from every corner. The cold air hums with unseen presence as you tune into a peculiar EVP—a voice calling out in a dialect you can barely understand. Outside, the fog thickens, but inside, the tension grows.",
    taleCharacters: [
      {
        name: "Tom Harris",
        role: "supporting",
        description: "",
      },
      {
        name: "Lena Rodriguez",
        role: "supporting",
        description: "",
      },
    ],
    taleProtagonistCharacter: {
      description: "",
      name: "Evelyn Hart",
      role: "protagonist",
    },
    firstScene: true,
    taleName: "Echoes of the Past",
    taleMessages: "",
  },
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
