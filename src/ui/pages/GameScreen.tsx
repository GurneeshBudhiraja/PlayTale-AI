import Header from "../components/Header";
import { useGameScreenContext } from "../context/GameScreenContext";
import LeftPanel from "../components/GameScreenComponents/LeftPanel";
import RightContenPanel from "../components/GameScreenComponents/RightContenPanel";
import LoaderComponent from "../components/LoaderComponent";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function GameScreen() {
  const { gameScreeen } = useGameScreenContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!gameScreeen.tale.taleName) navigate("/");
  }, [navigate, gameScreeen.tale.taleName]);
  return (
    <div className="h-full overflow-hidden">
      <Header />
      <button onClick={() => console.log(gameScreeen)}>Click</button>
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
