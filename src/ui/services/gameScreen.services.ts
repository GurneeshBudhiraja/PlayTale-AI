
import { generateCharacters, generateFirstScene, generatePlot, generateSubsequentScenes, generateTaleSceneImage } from "../../utils/gameScreenUtils"

export default async function gameScreenManager({
  gameScreeen,
  setGameScreen,
  gamePreferences,
  setGamePreferences,
}: GameScreenContextType & GameContextType) {

  // Destructure tale from gameScreen
  const { tale } = gameScreeen

  // Temporary tale object
  const tempTaleObject: Tale = {
    taleCharacters: tale.taleCharacters,
    talePlot: tale.talePlot,
    taleTitle: tale.taleTitle,
    firstScene: tale.firstScene
  }

  try {
    // When default theme(selectedTheme) has been selected by the user and talePlot is empty string
    if (gamePreferences.selectedTheme && tale.firstScene) {
      // Generates a new plot based on the selected default theme
      const talePlot = await generatePlot(gamePreferences.selectedTheme)

      // Checks for the empty talePlot and throws an error on empty talePlot
      if (!talePlot) {
        throw new Error("talePlot is missing. Redirecting the user to /theme route in 2000ms")
      }

      // Updates the tempTaleObject with the new talePlot
      tempTaleObject["talePlot"] = talePlot.trim()
    }

    // Generate new set of characters when the taleCharacters array is empty
    if (tale.firstScene && !tale.taleCharacters.length) {
      const generatedTaleCharacters = await generateCharacters(tempTaleObject["talePlot"])
      if (!(generatedTaleCharacters.length) || generatedTaleCharacters.length !== 3) {
        throw new Error("Missing/Incomplete taleCharacters.")
      }
      // Updates the tempTaleObject with the new generatedTaleCharacters array 
      tempTaleObject["taleCharacters"] = generatedTaleCharacters
    }

    if (tale.firstScene) {
      // TODO: will come later on and modify this, since this would contain an object like title, firstScene, context, and other stuff of the game. Then we would also, go and update the context accordingly.
      const firstScene = await generateFirstScene();
      if (!firstScene) {
        throw new Error("Failed to create first scene")
      }
      // todo: update the context with the first scene
      tale.firstScene = false;
    } else if (!tale.firstScene) {
      // TODO: generate subsequent themes based on the past messages, plot, characters and other attributes. 
      await generateSubsequentScenes()
      // TODO: then generate a new scene
    }

    // TODO: will be used to generate new subsequent scene
    const sceneImage = generateTaleSceneImage()

    // TODO: Update the context at the end

  } catch (error) {
    console.log("Error:", error)
    setGamePreferences({
      age: 12,
      customTheme: "",
      // Default theme
      selectedTheme: null
    })
    setTimeout(() => {
      window.location.href = "/theme"
    }, 2000);
    return;
  }
}


