import Header from "../components/Header";
import { useGameScreenContext } from "../context/GameScreenContext";
import LeftPanel from "../components/GameScreenComponents/LeftPanel";
import RightContenPanel from "../components/GameScreenComponents/RightContenPanel";
import LoaderComponent from "../components/LoaderComponent";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function GameScreen() {
  const { gameScreeen, setGameScreen } = useGameScreenContext();
  const navigate = useNavigate();
  useEffect(() => {
    setGameScreen((prev) => ({
      ...prev,
      gameScreenLoading: true,
    }));
    // Navigate to "/" route if taleName is not present
    // if (!gameScreeen.tale.taleName) navigate("/");
    setGameScreen((prev) => ({
      ...prev,
      gameScreenLoading: false,
    }));
  }, [navigate, gameScreeen.tale.taleName, setGameScreen]);
  return (
    <div className="h-full overflow-hidden">
      <Header />
      <button onClick={() => console.log(gameScreeen)}>Click</button>

      <div className="flex h-[calc(100%-4rem)]">
        {/* Left Image Panel */}
        <LeftPanel />
        {/* Right Content Panel */}
        <RightContenPanel />
      </div>
    </div>
  );
}

export default GameScreen;
