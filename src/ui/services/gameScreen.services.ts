
import { generateCharacters, generatePlot } from "../../utils/gameScreenUtils"

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
    // talePlot: tale.talePlot,
    talePlot: "",
    taleName: "",
    firstScene: tale.firstScene,
    taleMessages: ""
  }

  try {
    // Generates the tale plot when firstScene is set to true
    if (tale.firstScene) {
      const tempObj = {
        tempTalePlot: "",
        tempTaleName: ""
      }
      if (gamePreferences.selectedTheme) {
        console.log(gamePreferences.selectedTheme)
        // Generates a new plot based on the selected default theme
        const { talePlot, taleName } = await generatePlot(gamePreferences.selectedTheme, gamePreferences.age) as { talePlot: string, taleName: string }
        tempObj["tempTalePlot"] = talePlot
        tempObj["tempTaleName"] = taleName
      } else {
        console.log(gamePreferences.customTheme)
        const { talePlot, taleName } = await generatePlot(gamePreferences.customTheme, gamePreferences.age) as { talePlot: string, taleName: string }
        tempObj["tempTalePlot"] = talePlot
        tempObj["tempTaleName"] = taleName
      }

      // Checks for the empty talePlot and throws an error on empty talePlot
      if (!tempObj["tempTaleName"] || !tempObj["tempTalePlot"]) {
        throw new Error("talePlot/taleName is missing. Redirecting the user to /theme route in 2000ms")
      }

      // Updates the tempTaleObject with the new talePlot
      tempTaleObject["talePlot"] = tempObj.tempTalePlot.trim()
      tempTaleObject["taleName"] = tempObj.tempTaleName.trim()
    }
    console.log("Tale plot and name:")
    console.log(tempTaleObject)

    // Generates characters' name and role when firstScene is set to true
    if (tale.firstScene && !tale.taleCharacters.length) {
      console.log("generating characs")
      console.log(tempTaleObject["talePlot"])
      const generatedTaleCharacters = await generateCharacters(tempTaleObject["talePlot"], gamePreferences.selectedTheme || gamePreferences.customTheme) as GameScreenCharacterType[]
      
      if (!(generatedTaleCharacters.length)) {
        throw new Error("Missing/Incomplete taleCharacters.")
      }
      // Updates the tempTaleObject with the new generatedTaleCharacters array 
      tempTaleObject["taleCharacters"] = generatedTaleCharacters
    }
    console.log("Tale characters:")
    console.log(tempTaleObject)
    setGameScreen((prev) => ({
      ...prev,
      tale: {
        ...prev.tale,
        firstScene: false,
        taleCharacters: tempTaleObject.taleCharacters,
        taleName: tempTaleObject.taleName,
        talePlot: tempTaleObject.talePlot,
      }
    }))

    console.log("Process completed")

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


