interface GameType {
  customTheme: string;
  selectedTheme: "fun" | "horror" | "happy";
  age: number;
}

interface GameContextType {
  gamePreferences: GameType;
  setGamePreferences: React.Dispatch<React.SetStateAction<GameType>>;
}