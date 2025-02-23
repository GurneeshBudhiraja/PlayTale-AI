import { createContext, useContext, useState } from "react";

const GAME_PREFERENCES: GameType = {
  age: 12,
  customTheme: "",
  selectedTheme: "fun",
};

const GamePreferencesContext = createContext<GameContextType>({
  gamePreferences: GAME_PREFERENCES,
  setGamePreferences: () => {},
});

export default function GamePreferencesContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gamePreferences, setGamePreferences] =
    useState<GameType>(GAME_PREFERENCES);
  return (
    <GamePreferencesContext.Provider
      value={{
        gamePreferences,
        setGamePreferences,
      }}
    >
      {children}
    </GamePreferencesContext.Provider>
  );
}

// eslint-disable-next-line
export function useGamePreferencesContext() {
  const gamePreferencesContext = useContext(GamePreferencesContext);
  if (!gamePreferencesContext)
    throw new Error(
      "GamePreferencesContext should be used within the context wrapper"
    );
  return gamePreferencesContext;
}
