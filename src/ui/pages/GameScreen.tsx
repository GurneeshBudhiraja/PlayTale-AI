import Header from "../components/Header";
import { useGameScreenContext } from "../context/GameScreenContext";
import LeftPanel from "../components/GameScreenComponents/LeftPanel";
import RightContenPanel from "../components/GameScreenComponents/RightContenPanel";
import LoaderComponent from "../components/LoaderComponent";
import { useEffect } from "react";
import gameScreenManager from "../services/gameScreen.services";
import { useGamePreferencesContext } from "../context/GamePreferencesContext";

function GameScreen() {
  const { gameScreeen, setGameScreen } = useGameScreenContext();
  const { gamePreferences, setGamePreferences } = useGamePreferencesContext();
  useEffect(() => {
    console.log(gamePreferences);
    gameScreenManager({
      gameScreeen,
      setGameScreen,
      gamePreferences,
      setGamePreferences,
    });
  }, []);
  return (
    <div className="h-full overflow-hidden">
      <Header />
      {gameScreeen.gameScreenLoading ? (
        <div className="flex flex-col gap-4 justify-center items-center h-full">
          <LoaderComponent width={48} height={48} className="text-violet-400" />
          <div className="text-violet-100 font-medium text-lg animate-pulse">
            Setting up the tale...
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100%-4rem)]">
          {/* Left Image Panel */}
          <LeftPanel />
          {/* Right Content Panel */}
          <RightContenPanel />
        </div>
      )}
    </div>
  );
}

export default GameScreen;
