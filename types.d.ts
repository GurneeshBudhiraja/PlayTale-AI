// Type for selecting the game options at the start
type SelectedTheme = "fun" | "horror" | "happy";

interface GameType {
  customTheme: string;
  selectedTheme: SelectedTheme | null;
  age: number;
}

interface GameContextType {
  gamePreferences: GameType;
  setGamePreferences: React.Dispatch<React.SetStateAction<GameType>>;
}


// GameScreenContext.tsx types
interface GameScreenMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GameScreenCharacterType {
  name: string;
  description: string;
  role: "protagonist" | "supporting"
}

interface Tale {
  talePlot: string;
  taleCharacters: Array<GameScreenCharacterType>;
  firstScene: boolean;
  taleName: string;
  taleMessages: string;
}


interface GameScreenType {
  gameScreenLoading: boolean;
  gameScreenNextButton: boolean;
  tale: Tale;
}


interface GameScreenContextType {
  gameScreeen: GameScreenType;
  setGameScreen: React.Dispatch<React.SetStateAction<GameScreenType>>;
}