import { generateTaleCharacters, generateTaleConversaton, getCompletion } from "../ui/services/lmStudio.services";

/* 
  Generate plot for the tale when the user selected any one of default themes
  from ThemeSelector page.
  The default themes are "fun" | "horror" | "happy"
*/
export async function generatePlot(theme: SelectedTheme | string, age: number) {
  try {
    return (await getCompletion(theme, age))
  } catch (error) {
    console.log("Error generating the plot based on the theme", error);
    return "";
  }
}


/*
  Generates the 3 character names using the tale plot.
*/
export async function generateCharacters(talePlot: string, taleTheme:string): Promise<GameScreenCharacterType[]> {
  try {
    return (await generateTaleCharacters(talePlot, taleTheme))
  } catch (error) {
    console.log("Error generating tale characters.", error)
    return []
  }
}


/*
  Generates the scene of the game
*/
export async function generateScene({
  messages,
  talePlot,
  characters,
}: {
  messages: string;
  talePlot: string;
  characters: GameScreenCharacterType[]
}) {
  console.log({
    messages,
    talePlot,
    characters
  })
  try {
    return (await generateTaleConversaton({ messages, characters, talePlot }));
  } catch (error) {
    console.log(error)
    return []
  }
}



export async function generateTaleSceneImage() {
  // Generates a new image based on the scene
  return "image"
}

