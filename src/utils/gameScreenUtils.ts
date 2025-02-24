/* 
  Generate plot for the tale when the user selected any one of default themes
  from ThemeSelector page.
  The default themes are "fun" | "horror" | "happy"
*/
export async function generatePlot(theme: SelectedTheme) {
  try {
    console.log("Default theme:", theme)
    return "";
  } catch (error) {
    console.log("Error generating the plot based on the theme", error);
    return "";
  }
}


/*
  Generates the 3 character names using the tale plot.
*/
export async function generateCharacters(talePlot: string): Promise<GameScreenCharacterType[]> {
  try {
    console.log("The tale plot is:", talePlot)
    return [];
  } catch (error) {
    console.log("Error generating 3 tale characters.", error)
    return []
  }
}


/*
  Generates the first scene of the game
*/
export async function generateFirstScene() {

  // creates a title, a setting of the scene for the user, initial dialogs and other stuff for the first time theme
  return {};
}

/*
  Generates subsequent scenes for the user
*/
export async function generateSubsequentScenes() {
  // Generates subsequent scenes for the game
  return {}
}

export async function generateTaleSceneImage() {
  // Generates a new image 
  return "image"
}