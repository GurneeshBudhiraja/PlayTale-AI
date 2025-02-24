import React, { createContext, useContext, useState } from "react";

const GAME_SCREEN: GameScreenType = {
  gameScreenLoading: false,
  gameScreenNextButton: false,
  tale: {
    // TODO: remove in prod
    talePlot:
      "In an isolated cabin surrounded by dense fog, two friends stumble upon an old journal hidden in a dusty attic. The pages are filled with eerie drawings and cryptic notes, all pointing to a nearby abandoned house. As night falls, the wind howls through the trees, and they hear whispers that seem to come from within.",
    taleCharacters: [
      {
        name: "Mrs. Willow",
        role: "protagonist",
      },
      {
        name: "Young Lily",
        role: "supporting",
      },
      {
        name: "Mayor Hawthorne",
        role: "supporting",
      },
    ],
    firstScene: true,
    taleName: "Whispers of the Fog",
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
