import { useGameScreenContext } from "../../context/GameScreenContext";
import LoaderComponent from "../LoaderComponent";

function LeftPanel() {
  const { gameScreeen } = useGameScreenContext();
  return (
    <div className="w-1/3 border-r border-zinc-700/50 bg-gradient-to-br from-indigo-300 to-zinc-500 relative p-4 overflow-hidden h-[95%] rounded-lg">
      {gameScreeen.gameScreenLoading ? (
        <>
          <LoaderComponent
            className="h-full flex justify-center items-center"
            height={64}
            width={64}
            loaderClassname="text-indigo-800"
          />
        </>
      ) : (
        <>
          <img
            alt="Cathedral at night"
            src="https://images.pexels.com/photos/30801140/pexels-photo-30801140/free-photo-of-night-view-of-baroque-cathedral-in-aguascalientes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="object-cover w-full h-1/2 rounded-lg shadow-lg mb-4"
          />
          <div className="text-zinc-800 bg-white/80 p-3 rounded-md backdrop-blur-sm flex flex-col">
            <span className="text-sm text-indigo-700">Current Scene</span>
            <span>
              {
                gameScreeen.previousScenes[
                  gameScreeen.previousScenes.length - 1
                ]
              }
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default LeftPanel;
